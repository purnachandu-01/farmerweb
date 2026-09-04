/**
 * Farm2Fair — Smart Buyer Matching View
 * AI-powered buyer recommendation engine matching harvest parameters to commercial demand
 */

import { api } from '../services/api.js';

export async function renderSmartMatchingView(app) {
  const buyers = await api.buyers.getMatches();

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">AI Intelligent Recommendation</span>
        <h1 class="section-title">Find the Best Buyers for Your Crop</h1>
        <p class="section-desc">
          Automated multi-criteria matching pairs your active harvest with verified regional restaurants, retail chains, and food processors.
        </p>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="prototype-disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>AI Prototype Matching:</strong> Match percentages are generated using a multi-attribute utility function (proximity, order volume sync, delivery SLA, price tolerance).
        </div>
      </div>

      <!-- Active Crop Context Selector -->
      <div class="card" style="padding:16px 20px; margin-bottom:24px; background:var(--primary-50); border:1.5px solid var(--primary-200);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary-800);">Matching Target Listing</span>
            <div style="font-size:1.15rem; font-weight:800; color:var(--slate-900);">
              🍅 500 kg Hybrid Tomatoes (Grade A) • Ramesh Patel (Kolar)
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" id="matching-change-crop-btn">
              🔄 Switch Crop Listing
            </button>
          </div>
        </div>
      </div>

      <!-- Ranked Buyer Match Cards -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        ${buyers.map((buyer, idx) => `
          <div class="card" style="position:relative; overflow:hidden; border-left: 6px solid ${buyer.matchScore >= 90 ? 'var(--primary-600)' : (buyer.matchScore >= 80 ? 'var(--tech-600)' : 'var(--amber-500)')};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                  <span class="badge ${idx === 0 ? 'badge-green' : 'badge-blue'}">
                    ${idx === 0 ? '🏆 Top AI Match #1' : `Buyer Match #${idx + 1}`}
                  </span>
                  <span class="badge badge-gray">${buyer.type}</span>
                </div>
                <h3 style="font-size:1.3rem; margin:0; color:var(--slate-900);">${buyer.name}</h3>
                <div style="color:var(--slate-500); font-size:0.85rem; margin-top:3px;">
                  📍 ${buyer.location} • <strong>${buyer.distanceKm} km away</strong> • Delivery Window: <em>${buyer.deliveryWindow}</em>
                </div>
              </div>

              <!-- Big Score Badge -->
              <div style="text-align:right;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--slate-500);">AI Compatibility Score</div>
                <div style="font-size:2rem; font-weight:800; font-family:var(--font-display); color:${buyer.matchScore >= 90 ? 'var(--primary-700)' : 'var(--tech-600)'};">
                  ${buyer.matchScore}%
                </div>
                <small style="color:var(--slate-400); font-size:0.75rem;">Prototype Metric</small>
              </div>
            </div>

            <!-- Reasons list -->
            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:18px;">
              <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--slate-600); margin-bottom:8px;">
                Why This Buyer is Recommended:
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:8px; font-size:0.85rem;">
                ${buyer.reasons.map(r => `
                  <div style="display:flex; align-items:center; gap:6px; color:var(--slate-700);">
                    <span style="color:var(--primary-600); font-weight:bold;">✓</span>
                    <span>${r}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Quick Action Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-top:12px; border-top:1px solid var(--border-color);">
              <div style="font-size:0.85rem; color:var(--slate-600);">
                Max Price Tolerance: <strong>₹${buyer.maxPriceTolerance.toFixed(2)}/kg</strong> | Requested Volume: <strong>${buyer.requiredVolumeKg} kg</strong>
              </div>

              <div style="display:flex; gap:10px;">
                <button class="btn btn-secondary btn-sm btn-buyer-contact" data-buyer-name="${buyer.name}">
                  📞 Contact Buyer
                </button>
                <button class="btn btn-primary btn-sm btn-create-offer" data-buyer-id="${buyer.id}" data-buyer-name="${buyer.name}">
                  🤝 Create Direct Offer
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachSmartMatchingEvents(app) {
  document.querySelectorAll('.btn-buyer-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.currentTarget.dataset.buyerName;
      alert(`Contacting ${name} via verified Farm2Fair secure hotline: +91 80 2345 6789. SMS notification dispatched.`);
    });
  });

  document.querySelectorAll('.btn-create-offer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.currentTarget.dataset.buyerName;
      const confirmOffer = confirm(`Send direct digital offer to ${name} for 500 kg Tomatoes at AI corridor rate of ₹28.00/kg?`);
      if (confirmOffer) {
        app.showToast(`Offer dispatched to ${name}! Awaiting buyer counter-confirmation.`, 'success');
      }
    });
  });

  document.getElementById('matching-change-crop-btn')?.addEventListener('click', () => {
    app.navigateTo('farmer-dashboard');
  });
}
