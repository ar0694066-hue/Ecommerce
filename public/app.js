/**
 * THREADLINE ATELIER — Luxury Men's E-Commerce Architecture
 * Razorpay Payment Integration, Cart, Wishlist, Filter & Sorting System
 */

(function () {
  "use strict";

  // Built-in Embedded Fallback Catalog of 32 Luxury Men's Creations
  // Guarantees all products and images load instantly even on VS Code Live Server (port 5500)
  const FALLBACK_CATALOG = [
    {
      id: 1,
      name: "Midnight Silk-Wool Evening Tuxedo",
      category: "Blazers and Suits",
      price: 145000,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80",
      description: "Crafted from an exquisite 280g Italian silk-wool blend with hand-stitched grosgrain shawl lapels. Designed with canvassed construction for an impeccable silhouette, paired with flat-front silk-striped trousers.",
      sizes: ["38R", "40R", "42R", "44R"],
      colors: [{ name: "Midnight Navy", hex: "#0D1B2A" }, { name: "Imperial Black", hex: "#111111" }],
      rating: 4.9, reviewCount: 38, stockStatus: "Only 3 tailored sets in Atelier", badge: "ATELIER EXCLUSIVE", collection: "exclusive"
    },
    {
      id: 2,
      name: "Bespoke Glen Plaid Wool Blazer",
      category: "Blazers and Suits",
      price: 89000,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      description: "Tailored in Biella, Italy using super 150s virgin wool. Features a softly structured shoulder, horn buttons, double vent, and genuine Bemberg silk lining.",
      sizes: ["38R", "40R", "42R", "44R"],
      colors: [{ name: "Charcoal Grey Plaid", hex: "#2B2B2B" }, { name: "Sand Glen Plaid", hex: "#8A847A" }],
      rating: 4.8, reviewCount: 42, stockStatus: "In Stock", badge: "HERITAGE", collection: "featured"
    },
    {
      id: 3,
      name: "Double-Breasted Mongolian Cashmere Overcoat",
      category: "Jackets",
      price: 125000,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80",
      description: "Woven from 100% pure Grade-A Mongolian cashmere with water-repellent finish. Features peak lapels, genuine horn buttons, and deep welt pockets.",
      sizes: ["38R", "40R", "42R", "44R"],
      colors: [{ name: "Camel Warm Beige", hex: "#BFA588" }, { name: "Onyx Black", hex: "#121212" }],
      rating: 5.0, reviewCount: 29, stockStatus: "In Stock", badge: "NEW SEASON", collection: "new"
    },
    {
      id: 4,
      name: "Hand-Burnished Calfskin Suede Bomber",
      category: "Jackets",
      price: 98000,
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80",
      description: "Sourced from premier Tuscan tanneries, velvety soft calf suede with custom gold-plated RiRi zips and rib-knit cashmere trims.",
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Cognac Brown", hex: "#6D3B17" }, { name: "Olive Slate", hex: "#3E4437" }],
      rating: 4.9, reviewCount: 54, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 5,
      name: "Italian Nappa Leather Biker Jacket",
      category: "Jackets",
      price: 115000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
      description: "Buttery soft full-grain lamb nappa leather jacket with asymmetric closure, polished gunmetal hardware, and quilted silk lining.",
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Deep Jet Black", hex: "#0F0F0F" }],
      rating: 4.9, reviewCount: 61, stockStatus: "Only 2 left", badge: "LIMITED", collection: "exclusive"
    },
    {
      id: 6,
      name: "Mulberry Silk-Cotton Evening Shirt",
      category: "Premium Shirts",
      price: 28500,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
      description: "Woven with 40% Mulberry silk and 60% Giza Egyptian cotton. Boasts a concealed mother-of-pearl button placket and sculpted French cuffs.",
      sizes: ["39", "40", "41", "42", "43"],
      colors: [{ name: "Crisp Ivory", hex: "#F8F6F0" }, { name: "Midnight Noir", hex: "#151515" }],
      rating: 4.8, reviewCount: 47, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 7,
      name: "Sartorial Poplin Mandarin Collar Shirt",
      category: "Premium Shirts",
      price: 22000,
      image: "https://images.unsplash.com/photo-1620012253295-c15c429fccf8?auto=format&fit=crop&w=1200&q=80",
      description: "Constructed from 200/2 two-ply sea island cotton. Finished with subtle tonal embroidery at the hem and handcrafted Australian mother-of-pearl buttons.",
      sizes: ["39", "40", "41", "42", "43"],
      colors: [{ name: "Chalk White", hex: "#FFFFFF" }, { name: "Sky Blue Fine Stripe", hex: "#C2D5E8" }],
      rating: 4.7, reviewCount: 33, stockStatus: "In Stock", badge: "NEW", collection: "new"
    },
    {
      id: 8,
      name: "Tailored Bengal Stripe Royal Oxford Shirt",
      category: "Premium Shirts",
      price: 24500,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80",
      description: "Woven on vintage shuttle looms in Naples. Offers a semi-spread collar, split back yoke for effortless movement, and reinforced side gussets.",
      sizes: ["39", "40", "41", "42", "43"],
      colors: [{ name: "Navy & White Stripe", hex: "#1B3047" }, { name: "Espresso Stripe", hex: "#42281D" }],
      rating: 4.8, reviewCount: 39, stockStatus: "In Stock", badge: "ESSENTIAL", collection: "featured"
    },
    {
      id: 9,
      name: "Mercerized Heavyweight Supima Crewneck",
      category: "Luxury T-Shirts",
      price: 12500,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
      description: "Double-mercerized 260gsm long-staple Supima cotton for an ethereal luster and silk-like drape. Preshrunk with double-needle ribbed collar.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [{ name: "Pitch Black", hex: "#111111" }, { name: "Raw Ecru", hex: "#EFECE4" }, { name: "Charcoal Slate", hex: "#2E2E2E" }],
      rating: 4.9, reviewCount: 88, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 10,
      name: "Cashmere-Silk Knit Long Sleeve Henley",
      category: "Luxury T-Shirts",
      price: 26000,
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80",
      description: "Seamless 18-gauge knit blend of 70% Mongolian cashmere and 30% Mulberry silk. Features a four-button genuine horn placket.",
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Sand Dune", hex: "#D3C2AC" }, { name: "Deep Forest", hex: "#1E2B22" }],
      rating: 4.9, reviewCount: 31, stockStatus: "Only 4 left", badge: "HERITAGE", collection: "featured"
    },
    {
      id: 11,
      name: "Extra-Fine Merino Silk Knit Sweater",
      category: "Luxury T-Shirts",
      price: 32000,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
      description: "Spun from 15.5 micron Australian Merino wool blended with high-twist silk yarns. Thermal regulating, ultra-lightweight, and luxuriously soft against skin.",
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Warm Taupe", hex: "#8C7C6D" }, { name: "Midnight Ink", hex: "#101820" }],
      rating: 4.8, reviewCount: 26, stockStatus: "In Stock", badge: "NEW", collection: "new"
    },
    {
      id: 12,
      name: "Double-Pleated Sartorial Wool Flannel Trousers",
      category: "Trousers",
      price: 38000,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
      description: "Classic English flannel tailored with deep double forward pleats, high-rise waist, side buckle adjusters, and a generous 2-inch cuff.",
      sizes: ["30", "32", "34", "36"],
      colors: [{ name: "Mid Grey Melange", hex: "#4D4D4D" }, { name: "Navy Blue", hex: "#1B263B" }],
      rating: 4.9, reviewCount: 44, stockStatus: "In Stock", badge: "ATELIER", collection: "featured"
    },
    {
      id: 13,
      name: "Sartorial High-Waist Gurkha Trousers",
      category: "Trousers",
      price: 34000,
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80",
      description: "Handcrafted from Irish heavy linen with traditional dual-buckle Gurkha fastening. Offers effortless breathability and relaxed elegance.",
      sizes: ["30", "32", "34", "36"],
      colors: [{ name: "Desert Khaki", hex: "#C2B280" }, { name: "Ivory Cream", hex: "#FAF6EE" }],
      rating: 4.7, reviewCount: 35, stockStatus: "In Stock", badge: "NEW SEASON", collection: "new"
    },
    {
      id: 14,
      name: "Kurabo Japanese Selvedge Raw Denim",
      category: "Denim",
      price: 36000,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
      description: "14.5oz unwashed virgin selvedge denim woven on heritage Toyoda shuttle looms in Okayama, Japan. Features pink line selvedge ID and solid brass rivets.",
      sizes: ["30", "32", "34", "36"],
      colors: [{ name: "Deep Indigo Raw", hex: "#1A2536" }],
      rating: 5.0, reviewCount: 58, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 15,
      name: "Tapered Vintage Hand-Wash Selvedge Jeans",
      category: "Denim",
      price: 32500,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
      description: "Gently hand-distressed in Kojima to replicate five years of natural patina. Finished with vegetable-tanned leather waistband patch and button fly.",
      sizes: ["30", "32", "34", "36"],
      colors: [{ name: "Faded Stone Blue", hex: "#506A82" }],
      rating: 4.8, reviewCount: 29, stockStatus: "In Stock", badge: "HERITAGE", collection: "featured"
    },
    {
      id: 16,
      name: "Calfskin Minimalist Low-Top Sneakers",
      category: "Sneakers",
      price: 42000,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80",
      description: "Sculpted from butter-soft Italian full-grain nappa leather. Features Margom rubber cupsole, gold-leaf stamped serial numbers, and calfskin leather lining.",
      sizes: ["40", "41", "42", "43", "44", "45"],
      colors: [{ name: "Pure White", hex: "#FFFFFF" }, { name: "Onyx Black", hex: "#111111" }],
      rating: 4.9, reviewCount: 92, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 17,
      name: "Atelier Luxury Runner in Suede & Nappa",
      category: "Sneakers",
      price: 49000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      description: "A sophisticated fusion of calfskin suede, perforated leather, and ultralight Vibram lugged soles. Engineered for daylong city comfort with runway flair.",
      sizes: ["40", "41", "42", "43", "44", "45"],
      colors: [{ name: "Champagne & Stone", hex: "#D6C7B2" }, { name: "Triple Noir", hex: "#171717" }],
      rating: 4.8, reviewCount: 37, stockStatus: "Only 3 left", badge: "NEW", collection: "new"
    },
    {
      id: 18,
      name: "Hand-Burnished Wholecut Oxford Shoes",
      category: "Formal Shoes",
      price: 68000,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=80",
      description: "Crafted from a single flawless cut of French calfskin with Goodyear-welted closed-channel oak-bark leather soles. Masterfully hand-patinated in Parma.",
      sizes: ["40", "41", "42", "43", "44"],
      colors: [{ name: "Burnished Mahogany", hex: "#4A2718" }, { name: "Imperial Black", hex: "#0D0D0D" }],
      rating: 5.0, reviewCount: 46, stockStatus: "In Stock", badge: "ATELIER EXCLUSIVE", collection: "exclusive"
    },
    {
      id: 19,
      name: "Goodyear-Welted Double Monkstrap Shoes",
      category: "Formal Shoes",
      price: 64000,
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80",
      description: "Handmade in Northamptonshire with full-grain calf leather and polished champagne-gold buckle closures. Beveled waist and fiddleback sole detailing.",
      sizes: ["40", "41", "42", "43", "44"],
      colors: [{ name: "Deep Chestnut", hex: "#3A2118" }, { name: "Obsidian Black", hex: "#141414" }],
      rating: 4.9, reviewCount: 38, stockStatus: "In Stock", badge: "HERITAGE", collection: "featured"
    },
    {
      id: 20,
      name: "Embroidered Silk Velvet Evening Slippers",
      category: "Formal Shoes",
      price: 54000,
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80",
      description: "Pure cotton-silk velvet upper with hand-embroidered bullion gold thread crest. Quilted satin lining and soft leather sole for black-tie soirees.",
      sizes: ["40", "41", "42", "43", "44"],
      colors: [{ name: "Midnight Velvet", hex: "#0C1322" }, { name: "Bordeaux Wine", hex: "#471018" }],
      rating: 4.9, reviewCount: 21, stockStatus: "Only 2 pairs", badge: "LIMITED", collection: "exclusive"
    },
    {
      id: 21,
      name: "Chronographe Royal 18k Rose Gold Watch",
      category: "Luxury Watches",
      price: 185000,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      description: "Swiss-made automatic chronograph with 72-hour power reserve. Encased in solid 18k rose gold with an ivory sunray dial, sapphire crystal, and Louisiana alligator strap.",
      sizes: ["41mm Case"],
      colors: [{ name: "Rose Gold & Ivory", hex: "#C59B74" }],
      rating: 5.0, reviewCount: 18, stockStatus: "Numbered Atelier Piece (04/25)", badge: "HAUTE HORLOGERIE", collection: "exclusive"
    },
    {
      id: 22,
      name: "Grand Complication Skeleton Mechanical Timepiece",
      category: "Luxury Watches",
      price: 165000,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
      description: "Hand-wound skeletonized caliber displaying Côtes de Genève finishes and blued steel screws through double anti-reflective sapphire glass. Polished titanium bezel.",
      sizes: ["42mm Case"],
      colors: [{ name: "Brushed Titanium & Gunmetal", hex: "#4A4D52" }],
      rating: 4.9, reviewCount: 24, stockStatus: "In Stock", badge: "MASTERPIECE", collection: "bestseller"
    },
    {
      id: 23,
      name: "Full-Grain Leather Bifold Wallet with Gold Foil",
      category: "Leather Wallets",
      price: 18500,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
      description: "Vegetable-tanned French box calf leather with eight card slots, dual note compartments, and subtle 24k gold leaf hot-stamped Atelier monogram.",
      sizes: ["One Size"],
      colors: [{ name: "Ebony Black", hex: "#111111" }, { name: "Caramel Cognac", hex: "#7A431D" }],
      rating: 4.9, reviewCount: 73, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 24,
      name: "Saffiano Calfskin Zip Travel Organizer",
      category: "Leather Wallets",
      price: 28000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      description: "Scratch-resistant cross-grain Saffiano leather wallet with zippered compartment for passport, boarding passes, currency, and SIM card ejector slot.",
      sizes: ["One Size"],
      colors: [{ name: "Midnight Blue", hex: "#14213D" }, { name: "Smoked Charcoal", hex: "#2B2D42" }],
      rating: 4.8, reviewCount: 39, stockStatus: "In Stock", badge: "TRAVEL", collection: "featured"
    },
    {
      id: 25,
      name: "Reversible Tuscan Leather Belt with Brushed Brass",
      category: "Belts",
      price: 21500,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=80",
      description: "Reversible 34mm wide belt offering smooth black French calfskin on one side and rich tan grain leather on the reverse. Solid brass swivel buckle.",
      sizes: ["85cm (32)", "90cm (34)", "95cm (36)", "100cm (38)"],
      colors: [{ name: "Black / Cognac Tan", hex: "#1E1E1E" }],
      rating: 4.9, reviewCount: 64, stockStatus: "In Stock", badge: "BESTSELLER", collection: "bestseller"
    },
    {
      id: 26,
      name: "Hand-Braided Bridle Leather Dress Belt",
      category: "Belts",
      price: 19000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      description: "Woven by hand in Florence using English bridle leather strips. Features a hand-sewn leather keeper and satin-finished palladium buckle.",
      sizes: ["85cm (32)", "90cm (34)", "95cm (36)", "100cm (38)"],
      colors: [{ name: "Dark Walnut", hex: "#402619" }],
      rating: 4.7, reviewCount: 28, stockStatus: "In Stock", badge: "NEW", collection: "new"
    },
    {
      id: 27,
      name: "Bold Square Acetate Sunglasses in Tortoise",
      category: "Sunglasses",
      price: 28500,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
      description: "Hand-milled 8mm thick Japanese acetate frames with 24k gold-plated hinges and Carl Zeiss polarized green lenses offering 100% UV400 protection.",
      sizes: ["52-20-145"],
      colors: [{ name: "Vintage Havana Tortoise", hex: "#5E3B20" }, { name: "Gloss Obsidian", hex: "#0F0F0F" }],
      rating: 4.9, reviewCount: 51, stockStatus: "In Stock", badge: "HERITAGE", collection: "featured"
    },
    {
      id: 28,
      name: "Titanium Aviator Sunglasses with Gold Accents",
      category: "Sunglasses",
      price: 34000,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
      description: "Ultra-lightweight aerospace-grade Japanese titanium navigator silhouette with engraved filigree temples and warm amber gradient polarized lenses.",
      sizes: ["58-15-140"],
      colors: [{ name: "Brushed Champagne Gold", hex: "#D4AF37" }],
      rating: 4.8, reviewCount: 33, stockStatus: "Only 3 left", badge: "LIMITED", collection: "exclusive"
    },
    {
      id: 29,
      name: "Oud Royale Extrait de Parfum (100ml)",
      category: "Perfumes",
      price: 31000,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
      description: "An opulent concoction of rare 30-year wild Cambodian agarwood, Taif rose, smoked birch tar, ambergris, and warm tonka bean. 35% perfume oil concentration.",
      sizes: ["100ml Flacon"],
      colors: [{ name: "Smoked Glass & Gold", hex: "#1A1713" }],
      rating: 5.0, reviewCount: 82, stockStatus: "In Stock", badge: "SIGNATURE", collection: "bestseller"
    },
    {
      id: 30,
      name: "Santal Noir & Haitian Vetiver Eau de Parfum (100ml)",
      category: "Perfumes",
      price: 26500,
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80",
      description: "Crisp Italian bergamot and cardamom transitioning into smoky Haitian vetiver, Mysore sandalwood, and dry Virginia cedarwood.",
      sizes: ["100ml Flacon"],
      colors: [{ name: "Heavy Crystal Flacon", hex: "#4D4238" }],
      rating: 4.8, reviewCount: 49, stockStatus: "In Stock", badge: "NEW", collection: "new"
    },
    {
      id: 31,
      name: "Solid 925 Sterling Silver & Black Onyx Cufflinks",
      category: "Premium Accessories",
      price: 24000,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
      description: "Hand-chiseled from solid British 925 hallmarked sterling silver inlaid with faceted natural black onyx stones. Finished with whaleback toggle closure.",
      sizes: ["One Size"],
      colors: [{ name: "Silver & Onyx", hex: "#C0C0C0" }],
      rating: 4.9, reviewCount: 35, stockStatus: "In Stock", badge: "ATELIER", collection: "featured"
    },
    {
      id: 32,
      name: "Hand-Rolled Silk Twill Pocket Square",
      category: "Premium Accessories",
      price: 9500,
      image: "https://images.unsplash.com/photo-1589756033837-83eb26c927b5?auto=format&fit=crop&w=1200&q=80",
      description: "100% heavyweight 16-momme silk twill printed in Lake Como with historic baroque botanical motifs. Expertly hand-rolled and hand-sewn edges.",
      sizes: ["42cm x 42cm"],
      colors: [{ name: "Gold & Navy Baroque", hex: "#B89758" }, { name: "Burgundy Geometric", hex: "#611C28" }],
      rating: 4.8, reviewCount: 41, stockStatus: "In Stock", badge: "ESSENTIAL", collection: "new"
    }
  ];

  // State
  let CATALOG = [...FALLBACK_CATALOG];
  let CART = JSON.parse(localStorage.getItem("threadline_bag") || "[]");
  let WISHLIST = JSON.parse(localStorage.getItem("threadline_wishlist") || "[]");
  let APPLIED_PROMO = localStorage.getItem("threadline_promo") || null;
  let CONFIG = {
    brandName: "THREADLINE ATELIER",
    upiId: "ar0694066-1@okicic",
    upiPayeeName: "THREADLINE ATELIER",
    isRazorpayConfigured: false,
    razorpayKeyId: null,
    mode: "simulation",
  };

  function getUpiId() {
    return (CONFIG && CONFIG.upiId) || "ar0694066-1@okicic";
  }

  function buildUpiUri(amount, note) {
    const upiId = getUpiId();
    const payee = (CONFIG && CONFIG.upiPayeeName) || "THREADLINE ATELIER";
    const params = new URLSearchParams({
      pa: upiId,
      pn: payee,
      am: Number(amount || 0).toFixed(2),
      cu: "INR",
      tn: note || "THREADLINE ATELIER Payment",
    });
    return `upi://pay?${params.toString()}`;
  }

  async function renderQrCodeInto(containerEl, text, size = 160) {
    if (!containerEl) return;
    if (window.QRCode && typeof window.QRCode.toString === "function") {
      try {
        const svg = await window.QRCode.toString(text, {
          type: "svg",
          width: size,
          margin: 1,
          errorCorrectionLevel: "M",
          color: { dark: "#0d0d0d", light: "#ffffff" },
        });
        containerEl.innerHTML = svg;
        return;
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    }
    containerEl.innerHTML = `<div style="font-size:0.7rem;color:#111;text-align:center;padding:8px;">UPI ID:<br><strong>${getUpiId()}</strong></div>`;
  }

  async function copyText(text, label = "UPI ID") {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showNotification(`${label} copied: ${text}`);
    } catch (e) {
      showNotification(`UPI ID: ${text}`);
    }
  }

  let activeCategory = "All";
  let activePriceBand = "all";
  let activeSort = "featured";
  let activeSearchQuery = "";

  let modalActiveProduct = null;
  let modalSelectedSize = null;
  let modalSelectedColor = null;
  let modalSelectedQty = 1;
  let CURRENT_USER = JSON.parse(localStorage.getItem("threadline_client_user") || "null");

  // DOM Helpers
  const $ = (id) => document.getElementById(id);
  const money = (num) => "₹" + Number(num || 0).toLocaleString("en-IN");

  function showNotification(message, duration = 3200) {
    let toast = document.getElementById("luxuryToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "luxuryToast";
      toast.className = "luxury-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-crest">✦</span> <span>${message}</span>`;
    toast.classList.add("show");
    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }

  function checkAndHideOverlay() {
    const overlay = $("globalOverlay");
    if (!overlay) return;
    const isCartOpen = $("cartDrawer") && $("cartDrawer").classList.contains("open");
    const isWishlistOpen = $("wishlistDrawer") && $("wishlistDrawer").classList.contains("open");
    const isOrdersOpen = $("ordersDrawer") && $("ordersDrawer").classList.contains("open");
    const isProductOpen = $("productModal") && !$("productModal").classList.contains("hidden");
    const isCheckoutOpen = $("checkoutModal") && !$("checkoutModal").classList.contains("hidden");
    const isLoginOpen = $("loginModal") && !$("loginModal").classList.contains("hidden");
    const isProfileOpen = $("profileModal") && !$("profileModal").classList.contains("hidden");
    const isVoiceOpen = $("voiceModal") && !$("voiceModal").classList.contains("hidden");
    const isMembershipPayOpen = $("membershipPaymentModal") && !$("membershipPaymentModal").classList.contains("hidden");
    const isMembershipOpen = $("membershipSuccessModal") && !$("membershipSuccessModal").classList.contains("hidden");
    const isInfoOpen = $("infoModal") && !$("infoModal").classList.contains("hidden");

    if (!isCartOpen && !isWishlistOpen && !isOrdersOpen && !isProductOpen && !isCheckoutOpen && !isLoginOpen && !isProfileOpen && !isVoiceOpen && !isMembershipPayOpen && !isMembershipOpen && !isInfoOpen) {
      overlay.classList.add("hidden");
    }
  }

  function filterAndRenderCatalog() {
    renderMainGrid();
  }


  function saveCart() {
    localStorage.setItem("threadline_bag", JSON.stringify(CART));
  }
  function saveWishlist() {
    localStorage.setItem("threadline_wishlist", JSON.stringify(WISHLIST));
  }
  function saveOrderHistory(order) {
    try {
      const history = JSON.parse(localStorage.getItem("threadline_order_history") || "[]");
      history.unshift(order);
      localStorage.setItem("threadline_order_history", JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }

  // Determine backend base URL (works seamlessly on Render, port 3000, port 5500, or file://)
  const isLocalStaticHost = window.location.port === "5500" || window.location.protocol === "file:" || (window.location.hostname === "127.0.0.1" && window.location.port !== "3000");
  const API_BASE = isLocalStaticHost ? "http://localhost:3000" : "";

  // ==========================================
  // INITIALIZATION & API FETCHING
  // ==========================================
  async function initApp() {
    try {
      // 1. Fetch Store Config
      try {
        const configRes = await fetch(`${API_BASE}/api/config`);
        if (configRes.ok) {
          CONFIG = await configRes.json();
          updatePaymentBanner();
        }
      } catch (e) {
        console.warn("Backend API not reachable directly; operating in client luxury demo mode.");
      }

      // 2. Fetch Full Product Catalog from Server if available
      try {
        const prodRes = await fetch(`${API_BASE}/api/products`);
        if (prodRes.ok) {
          const apiProds = await prodRes.json();
          if (Array.isArray(apiProds) && apiProds.length > 0) {
            CATALOG = apiProds;
          }
        }
      } catch (e) {
        // Keeps FALLBACK_CATALOG (32 items)
      }

      // 3. Render Sections
      renderAllSections();
      updateCartUI();
      updateWishlistUI();
      updateUserUI();
      bindGlobalEvents();
      initVoiceRecognition();
      initMembershipModule();

      // Welcoming entrance prompt for new guests
      if (!CURRENT_USER && localStorage.getItem("threadline_dismissed_login") !== "true") {
        setTimeout(openLoginModal, 600);
      }

    } catch (err) {
      console.error("App initialization error:", err);
    }
  }

  function updatePaymentBanner() {
    const banner = $("paymentModeBanner");
    const indicator = $("modeIndicator");
    const text = $("modeText");
    if (!banner || !indicator || !text) return;

    if (CONFIG.isRazorpayConfigured && CONFIG.mode === "live") {
      indicator.style.color = "#176538";
      text.textContent = "Razorpay Live Gateway Active · Instant Bank & UPI Settlements";
    } else if (CONFIG.isRazorpayConfigured && CONFIG.mode === "test") {
      indicator.style.color = "#c5a880";
      text.textContent = "Razorpay Test Mode Active · Safe Test Cards & UPI Supported";
    } else {
      indicator.style.color = "#7b4c20";
      text.textContent = "Razorpay Demo Simulator Mode · Test checkout is fully operational";
    }
  }

  // ==========================================
  // PRODUCT RENDERING FUNCTIONS
  // ==========================================
  function createProductCardHTML(p) {
    const isWishlisted = WISHLIST.includes(p.id);
    const colorDots = (p.colors || [])
      .map((c) => `<span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`)
      .join("");

    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';">
          ${p.badge ? `<span class="product-badge-tag">${p.badge}</span>` : ""}
          <button class="wishlist-heart-btn ${isWishlisted ? "active" : ""}" data-wishlist-id="${p.id}" aria-label="Save to wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button class="quick-view-overlay-btn" data-quick-id="${p.id}">QUICK DISCOVER +</button>
        </div>
        <div class="product-details">
          <div>
            <span class="product-cat">${p.category}</span>
            <h3 class="product-name" title="${p.name}">${p.name}</h3>
          </div>
          <div class="product-card-bottom">
            <span class="product-price-val">${money(p.price)}</span>
            <div class="color-dots-preview">${colorDots}</div>
          </div>
        </div>
      </article>
    `;
  }

  function renderAllSections() {
    renderMainGrid();

    // New Arrivals Section (collection === 'new')
    const newItems = CATALOG.filter((p) => p.collection === "new").slice(0, 4);
    $("newArrivalsGrid").innerHTML = newItems.map(createProductCardHTML).join("");

    // Bestsellers Section (collection === 'bestseller')
    const bestsellers = CATALOG.filter((p) => p.collection === "bestseller").slice(0, 4);
    $("bestsellersGrid").innerHTML = bestsellers.map(createProductCardHTML).join("");

    // Footwear Section (Formal Shoes & Sneakers)
    const footwearItems = CATALOG.filter((p) => p.category === "Formal Shoes" || p.category === "Sneakers").slice(0, 4);
    $("footwearShowcaseGrid").innerHTML = footwearItems.map(createProductCardHTML).join("");

    // Accessories Section
    const accessories = CATALOG.filter(
      (p) =>
        p.category === "Luxury Watches" ||
        p.category === "Leather Wallets" ||
        p.category === "Belts" ||
        p.category === "Sunglasses" ||
        p.category === "Perfumes" ||
        p.category === "Premium Accessories"
    ).slice(0, 4);
    $("accessoriesGrid").innerHTML = accessories.map(createProductCardHTML).join("");

    // Exclusive Capsule Section
    const exclusive = CATALOG.filter((p) => p.collection === "exclusive").slice(0, 4);
    $("exclusiveGrid").innerHTML = exclusive.map(createProductCardHTML).join("");
  }

  function renderMainGrid() {
    let list = [...CATALOG];

    // Filter by Category
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by Price Band
    if (activePriceBand === "under25k") list = list.filter((p) => p.price < 25000);
    else if (activePriceBand === "25k-60k") list = list.filter((p) => p.price >= 25000 && p.price <= 60000);
    else if (activePriceBand === "60k-100k") list = list.filter((p) => p.price >= 60000 && p.price <= 100000);
    else if (activePriceBand === "above100k") list = list.filter((p) => p.price > 100000);

    // Search Query (if any)
    if (activeSearchQuery) {
      const q = activeSearchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (activeSort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (activeSort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (activeSort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (activeSort === "newest") list.sort((a, b) => b.id - a.id);

    // Render HTML
    const grid = $("mainProductGrid");
    const empty = $("emptyCatalogueState");

    if (list.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      grid.innerHTML = list.map(createProductCardHTML).join("");
    }
  }

  // ==========================================
  // QUICK VIEW / PRODUCT DETAILS MODAL
  // ==========================================
  function openProductModal(productId) {
    const product = CATALOG.find((p) => p.id === Number(productId));
    if (!product) return;

    modalActiveProduct = product;
    modalSelectedSize = product.sizes ? product.sizes[0] : "Standard";
    modalSelectedColor = product.colors ? product.colors[0] : { name: "Original", hex: "#111" };
    modalSelectedQty = 1;

    $("modalProductImage").src = product.image;
    $("modalProductImage").alt = product.name;
    $("modalProductBadge").textContent = product.badge || "ATELIER";
    $("modalProductCategory").textContent = product.category;
    $("modalProductName").textContent = product.name;
    $("modalProductPrice").textContent = money(product.price);
    $("modalProductStock").textContent = `✦ ${product.stockStatus || "In Stock"}`;
    $("modalProductDescription").textContent = product.description;
    $("modalProductRatingText").textContent = `${product.rating} / 5.0 (${product.reviewCount} Connoisseur Reviews)`;
    $("selectedColorName").textContent = modalSelectedColor.name;
    $("modalQtyVal").textContent = "1";

    // Color Swatches
    const colorContainer = $("modalColorSwatches");
    colorContainer.innerHTML = (product.colors || [])
      .map(
        (c, idx) => `
        <button class="color-swatch-btn ${idx === 0 ? "active" : ""}" data-color-name="${c.name}" data-color-hex="${c.hex}">
          <span class="swatch-color-circle" style="background-color: ${c.hex};"></span>
          <span>${c.name}</span>
        </button>`
      )
      .join("");

    // Size Pills
    const sizeContainer = $("modalSizePills");
    sizeContainer.innerHTML = (product.sizes || ["Standard"])
      .map(
        (s, idx) => `
        <button class="size-pill-btn ${idx === 0 ? "active" : ""}" data-size-val="${s}">
          ${s}
        </button>`
      )
      .join("");

    // Wishlist Button State
    const isWish = WISHLIST.includes(product.id);
    const wBtn = $("modalWishlistBtn");
    if (isWish) wBtn.classList.add("active");
    else wBtn.classList.remove("active");

    // Open Modal
    $("globalOverlay").classList.remove("hidden");
    $("productModal").classList.remove("hidden");
  }

  function closeProductModal() {
    $("productModal").classList.add("hidden");
    checkAndHideOverlay();
  }

  // ==========================================
  // SHOPPING BAG CALCULATIONS & UI
  // ==========================================
  function addToBag(product, size, color, quantity = 1) {
    const existing = CART.find(
      (i) => i.id === product.id && i.size === size && i.color === color.name
    );

    if (existing) {
      existing.quantity = Math.min(10, existing.quantity + quantity);
    } else {
      CART.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: size,
        color: color.name,
        quantity: Math.min(10, quantity),
      });
    }

    saveCart();
    updateCartUI();
    openCartDrawer();
  }

    function calculateCartTotals() {
    const subtotal = CART.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;

    // Check Active Atelier Privé Membership Discount
    let membershipDiscount = 0;
    try {
      const savedMem = localStorage.getItem("threadline_membership");
      if (savedMem) {
        const memObj = JSON.parse(savedMem);
        if (memObj && memObj.status === "ACTIVE" && memObj.discountPercent) {
          membershipDiscount = Math.round(subtotal * (memObj.discountPercent / 100));
        }
      }
    } catch (e) {}

    // Promo code discount
    let promoDiscount = 0;
    if (APPLIED_PROMO && APPLIED_PROMO.toUpperCase() === "ATELIER10") {
      promoDiscount = Math.round(subtotal * 0.1);
    }

    discount = Math.max(membershipDiscount, promoDiscount);

    // If VIP member or orders >= 15,000, complimentary white-glove shipping applies
    const hasVipFreeShipping = membershipDiscount > 0;
    const shipping = subtotal === 0 ? 0 : (subtotal >= 15000 || hasVipFreeShipping) ? 0 : 1500;
    const total = Math.max(0, subtotal - discount + (subtotal === 0 ? 0 : shipping));

    return { subtotal, discount, shipping, total, isVipDiscount: membershipDiscount > 0 };
  }

  function updateCartUI() {
    const totalCount = CART.reduce((s, i) => s + i.quantity, 0);
    $("cartCount").textContent = totalCount;
    $("cartDrawerCount").textContent = `(${totalCount})`;

    const { subtotal, discount, shipping, total } = calculateCartTotals();

    $("cartSubtotal").textContent = money(subtotal);
    $("cartTotal").textContent = money(total);

    // Discount Row
    const discountRow = $("cartDiscountRow");
    if (discount > 0) {
      discountRow.classList.remove("hidden");
      $("cartDiscount").textContent = `-${money(discount)}`;
    } else {
      discountRow.classList.add("hidden");
    }

    // Shipping Progress
    const progressFill = $("shippingProgressFill");
    const progressText = $("shippingProgressText");
    const cartShippingText = $("cartShipping");

    if (subtotal >= 15000) {
      progressFill.style.width = "100%";
      progressText.innerHTML = "✦ <strong>Complimentary White-Glove Courier Unlocked!</strong>";
      cartShippingText.textContent = "COMPLIMENTARY";
      cartShippingText.style.color = "#176538";
    } else {
      const remaining = 15000 - subtotal;
      const pct = Math.min(100, Math.round((subtotal / 15000) * 100));
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Add <strong>${money(remaining)}</strong> more for complimentary courier.`;
      cartShippingText.textContent = subtotal > 0 ? "₹1,500" : "Calculated at checkout";
      cartShippingText.style.color = "inherit";
    }

    // Render items list
    const container = $("cartItemList");
    if (CART.length === 0) {
      container.innerHTML = `
        <div class="empty-drawer-notice">
          <h3>Your Bag is Empty</h3>
          <p>Explore our sartorial creations and add pieces to your private selection.</p>
        </div>
      `;
      $("checkoutTriggerBtn").disabled = true;
    } else {
      $("checkoutTriggerBtn").disabled = false;
      container.innerHTML = CART.map(
        (item) => `
        <div class="drawer-item-card" data-cart-key="${item.id}-${item.size}-${item.color}">
          <div class="drawer-item-thumb">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';">
          </div>
          <div class="drawer-item-info">
            <h4>${item.name}</h4>
            <div class="drawer-item-meta">Size: ${item.size} · Color: ${item.color}</div>
            <div class="drawer-item-price">${money(item.price)}</div>
            <div class="drawer-qty-controls">
              <button class="drawer-qty-btn" data-cart-delta="-1" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">−</button>
              <span>${item.quantity}</span>
              <button class="drawer-qty-btn" data-cart-delta="1" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">+</button>
            </div>
          </div>
          <button class="drawer-remove-btn" data-remove-cart="${item.id}" data-size="${item.size}" data-color="${item.color}">REMOVE</button>
        </div>`
      ).join("");
    }
  }

  function openCartDrawer() {
    closeWishlistDrawer();
    closeOrdersDrawer();
    const voiceModal = $("voiceModal");
    if (voiceModal && !voiceModal.classList.contains("hidden")) {
      voiceModal.classList.add("hidden");
    }
    const overlay = $("globalOverlay");
    if (overlay) overlay.classList.remove("hidden");
    const drawer = $("cartDrawer");
    if (drawer) drawer.classList.add("open");
  }

  function closeCartDrawer() {
    const drawer = $("cartDrawer");
    if (drawer) drawer.classList.remove("open");
    checkAndHideOverlay();
  }

  // ==========================================
  // WISHLIST FUNCTIONALITY
  // ==========================================
  function toggleWishlist(productId) {
    const id = Number(productId);
    const index = WISHLIST.indexOf(id);
    if (index >= 0) {
      WISHLIST.splice(index, 1);
    } else {
      WISHLIST.push(id);
    }
    saveWishlist();
    updateWishlistUI();
    renderAllSections();
  }

  function updateWishlistUI() {
    $("wishlistCount").textContent = WISHLIST.length;
    $("wishlistDrawerCount").textContent = `(${WISHLIST.length})`;

    const container = $("wishlistItemsList");
    if (WISHLIST.length === 0) {
      container.innerHTML = `
        <div class="empty-drawer-notice">
          <h3>Your Wishlist is Empty</h3>
          <p>Curate your private bespoke wishlist by clicking the heart on any creation.</p>
        </div>
      `;
    } else {
      const items = CATALOG.filter((p) => WISHLIST.includes(p.id));
      container.innerHTML = items
        .map(
          (p) => `
        <div class="drawer-item-card">
          <div class="drawer-item-thumb">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';">
          </div>
          <div class="drawer-item-info">
            <h4>${p.name}</h4>
            <div class="drawer-item-meta">${p.category}</div>
            <div class="drawer-item-price">${money(p.price)}</div>
            <button class="luxury-btn btn-gold" style="padding: 8px 14px; margin-top: 10px; font-size: 0.65rem;" data-quick-id="${p.id}">
              DISCOVER & ADD →
            </button>
          </div>
          <button class="drawer-remove-btn" data-remove-wishlist="${p.id}">REMOVE</button>
        </div>`
        )
        .join("");
    }
  }

  function openWishlistDrawer() {
    closeCartDrawer();
    closeOrdersDrawer();
    $("globalOverlay").classList.remove("hidden");
    $("wishlistDrawer").classList.add("open");
  }

  function closeWishlistDrawer() {
    $("wishlistDrawer").classList.remove("open");
    checkAndHideOverlay();
  }

  // ==========================================
  // ORDER HISTORY DRAWER
  // ==========================================
  async function openOrdersDrawer() {
    closeCartDrawer();
    closeWishlistDrawer();

    const container = $("ordersHistoryList");
    container.innerHTML = "<p style='text-align:center; padding: 30px;'>Retrieving private client records...</p>";

    $("globalOverlay").classList.remove("hidden");
    $("ordersDrawer").classList.add("open");

    try {
      const localOrders = JSON.parse(localStorage.getItem("threadline_order_history") || "[]");
      let serverOrders = [];
      try {
        const res = await fetch(`${API_BASE}/api/orders`);
        serverOrders = res.ok ? await res.json() : [];
      } catch (e) {}

      const mergedMap = new Map();
      [...localOrders, ...serverOrders].forEach((o) => {
        if (o.id && !mergedMap.has(o.id)) mergedMap.set(o.id, o);
      });
      const allOrders = Array.from(mergedMap.values());

      if (allOrders.length === 0) {
        container.innerHTML = `
          <div class="empty-drawer-notice">
            <h3>No Orders on Record</h3>
            <p>You have not placed any orders yet. Once confirmed, your luxury order receipts will appear here.</p>
          </div>
        `;
      } else {
        container.innerHTML = allOrders
          .map(
            (o) => `
          <div style="background: white; border: 1px solid var(--color-border); padding: 18px; margin-bottom: 14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
              <strong style="font-size: 0.85rem;">${o.id}</strong>
              <span class="status-tag status-paid">${o.status}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--color-muted); margin-bottom: 8px;">
              ${new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
            <div style="font-size: 0.8rem; margin-bottom: 10px;">
              ${(o.items || []).map((i) => `${i.quantity}x ${i.name}`).join(", ")}
            </div>
            <div style="display:flex; justify-content:space-between; border-top: 1px solid var(--color-border); padding-top: 8px; font-weight:600;">
              <span>Total Paid</span>
              <span>${money(o.total)}</span>
            </div>
          </div>`
          )
          .join("");
      }
    } catch (e) {
      container.innerHTML = "<p>Unable to retrieve orders at this time.</p>";
    }
  }

  function closeOrdersDrawer() {
    $("ordersDrawer").classList.remove("open");
    checkAndHideOverlay();
  }

  // ==========================================
  // CHECKOUT & RAZORPAY PAYMENT FLOW
  // ==========================================
  function getSelectedCheckoutMethod() {
    const selected = document.querySelector('input[name="payMethod"]:checked');
    return selected ? selected.value : "UPI_QR";
  }

  function syncCheckoutPaymentMethodUI(totalOverride) {
    const method = getSelectedCheckoutMethod();
    const isUpi = method === "UPI_QR";
    const total = typeof totalOverride === "number" ? totalOverride : calculateCartTotals().total;

    const upiCard = $("optionUpiQrCard");
    const rzpCard = $("optionRazorpayCard");
    const qrPanel = $("upiQrPanel");
    const payBtn = $("payWithRazorpayBtn");

    if (upiCard) upiCard.classList.toggle("selected", isUpi);
    if (rzpCard) rzpCard.classList.toggle("selected", !isUpi);
    if (qrPanel) qrPanel.classList.toggle("hidden", !isUpi);

    if (payBtn && !payBtn.disabled) {
      payBtn.innerHTML = isUpi
        ? `CONFIRM UPI PAYMENT &amp; PLACE ORDER (<span id="payBtnAmount">${money(total)}</span>) <span>→</span>`
        : `PAY SECURELY WITH RAZORPAY (<span id="payBtnAmount">${money(total)}</span>) <span>→</span>`;
    }

    if (isUpi) {
      const upiId = getUpiId();
      const upiUri = buildUpiUri(total, "THREADLINE ATELIER Order");
      if ($("upiQrAmount")) $("upiQrAmount").textContent = money(total);
      if ($("upiQrIdText")) $("upiQrIdText").textContent = upiId;
      if ($("openUpiAppLink")) $("openUpiAppLink").href = upiUri;
      renderQrCodeInto($("checkoutUpiQrBox"), upiUri, 152);
    }
  }

  function openCheckoutModal() {
    if (CART.length === 0) return;
    closeCartDrawer();

    const { subtotal, discount, shipping, total } = calculateCartTotals();

    $("coSubtotal").textContent = money(subtotal);
    if (discount > 0) {
      $("coDiscountRow").classList.remove("hidden");
      $("coDiscount").textContent = `-${money(discount)}`;
    } else {
      $("coDiscountRow").classList.add("hidden");
    }
    $("coShipping").textContent = shipping === 0 ? "COMPLIMENTARY" : money(shipping);
    $("coTotal").textContent = money(total);
    if ($("payBtnAmount")) $("payBtnAmount").textContent = money(total);
    if ($("upiRefInput")) $("upiRefInput").value = "";

    $("checkoutItemsPreview").innerHTML = CART.map(
      (i) => `
      <div class="co-item-row">
        <img src="${i.image}" alt="${i.name}" onerror="this.src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';">
        <div class="co-item-info">
          <strong>${i.name}</strong>
          <span>Size: ${i.size} · Color: ${i.color} · Qty: ${i.quantity}</span>
        </div>
        <strong>${money(i.price * i.quantity)}</strong>
      </div>`
    ).join("");

    syncCheckoutPaymentMethodUI(total);

    $("globalOverlay").classList.remove("hidden");
    $("checkoutModal").classList.remove("hidden");

    // Automatically pre-fill shipping fields if client is logged in
    if (CURRENT_USER) {
      if ($("shipName") && !$("shipName").value) $("shipName").value = CURRENT_USER.name || "";
      if ($("shipEmail") && !$("shipEmail").value) $("shipEmail").value = CURRENT_USER.email || "";
      if ($("shipPhone") && !$("shipPhone").value) $("shipPhone").value = CURRENT_USER.phone || "";
    }
  }

  function closeCheckoutModal() {
    $("checkoutModal").classList.add("hidden");
    checkAndHideOverlay();
  }

  // ==========================================
  // CLIENT LOGIN & PROFILE MANAGEMENT
  // ==========================================
  function updateUserUI() {
    const label = $("userStatusLabel");
    if (!label) return;
    if (CURRENT_USER && CURRENT_USER.name) {
      const firstName = CURRENT_USER.name.split(" ")[0].toUpperCase();
      label.textContent = firstName;
      label.style.color = "var(--color-gold)";
    } else {
      label.textContent = "SIGN IN";
      label.style.color = "inherit";
    }
  }

  function openLoginModal() {
    closeCartDrawer();
    closeWishlistDrawer();
    closeOrdersDrawer();
    closeCheckoutModal();
    closeProfileModal();
    if (CURRENT_USER) {
      $("loginName").value = CURRENT_USER.name || "";
      $("loginEmail").value = CURRENT_USER.email || "";
      $("loginPhone").value = CURRENT_USER.phone || "";
    }
    $("globalOverlay").classList.remove("hidden");
    $("loginModal").classList.remove("hidden");
    setTimeout(() => $("loginName")?.focus(), 100);
  }

  function closeLoginModal() {
    $("loginModal").classList.add("hidden");
    checkAndHideOverlay();
  }

  function openProfileModal() {
    if (!CURRENT_USER) {
      openLoginModal();
      return;
    }
    $("profClientName").textContent = CURRENT_USER.name || "Distinguished Client";
    $("profClientEmail").textContent = CURRENT_USER.email || "—";
    $("profClientPhone").textContent = CURRENT_USER.phone || "—";

    closeCartDrawer();
    closeWishlistDrawer();
    closeOrdersDrawer();
    closeCheckoutModal();
    closeLoginModal();

    $("globalOverlay").classList.remove("hidden");
    $("profileModal").classList.remove("hidden");
  }

  function closeProfileModal() {
    $("profileModal").classList.add("hidden");
    checkAndHideOverlay();
  }

  async function handleCheckoutFormSubmit(e) {
    e.preventDefault();
    const paymentMethod = getSelectedCheckoutMethod();
    const isUpiQr = paymentMethod === "UPI_QR";
    const upiRef = $("upiRefInput") ? $("upiRefInput").value.trim() : "";

    const payBtn = $("payWithRazorpayBtn");
    payBtn.disabled = true;
    payBtn.innerHTML = isUpiQr
      ? "CONFIRMING UPI QR TRANSACTION... <span>✦</span>"
      : "CONTACTING RAZORPAY GATEWAY... <span>✦</span>";

    const form = e.target;
    const customer = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      pincode: form.pincode.value.trim(),
    };

    try {
      let orderData = null;
      try {
        const createRes = await fetch(`${API_BASE}/api/razorpay/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: CART,
            customer,
            promoCode: APPLIED_PROMO,
            paymentMethod,
          }),
        });
        if (createRes.ok) {
          orderData = await createRes.json();
        }
      } catch (err) {}

      // If backend not connected or on static server, create self-contained simulated order
      if (!orderData) {
        const { total, subtotal, discount, shipping } = calculateCartTotals();
        orderData = {
          success: true,
          orderId: "TL-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
          razorpayOrderId: (isUpiQr ? "upi_order_" : "sim_order_") + Math.random().toString(36).substring(2, 12),
          paymentMethod,
          upiId: getUpiId(),
          amount: total,
          amountInPaise: Math.round(total * 100),
          currency: "INR",
          keyId: "rzp_test_simulated_mode",
          isSimulated: !isUpiQr,
          customer,
          items: [...CART],
          subtotal,
          discount,
          shipping,
          total,
          createdAt: new Date().toISOString()
        };
      }

      if (isUpiQr) {
        await verifyPaymentOnServer(
          {
            orderId: orderData.orderId,
            paymentMethod: "UPI_QR",
            upiRef,
            razorpay_order_id: orderData.razorpayOrderId,
          },
          orderData
        );
        payBtn.disabled = false;
        syncCheckoutPaymentMethodUI();
        return;
      }

      if (CONFIG.isRazorpayConfigured && window.Razorpay) {
        const rzpOptions = {
          key: orderData.keyId,
          amount: orderData.amountInPaise,
          currency: orderData.currency,
          name: "THREADLINE ATELIER",
          description: `Order ${orderData.orderId} · Luxury Men's Collection`,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=200&q=80",
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone,
          },
          theme: { color: "#0d0d0d" },
          handler: async function (response) {
            await verifyPaymentOnServer({
              orderId: orderData.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, orderData);
          },
          modal: {
            ondismiss: function () {
              payBtn.disabled = false;
              syncCheckoutPaymentMethodUI(orderData.amount);
            },
          },
        };

        const rzp = new window.Razorpay(rzpOptions);
        rzp.on("payment.failed", function (resp) {
          alert("Payment could not be completed: " + (resp.error?.description || "Transaction cancelled."));
          payBtn.disabled = false;
          payBtn.innerHTML = `RETRY PAYMENT (${money(orderData.amount)}) <span>→</span>`;
        });
        rzp.open();

      } else {
        // Simulated Demonstration Flow
        payBtn.innerHTML = "VERIFYING SIMULATED TRANSACTION... <span>✦</span>";
        setTimeout(async () => {
          await verifyPaymentOnServer({
            orderId: orderData.orderId,
            razorpay_order_id: orderData.razorpayOrderId,
            razorpay_payment_id: "sim_pay_" + Math.random().toString(36).substring(2, 10),
            razorpay_signature: "simulated_valid_signature",
          }, orderData);
          payBtn.disabled = false;
          syncCheckoutPaymentMethodUI();
        }, 1200);
      }

    } catch (err) {
      alert("Checkout notice: " + err.message);
      payBtn.disabled = false;
      syncCheckoutPaymentMethodUI();
    }
  }

  async function verifyPaymentOnServer(payload, fallbackOrder) {
    try {
      let confirmedOrder = null;
      try {
        const verifyRes = await fetch(`${API_BASE}/api/razorpay/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (verifyRes.ok) {
          const verifyData = await verifyRes.json();
          confirmedOrder = verifyData.order;
        }
      } catch (e) {}

      if (!confirmedOrder) {
        const isUpiQr = payload.paymentMethod === "UPI_QR" || fallbackOrder.paymentMethod === "UPI_QR";
        const cleanRef = typeof payload.upiRef === "string" ? payload.upiRef.trim() : "";
        confirmedOrder = {
          ...fallbackOrder,
          status: "PAID",
          paymentDetails: isUpiQr
            ? {
                paymentId: cleanRef || "UPI-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
                utr: cleanRef || null,
                upiId: getUpiId(),
                verifiedAt: new Date().toISOString(),
                method: `UPI QR (${getUpiId()})`,
              }
            : {
                paymentId: payload.razorpay_payment_id || "sim_pay_" + Math.random().toString(36).substring(2, 10),
                verifiedAt: new Date().toISOString(),
                method: "Razorpay (Cards / UPI / NetBanking)",
              },
        };
      }

      saveOrderHistory(confirmedOrder);

      // Clear Bag
      CART = [];
      saveCart();
      updateCartUI();

      // Show Receipt
      closeCheckoutModal();
      showOrderReceipt(confirmedOrder);

    } catch (err) {
      alert("Payment Verification Error: " + err.message);
      const payBtn = $("payWithRazorpayBtn");
      if (payBtn) payBtn.disabled = false;
    }
  }

  function showOrderReceipt(order) {
    $("receiptOrderId").textContent = order.id;
    $("receiptDate").textContent = new Date(order.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    $("receiptTxnId").textContent = order.paymentDetails?.paymentId || order.razorpayOrderId;
    $("receiptClientName").textContent = order.customer.name;
    $("receiptClientContact").textContent = `${order.customer.email} · ${order.customer.phone}`;
    $("receiptClientAddress").textContent = `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;
    $("receiptTotalAmount").textContent = money(order.total);

    $("receiptItemsTable").innerHTML = (order.items || [])
      .map(
        (i) => `
      <div style="display:flex; justify-content:space-between; font-size: 0.85rem;">
        <span>${i.quantity}x ${i.name} (${i.size || "Standard"} / ${i.color || "Original"})</span>
        <strong>${money(i.price * i.quantity)}</strong>
      </div>`
      )
      .join("");

    $("globalOverlay").classList.remove("hidden");
    $("receiptModal").classList.remove("hidden");
  }

  // ==========================================
  // INFORMATIONAL MODALS
  // ==========================================
  function showInfoModal(title, contentHTML) {
    const content = $("infoModalContent");
    content.innerHTML = `
      <span class="section-eyebrow gold">THREADLINE ATELIER</span>
      <h2 style="font-size: 2rem; margin: 8px 0 20px;">${title}</h2>
      <div style="font-size: 0.9rem; line-height: 1.8; color: var(--color-stone);">
        ${contentHTML}
      </div>
    `;
    $("globalOverlay").classList.remove("hidden");
    $("infoModal").classList.remove("hidden");
  }

  // ==========================================
  // GLOBAL EVENT LISTENERS
  // ==========================================
  function bindGlobalEvents() {
    // Search toggle
    $("searchToggle").onclick = () => {
      $("searchOverlay").classList.remove("hidden");
      $("searchInput").focus();
    };
    $("searchClose").onclick = () => $("searchOverlay").classList.add("hidden");

    // Search input
    $("searchInput").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      const preview = $("searchResultsPreview");
      if (!q) {
        preview.innerHTML = "";
        return;
      }
      const matches = CATALOG.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ).slice(0, 6);

      if (matches.length === 0) {
        preview.innerHTML = "<p style='color: white;'>No bespoke creations match your search.</p>";
      } else {
        preview.innerHTML = matches.map(createProductCardHTML).join("");
      }
    });

    // Trending Search Tags
    document.querySelectorAll(".quick-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        $("searchInput").value = btn.dataset.search;
        $("searchInput").dispatchEvent(new Event("input"));
      });
    });

    // Mobile / Responsive Navigation Toggle
    $("menuToggle").onclick = () => {
      $("desktopNav").classList.toggle("show");
    };

    // Category Filter Pills
    document.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.category;
        renderMainGrid();
      });
    });

    // Nav Links with category triggers
    document.querySelectorAll("[data-cat-filter]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const cat = el.dataset.catFilter;
        activeCategory = cat;
        document.querySelectorAll(".filter-pill").forEach((p) => {
          if (p.dataset.category === cat) p.classList.add("active");
          else p.classList.remove("active");
        });
        renderMainGrid();
      });
    });

    // Price Band Filter
    $("priceRangeFilter").addEventListener("change", (e) => {
      activePriceBand = e.target.value;
      renderMainGrid();
    });

    // Sort Select
    $("sortSelect").addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderMainGrid();
    });

    // Reset Filters Button
    $("resetFiltersBtn").onclick = () => {
      activeCategory = "All";
      activePriceBand = "all";
      activeSort = "featured";
      $("priceRangeFilter").value = "all";
      $("sortSelect").value = "featured";
      document.querySelectorAll(".filter-pill").forEach((p) => {
        if (p.dataset.category === "All") p.classList.add("active");
        else p.classList.remove("active");
      });
      renderMainGrid();
    };

    // Global Click Delegation
    document.body.addEventListener("click", (e) => {
      const quickBtn = e.target.closest("[data-quick-id]");
      if (quickBtn) {
        e.preventDefault();
        openProductModal(quickBtn.dataset.quickId);
        return;
      }

      const wishBtn = e.target.closest("[data-wishlist-id]");
      if (wishBtn) {
        e.preventDefault();
        toggleWishlist(wishBtn.dataset.wishlistId);
        return;
      }

      const removeWish = e.target.closest("[data-remove-wishlist]");
      if (removeWish) {
        toggleWishlist(removeWish.dataset.removeWishlist);
        return;
      }

      const qtyBtn = e.target.closest("[data-cart-delta]");
      if (qtyBtn) {
        const id = Number(qtyBtn.dataset.id);
        const size = qtyBtn.dataset.size;
        const color = qtyBtn.dataset.color;
        const delta = Number(qtyBtn.dataset.cartDelta);

        const item = CART.find((i) => i.id === id && i.size === size && i.color === color);
        if (item) {
          item.quantity += delta;
          if (item.quantity <= 0) {
            CART = CART.filter((i) => i !== item);
          }
          saveCart();
          updateCartUI();
        }
        return;
      }

      const removeCart = e.target.closest("[data-remove-cart]");
      if (removeCart) {
        const id = Number(removeCart.dataset.removeCart);
        const size = removeCart.dataset.size;
        const color = removeCart.dataset.color;
        CART = CART.filter((i) => !(i.id === id && i.size === size && i.color === color));
        saveCart();
        updateCartUI();
        return;
      }
    });

    // Product Modal Color & Size Selector
    $("modalColorSwatches").addEventListener("click", (e) => {
      const btn = e.target.closest(".color-swatch-btn");
      if (!btn) return;
      document.querySelectorAll(".color-swatch-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      modalSelectedColor = { name: btn.dataset.colorName, hex: btn.dataset.colorHex };
      $("selectedColorName").textContent = modalSelectedColor.name;
    });

    $("modalSizePills").addEventListener("click", (e) => {
      const btn = e.target.closest(".size-pill-btn");
      if (!btn) return;
      document.querySelectorAll(".size-pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      modalSelectedSize = btn.dataset.sizeVal;
    });

    // Modal Qty Stepper
    $("modalQtyMinus").onclick = () => {
      modalSelectedQty = Math.max(1, modalSelectedQty - 1);
      $("modalQtyVal").textContent = modalSelectedQty;
    };
    $("modalQtyPlus").onclick = () => {
      modalSelectedQty = Math.min(10, modalSelectedQty + 1);
      $("modalQtyVal").textContent = modalSelectedQty;
    };

    // Modal Add to Bag
    $("modalAddToCartBtn").onclick = () => {
      if (!modalActiveProduct) return;
      addToBag(modalActiveProduct, modalSelectedSize, modalSelectedColor, modalSelectedQty);
      closeProductModal();
    };

    // Modal Wishlist toggle
    $("modalWishlistBtn").onclick = () => {
      if (!modalActiveProduct) return;
      toggleWishlist(modalActiveProduct.id);
      const isWish = WISHLIST.includes(modalActiveProduct.id);
      if (isWish) $("modalWishlistBtn").classList.add("active");
      else $("modalWishlistBtn").classList.remove("active");
    };

    // Modal Close Buttons
    $("productModalClose").onclick = closeProductModal;
    $("cartOpen").onclick = openCartDrawer;
    $("cartClose").onclick = closeCartDrawer;
    $("wishlistToggle").onclick = openWishlistDrawer;
    $("wishlistClose").onclick = closeWishlistDrawer;
    $("ordersToggle").onclick = openOrdersDrawer;
    $("ordersClose").onclick = closeOrdersDrawer;
    $("footerOrdersLink").onclick = (e) => {
      e.preventDefault();
      openOrdersDrawer();
    };

    // Client Login & Profile Triggers
    if ($("loginToggle")) {
      $("loginToggle").onclick = () => {
        if (CURRENT_USER) openProfileModal();
        else openLoginModal();
      };
    }
    if ($("loginModalClose")) $("loginModalClose").onclick = closeLoginModal;
    if ($("profileModalClose")) $("profileModalClose").onclick = closeProfileModal;

    // Quick Login Form
    if ($("quickLoginForm")) {
      $("quickLoginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("loginName").value.trim();
        const email = $("loginEmail").value.trim();
        const phone = $("loginPhone").value.trim();

        CURRENT_USER = { name, email, phone };
        localStorage.setItem("threadline_client_user", JSON.stringify(CURRENT_USER));
        localStorage.setItem("threadline_dismissed_login", "true");

        closeLoginModal();
        updateUserUI();
      });
    }

    if ($("continueGuestBtn")) {
      $("continueGuestBtn").onclick = () => {
        localStorage.setItem("threadline_dismissed_login", "true");
        closeLoginModal();
      };
    }

    if ($("profSignOutBtn")) {
      $("profSignOutBtn").onclick = () => {
        CURRENT_USER = null;
        localStorage.removeItem("threadline_client_user");
        closeProfileModal();
        updateUserUI();
      };
    }

    if ($("profViewOrdersBtn")) {
      $("profViewOrdersBtn").onclick = () => {
        closeProfileModal();
        openOrdersDrawer();
      };
    }

    // Global Overlay click - safely dismisses any active drawer or modal
    $("globalOverlay").onclick = () => {
      closeProductModal();
      closeCartDrawer();
      closeWishlistDrawer();
      closeOrdersDrawer();
      closeCheckoutModal();
      closeLoginModal();
      closeProfileModal();
      if (typeof closeVoiceModal === "function") closeVoiceModal();
      const memPayModal = $("membershipPaymentModal");
      if (memPayModal) memPayModal.classList.add("hidden");
      const memModal = $("membershipSuccessModal");
      if (memModal) memModal.classList.add("hidden");
      const infoModal = $("infoModal");
      if (infoModal) infoModal.classList.add("hidden");
      $("globalOverlay").classList.add("hidden");
    };

    // Checkout Payment Method Switching & Copy UPI ID
    document.querySelectorAll('input[name="payMethod"]').forEach((radio) => {
      radio.addEventListener("change", () => syncCheckoutPaymentMethodUI());
    });
    if ($("copyUpiIdBtn")) {
      $("copyUpiIdBtn").onclick = () => copyText(getUpiId(), "UPI ID");
    }

    // Apply Promo Code
    $("applyPromoBtn").onclick = () => {
      const code = $("promoCodeInput").value.trim().toUpperCase();
      const feedback = $("promoFeedback");
      if (code === "ATELIER10") {
        APPLIED_PROMO = "ATELIER10";
        localStorage.setItem("threadline_promo", "ATELIER10");
        feedback.style.color = "#176538";
        feedback.textContent = "✓ 10% Private Client Privilege Applied!";
        updateCartUI();
      } else {
        feedback.style.color = "#a34839";
        feedback.textContent = "✕ Invalid privilege code.";
      }
    };

    // Checkout Flow
    $("checkoutTriggerBtn").onclick = openCheckoutModal;
    $("checkoutClose").onclick = closeCheckoutModal;
    $("checkoutShippingForm").addEventListener("submit", handleCheckoutFormSubmit);

    // Receipt buttons
    $("receiptDoneBtn").onclick = () => {
      $("receiptModal").classList.add("hidden");
      $("globalOverlay").classList.add("hidden");
    };
    $("printReceiptBtn").onclick = () => {
      window.print();
    };

    // Newsletter Form
    $("newsletterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      $("newsletterSuccess").classList.remove("hidden");
      $("newsletterEmail").value = "";
    });

    // Informational Modals
    $("sizeGuideBtn").onclick = () => {
      showInfoModal(
        "Bespoke Sartorial Size Matrix",
        `
        <p><strong>SUITS & JACKETS (CHEST IN INCHES)</strong></p>
        <p>38R (38" - 40") · 40R (40" - 42") · 42R (42" - 44") · 44R (44" - 46")</p>
        <br>
        <p><strong>FOOTWEAR (EU TO UK / INDIA)</strong></p>
        <p>EU 40 (UK 6.5) · EU 41 (UK 7.5) · EU 42 (UK 8.5) · EU 43 (UK 9.5) · EU 44 (UK 10.5)</p>
        <br>
        <p>Need bespoke custom measurements? Our master tailors travel to Mumbai, Delhi, and Bangalore for private fittings.</p>
        `
      );
    };

    $("openConciergeModal").onclick = (e) => {
      e.preventDefault();
      showInfoModal(
        "Private Salon Fitting Appointment",
        `
        <p>Book a dedicated 90-minute private appointment with an Atelier master clothier at our Mumbai Flagship (The Palladium) or New Delhi Salon (DLF Emporio).</p>
        <p>Direct Concierge Line: <strong>+91 (0) 22 8900 4000</strong></p>
        <p>Email: <strong>concierge@threadlineatelier.com</strong></p>
        `
      );
    };

    $("openCareGuide").onclick = (e) => {
      e.preventDefault();
      showInfoModal(
        "Garment & Leather Preservation",
        `
        <p><strong>PURE CASHMERE & VIRGIN WOOL</strong>: Steam gently after wearing. Always rest garments 48 hours between wears on cedar hangers to let fibers recover natural loft.</p>
        <br>
        <p><strong>CALFSKIN & BOX CALF LEATHER</strong>: Nourish monthly with beeswax balm. Store wholecut oxfords with aromatic cedar shoe trees.</p>
        `
      );
    };

    $("openAuthModal").onclick = (e) => {
      e.preventDefault();
      showInfoModal(
        "Certificate of Authenticity",
        `
        <p>Every THREADLINE ATELIER piece is individually hand-registered into our ledger in Milan and Savile Row. Each garment features hand-numbered woven labels and serialized gold certificates guaranteeing provenance.</p>
        `
      );
    };

    $("openShippingModal").onclick = (e) => {
      e.preventDefault();
      showInfoModal(
        "White-Glove Insured Courier",
        `
        <p>Orders are dispatched in signature champagne gold rigid boxes lined with acid-free tissue paper. All shipments are fully insured against loss and damage during transit.</p>
        <p>Complimentary delivery on all orders exceeding ₹15,000.</p>
        `
      );
    };

    $("openReturnModal").onclick = (e) => {
      e.preventDefault();
      showInfoModal(
        "Complimentary Private Returns",
        `
        <p>We extend a 14-day return window on all unworn ready-to-wear creations. Our private courier will collect the package directly from your residence or office at no charge.</p>
        `
      );
    };

    $("infoModalClose").onclick = () => {
      $("infoModal").classList.add("hidden");
      if ($("productModal").classList.contains("hidden")) {
        $("globalOverlay").classList.add("hidden");
      }
    };
  }

  // Kickoff
  
  // ==========================================
  // ATELIER VOICE ASSISTANT (WEB SPEECH API)
  // ==========================================
  function initVoiceRecognition() {
    const voiceNavBtn = $("voiceNavBtn");
    const voiceOverlayBtn = $("voiceSearchOverlayBtn");
    const voiceModal = $("voiceModal");
    const voiceModalClose = $("voiceModalClose");
    const voiceStatusText = $("voiceStatusText");
    const voiceTranscriptText = $("voiceTranscriptText");
    const globalOverlay = $("globalOverlay");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isListening = false;

    if (SpeechRecognition) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onstart = () => {
          isListening = true;
          if (voiceNavBtn) voiceNavBtn.classList.add("listening");
          if (voiceStatusText) voiceStatusText.textContent = "Listening to your voice... Speak now";
          if (voiceTranscriptText) voiceTranscriptText.textContent = '"..."';
        };

        recognition.onresult = (event) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const spoken = (finalTranscript || interimTranscript).trim();
          if (voiceTranscriptText && spoken) {
            voiceTranscriptText.textContent = `"${spoken}"`;
          }

          if (finalTranscript) {
            processVoiceCommand(finalTranscript);
          }
        };

        recognition.onerror = (event) => {
          console.warn("Speech recognition error:", event.error);
          if (voiceStatusText) {
            voiceStatusText.textContent = `Notice: ${event.error}. You can also click the suggestions below.`;
          }
        };

        recognition.onend = () => {
          isListening = false;
          if (voiceNavBtn) voiceNavBtn.classList.remove("listening");
        };
      } catch (err) {
        console.warn("Speech recognition setup error:", err);
      }
    }

    function openVoiceModal() {
      if (voiceModal) voiceModal.classList.remove("hidden");
      if (globalOverlay) globalOverlay.classList.remove("hidden");
      if (recognition) {
        try {
          recognition.start();
        } catch (err) {
          // already running
        }
      } else {
        if (voiceStatusText) {
          voiceStatusText.textContent = "Web Speech API active. Speak or click any sample command below.";
        }
      }
    }

    function closeVoiceModal() {
      if (voiceModal) voiceModal.classList.add("hidden");
      checkAndHideOverlay();
      if (recognition && isListening) {
        try { recognition.stop(); } catch(e){}
      }
    }

    function processVoiceCommand(command) {
      const text = command.toLowerCase().trim();
      if (voiceStatusText) voiceStatusText.textContent = `Executing: "${command}"...`;

      // 1. Navigation Commands
      if (text.includes("cart") || text.includes("bag") || text.includes("basket")) {
        closeVoiceModal();
        setTimeout(() => {
          openCartDrawer();
          showNotification("Voice Command: Shopping Bag opened 🛍️");
        }, 180);
        return;
      }

      if (text.includes("checkout") || text.includes("pay") || text.includes("order")) {
        closeVoiceModal();
        setTimeout(() => {
          if (CART.length === 0) {
            openCartDrawer();
            showNotification("Your bag is empty. Explore our sartorial creations first!");
          } else {
            openCheckoutModal();
            showNotification("Voice Command: Checkout session opened 💳");
          }
        }, 180);
        return;
      }

      if (text.includes("membership") || text.includes("prive") || text.includes("vip") || text.includes("club") || text.includes("privilege")) {
        setTimeout(() => {
          closeVoiceModal();
          const memSec = document.getElementById("membership");
          if (memSec) {
            memSec.scrollIntoView({ behavior: "smooth" });
            showNotification("Voice Command: Navigated to Atelier Privé Membership 👑");
          }
        }, 500);
        return;
      }

      if (text.includes("login") || text.includes("sign in") || text.includes("account")) {
        setTimeout(() => {
          closeVoiceModal();
          openLoginModal();
          showNotification("Voice Command: Client Sign-In opened ✦");
        }, 500);
        return;
      }

      if (text.includes("reset") || text.includes("clear") || text.includes("show all") || text.includes("all products")) {
        closeVoiceModal();
        setTimeout(() => {
          activeCategory = "All";
          activeSearchQuery = "";
          const searchInput = $("searchInput");
          if (searchInput) searchInput.value = "";
          document.querySelectorAll(".filter-pill").forEach((p) => {
            if (p.dataset.category === "All") p.classList.add("active");
            else p.classList.remove("active");
          });
          renderMainGrid();
          const catalogSec = document.getElementById("featured");
          if (catalogSec) catalogSec.scrollIntoView({ behavior: "smooth" });
          showNotification("Voice Command: Filters reset, displaying all 32 creations ✦");
        }, 180);
        return;
      }

      // 2. Specific Category matches
      const catKeywords = {
        "suit": "Blazers and Suits",
        "tuxedo": "Blazers and Suits",
        "blazer": "Blazers and Suits",
        "jacket": "Jackets",
        "coat": "Jackets",
        "shirt": "Shirts",
        "knitwear": "Knitwear",
        "trouser": "Trousers",
        "pant": "Trousers",
        "denim": "Denim",
        "shoe": "Footwear",
        "boot": "Footwear",
        "oxford": "Footwear",
        "duffle": "Bags",
        "bag": "Bags",
        "leather": "Leather Goods",
        "watch": "Watches",
        "accessory": "Accessories",
        "tie": "Accessories"
      };

      let matchedCategory = null;
      for (const [kw, cat] of Object.entries(catKeywords)) {
        if (text.includes(kw)) {
          matchedCategory = cat;
          break;
        }
      }

      // 3. Search Query execution
      closeVoiceModal();
      setTimeout(() => {
        const cleanQuery = text.replace(/find|search for|search|show me|look for|open|go to/gi, "").trim() || text;
        activeSearchQuery = cleanQuery;
        const searchInput = $("searchInput");
        if (searchInput) searchInput.value = cleanQuery;

        if (matchedCategory) {
          activeCategory = matchedCategory;
          document.querySelectorAll(".filter-pill").forEach((p) => {
            if (p.dataset.category.toLowerCase() === matchedCategory.toLowerCase()) p.classList.add("active");
            else p.classList.remove("active");
          });
        }

        renderMainGrid();

        const catalogSec = document.getElementById("featured");
        if (catalogSec) catalogSec.scrollIntoView({ behavior: "smooth" });

        const matchesCount = $("mainProductGrid") ? $("mainProductGrid").children.length : 0;
        showNotification(`Voice Search: "${cleanQuery}" (${matchesCount} creation${matchesCount === 1 ? '' : 's'} found) 🎙️`);
      }, 200);
    }

    // Bind Buttons
    if (voiceNavBtn) voiceNavBtn.onclick = openVoiceModal;
    if (voiceOverlayBtn) voiceOverlayBtn.onclick = openVoiceModal;
    if (voiceModalClose) voiceModalClose.onclick = closeVoiceModal;

    // Hint Sample Pills
    document.querySelectorAll("[data-voice-sample]").forEach((btn) => {
      btn.onclick = () => {
        const sample = btn.getAttribute("data-voice-sample");
        if (voiceTranscriptText) voiceTranscriptText.textContent = `"${sample}"`;
        processVoiceCommand(sample);
      };
    });
  }

  // ==========================================
  // ATELIER PRIVÉ VIP MEMBERSHIP SYSTEM
  // ==========================================
  function initMembershipModule() {
    const membershipStorageKey = "threadline_membership";

    function getActiveMembership() {
      try {
        const saved = localStorage.getItem(membershipStorageKey);
        if (!saved) return null;
        const mem = JSON.parse(saved);
        return mem;
      } catch (e) {
        return null;
      }
    }

    function updateMembershipUI() {
      const mem = getActiveMembership();
      const activeBanner = $("activeMembershipBanner");
      const activeText = $("activeMembershipText");
      const vipLabel = $("profVipBadge");

      if (mem && mem.status === "ACTIVE") {
        if (activeBanner) activeBanner.classList.remove("hidden");
        if (activeText) {
          activeText.textContent = `ACTIVE ${mem.tierName.toUpperCase()} PATRON (${mem.discountPercent}% PRIVILEGE APPLIED TO ALL ORDERS)`;
        }
        if (vipLabel) {
          vipLabel.textContent = `${mem.tierName.toUpperCase()} PATRON`;
        }
      } else {
        if (activeBanner) activeBanner.classList.add("hidden");
      }
    }

    let pendingTier = null;

    function getSelectedMemMethod() {
      const sel = document.querySelector('input[name="memPayMethod"]:checked');
      return sel ? sel.value : "UPI_QR";
    }

    function syncMemPaymentMethodUI() {
      if (!pendingTier) return;
      const isUpi = getSelectedMemMethod() === "UPI_QR";
      if ($("memOptionUpiQrCard")) $("memOptionUpiQrCard").classList.toggle("selected", isUpi);
      if ($("memOptionRazorpayCard")) $("memOptionRazorpayCard").classList.toggle("selected", !isUpi);
      if ($("memUpiQrPanel")) $("memUpiQrPanel").classList.toggle("hidden", !isUpi);

      const confirmBtn = $("memConfirmPayBtn");
      if (confirmBtn && !confirmBtn.disabled) {
        confirmBtn.innerHTML = isUpi
          ? `CONFIRM UPI PAYMENT (${money(pendingTier.price)}) &amp; ACTIVATE <span>→</span>`
          : `PAY WITH RAZORPAY (${money(pendingTier.price)}) <span>→</span>`;
      }

      if (isUpi) {
        const upiId = getUpiId();
        const upiUri = buildUpiUri(pendingTier.price, `${pendingTier.tierName} Membership`);
        if ($("memPayAmount")) $("memPayAmount").textContent = money(pendingTier.price);
        if ($("memUpiIdText")) $("memUpiIdText").textContent = upiId;
        if ($("memOpenUpiAppLink")) $("memOpenUpiAppLink").href = upiUri;
        renderQrCodeInto($("memUpiQrBox"), upiUri, 152);
      }
    }

    function openMembershipPaymentModal(tierId, tierName, price) {
      pendingTier = { tierId, tierName, price };
      if ($("memPayTierName")) $("memPayTierName").textContent = tierName;
      if ($("memPayCustomerInfo")) {
        $("memPayCustomerInfo").textContent = `${CURRENT_USER.name || "Patron"} (${CURRENT_USER.email})`;
      }
      if ($("memUpiRefInput")) $("memUpiRefInput").value = "";
      if ($("memMethodUpiQr")) $("memMethodUpiQr").checked = true;
      syncMemPaymentMethodUI();
      $("globalOverlay").classList.remove("hidden");
      $("membershipPaymentModal").classList.remove("hidden");
    }

    function closeMembershipPaymentModal() {
      if ($("membershipPaymentModal")) $("membershipPaymentModal").classList.add("hidden");
      checkAndHideOverlay();
    }

    document.querySelectorAll('input[name="memPayMethod"]').forEach((radio) => {
      radio.addEventListener("change", syncMemPaymentMethodUI);
    });
    if ($("memCopyUpiIdBtn")) {
      $("memCopyUpiIdBtn").onclick = () => copyText(getUpiId(), "UPI ID");
    }
    if ($("membershipPayModalClose")) {
      $("membershipPayModalClose").onclick = closeMembershipPaymentModal;
    }

    // Handle Join Buttons -> Open Membership Payment Modal (UPI QR & Razorpay)
    document.querySelectorAll(".join-tier-btn").forEach((btn) => {
      btn.onclick = () => {
        const tierId = btn.getAttribute("data-tier-id");
        const tierName = btn.getAttribute("data-tier-name");
        const price = Number(btn.getAttribute("data-price"));

        // Ensure customer details are available
        if (!CURRENT_USER || !CURRENT_USER.email) {
          showNotification("Please introduce yourself to enroll in Atelier Privé.");
          openLoginModal();
          return;
        }

        openMembershipPaymentModal(tierId, tierName, price);
      };
    });

    if ($("memConfirmPayBtn")) {
      $("memConfirmPayBtn").onclick = async () => {
        if (!pendingTier || !CURRENT_USER) return;
        const { tierId, tierName } = pendingTier;
        const paymentMethod = getSelectedMemMethod();
        const isUpiQr = paymentMethod === "UPI_QR";
        const upiRef = $("memUpiRefInput") ? $("memUpiRefInput").value.trim() : "";

        const confirmBtn = $("memConfirmPayBtn");
        confirmBtn.disabled = true;
        confirmBtn.textContent = isUpiQr ? "VERIFYING UPI PAYMENT..." : "INITIALIZING SECURE GATEWAY...";

        try {
          const orderRes = await fetch(`${API_BASE}/api/membership/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tierId,
              paymentMethod,
              customer: {
                name: CURRENT_USER.name || "Distinguished Patron",
                email: CURRENT_USER.email,
                phone: CURRENT_USER.phone || "+91 98765 43210",
              },
            }),
          });

          if (!orderRes.ok) {
            const err = await orderRes.json();
            throw new Error(err.error || "Failed to create membership order.");
          }

          const orderData = await orderRes.json();

          if (isUpiQr) {
            await verifyMembershipPayment(
              orderData.membershipOrderId,
              {
                paymentMethod: "UPI_QR",
                upiRef,
                razorpay_order_id: orderData.razorpayOrderId,
              },
              tierName
            );
            closeMembershipPaymentModal();
          } else if (window.Razorpay && !orderData.isSimulated && CONFIG.isRazorpayConfigured) {
            const rzpOptions = {
              key: orderData.keyId,
              amount: orderData.amountInPaise,
              currency: orderData.currency,
              name: "THREADLINE ATELIER",
              description: `${tierName} — Annual Sartorial Privilege`,
              order_id: orderData.razorpayOrderId,
              prefill: {
                name: CURRENT_USER.name,
                email: CURRENT_USER.email,
                contact: CURRENT_USER.phone,
              },
              theme: { color: "#c8a97e" },
              handler: async function (response) {
                await verifyMembershipPayment(orderData.membershipOrderId, response, tierName);
                closeMembershipPaymentModal();
              },
            };

            const rzp = new window.Razorpay(rzpOptions);
            rzp.open();
          } else {
            showNotification("Invoking Secure Razorpay Sandbox Gateway...");
            setTimeout(async () => {
              const simulatedResponse = {
                razorpay_order_id: orderData.razorpayOrderId,
                razorpay_payment_id: "sim_pay_vip_" + Date.now(),
                razorpay_signature: "sim_sig_verified",
              };
              await verifyMembershipPayment(orderData.membershipOrderId, simulatedResponse, tierName);
              closeMembershipPaymentModal();
            }, 1200);
          }
        } catch (err) {
          alert("Membership Enrollment: " + err.message);
        } finally {
          confirmBtn.disabled = false;
          syncMemPaymentMethodUI();
        }
      };
    }

    async function verifyMembershipPayment(membershipOrderId, paymentResponse, tierName) {
      try {
        const verifyRes = await fetch(`${API_BASE}/api/membership/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            membershipOrderId,
            paymentMethod: paymentResponse.paymentMethod || "RAZORPAY",
            upiRef: paymentResponse.upiRef || "",
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) {
          throw new Error(verifyData.error || "Verification failed.");
        }

        // Save to localStorage
        localStorage.setItem(membershipStorageKey, JSON.stringify(verifyData.membership));
        updateMembershipUI();
        updateCartUI(); // Update cart with new VIP discount

        // Open Certificate Modal
        const modal = $("membershipSuccessModal");
        if (modal) {
          $("certPatronName").textContent = verifyData.membership.customer.name || "Distinguished Patron";
          $("certTierBadge").textContent = verifyData.membership.tierName.toUpperCase();
          $("certDiscountVal").textContent = `${verifyData.membership.discountPercent}% Off All Creations`;
          $("certMemberId").textContent = verifyData.membership.id;
          modal.classList.remove("hidden");
          $("globalOverlay").classList.remove("hidden");
        }

        showNotification(`✦ Welcome to L'Atelier Privé: ${tierName} Activated! 👑`);
      } catch (err) {
        alert("Verification Error: " + err.message);
      }
    }

    // Certificate Modal close & start shopping button
    const modalClose = $("membershipModalClose");
    const startShopping = $("startVipShoppingBtn");
    if (modalClose) {
      modalClose.onclick = () => {
        $("membershipSuccessModal").classList.add("hidden");
        $("globalOverlay").classList.add("hidden");
      };
    }
    if (startShopping) {
      startShopping.onclick = () => {
        $("membershipSuccessModal").classList.add("hidden");
        $("globalOverlay").classList.add("hidden");
        const catalog = document.getElementById("featured");
        if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
      };
    }

    // Initial check
    updateMembershipUI();
  }

  
  // Global Aliases for Window / Voice Access
  window.openCart = openCartDrawer;
  window.closeCart = closeCartDrawer;
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.openCheckout = openCheckoutModal;
  window.closeCheckout = closeCheckoutModal;
  window.showNotification = showNotification;

  document.addEventListener("DOMContentLoaded", initApp);
})();
