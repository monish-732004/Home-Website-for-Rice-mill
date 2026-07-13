# Sri Kannika Parameswari Modern Rice Mill Website

A premium web presence for **Sri Kannika Parameswari Modern Rice Mill** (Kallakurichi, Tamil Nadu). This application is built as a highly responsive Single Page Application (SPA) utilizing React, TypeScript, Tailwind CSS v4, and Motion.

---

##  Features Implemented

The platform is designed to provide high visual appeal, modern animations, real-time database integrations, and essential visibility tools:

1. **Modern Premium Design & Calligraphy Accents**: Beautiful layout built using a curated HSL emerald-gold color scheme, Google Fonts integration (Playfair Display & Inter), custom responsive galleries, and elegant micro-animations.
2. **Product Showcase & Interactive Catalog**: Shows detailed specifications for premium aged Ponni and Rajapogam Kichadi Ponni rice. Includes interactive cooking instructions modals.
3. **Supabase Real-Time Backend & Authentication**: All customer queries, dealer requests, and helpdesk messages are stored directly in a live cloud database. Administrative access is protected by Supabase GoTrue Auth.
4. **Three-Way Administrative Dashboard**: Secure admin area that allows log-in, monitoring, status modifications, registry filtering, and exporting CSV records for:
   - Dealer Registrations (B2B Onboarding)
   - General Inbox Queries
   - B2B Partner Helpdesk Messages
5. **No-Default-Mock-Data Policy**: The console loads and displays only real database entries, eliminating default placeholder rows for cleaner operations.

---

## 📈 Agreement Scope Fulfillment (Tasks 4 & 8)

Below is an overview of how we satisfied the requirements outlined in the technology service agreement:

### 1. Task 4: Business Communication & Online Visibility Package
We integrated essential communication, search, and visibility components to boost local conversion rates and shares:
*   **WhatsApp Business Integration**: Implemented a floating WhatsApp widget (`WhatsAppFloat.tsx`) featuring pulsing animations and hover tooltips. It opens a redirect to the mill's number (`9944360308`) with a pre-filled template message.
*   **Google Maps Integration**: Replaced static coordinates placeholders in `ContactSection.tsx` with a live, responsive Google Maps `<iframe>` pin pointing directly to the mill's address in Thachur.
*   **Basic SEO Setup**: Configured `index.html` with target keywords, descriptions, Open Graph meta-tags (for WhatsApp/Facebook rich card link previews), Twitter Cards, and preconnect tags for optimized resource loading.
*   **Mobile Optimization**: Created `MobileActionBar.tsx`—a sticky bottom toolbar rendered exclusively on screen widths under 640px. It provides touch-friendly shortcuts for direct Call, WhatsApp, Location Map, and Email.
*   **Social Media Integration**: Integrated a row of custom social sharing buttons (Facebook, Instagram, LinkedIn, YouTube, and WhatsApp) with premium transition effects in the footer.

### 2. Task 8: Dealer & Distributor Portal
We built a comprehensive, end-to-end B2B partner gateway to streamline dealer acquisitions:
*   **Dealer Onboarding Registration Form**: Built a detailed validator form in `EnquiryForm.tsx` that captures registered firm names, GSTIN, city, state, expected volumes, product choices, and notes, writing them to the `dealers` table.
*   **Dealer Helpdesk Message Form**: Placed a dedicated helpdesk inquiry input in `DealerPortalSection.tsx` targeting the `dealer_messages` table to route partner concerns directly.
*   **Real-time Admin Console Monitoring**: Expanded `AdminDashboard.tsx` to include three-way navigation tabs allowing administrators to change application statuses (Pending, Review, Approved, Rejected) and read/delete submissions.
*   **CSV Registry Exporter**: Fully automated the CSV export function. Dates are formatted as `YYYY-MM-DD HH:MM` strings to prevent spreadsheet render issues (`######`).

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase variables:
```bash
cp .env.example .env
```

### 3. Database & Auth Setup
Follow the complete step-by-step SQL scripts, RLS policies, table grants, and admin account setup guide in [SUPABASE_SETUP.md]().

### 4. Local Development
Start the local server on port 3000:
```bash
npm run dev
```

### 5. Build for Production
Build static production assets:
```bash
npm run build
```
