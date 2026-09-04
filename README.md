<<<<<<< HEAD
# Farm2Fair — AI-Powered Agricultural Supply Chain Assistant
> **Smart India Hackathon 2026 Prototype**
> *Theme: Smart Agriculture & Efficient Supply Chains*

[![Python](https://img.shields.io/badge/Backend-Python%20Flask-blue.svg)](https://palletsprojects.com/p/flask/)
[![Database](https://img.shields.io/badge/Database-SQLite3-green.svg)](https://sqlite.org/)
[![Frontend](https://img.shields.io/badge/Frontend-Modular%20HTML5%20%2F%20CSS3%20%2F%20ES6+-emerald.svg)]()
[![Status](https://img.shields.io/badge/Status-Fully%20Integrated%20Full--Stack-success.svg)]()

---

## 🌾 Project Vision & Problem Statement

In the traditional agricultural supply chain, produce changes hands 5 to 7 times (Farmer → Village Trader → Commission Agent → Wholesaler → Distributor → Retailer → Consumer). This creates:
- **18% - 25% post-harvest handling wastage**
- **Severe price information asymmetry for smallholders**
- **Distress sales and unpredictable returns**
- **Inflated retail prices for consumers**

### Our Distinction:
> **Farm2Fair does NOT claim to eliminate all intermediaries.** Farmers still require essential services such as rural transportation, aggregation, and quality checks. 
> 
> Farm2Fair **eliminates avoidable inefficiencies and predatory margins** through **AI Fair-Price Corridors**, **Smart Buyer Matching**, **Group Transportation Pooling**, and **End-to-End Price Transparency**.

---

## ⚡ Key Modules & Capabilities

1. **AI Fair-Price Prediction Engine**:
   - Multi-factor regression estimating dynamic price corridors (`₹28 - ₹34/kg`) based on APMC wholesale arrivals, seasonal festivity indices (+12%), quality grade premiums (+8%), and transport fuel costs.
   - Interactive SVG price trajectory chart showing past 14-day trends and 7-day predictive forward forecasts.

2. **Smart Buyer Matching**:
   - Multi-attribute compatibility scoring ranking commercial buyers (supermarket chains, cloud kitchens, food processors) based on proximity, required volume, and fair-price tolerance.

3. **Group Transportation (Shared Agri-Logistics)**:
   - Highway corridor pooling (e.g. NH-75 Kolar → Bengaluru) combining partial shipments from neighbouring farmers into shared vehicles, reducing freight costs by **up to 38%**.
   - Vector route schematic with interactive route optimization.

4. **Price Transparency & Cost Disaggregation**:
   - Itemized rupee breakdown: **Farmer Share (82.3%) + Shared Logistics + Packaging/Crates + Platform Fee = Final Consumer Price**.
   - Complete visibility into where every rupee goes.

5. **Smart Storage Advisor ("Sell Now or Store?")**:
   - Holding cost decision engine balancing cold storage rental tariffs against expected seasonal price surges (+18%) and spoilage risks.

6. **Unsold Crop Rescue**:
   - Emergency zero-waste routing diverting surplus and near-expiry produce to food processors, community kitchens, livestock feed, and organic composting networks.

7. **Farmer Voice Assistant & Multilingual Support**:
   - Integrated Web Speech API microphone listener with NLP parsing heuristics (e.g., *"I have 500 kg tomatoes to sell in Kolar"*).
   - Language switcher supporting **English**, **తెలుగు (Telugu)**, **हिन्दी (Hindi)**, **தமிழ் (Tamil)**, and **ಕನ್ನಡ (Kannada)**.

8. **SIH 2026 Judge Walkthrough Demo**:
   - Dedicated 8-step interactive guided presentation mode taking evaluators through the complete platform lifecycle in under 90 seconds (with **Step-by-Step** or **Auto-Play Pitch Mode**).

9. **Role Switcher**:
   - Instant header switching between **Farmer**, **Buyer**, **Consumer**, and **Admin** perspectives without re-logging in.

---

## 🛠️ Technology Stack & Architecture

- **Backend**: Python 3.14 + Flask 3.1 + Flask-CORS
- **Database**: Persistent SQLite3 (`backend/farm2fair.db`)
- **Frontend**: Responsive Single Page Application (HTML5, Modern CSS Design System, Modular ES6+ JavaScript)
- **APIs**: RESTful architecture (`/api/auth`, `/api/crops`, `/api/predictions`, `/api/buyers`, `/api/transport`, `/api/orders`, etc.)
- **AI Modules**: Multi-factor regression formula, buyer matching algorithm, Dijkstra corridor clustering, and storage ROI model.

---

## 🚀 How to Run the Unified Server

Run the single unified full-stack server with Python:

```bash
py server.py
```

Then open your browser and navigate to:
```
http://localhost:5000
```

Both the frontend user interface and backend REST APIs run seamlessly together on port `5000`.

---

## 📁 Repository Directory Structure

```
farmerweb/
├── backend/
│   ├── ai_engine.py       # AI regression, buyer matcher & storage ROI models
│   ├── db.py              # SQLite schema, tables, and seed data manager
│   └── farm2fair.db       # Persistent SQLite database file
├── css/
│   └── styles.css         # Modern Agri-Tech design system & utility classes
├── js/
│   ├── app.js             # Master SPA orchestrator, router & state manager
│   ├── components/
│   │   ├── authModal.js             # Authentication & role switcher modal
│   │   ├── judgeDemoModal.js        # SIH 2026 8-step interactive walkthrough
│   │   └── voiceAssistantModal.js   # Voice input assistant (Web Speech API)
│   ├── services/
│   │   ├── api.js         # Central asynchronous REST client with fallback
│   │   ├── i18n.js        # Multilingual translations (EN, TE, HI, TA, KN)
│   │   └── mockDb.js      # Baseline seed dataset
│   └── views/
│       ├── aboutView.js             # Mission, architecture & SIH background
│       ├── adminDashboardView.js    # Platform telemetry & activity radar
│       ├── aiPriceView.js           # AI Fair-Price prediction workbench
│       ├── buyerDashboardView.js    # B2B buyer procurement catalog
│       ├── consumerMarketplaceView.js # Consumer farm-direct market
│       ├── demandInsightsView.js    # Demand forecasting charts
│       ├── farmerDashboardView.js   # Farmer dashboard & crop listing
│       ├── groupLogisticsView.js    # Shared transit route optimization
│       ├── landingView.js           # Hero & supply chain problem comparison
│       ├── marketplaceView.js       # F2B categorized marketplace
│       ├── priceTransparencyView.js # Itemized price breakdown flow
│       ├── smartMatchingView.js     # Ranked buyer recommendations
│       ├── smartStorageView.js      # "Sell Now or Store?" advisor
│       └── unsoldCropRescueView.js  # Zero-waste surplus rescue
├── index.html             # Main single-page application entry point
├── server.py              # Unified Flask backend & static file server
└── README.md              # Project documentation
```

---

## 👥 Hackathon Presentation Tips
1. **First 30 Seconds**: Show the Hero Section on the Landing Page and click **"⚡ Launch Judge Walkthrough Demo"**.
2. **Interactive Proof**: List a new crop on the **Farmer Dashboard**, demonstrate the **AI Fair-Price calculation**, and show how the crop instantly appears in the **Buyer Dashboard** directly from the SQLite database.
3. **Logistics Value**: Demonstrate the **Group Transportation** module showing how pooling nearby farmers on NH-75 cuts freight costs by **38%**.
4. **Transparency**: Navigate to **Price Transparency** to show the exact breakdown of the consumer rupee.
=======
# farmerweb
>>>>>>> 787fc2b417bc686f7526d2002ce1745d5ff3f3ab
