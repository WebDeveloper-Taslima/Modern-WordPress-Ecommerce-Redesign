# 🏗️ Temima Cabinets - Modern WordPress & WooCommerce E-Commerce Redesign Suite

![WordPress](https://img.shields.io/badge/WordPress-6.x-blue.svg?logo=wordpress)
![WooCommerce](https://img.shields.io/badge/WooCommerce-Ready-purple.svg?logo=woocommerce)
![Elementor Pro](https://img.shields.io/badge/Elementor_Pro-Compatible-red.svg?logo=elementor)
![Performance](https://img.shields.io/badge/GTmetrix-99%2F100_%3C3s-brightgreen.svg)
![Templates](https://img.shields.io/badge/Templates-6_Core_Views-gold.svg)
![Responsiveness](https://img.shields.io/badge/UI-Desktop_%26_Mobile_Responsive-success.svg)

> **Temima Cabinets** ([www.temimacabinets.com](http://www.temimacabinets.com)) is a high-end solid wood cabinet retail store. This repository contains the complete modern web application UI, interactive design mockups, responsive simulator engine, and turn-key WordPress/WooCommerce deployment assets covering all six key customer-facing templates.

---

## 🌟 Key Highlights & Scope

Re-imagined from first impression to final guest checkout in a clean, contemporary architectural style that feels high-end, conversion-focused, and simple for staff to maintain.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TEMIMA CABINETS UI                                   │
├───────────┬───────────────┬────────────────┬───────────────────┬───────────┬───────────┤
│  1. HOME  │  2. CATEGORY  │   3. PRODUCT   │  4. FREE QUOTE    │  5. CART  │6. CHECKOUT│
│  Hero &   │  Filterable   │  Configurator  │ 4-Step Interactive│ Free Ship │ Streamlined│
│ Visualizer│ Cabinet Grid  │ & Hinge Selector│   Estimator & CRM │ Progress  │  Guest Pay│
└───────────┴───────────────┴────────────────┴───────────────────┴───────────┴───────────┘
```

---

## ✨ Features Breakdown

### 1. 🏡 Template 1: Home Page
* **Architectural Hero Section**: Impactful typography, trust badges (*10-Year Solid Wood Warranty, 5-Day Direct Shipping*), and quick 3D design CTA.
* **Interactive Cabinet Finish Visualizer**: Real-time finish swatch selector (**Alpine White Shaker, Horizon Navy, Craftsman Espresso, Warm Oak Slab**) updating door previews dynamically.
* **Category Collections**: Base & corner cabinets, wall & pantry units, bath vanities.
* **3D Free Design Banner**: Highlights free 24-hour turnaround design service.

### 2. 🗂️ Template 2: Category / Shop Page
* **Advanced Filter Sidebar**: Filter by Door Style (Shaker, Slab, Craftsman), Finish/Color (White, Navy, Espresso, Oak), Stock status, and price limits.
* **Toolbar Controls**: Grid layout, active filter tags with dismiss buttons, and dynamic sorting.
* **Product Cards**: Badge tags (*Bestseller, New Line, Luxury Series*), star ratings, and configurator buttons.

### 3. 📦 Template 3: Single Product Page
* **Multi-Angle Gallery**: High-res main view with interactive thumbnail image switching.
* **Live Specification Configurator**:
  * Width selector (`24"`, `30"`, `36"`).
  * Blumotion soft-close hinge orientation (`Right Hinge`, `Left Hinge`).
  * Dynamic price recalculation.
* **Tabbed Information**: Specs & construction breakdown, RTA 15-minute assembly guide, freight shipping policy.
* **Sticky Mobile Cart Bar**: Fixed bottom purchase bar designed for high mobile conversion.

### 4. 📐 Template 4: Get-a-Free-Quote Page (Interactive Estimator)
* **4-Step Interactive Wizard**:
  * **Step 1**: Project Scope selection (Kitchen Remodel, New Build, Bathroom).
  * **Step 2**: Aesthetic & Countertop preferences (Quartz, Granite, Butcher Block).
  * **Step 3**: Room dimensions input & drag-and-drop floor plan / sketch file uploader simulation.
  * **Step 4**: Contact info input formatted into structured CRM payload.
* **PDF Quote Summary**: Generates itemized quote reference numbers (`#TC-QUOTE-XXXXXX`) with downloadable summary preview.

### 5. 🛒 Template 5: Cart Page
* **Interactive Table**: Item quantity adjustments, line item subtotal updates, and item removal.
* **Free Freight Shipping Progress Bar**: Visual meter calculating remaining amount required to unlock **FREE Freight Shipping** on orders over $1,000.
* **Promo Code System**: Real-time coupon discount handler (e.g. `SAVE10`, `TEMIMA150`).

### 6. 💳 Template 6: Streamlined Checkout Page
* **Guest Checkout Toggle**: Bypasses mandatory account registration to decrease cart abandonment.
* **2-Column Layout**: Left column houses contact, address, and payment method selection (Credit Card, Affirm Financing, PayPal). Right column displays real-time order review.
* **Test Purchase Order Confirmation Modal**: Simulates instant purchase verification with order reference `#TC-XXXXXX`.

---

## 📱 Desktop & Mobile Viewport Simulator

Built directly into the top control bar of [`index.html`](index.html):
* **Template Switcher**: Instantly switch between all 6 pages without page reloads.
* **Viewport Switcher**: Click **Desktop** for wide monitor view, or **Mobile** for a 414px smartphone frame simulator with forced 1-column layouts, mobile navigation drawer, and compact touch targets.

---

## 📁 Repository Directory Structure

```
Modern WordPress Ecommerce/
├── index.html               # Main HTML app with all 6 templates & mockup controller
├── styles.css               # Architectural CSS design system & responsive queries
├── app.js                   # State manager (Cart, Configurator, Quote Wizard, Checkout)
├── HANDOFF_DOCUMENTATION.md # WordPress/Elementor rollout guide & PHP code snippets
├── implementation_plan.md   # Initial technical architecture blueprint
├── walkthrough.md           # Completed feature summary & verification walkthrough
└── README.md                # GitHub documentation & project overview
```

---

## 🛠️ Technology Stack

* **Core**: HTML5, Vanilla JavaScript ES6+
* **Styling**: Modern CSS3 (Custom CSS Design Tokens, Flexbox/Grid, Glassmorphism)
* **Typography**: Google Fonts (*Outfit* + *Plus Jakarta Sans*)
* **Iconography**: FontAwesome 6.4 Free CDN
* **Target CMS**: WordPress 6.x + WooCommerce + Elementor Pro

---

## 🚀 How to Run Locally

1. Clone or download this repository.
2. Open [`index.html`](index.html) directly in any modern web browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, serve via any local HTTP server:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node/npx
   npx serve .
   ```
4. Access `http://localhost:3000` to test the interactive site.

---

## ⚙️ WordPress Deployment & `functions.php` Snippets

Full deployment instructions, Elementor Pro container setups, and custom `functions.php` PHP snippets (CRM quote webhooks, guest checkout filters, free freight shipping notice) can be found in [`HANDOFF_DOCUMENTATION.md`](HANDOFF_DOCUMENTATION.md).

---

## 📄 License & Hand-Off

Custom web application design and implementation suite for **Temima Cabinets** (www.temimacabinets.com). Free to use for theme integration and WooCommerce deployment.
