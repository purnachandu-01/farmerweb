/**
 * Farm2Fair — Consumer Direct Marketplace
 * “Know what you are paying for.”
 * Complete transparency showing Farm Gate Price ➔ Pooled Logistics ➔ Final Consumer Price
 */

import { api } from '../services/api.js';

export async function renderConsumerMarketplaceView(app) {
  const crops = await api.crops.getAll();

  return `
    <div class="container">
      <!-- Section Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <span class="badge badge-green">Consumer Transparency Portal</span>
          <h1 style="font-size:1.85rem; margin-top:6px;">Farm-Direct Consumer Produce</h1>
          <p style="color:var(--slate-500); font-size:0.9rem;">
            “Know what you are paying for.” Fresh, pesticide-tested crops delivered straight from local growers.
          </p>
        </div>

        <div style="display:flex; gap:10px;">
          <span class="badge badge-blue" style="font-size:0.85rem; padding:8px 14px;">
            🛒 Average Consumer Savings: <strong>26% Lower Than Supermarket MRP</strong>
          </span>
        </div>
      </div>

      <!-- Consumer Produce Grid with Cost Disaggregation Pill on each item -->
      <div class="crop-grid">
        ${crops.map(crop => {
          const farmPrice = crop.farmerPrice;
          const logistics = 3.20;
          const handling = 1.80;
          const platform = 1.00;
          const finalPrice = (farmPrice + logistics + handling + platform).toFixed(2);

          return `
            <div class="crop-card">
              <div class="crop-img-wrap">
                <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
                <span class="badge badge-green crop-badge-top">${crop.quality}</span>
                <span class="crop-distance-badge">🌱 Harvested: ${crop.harvestDate}</span>
              </div>

              <div class="crop-content">
                <div>
                  <div class="crop-header">
                    <div>
                      <h3 class="crop-name">${crop.crop}</h3>
                      <div class="farmer-tag">👨‍🌾 Grown by <strong>${crop.farmerName}</strong> (${crop.farmerLocation})</div>
                    </div>
                  </div>

                  <!-- Explicit Price Transparency Chain Pill -->
                  <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:10px; margin-bottom:12px;">
                    <div style="font-size:0.7rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); margin-bottom:6px;">
                      Price Breakdown Per Kg:
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.8rem;">
                      <div style="text-align:center;">
                        <span style="color:var(--primary-700); font-weight:800;">₹${farmPrice.toFixed(2)}</span>
                        <small style="display:block; font-size:0.65rem; color:var(--slate-500);">Farmer</small>
                      </div>
                      <span style="color:var(--slate-400);">+</span>
                      <div style="text-align:center;">
                        <span style="font-weight:700;">₹${(logistics + handling).toFixed(2)}</span>
                        <small style="display:block; font-size:0.65rem; color:var(--slate-500);">Logistics</small>
                      </div>
                      <span style="color:var(--slate-400);">=</span>
                      <div style="text-align:center;">
                        <span style="font-size:1.05rem; font-weight:800; color:var(--primary-800);">₹${finalPrice}</span>
                        <small style="display:block; font-size:0.65rem; color:var(--primary-700); font-weight:bold;">You Pay</small>
                      </div>
                    </div>
                  </div>

                  <div style="font-size:0.8rem; color:var(--slate-600); margin-bottom:12px;">
                    Market Retail Equivalent: <span style="text-decoration:line-through; color:#94a3b8;">₹${(Number(finalPrice) * 1.35).toFixed(0)}</span> 
                    <span class="badge badge-green" style="font-size:0.7rem; margin-left:4px;">Save ~26%</span>
                  </div>
                </div>

                <div style="display:flex; gap:8px;">
                  <button class="btn btn-secondary btn-sm consumer-btn-breakdown" data-crop="${crop.crop}" style="flex:1;">
                    🔍 Full Audit
                  </button>
                  <button class="btn btn-primary btn-sm consumer-btn-buy" data-crop="${crop.crop}" data-price="${finalPrice}" style="flex:1;">
                    🛒 Buy (₹${finalPrice}/kg)
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function attachConsumerMarketplaceEvents(app) {
  document.querySelectorAll('.consumer-btn-breakdown').forEach(btn => {
    btn.addEventListener('click', () => {
      app.navigateTo('price-transparency');
    });
  });

  document.querySelectorAll('.consumer-btn-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const crop = e.currentTarget.dataset.crop;
      const price = e.currentTarget.dataset.price;
      const qty = prompt(`Enter quantity of ${crop} in kg (Price: ₹${price}/kg):`, "5");
      if (qty && Number(qty) > 0) {
        const total = (Number(qty) * Number(price)).toFixed(2);
        alert(`Order Placed!\n\n${qty} kg of ${crop}\nTotal: ₹${total}\n\nDelivery scheduled via next morning pooled transit directly to your neighbourhood hub.`);
        app.showToast(`Order confirmed for ${qty} kg ${crop}!`, 'success');
      }
    });
  });
}
