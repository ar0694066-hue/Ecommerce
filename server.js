require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
let Razorpay = null;
try {
  Razorpay = require("razorpay");
} catch (e) {
  console.warn("Razorpay module not loaded yet.");
}

const app = express();

// Enable CORS for VS Code Live Server (port 5500) and other frontends
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const UPI_ID = process.env.UPI_ID || "ar0694066-1@okicic";
const UPI_PAYEE_NAME = process.env.UPI_PAYEE_NAME || "THREADLINE ATELIER";

function buildUpiUri(amount, note) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: Number(amount || 0).toFixed(2),
    cu: "INR",
    tn: note || "THREADLINE ATELIER Order",
  });
  return `upi://pay?${params.toString()}`;
}

// Load Catalog
const productsFilePath = path.join(__dirname, "data", "products.json");
let PRODUCTS_LIST = [];
let PRODUCTS_MAP = {};

try {
  PRODUCTS_LIST = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  PRODUCTS_MAP = PRODUCTS_LIST.reduce((map, p) => {
    map[p.id] = p;
    return map;
  }, {});
  console.log(`Loaded ${PRODUCTS_LIST.length} luxury products into catalog.`);
} catch (err) {
  console.error("Failed to load products.json:", err);
}

// Persistent Orders
const ordersFilePath = path.join(__dirname, "data", "orders.json");
function getOrders() {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      fs.writeFileSync(ordersFilePath, "[]", "utf8");
      return [];
    }
    const data = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading orders file:", err);
    return [];
  }
}

function saveOrder(order) {
  try {
    const orders = getOrders();
    const existingIndex = orders.findIndex((o) => o.id === order.id);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.unshift(order);
    }
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving order:", err);
  }
}

// Initialize Razorpay Instance if credentials exist
let razorpayInstance = null;
const isRazorpayConfigured =
  Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) &&
  !RAZORPAY_KEY_ID.includes("your_") &&
  !RAZORPAY_KEY_SECRET.includes("your_");

if (isRazorpayConfigured && Razorpay) {
  try {
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    console.log("Razorpay initialized in " + (RAZORPAY_KEY_ID.startsWith("rzp_live") ? "LIVE" : "TEST") + " mode.");
  } catch (e) {
    console.error("Failed to initialize Razorpay client:", e);
  }
} else {
  console.log("Razorpay credentials not set or placeholder detected. Demo / Simulated mode will be active until configured.");
}

// API: Config for frontend
app.get("/api/config", (req, res) => {
  res.json({
    brandName: "THREADLINE ATELIER",
    currency: "INR",
    currencySymbol: "₹",
    upiId: UPI_ID,
    upiPayeeName: UPI_PAYEE_NAME,
    isRazorpayConfigured,
    razorpayKeyId: isRazorpayConfigured ? RAZORPAY_KEY_ID : null,
    mode: isRazorpayConfigured ? (RAZORPAY_KEY_ID.startsWith("rzp_live") ? "live" : "test") : "simulation",
  });
});

// API: Product Catalog with filtering, search and sorting
app.get("/api/products", (req, res) => {
  let result = [...PRODUCTS_LIST];
  const { category, search, collection, sort, minPrice, maxPrice } = req.query;

  if (category && category !== "All") {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (collection) {
    result = result.filter(
      (p) => p.collection && p.collection.toLowerCase() === collection.toLowerCase()
    );
  }

  if (search) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) result = result.filter((p) => p.price >= min);
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) result = result.filter((p) => p.price <= max);
  }

  if (sort) {
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") result.sort((a, b) => b.id - a.id);
  }

  res.json(result);
});

// API: Single Product
app.get("/api/products/:id", (req, res) => {
  const product = PRODUCTS_MAP[req.params.id];
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// API: Create Razorpay or UPI QR Order
app.post("/api/razorpay/create-order", async (req, res) => {
  try {
    const { items, customer, promoCode, paymentMethod } = req.body;
    const isUpiQr = paymentMethod === "UPI_QR";

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Your bag is empty." });
    }

    if (
      !customer ||
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.pincode
    ) {
      return res.status(400).json({
        error: "Please provide complete shipping details (Name, Email, Phone, Address, City, PIN Code).",
      });
    }

    // Server-side subtotal verification
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = PRODUCTS_MAP[item.id];
      const quantity = Number(item.quantity);
      if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
      ) {
        return res.status(400).json({ error: "Invalid item in shopping bag." });
      }

      subtotal += product.price * quantity;
      validatedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size: item.size || product.sizes[0] || "Standard",
        color: item.color || product.colors[0]?.name || "Original",
        image: product.image,
      });
    }

    // Promotional privilege discount
    let discount = 0;
    if (promoCode && promoCode.toUpperCase() === "ATELIER10") {
      discount = Math.round(subtotal * 0.1); // 10% privilege discount
    }

    // Complimentary shipping on orders >= ₹15,000, else ₹1,500
    const shipping = subtotal >= 15000 ? 0 : 1500;
    const finalAmount = Math.max(0, subtotal - discount + shipping);

    const orderId =
      "TL-" + Date.now() + "-" + crypto.randomBytes(3).toString("hex").toUpperCase();

    let razorpayOrderId = (isUpiQr ? "upi_order_" : "sim_order_") + crypto.randomBytes(8).toString("hex");

    if (!isUpiQr && isRazorpayConfigured && razorpayInstance) {
      const options = {
        amount: Math.round(finalAmount * 100), // amount in paise
        currency: "INR",
        receipt: orderId,
        notes: {
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
        },
      };

      const rzpOrder = await razorpayInstance.orders.create(options);
      razorpayOrderId = rzpOrder.id;
    }

    const upiUri = buildUpiUri(finalAmount, `Order ${orderId}`);

    const orderRecord = {
      id: orderId,
      razorpayOrderId,
      paymentMethod: isUpiQr ? "UPI_QR" : "RAZORPAY",
      upiId: isUpiQr ? UPI_ID : null,
      upiUri: isUpiQr ? upiUri : null,
      subtotal,
      discount,
      shipping,
      total: finalAmount,
      currency: "INR",
      items: validatedItems,
      customer,
      promoCode: promoCode || null,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      isSimulated: isUpiQr ? false : !isRazorpayConfigured,
    };

    saveOrder(orderRecord);

    res.json({
      success: true,
      orderId,
      razorpayOrderId,
      paymentMethod: orderRecord.paymentMethod,
      upiId: UPI_ID,
      upiPayeeName: UPI_PAYEE_NAME,
      upiUri,
      amount: finalAmount,
      amountInPaise: Math.round(finalAmount * 100),
      currency: "INR",
      keyId: isRazorpayConfigured ? RAZORPAY_KEY_ID : "rzp_test_simulated_mode",
      isSimulated: orderRecord.isSimulated,
      customer,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: "Failed to initiate luxury checkout session." });
  }
});

// API: Verify Razorpay or UPI QR Payment
app.post("/api/razorpay/verify-payment", async (req, res) => {
  try {
    const {
      orderId,
      paymentMethod,
      upiRef,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order reference not found." });
    }

    if (order.status === "PAID") {
      return res.json({ success: true, message: "Order already confirmed.", order });
    }

    const isUpiQr = paymentMethod === "UPI_QR" || order.paymentMethod === "UPI_QR";

    if (!isUpiQr && isRazorpayConfigured && RAZORPAY_KEY_SECRET) {
      // Cryptographic verification
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        order.status = "PAYMENT_FAILED";
        saveOrder(order);
        return res
          .status(400)
          .json({ error: "Invalid payment signature. Verification rejected." });
      }
    }

    // Payment successfully confirmed
    const cleanUpiRef = typeof upiRef === "string" ? upiRef.trim() : "";
    order.status = "PAID";
    order.paymentDetails = isUpiQr
      ? {
          paymentId: cleanUpiRef || "UPI-" + crypto.randomBytes(5).toString("hex").toUpperCase(),
          utr: cleanUpiRef || null,
          upiId: UPI_ID,
          verifiedAt: new Date().toISOString(),
          method: `UPI QR (${UPI_ID})`,
        }
      : {
          paymentId: razorpay_payment_id || "sim_pay_" + crypto.randomBytes(6).toString("hex"),
          verifiedAt: new Date().toISOString(),
          method: "Razorpay (Cards / UPI / NetBanking)",
        };

    saveOrder(order);

    res.json({
      success: true,
      message: "Payment successfully verified and order confirmed.",
      order,
    });
  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ error: "Failed to verify transaction status." });
  }
});

// API: Fetch single order for confirmation view
app.get("/api/orders/:id", (req, res) => {
  const orders = getOrders();
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.json(order);
});

// API: Customer Order History
app.get("/api/orders", (req, res) => {
  const { email } = req.query;
  const orders = getOrders();
  if (email) {
    const filtered = orders.filter(
      (o) => o.customer?.email?.toLowerCase() === email.trim().toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(orders.slice(0, 20)); // return recent orders
});

// ==========================================
// ATELIER PRIVÉ VIP MEMBERSHIP API
// ==========================================
const membershipsFilePath = path.join(__dirname, "data", "memberships.json");

const MEMBERSHIP_TIERS = {
  silver: {
    id: "silver",
    name: "Silver Privé",
    subtitle: "Connoisseur Sartorial Privilege",
    price: 4999,
    discountPercent: 10,
    features: [
      "10% Privilege Discount on all atelier creations",
      "Complimentary white-glove courier on all orders",
      "Seasonal capsule lookbook & private pre-order access",
      "Digital certificate of atelier membership"
    ]
  },
  gold: {
    id: "gold",
    name: "Gold Haute Couture",
    subtitle: "Most Preferred Sartorial Fellow",
    price: 14999,
    discountPercent: 15,
    isPopular: true,
    features: [
      "15% VIP Sartorial Discount on entire collection",
      "Complimentary at-home master tailor fitting (2 visits/yr)",
      "Dedicated personal stylist concierge via WhatsApp/Call",
      "Priority production & same-day express dispatch",
      "Invitation to private runway showcases & salons"
    ]
  },
  black_diamond: {
    id: "black_diamond",
    name: "Black Diamond Royal Bespoke",
    subtitle: "Elite Royal Patron Privilege",
    price: 29999,
    discountPercent: 20,
    features: [
      "20% Elite Patron Discount permanently applied",
      "Unlimited custom bespoke alterations & monogramming",
      "Exclusive access to the Private Vault collection",
      "First-class chauffeur service to showroom fittings",
      "Handmade Italian calfskin garment bag & wooden hangers"
    ]
  }
};

function getMemberships() {
  try {
    if (!fs.existsSync(membershipsFilePath)) {
      fs.writeFileSync(membershipsFilePath, "[]", "utf8");
      return [];
    }
    const data = fs.readFileSync(membershipsFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading memberships file:", err);
    return [];
  }
}

function saveMembership(record) {
  try {
    const list = getMemberships();
    const idx = list.findIndex(
      (m) =>
        m.id === record.id ||
        (m.customer?.email &&
          record.customer?.email &&
          m.customer.email.toLowerCase() === record.customer.email.toLowerCase())
    );
    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.unshift(record);
    }
    fs.writeFileSync(membershipsFilePath, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving membership:", err);
  }
}

// API: Get Membership Tiers
app.get("/api/membership/tiers", (req, res) => {
  res.json({ success: true, tiers: MEMBERSHIP_TIERS });
});

// API: Check Active Membership by Email
app.get("/api/membership/status", (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ hasMembership: false });
  const list = getMemberships();
  const found = list.find(
    (m) =>
      m.status === "ACTIVE" &&
      m.customer?.email?.toLowerCase() === email.trim().toLowerCase()
  );
  if (found) {
    return res.json({ hasMembership: true, membership: found });
  }
  res.json({ hasMembership: false });
});

// API: Create Razorpay or UPI QR Order for Membership
app.post("/api/membership/create-order", async (req, res) => {
  try {
    const { tierId, customer, paymentMethod } = req.body;
    const isUpiQr = paymentMethod === "UPI_QR";
    const tier = MEMBERSHIP_TIERS[tierId];
    if (!tier) {
      return res.status(400).json({ error: "Invalid membership tier chosen." });
    }

    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({
        error: "Please provide your full name, email, and mobile number for membership registration."
      });
    }

    const membershipOrderId =
      "VIP-" + Date.now() + "-" + crypto.randomBytes(3).toString("hex").toUpperCase();

    let razorpayOrderId = (isUpiQr ? "upi_vip_" : "sim_vip_") + crypto.randomBytes(8).toString("hex");

    if (!isUpiQr && isRazorpayConfigured && razorpayInstance) {
      const options = {
        amount: Math.round(tier.price * 100), // amount in paise
        currency: "INR",
        receipt: membershipOrderId,
        notes: {
          membershipTier: tier.name,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
        },
      };

      const rzpOrder = await razorpayInstance.orders.create(options);
      razorpayOrderId = rzpOrder.id;
    }

    const upiUri = buildUpiUri(tier.price, `${tier.name} Membership`);

    const membershipRecord = {
      id: membershipOrderId,
      razorpayOrderId,
      paymentMethod: isUpiQr ? "UPI_QR" : "RAZORPAY",
      upiId: isUpiQr ? UPI_ID : null,
      upiUri: isUpiQr ? upiUri : null,
      tierId: tier.id,
      tierName: tier.name,
      price: tier.price,
      discountPercent: tier.discountPercent,
      customer,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      isSimulated: isUpiQr ? false : !isRazorpayConfigured,
    };

    saveMembership(membershipRecord);

    res.json({
      success: true,
      membershipOrderId,
      razorpayOrderId,
      paymentMethod: membershipRecord.paymentMethod,
      upiId: UPI_ID,
      upiPayeeName: UPI_PAYEE_NAME,
      upiUri,
      amount: tier.price,
      amountInPaise: Math.round(tier.price * 100),
      currency: "INR",
      keyId: isRazorpayConfigured ? RAZORPAY_KEY_ID : "rzp_test_simulated_mode",
      isSimulated: membershipRecord.isSimulated,
      tier,
      customer,
    });
  } catch (err) {
    console.error("Membership order creation failed:", err);
    res.status(500).json({ error: "Failed to initiate membership enrollment session." });
  }
});

// API: Verify Razorpay or UPI QR Payment for Membership
app.post("/api/membership/verify-payment", async (req, res) => {
  try {
    const {
      membershipOrderId,
      paymentMethod,
      upiRef,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const list = getMemberships();
    const record = list.find((m) => m.id === membershipOrderId);

    if (!record) {
      return res.status(404).json({ error: "Membership registration record not found." });
    }

    if (record.status === "ACTIVE") {
      return res.json({ success: true, message: "Membership already active.", membership: record });
    }

    const isUpiQr = paymentMethod === "UPI_QR" || record.paymentMethod === "UPI_QR";

    if (!isUpiQr && isRazorpayConfigured && RAZORPAY_KEY_SECRET) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        record.status = "PAYMENT_FAILED";
        saveMembership(record);
        return res
          .status(400)
          .json({ error: "Invalid payment signature. Verification rejected." });
      }
    }

    // Activate membership for 1 year
    const now = new Date();
    const validUntil = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
    const cleanUpiRef = typeof upiRef === "string" ? upiRef.trim() : "";

    record.status = "ACTIVE";
    record.activatedAt = new Date().toISOString();
    record.validUntil = validUntil;
    record.paymentDetails = isUpiQr
      ? {
          paymentId: cleanUpiRef || "UPI-VIP-" + crypto.randomBytes(5).toString("hex").toUpperCase(),
          utr: cleanUpiRef || null,
          upiId: UPI_ID,
          verifiedAt: new Date().toISOString(),
          method: `UPI QR (${UPI_ID})`,
        }
      : {
          paymentId: razorpay_payment_id || "sim_pay_vip_" + crypto.randomBytes(6).toString("hex"),
          verifiedAt: new Date().toISOString(),
          method: "Razorpay Secure Membership Gateway",
        };

    saveMembership(record);

    res.json({
      success: true,
      message: "Atelier Privé Membership successfully activated!",
      membership: record,
    });
  } catch (err) {
    console.error("Membership verification failed:", err);
    res.status(500).json({ error: "Failed to verify membership transaction status." });
  }
});

// Catch-all route to serve the SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`THREADLINE ATELIER running at http://localhost:${PORT}`);
});
