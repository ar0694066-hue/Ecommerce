# THREADLINE ATELIER — Luxury Men's Fashion E-Commerce

Haute Tailoring & Ready-to-Wear luxury men's e-commerce experience inspired by Gucci and Louis Vuitton editorial aesthetics, integrated with the **Razorpay India** payment gateway.

---

## 1. Key Features

- **Editorial Luxury Design**: Deep black, ivory white, champagne gold, and warm beige palette with Playfair Display and Montserrat typography.
- **Pure Men's Fashion Catalog**: 32 handcrafted sartorial creations across 14 categories (Suits, Blazers, Cashmere Coats, Sea Island Shirts, Kurabo Selvedge Denim, Wholecut Oxford Shoes, Haute Horlogerie Watches, Tuscan Leather Goods, and Rare Fragrances). Zero female models, zero trademark violations.
- **Interactive E-Commerce Suite**:
  - Live search overlay with instant keyword results and trending tags.
  - Multi-criteria filtering by category, price bands (Under ₹25k to ₹100k+), and sorting (Price, Rating, Newest).
  - Quick View modal with interactive color swatches, size matrices, stock urgency indicators, and quantity steppers.
  - Wishlist drawer with one-click "Move to Bag" and local persistence.
  - Shopping Bag drawer with free shipping calculation (free over ₹15,000) and privilege discount code (`ATELIER10`).
  - Secure Checkout with full recipient address validation.
  - Printable Luxury Order Confirmation Receipt with unique reference codes (`TL-XXXX`).
  - Persistent Order History record.
- **Razorpay India Gateway**:
  - Supports UPI, UPI QR, Credit Cards, Debit Cards, NetBanking (50+ banks), and Wallets.
  - Server-side cryptographic HMAC-SHA256 signature verification.
  - Automated simulation mode when API keys are pending, allowing full end-to-end checkout testing.

---

## 2. Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:

```env
# Razorpay Credentials (Get your test keys from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

PORT=3000
NODE_ENV=development
```

> **Note on Razorpay Mode**:
> If you run the server with placeholder keys or without keys, the store automatically runs in **Razorpay Demo Simulation Mode**, allowing you to test the complete order creation, cart clearance, signature verification, and luxury receipt generation flows immediately. Once you enter your real `rzp_test_...` credentials, the native Razorpay modal popup will activate automatically.

### Step 3: Start the Server
```bash
npm start
```
Open **http://localhost:3000** in your browser.
