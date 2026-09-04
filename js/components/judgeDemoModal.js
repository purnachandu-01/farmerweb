/**
 * Farm2Fair — SIH 2026 Interactive Judge Demo Modal
 * Guides judges through the 8-step complete lifecycle in under 90 seconds.
 */

export class JudgeDemoModal {
  constructor(app) {
    this.app = app;
    this.currentStep = 1;
    this.totalSteps = 8;
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
    this.stepsData = [
      {
        num: 1,
        title: 'Step 1: Farmer Authentication',
        subtitle: 'Farmer Ramesh Patel from Kolar logs into the mobile-friendly portal',
        badge: 'Farmer Role Activated',
        htmlContent: `
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                 style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:3px solid var(--primary-500);" />
            <div>
              <h4 style="margin:0; font-size:1.15rem;">Ramesh Patel</h4>
              <p style="margin:2px 0 0; color:var(--slate-500); font-size:0.85rem;">📍 Vokkaleri, Kolar District, Karnataka • Smallholder (4.5 Acres)</p>
              <span class="badge badge-green" style="margin-top:6px;">Verified Farmer ID #KA-KLR-2026</span>
            </div>
          </div>
          <div style="background:white; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
            <p style="font-size:0.9rem; color:var(--slate-700);">
              <strong>Context:</strong> Ramesh traditionally sells at the local APMC yard via commission agents, where delayed payments, high handling fees, and unpredictable distress prices eat 30-40% of his margin.
            </p>
          </div>
        `
      },
      {
        num: 2,
        title: 'Step 2: Crop Listing with Voice / Touch',
        subtitle: 'Lists 500 kg fresh harvest of Hybrid Tomatoes',
        badge: 'Form Submitted',
        htmlContent: `
          <div style="background:white; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-bottom:12px;">
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Crop</small><div style="font-weight:700; font-size:0.95rem;">🍅 Hybrid Tomatoes</div></div>
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Quantity</small><div style="font-weight:700; font-size:0.95rem;">500 kg (20 Crates)</div></div>
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Quality Grade</small><div style="font-weight:700; font-size:0.95rem;">Grade A (Firm/Red)</div></div>
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Harvest Date</small><div style="font-weight:700; font-size:0.95rem;">Today (Fresh)</div></div>
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Expected Price</small><div style="font-weight:700; font-size:0.95rem;">₹28.00 / kg</div></div>
              <div><small style="color:var(--slate-500); text-transform:uppercase; font-size:0.7rem; font-weight:700;">Input Method</small><div style="font-weight:700; font-size:0.95rem; color:var(--tech-600);">🎤 Voice Input (Kannada)</div></div>
            </div>
          </div>
          <p style="font-size:0.85rem; color:var(--slate-600);">Farmers with basic smartphones can either type or speak in regional languages without complex paperwork.</p>
        `
      },
      {
        num: 3,
        title: 'Step 3: AI Calculates Illustrative Fair-Price Corridor',
        subtitle: 'Multi-factor ML regression model evaluates supply, demand, and quality',
        badge: 'AI Prototype Engine',
        htmlContent: `
          <div style="background:var(--primary-50); border:1.5px solid var(--primary-300); border-radius:var(--radius-md); padding:18px; text-align:center; margin-bottom:14px;">
            <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--primary-800); letter-spacing:0.5px;">Recommended Fair Price Corridor</div>
            <div style="font-size:2.2rem; font-weight:800; color:var(--primary-700); font-family:var(--font-display); margin:4px 0;">
              ₹28.00 – ₹34.00 <span style="font-size:1.1rem; font-weight:600; color:var(--slate-600);">/ kg</span>
            </div>
            <div style="display:flex; justify-content:center; gap:8px;">
              <span class="badge badge-green">Model Confidence: 91%</span>
              <span class="badge badge-blue">Demand Index: High (+14%)</span>
            </div>
          </div>
          <div style="font-size:0.825rem; color:var(--slate-600); line-height:1.5;">
            <strong>Driving Factors:</strong> Upcoming festival consumption surge (+12%), slight Kolar APMC arrival dip (+8%), Grade-A firmness quality premium (+5%).
          </div>
        `
      },
      {
        num: 4,
        title: 'Step 4: Smart Buyer Matching',
        subtitle: 'System automatically pairs Ramesh with verified urban bulk buyers',
        badge: 'Ranked Match: 94%',
        htmlContent: `
          <div style="background:white; border:1.5px solid var(--tech-300); border-radius:var(--radius-md); padding:16px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <h4 style="margin:0; font-size:1.05rem; color:var(--slate-900);">Green Valley Fresh Supermarkets</h4>
                <div style="font-size:0.8rem; color:var(--slate-500);">Supermarket Chain (8 outlets in Bengaluru East) • 38 km away</div>
              </div>
              <span class="badge badge-blue" style="font-size:0.9rem; font-weight:800; padding:4px 12px;">94% Match</span>
            </div>
            <div style="margin-top:10px; font-size:0.825rem; color:var(--slate-600);">
              ✓ Needs 600 kg fresh tomatoes within 24 hours<br/>
              ✓ Accepts AI corridor price of ₹28.00/kg to farmer<br/>
              ✓ Located along the NH-75 group logistics route
            </div>
          </div>
        `
      },
      {
        num: 5,
        title: 'Step 5: Group Transportation Pooling',
        subtitle: 'Ramesh’s 500 kg is pooled with Suresh (300 kg) and Venkatesh (400 kg)',
        badge: 'Shared Transit Clustered',
        htmlContent: `
          <div style="background:white; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
              <span style="font-weight:700; font-size:0.9rem;">Cluster: Kolar - Malur Corridor</span>
              <span class="badge badge-amber">Tata 407 Eco-Agri Van (80% Full)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px; font-size:0.85rem;">
              <div style="padding:6px 10px; background:var(--slate-50); border-radius:6px;">👨‍🌾 Ramesh Patel (Kolar) ➔ <strong>500 kg</strong> Tomatoes</div>
              <div style="padding:6px 10px; background:var(--slate-50); border-radius:6px;">👨‍🌾 Suresh Gowda (Malur) ➔ <strong>300 kg</strong> Green Chillies</div>
              <div style="padding:6px 10px; background:var(--slate-50); border-radius:6px;">👨‍🌾 Venkatesh R. (Tekal) ➔ <strong>400 kg</strong> Capsicum</div>
            </div>
          </div>
        `
      },
      {
        num: 6,
        title: 'Step 6: Optimized Logistics Route & 38% Cost Cut',
        subtitle: 'Single vehicle picks up along the highway, heading straight to Bengaluru Hub',
        badge: '38% Freight Savings',
        htmlContent: `
          <div class="route-map-box" style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="font-weight:700; font-size:0.9rem;">Optimized Highway Transit (NH-75)</div>
              <span style="color:var(--primary-400); font-weight:700; font-size:0.85rem;">58 km • 1 hr 45 min</span>
            </div>
            <svg viewBox="0 0 500 120" style="width:100%; height:110px; overflow:visible;">
              <line x1="40" y1="60" x2="460" y2="60" stroke="#334155" stroke-width="6" stroke-linecap="round" />
              <line x1="40" y1="60" x2="460" y2="60" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4" />
              <!-- Waypoints -->
              <circle cx="50" cy="60" r="10" fill="#10b981" />
              <text x="50" y="95" fill="#e2e8f0" font-size="11" text-anchor="middle" font-weight="bold">Kolar (500kg)</text>

              <circle cx="170" cy="60" r="8" fill="#3b82f6" />
              <text x="170" y="95" fill="#e2e8f0" font-size="11" text-anchor="middle">Malur (300kg)</text>

              <circle cx="280" cy="60" r="8" fill="#f59e0b" />
              <text x="280" y="95" fill="#e2e8f0" font-size="11" text-anchor="middle">Tekal (400kg)</text>

              <circle cx="450" cy="60" r="12" fill="#ef4444" />
              <text x="450" y="95" fill="#f87171" font-size="11" text-anchor="middle" font-weight="bold">Bengaluru Hub</text>
            </svg>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; text-align:center;">
            <div style="background:white; border:1px solid var(--border-color); padding:10px; border-radius:8px;">
              <div style="font-size:0.75rem; color:var(--slate-500);">Traditional Separate Trucks</div>
              <div style="font-size:1.1rem; font-weight:800; color:#dc2626;">₹4,600 Total</div>
            </div>
            <div style="background:var(--primary-50); border:1px solid var(--primary-300); padding:10px; border-radius:8px;">
              <div style="font-size:0.75rem; color:var(--primary-800);">Farm2Fair Pooled Transit</div>
              <div style="font-size:1.1rem; font-weight:800; color:var(--primary-700);">₹2,850 Total (Save 38%)</div>
            </div>
          </div>
        `
      },
      {
        num: 7,
        title: 'Step 7: Real-Time Transparent Price Breakdown',
        subtitle: 'Every rupee accounted for: Farmer, Transport, Storage, Platform, Final Price',
        badge: 'Zero Hidden Markups',
        htmlContent: `
          <div class="breakdown-chain" style="margin:10px 0;">
            <div class="breakdown-pillar">
              <div class="pillar-icon">👨‍🌾</div>
              <div class="pillar-title">Farmer Receives</div>
              <div class="pillar-amount" style="color:var(--primary-700);">₹28.00</div>
              <small style="color:var(--slate-500); font-size:0.7rem;">82.3% of total</small>
            </div>
            <div class="breakdown-plus">+</div>
            <div class="breakdown-pillar">
              <div class="pillar-icon">🚚</div>
              <div class="pillar-title">Logistics</div>
              <div class="pillar-amount">₹3.20</div>
              <small style="color:var(--slate-500); font-size:0.7rem;">Pooled transit</small>
            </div>
            <div class="breakdown-plus">+</div>
            <div class="breakdown-pillar">
              <div class="pillar-icon">📦</div>
              <div class="pillar-title">Handling/Crate</div>
              <div class="pillar-amount">₹1.80</div>
              <small style="color:var(--slate-500); font-size:0.7rem;">Zero wastage</small>
            </div>
            <div class="breakdown-plus">+</div>
            <div class="breakdown-pillar">
              <div class="pillar-icon">⚡</div>
              <div class="pillar-title">Platform</div>
              <div class="pillar-amount">₹1.00</div>
              <small style="color:var(--slate-500); font-size:0.7rem;">Tech & escrow</small>
            </div>
            <div class="breakdown-plus">=</div>
            <div class="breakdown-pillar total">
              <div class="pillar-icon">🛒</div>
              <div class="pillar-title">Buyer Price</div>
              <div class="pillar-amount">₹34.00</div>
              <small style="color:var(--primary-700); font-weight:700; font-size:0.7rem;">Fair to All</small>
            </div>
          </div>
          <div style="background:white; border:1px solid var(--border-color); padding:10px; border-radius:8px; font-size:0.8rem; color:var(--slate-600); text-align:center;">
            Compare with Traditional Market: Consumer pays <strong>₹46.00/kg</strong> while Farmer only received <strong>₹21.00/kg</strong>!
          </div>
        `
      },
      {
        num: 8,
        title: 'Step 8: Final Transparent Transaction & Value Delivered',
        subtitle: 'Buyer/Consumer receives fresh produce; Ramesh gets instant UPI escrow settlement',
        badge: 'Lifecycle Complete',
        htmlContent: `
          <div style="background:var(--primary-50); border:1.5px solid var(--primary-400); border-radius:var(--radius-lg); padding:20px; text-align:center;">
            <div style="font-size:2.5rem; margin-bottom:6px;">🎉</div>
            <h3 style="color:var(--primary-800); margin-bottom:8px;">Transparent Value Distribution Achieved!</h3>
            <p style="font-size:0.9rem; color:var(--slate-700); max-width:550px; margin:0 auto 14px;">
              Ramesh earned <strong>₹14,000</strong> (33% more than local mandi price), Green Valley Supermarkets saved <strong>26%</strong> on procurement, and food waste was cut to virtually zero through direct matching.
            </p>
            <div style="display:flex; justify-content:center; gap:12px;">
              <span class="badge badge-green" style="font-size:0.85rem; padding:6px 12px;">Farmer Paid: ₹14,000</span>
              <span class="badge badge-blue" style="font-size:0.85rem; padding:6px 12px;">Carbon Footprint Cut: 32%</span>
            </div>
          </div>
        `
      }
    ];
  }

  render() {
    let modal = document.getElementById('judge-demo-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'judge-demo-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const currentData = this.stepsData[this.currentStep - 1];

    modal.innerHTML = `
      <div class="modal-dialog demo-dialog">
        <div class="modal-header" style="background:linear-gradient(90deg, #064e3b, #047857); color:white;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge" style="background:#f59e0b; color:#0f172a; font-weight:800;">SIH 2026</span>
              <h3 class="modal-title" style="color:white; font-size:1.15rem;">Live Hackathon Walkthrough Demo</h3>
            </div>
            <small style="opacity:0.85; font-size:0.8rem;">Experience the complete Farm2Fair 8-step lifecycle</small>
          </div>
          <button class="modal-close" id="close-demo-modal" style="color:white; font-size:1.2rem;">✕</button>
        </div>

        <div class="modal-body">
          <!-- Step indicator bar -->
          <div class="demo-step-track">
            ${this.stepsData.map(s => `
              <div class="demo-step-dot ${s.num === this.currentStep ? 'active' : (s.num < this.currentStep ? 'completed' : '')}"
                   title="${s.title}">
                ${s.num < this.currentStep ? '✓' : s.num}
              </div>
            `).join('')}
          </div>

          <!-- Active Step Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
              <h3 style="font-size:1.25rem; color:var(--slate-900);">${currentData.title}</h3>
              <p style="color:var(--slate-600); font-size:0.875rem; margin-top:2px;">${currentData.subtitle}</p>
            </div>
            <span class="badge badge-amber">${currentData.badge}</span>
          </div>

          <!-- Active Step Content -->
          <div class="demo-content-box">
            ${currentData.htmlContent}
          </div>
        </div>

        <div class="modal-footer" style="justify-content:space-between;">
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" id="btn-demo-prev" ${this.currentStep === 1 ? 'disabled style="opacity:0.5;"' : ''}>
              ← Previous
            </button>
            <button class="btn ${this.isAutoPlaying ? 'btn-amber' : 'btn-secondary'} btn-sm" id="btn-demo-autoplay">
              ${this.isAutoPlaying ? '⏸ Pause Auto-Play' : '▶ Auto-Play (Pitch Mode)'}
            </button>
          </div>
          <div style="display:flex; gap:8px;">
            ${this.currentStep < this.totalSteps ? `
              <button class="btn btn-primary btn-sm" id="btn-demo-next">
                Next Step (${this.currentStep + 1}/${this.totalSteps}) →
              </button>
            ` : `
              <button class="btn btn-primary btn-sm" id="btn-demo-finish">
                Finish & Explore App
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.attachEvents(modal);
  }

  attachEvents(modal) {
    modal.querySelector('#close-demo-modal').addEventListener('click', () => this.close());
    modal.querySelector('#btn-demo-prev')?.addEventListener('click', () => {
      this.stopAutoPlay();
      if (this.currentStep > 1) {
        this.currentStep--;
        this.render();
      }
    });

    modal.querySelector('#btn-demo-next')?.addEventListener('click', () => {
      this.stopAutoPlay();
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.render();
      }
    });

    modal.querySelector('#btn-demo-finish')?.addEventListener('click', () => {
      this.close();
      this.app.showToast('Walkthrough complete! Feel free to test each module.', 'success');
    });

    modal.querySelector('#btn-demo-autoplay').addEventListener('click', () => {
      if (this.isAutoPlaying) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
      this.render();
    });
  }

  open(startStep = 1) {
    this.currentStep = startStep;
    this.render();
    const modal = document.getElementById('judge-demo-modal');
    if (modal) modal.classList.add('open');
  }

  close() {
    this.stopAutoPlay();
    const modal = document.getElementById('judge-demo-modal');
    if (modal) modal.classList.remove('open');
  }

  startAutoPlay() {
    this.isAutoPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.render();
      } else {
        this.stopAutoPlay();
        this.render();
      }
    }, 4500);
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}
