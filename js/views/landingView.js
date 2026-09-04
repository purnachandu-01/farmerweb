/**
 * Farm2Fair — Landing Page View
 * Smart India Hackathon 2026
 */

export function renderLandingView(app) {
  const t = app.t.bind(app);

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-grid">
        <div>
          <div class="hero-tag">
            <span>🌾 Smart India Hackathon 2026 Prototype</span>
            <span style="opacity:0.6">•</span>
            <span style="color:var(--primary-700); font-weight:800;">Theme: Smart Agriculture</span>
          </div>

          <h1 class="hero-title">
            From Farm to <span>Fair Price</span>.
          </h1>

          <p class="hero-subtitle">
            ${t('heroSubtitle')}
          </p>

          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" id="hero-sell-crop-btn">
              👨‍🌾 ${t('sellCrop')}
            </button>
            <button class="btn btn-secondary btn-lg" id="hero-find-products-btn">
              🏢 ${t('findProducts')}
            </button>
            <button class="btn btn-amber btn-lg" id="hero-launch-demo-btn" style="box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);">
              ⚡ ${t('launchDemo')}
            </button>
          </div>

          <div class="trust-statement">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary-600); flex-shrink:0;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span><strong>Trust Principle:</strong> ${t('trustStatement')}</span>
          </div>
        </div>

        <!-- Hero Supply Chain Architecture Card -->
        <div>
          <div class="supply-flow-hero">
            <div class="flow-title">Transparent 4-Node Value Chain</div>

            <div class="chain-steps">
              <div class="chain-node">
                <div class="chain-icon-circle">👨‍🌾</div>
                <div class="chain-node-name">Farmer</div>
                <div class="chain-node-role">Direct Producer</div>
              </div>

              <div class="chain-connector active"></div>

              <div class="chain-node f2f">
                <div class="chain-icon-circle">⚡</div>
                <div class="chain-node-name" style="color:var(--primary-700); font-weight:800;">Farm2Fair</div>
                <div class="chain-node-role" style="color:var(--primary-800); font-weight:600;">AI Engine & Logistics</div>
              </div>

              <div class="chain-connector active"></div>

              <div class="chain-node">
                <div class="chain-icon-circle">🏢</div>
                <div class="chain-node-name">Buyer / B2B</div>
                <div class="chain-node-role">Retailer & Kitchen</div>
              </div>

              <div class="chain-connector active"></div>

              <div class="chain-node">
                <div class="chain-icon-circle">🛒</div>
                <div class="chain-node-name">Consumer</div>
                <div class="chain-node-role">Transparent Price</div>
              </div>
            </div>

            <!-- Mini Live Interactive Metric Widget inside Hero -->
            <div style="margin-top:24px; padding:14px; background:var(--slate-50); border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Live Prototype Metric</small>
                <div style="font-weight:800; font-size:1.1rem; color:var(--primary-700);">+33% Farmer Earnings</div>
              </div>
              <div style="text-align:right;">
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Logistics Efficiency</small>
                <div style="font-weight:800; font-size:1.1rem; color:var(--tech-600);">-38% Transport Cost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Section: Traditional Supply Chain vs Farm2Fair -->
    <section class="problem-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">The Structural Challenge</span>
          <h2 class="section-title">Why the Agricultural Supply Chain Needs Intelligence</h2>
          <p class="section-desc">
            In traditional systems, multiple intermediaries increase transit time, handling damages, and price inflation without adding equal value.
          </p>
        </div>

        <div class="comparison-box">
          <!-- Traditional Flow -->
          <div class="comp-track">
            <div class="track-label danger">
              <span>❌ Traditional Agricultural Flow</span>
              <small style="color:var(--slate-500); font-weight:500;">(5 to 7 fragmented handoffs)</small>
            </div>

            <div class="traditional-nodes">
              <div class="trad-node">👨‍🌾 Farmer</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">Village Trader</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">Commission Agent</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">APMC Wholesaler</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">City Distributor</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">Local Retailer</div>
              <div class="trad-arrow">→</div>
              <div class="trad-node">🛒 Consumer</div>
            </div>

            <div class="inefficiency-tags">
              <span class="inefficiency-tag">⚠️ High Cumulative Handling Damage (18-25% Wastage)</span>
              <span class="inefficiency-tag">⚠️ Multiple Markups (Farmer receives only 28-35% of consumer rupee)</span>
              <span class="inefficiency-tag">⚠️ Price Information Asymmetry (Farmer lacks real-time mandi intelligence)</span>
              <span class="inefficiency-tag">⚠️ Delayed Cash Settlements (15-45 days credit cycle)</span>
            </div>
          </div>

          <!-- Farm2Fair Flow -->
          <div class="comp-track">
            <div class="track-label success">
              <span>✅ The Farm2Fair Streamlined Approach</span>
              <small style="color:var(--slate-500); font-weight:500;">(Direct connection + Preserving essential services)</small>
            </div>

            <div class="f2f-flow-visual">
              <div class="f2f-node">👨‍🌾 Direct Farmer Listing</div>
              <div class="f2f-arrow">➔</div>
              <div class="f2f-node hub">⚡ Farm2Fair (AI Pricing + Group Logistics)</div>
              <div class="f2f-arrow">➔</div>
              <div class="f2f-node">🏢 Direct B2B / Retail Buyer</div>
              <div class="f2f-arrow">➔</div>
              <div class="f2f-node">🛒 End Consumer</div>
            </div>

            <div class="benefit-tags">
              <span class="benefit-tag">✓ Direct Market Discovery</span>
              <span class="benefit-tag">✓ AI-Calculated Fair Price Corridors</span>
              <span class="benefit-tag">✓ Shared Logistics (Save 38% Freight)</span>
              <span class="benefit-tag">✓ Complete Price Breakdown Transparency</span>
              <span class="benefit-tag">✓ Immediate Escrow Digital Settlement</span>
            </div>

            <div style="margin-top:16px; padding:12px 16px; background:#f0fdf4; border-radius:var(--radius-md); border-left:4px solid var(--primary-600); font-size:0.875rem; color:var(--primary-900);">
              <strong>Core Distinction:</strong> Farm2Fair does not claim to eliminate all intermediaries. Farmers still require transportation, aggregation, and quality checking. We replace avoidable markups with intelligent grouping, AI fair-price forecasting, and end-to-end transparency.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5-Step Visual Process -->
    <section class="steps-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">How It Works</span>
          <h2 class="section-title">5-Step Intelligent Supply Flow</h2>
          <p class="section-desc">From listing harvest to final consumer purchase in 5 transparent, verified stages.</p>
        </div>

        <div class="steps-grid">
          <!-- Step 1 -->
          <div class="step-card">
            <div class="step-num">1</div>
            <div class="step-icon-wrap">📝</div>
            <h3 class="step-title">Farmer Lists Crop</h3>
            <p class="step-desc">Farmers easily list harvest using mobile touch or regional voice commands.</p>
            <ul class="step-items">
              <li>Crop & quantity</li>
              <li>Harvest date</li>
              <li>Location & GPS</li>
              <li>Quality grade</li>
            </ul>
          </div>

          <!-- Step 2 -->
          <div class="step-card">
            <div class="step-num">2</div>
            <div class="step-icon-wrap">🤖</div>
            <h3 class="step-title">AI Estimates Fair Price</h3>
            <p class="step-desc">Our multi-factor regression model calculates an equitable price corridor.</p>
            <ul class="step-items">
              <li>Mandi arrival trends</li>
              <li>Seasonal festival peaks</li>
              <li>Quality grade score</li>
              <li>Price confidence index</li>
            </ul>
          </div>

          <!-- Step 3 -->
          <div class="step-card">
            <div class="step-num">3</div>
            <div class="step-icon-wrap">🎯</div>
            <h3 class="step-title">Smart Buyer Matching</h3>
            <p class="step-desc">Pairs farmers with verified restaurants, supermarkets, and co-ops.</p>
            <ul class="step-items">
              <li>90%+ compatibility match</li>
              <li>Volume requirements</li>
              <li>Delivery timeline sync</li>
              <li>Direct electronic bidding</li>
            </ul>
          </div>

          <!-- Step 4 -->
          <div class="step-card">
            <div class="step-num">4</div>
            <div class="step-icon-wrap">🚚</div>
            <h3 class="step-title">Optimize Logistics</h3>
            <p class="step-desc">Clusters neighbouring farmers along highway corridors into shared vehicles.</p>
            <ul class="step-items">
              <li>Shared vehicle pooling</li>
              <li>Save up to 38% fuel</li>
              <li>Real-time waypoint route</li>
              <li>Reduced carbon footprint</li>
            </ul>
          </div>

          <!-- Step 5 -->
          <div class="step-card">
            <div class="step-num">5</div>
            <div class="step-icon-wrap">📊</div>
            <h3 class="step-title">Transparent Settlement</h3>
            <p class="step-desc">Every rupee is visible across the entire supply chain with escrow safety.</p>
            <ul class="step-items">
              <li>Farmer receive rate</li>
              <li>Itemized transport cost</li>
              <li>Service & handling fees</li>
              <li>Consumer final price</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Modules Interactive Showcase -->
    <section class="container" style="padding:60px 20px;">
      <div class="section-header">
        <span class="section-tag">Key Innovation Modules</span>
        <h2 class="section-title">Built for Real-World Indian Agriculture</h2>
        <p class="section-desc">Explore the specialized sub-systems designed for farmers, buyers, and consumers.</p>
      </div>

      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
        <!-- Module 1: AI Fair Price -->
        <div class="card" style="cursor:pointer;" id="nav-mod-aiprice">
          <div style="font-size:2rem; margin-bottom:12px;">📊</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">AI Fair-Price Engine</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            Predicts fair price corridors using historical mandi baseline data and dynamic seasonal factors.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            Explore AI Engine →
          </span>
        </div>

        <!-- Module 2: Smart Buyer Matching -->
        <div class="card" style="cursor:pointer;" id="nav-mod-matching">
          <div style="font-size:2rem; margin-bottom:12px;">🤝</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">Smart Buyer Matching</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            Scores and ranks urban buyers (restaurants, retail chains, food processors) by volume and proximity.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            Find Matched Buyers →
          </span>
        </div>

        <!-- Module 3: Group Transportation -->
        <div class="card" style="cursor:pointer;" id="nav-mod-logistics">
          <div style="font-size:2rem; margin-bottom:12px;">🚛</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">Group Transportation</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            Aggregates smallholder harvest shipments into shared vehicles, lowering freight costs by up to 38%.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            View Pooled Routes →
          </span>
        </div>

        <!-- Module 4: Price Transparency -->
        <div class="card" style="cursor:pointer;" id="nav-mod-transparency">
          <div style="font-size:2rem; margin-bottom:12px;">🔍</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">Price Transparency</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            Visual cost-breakdown flow exposing exact farmer earnings, logistics overhead, and platform fees.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            Inspect Price Breakdown →
          </span>
        </div>

        <!-- Module 5: Smart Storage Advisor -->
        <div class="card" style="cursor:pointer;" id="nav-mod-storage">
          <div style="font-size:2rem; margin-bottom:12px;">🏪</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">Smart Storage Advisor</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            "Sell Now or Store?" decision engine that balances cold storage costs against expected price surge.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            Calculate Storage Return →
          </span>
        </div>

        <!-- Module 6: Unsold Crop Rescue -->
        <div class="card" style="cursor:pointer;" id="nav-mod-rescue">
          <div style="font-size:2rem; margin-bottom:12px;">🛡️</div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">Unsold Crop Rescue</h3>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:16px;">
            Salvages perishable crops by routing surplus to food processors, community kitchens, or organic compost.
          </p>
          <span style="color:var(--primary-700); font-weight:700; font-size:0.875rem; display:flex; align-items:center; gap:4px;">
            Prevent Spoilage →
          </span>
        </div>
      </div>
    </section>

    <!-- Final Call to Action -->
    <section style="background:linear-gradient(135deg, var(--primary-700), #064e3b); color:white; padding:70px 20px; text-align:center;">
      <div class="container" style="max-width:800px;">
        <h2 style="font-size:2.5rem; color:white; margin-bottom:16px;">
          “Let’s build a fairer path from farm to consumer.”
        </h2>
        <p style="font-size:1.1rem; opacity:0.9; margin-bottom:32px; line-height:1.6;">
          Join the Smart India Hackathon 2026 digital prototype bridging farmers, commercial buyers, and urban consumers.
        </p>
        <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
          <button class="btn btn-amber btn-lg" id="cta-start-selling">
            👨‍🌾 Start Selling (Farmer Portal)
          </button>
          <button class="btn btn-secondary btn-lg" id="cta-explore-market">
            🛒 Explore Marketplace
          </button>
        </div>
      </div>
    </section>
  `;
}

export function attachLandingEvents(app) {
  document.getElementById('hero-sell-crop-btn')?.addEventListener('click', () => {
    app.setRole('farmer');
    app.navigateTo('farmer-dashboard');
  });

  document.getElementById('hero-find-products-btn')?.addEventListener('click', () => {
    app.navigateTo('marketplace');
  });

  document.getElementById('hero-launch-demo-btn')?.addEventListener('click', () => {
    app.launchJudgeDemo();
  });

  document.getElementById('nav-mod-aiprice')?.addEventListener('click', () => app.navigateTo('ai-price'));
  document.getElementById('nav-mod-matching')?.addEventListener('click', () => app.navigateTo('smart-matching'));
  document.getElementById('nav-mod-logistics')?.addEventListener('click', () => app.navigateTo('group-logistics'));
  document.getElementById('nav-mod-transparency')?.addEventListener('click', () => app.navigateTo('price-transparency'));
  document.getElementById('nav-mod-storage')?.addEventListener('click', () => app.navigateTo('smart-storage'));
  document.getElementById('nav-mod-rescue')?.addEventListener('click', () => app.navigateTo('unsold-rescue'));

  document.getElementById('cta-start-selling')?.addEventListener('click', () => {
    app.setRole('farmer');
    app.navigateTo('farmer-dashboard');
  });

  document.getElementById('cta-explore-market')?.addEventListener('click', () => {
    app.navigateTo('marketplace');
  });
}
