/**
 * Farm2Fair — Farmer-to-Business (F2B) Marketplace
 * Categories: Vegetables, Fruits, Grains, Pulses, Spices, Other crops
 */

import { api } from '../services/api.js';

export async function renderMarketplaceView(app) {
  const crops = await api.crops.getAll();

  return `
    <div class="container">
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <span class="badge badge-green">Direct Producer Access</span>
          <h1 style="font-size:1.85rem; margin-top:6px;">Farmer-to-Business Marketplace</h1>
          <p style="color:var(--slate-500); font-size:0.9rem;">
            Source fresh, quality-graded produce directly from certified growers without speculative markups.
          </p>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary btn-sm" id="mp-sell-btn">
            👨‍🌾 List My Produce
          </button>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:12px; margin-bottom:20px;">
        <button class="btn btn-sm mp-cat-tab active btn-primary" data-cat="All">All Categories</button>
        <button class="btn btn-sm mp-cat-tab btn-secondary" data-cat="Vegetables">🥕 Vegetables</button>
        <button class="btn btn-sm mp-cat-tab btn-secondary" data-cat="Fruits">🍎 Fruits</button>
        <button class="btn btn-sm mp-cat-tab btn-secondary" data-cat="Grains">🌾 Grains</button>
        <button class="btn btn-sm mp-cat-tab btn-secondary" data-cat="Pulses">🫘 Pulses</button>
        <button class="btn btn-sm mp-cat-tab btn-secondary" data-cat="Spices">🌿 Spices</button>
      </div>

      <!-- Crops Grid -->
      <div class="crop-grid" id="mp-crop-grid">
        ${crops.map(crop => `
          <div class="crop-card">
            <div class="crop-img-wrap">
              <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
              <span class="badge badge-green crop-badge-top">${crop.quality}</span>
              <span class="crop-distance-badge">📍 ${crop.farmerLocation}</span>
            </div>

            <div class="crop-content">
              <div>
                <div class="crop-header">
                  <div>
                    <h3 class="crop-name">${crop.crop}</h3>
                    <div class="farmer-tag">👨‍🌾 ${crop.farmerName} • ⭐ 4.9 Rating</div>
                  </div>
                  <span class="badge badge-blue">${crop.quantity} ${crop.unit}</span>
                </div>

                <div class="price-comparison-box">
                  <div>
                    <div class="price-item-label">Direct Farm Price</div>
                    <div class="price-item-val">₹${crop.farmerPrice.toFixed(2)}/kg</div>
                  </div>
                  <div>
                    <div class="price-item-label">AI Fair Corridor</div>
                    <div class="price-item-val fair">₹${crop.aiSuggestedMin} - ₹${crop.aiSuggestedMax}</div>
                  </div>
                </div>

                <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:12px; line-height:1.4;">
                  ${crop.description}
                </p>
              </div>

              <div style="display:flex; gap:8px;">
                <button class="btn btn-secondary btn-sm mp-btn-contact" data-farmer="${crop.farmerName}" style="flex:1;">
                  📞 Contact
                </button>
                <button class="btn btn-primary btn-sm mp-btn-buy" data-crop="${crop.crop}" data-price="${crop.farmerPrice}" style="flex:1;">
                  🛒 Buy Now
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachMarketplaceEvents(app) {
  document.querySelectorAll('.mp-cat-tab').forEach(tab => {
    tab.addEventListener('click', async (e) => {
      document.querySelectorAll('.mp-cat-tab').forEach(t => {
        t.classList.remove('btn-primary', 'active');
        t.classList.add('btn-secondary');
      });
      e.currentTarget.classList.add('btn-primary', 'active');
      e.currentTarget.classList.remove('btn-secondary');

      const cat = e.currentTarget.dataset.cat;
      const crops = await api.crops.getAll({ category: cat });

      const grid = document.getElementById('mp-crop-grid');
      if (!grid) return;

      if (crops.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--slate-500);">No listings under this category yet.</div>`;
        return;
      }

      grid.innerHTML = crops.map(crop => `
        <div class="crop-card">
          <div class="crop-img-wrap">
            <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
            <span class="badge badge-green crop-badge-top">${crop.quality}</span>
            <span class="crop-distance-badge">📍 ${crop.farmerLocation}</span>
          </div>

          <div class="crop-content">
            <div>
              <div class="crop-header">
                <div>
                  <h3 class="crop-name">${crop.crop}</h3>
                  <div class="farmer-tag">👨‍🌾 ${crop.farmerName} • ⭐ 4.9 Rating</div>
                </div>
                <span class="badge badge-blue">${crop.quantity} ${crop.unit}</span>
              </div>

              <div class="price-comparison-box">
                <div>
                  <div class="price-item-label">Direct Farm Price</div>
                  <div class="price-item-val">₹${crop.farmerPrice.toFixed(2)}/kg</div>
                </div>
                <div>
                  <div class="price-item-label">AI Fair Corridor</div>
                  <div class="price-item-val fair">₹${crop.aiSuggestedMin} - ₹${crop.aiSuggestedMax}</div>
                </div>
              </div>

              <p style="font-size:0.8rem; color:var(--slate-600); margin-bottom:12px; line-height:1.4;">
                ${crop.description}
              </p>
            </div>

            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm mp-btn-contact" data-farmer="${crop.farmerName}" style="flex:1;">
                📞 Contact
              </button>
              <button class="btn btn-primary btn-sm mp-btn-buy" data-crop="${crop.crop}" data-price="${crop.farmerPrice}" style="flex:1;">
                🛒 Buy Now
              </button>
            </div>
          </div>
        </div>
      `).join('');

      attachMpCardActions();
    });
  });

  const attachMpCardActions = () => {
    document.querySelectorAll('.mp-btn-contact').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const farmer = e.currentTarget.dataset.farmer;
        alert(`Direct line to ${farmer} (+91 98450 12345). Secure SMS dispatched.`);
      });
    });

    document.querySelectorAll('.mp-btn-buy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const crop = e.currentTarget.dataset.crop;
        const price = e.currentTarget.dataset.price;
        alert(`Wholesale Order for ${crop} initiated at direct price ₹${price}/kg. Scheduled for pooled transit delivery.`);
        app.showToast(`Order initiated for ${crop}`, 'success');
      });
    });
  };

  document.getElementById('mp-sell-btn')?.addEventListener('click', () => {
    app.setRole('farmer');
    app.navigateTo('farmer-dashboard');
  });

  attachMpCardActions();
}
