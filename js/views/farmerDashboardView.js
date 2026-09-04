/**
 * Farm2Fair — Farmer Dashboard View
 * Complete farmer command center: metrics, list crop form, AI price estimator, recent listings
 */

import { api } from '../services/api.js';

export async function renderFarmerDashboardView(app, options = {}) {
  const prefill = options.prefill || {};
  const crops = await api.crops.getAll();
  const orders = await api.orders.getAll();

  return `
    <div class="container">
      <!-- Prototype Disclaimer -->
      <div class="prototype-disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>AI Prototype Integration (SIH 2026):</strong> All price estimations, buyer matching scores, and logistics routes are illustrative demonstration models ready for FastAPI/PyTorch ML microservices.
        </div>
      </div>

      <!-- Welcome Banner -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
               style="width:60px; height:60px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-500);" />
          <div>
            <h1 style="font-size:1.8rem; margin:0;">Welcome, Ramesh Patel</h1>
            <p style="color:var(--slate-500); font-size:0.9rem; margin:2px 0 0;">
              📍 Vokkaleri Village, Kolar District, Karnataka • Member ID: KA-KLR-2026
            </p>
          </div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" id="btn-farmer-voice-speak">
            🎤 Speak to Farm2Fair
          </button>
          <button class="btn btn-secondary" id="btn-farmer-view-matches">
            🤝 View Matched Buyers
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">My Active Crops</span>
          <span class="stat-value">3 Types</span>
          <span class="stat-sub positive">Tomatoes, Onions, Turmeric</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Available Quantity</span>
          <span class="stat-value">2,150 kg</span>
          <span class="stat-sub">Ready for market dispatch</span>
        </div>

        <div class="stat-card blue">
          <span class="stat-label">Suggested Fair Price</span>
          <span class="stat-value">₹28 – ₹34</span>
          <span class="stat-sub positive">📈 +14% vs local APMC yard</span>
        </div>

        <div class="stat-card amber">
          <span class="stat-label">Active Orders</span>
          <span class="stat-value">2 Orders</span>
          <span class="stat-sub">1 In Shared Transit</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Gross Earnings</span>
          <span class="stat-value">₹20,300</span>
          <span class="stat-sub positive">✓ Escrow settled directly</span>
        </div>

        <div class="stat-card blue">
          <span class="stat-label">Group Logistics</span>
          <span class="stat-value">38% Saved</span>
          <span class="stat-sub positive">Combined with Suresh (Malur)</span>
        </div>
      </div>

      <!-- Main Action Grid: List Crop Form + AI Price Result -->
      <div style="display:grid; grid-template-columns: 1.15fr 0.85fr; gap:24px; margin-bottom:32px;">
        <!-- List Your Crop Form -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">📝 List Your Crop</h2>
              <p style="font-size:0.85rem; color:var(--slate-500); margin-top:2px;">
                Directly list produce to access verified buyers and pooled transportation
              </p>
            </div>
            <span class="badge badge-green">AI-Assisted</span>
          </div>

          <form id="farmer-list-crop-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Crop Name</label>
                <select class="form-control" id="f-crop-name" required>
                  <option value="Hybrid Tomato (Sahu Red)" ${prefill.crop?.includes('Tomato') ? 'selected' : ''}>Hybrid Tomato (Sahu Red)</option>
                  <option value="Red Onion (Bellary Medium)" ${prefill.crop?.includes('Onion') ? 'selected' : ''}>Red Onion (Bellary Medium)</option>
                  <option value="Fresh Green Chillies (G4)" ${prefill.crop?.includes('Chilli') ? 'selected' : ''}>Fresh Green Chillies (G4)</option>
                  <option value="Potatoes (Jyoti Grade-1)" ${prefill.crop?.includes('Potato') ? 'selected' : ''}>Potatoes (Jyoti Grade-1)</option>
                  <option value="Organic Turmeric Rhizomes">Organic Turmeric Rhizomes</option>
                  <option value="Basmati Paddy Grain">Basmati Paddy Grain</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-control" id="f-crop-category">
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Quantity Available</label>
                <input type="number" class="form-control" id="f-crop-qty" value="${prefill.quantity || 500}" min="10" required />
              </div>

              <div class="form-group">
                <label class="form-label">Unit of Measure</label>
                <select class="form-control" id="f-crop-unit">
                  <option value="kg">Kilograms (kg)</option>
                  <option value="quintal">Quintal (100 kg)</option>
                  <option value="crates">Crates (25 kg each)</option>
                  <option value="tons">Metric Tons (MT)</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Location (Village / Taluk)</label>
                <input type="text" class="form-control" id="f-crop-location" value="${prefill.location || 'Vokkaleri, Kolar, Karnataka'}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Expected Harvest Date</label>
                <input type="date" class="form-control" id="f-crop-harvest-date" value="${new Date().toISOString().split('T')[0]}" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Quality Grade</label>
                <select class="form-control" id="f-crop-quality">
                  <option value="Grade A (Firm, Uniform Size)">Grade A (Firm, Uniform Size)</option>
                  <option value="Grade B (Minor Blemishes, Good Taste)">Grade B (Minor Blemishes, Processing Grade)</option>
                  <option value="Certified Organic">Certified Organic</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Your Expected Price (₹ / kg)</label>
                <input type="number" class="form-control" id="f-crop-expected-price" value="28" step="0.5" required />
              </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" id="btn-get-ai-fair-price" style="flex:1;">
                🤖 Get AI Fair Price
              </button>
              <button type="submit" class="btn btn-primary" style="flex:1;">
                ✓ Publish Listing
              </button>
            </div>
          </form>
        </div>

        <!-- AI Fair-Price Result Card -->
        <div class="card" id="ai-price-result-container" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-header">
              <h2 class="card-title">🤖 AI Fair-Price Intelligence</h2>
              <span class="badge badge-blue">Live Model</span>
            </div>

            <div id="ai-price-dynamic-box" style="background:var(--primary-50); border:1.5px solid var(--primary-300); border-radius:var(--radius-md); padding:18px; text-align:center; margin-bottom:16px;">
              <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary-800); letter-spacing:0.5px;">
                Recommended Fair Price Range
              </span>
              <div id="res-price-range" style="font-size:2.2rem; font-weight:800; color:var(--primary-700); font-family:var(--font-display); margin:4px 0;">
                ₹28.00 – ₹34.00 <span style="font-size:1.05rem; font-weight:600; color:var(--slate-600);">/ kg</span>
              </div>
              <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:8px;">
                <span class="badge badge-green" id="res-confidence">Confidence: 91%</span>
                <span class="badge badge-blue" id="res-demand">Demand: High</span>
                <span class="badge badge-amber" id="res-trend">Trend: +14% Upward</span>
              </div>
            </div>

            <div style="font-size:0.85rem; font-weight:700; color:var(--slate-700); margin-bottom:8px;">
              Key Driving Factors Influencing Price:
            </div>
            <div id="res-factors-list" style="display:flex; flex-direction:column; gap:8px; font-size:0.8rem;">
              <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--slate-50); border-radius:6px;">
                <span>📈 Seasonal Demand Surge (Navratri preparation)</span>
                <strong style="color:var(--primary-700);">+12%</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--slate-50); border-radius:6px;">
                <span>📉 Kolar APMC arrival dip (-18% volume)</span>
                <strong style="color:var(--primary-700);">+8%</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--slate-50); border-radius:6px;">
                <span>✨ Grade A Firmness & Uniform Sizing</span>
                <strong style="color:var(--primary-700);">+5%</strong>
              </div>
            </div>
          </div>

          <div style="margin-top:16px; padding-top:12px; border-top:1px solid var(--border-color); font-size:0.75rem; color:var(--slate-500); text-align:center;">
            <em>* Illustrative prototype result based on sample APMC mandi feeds & logistics indexes.</em>
          </div>
        </div>
      </div>

      <!-- Farmer Active Listings Grid -->
      <div style="margin-bottom:32px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h2 style="font-size:1.4rem;">My Listed Crops</h2>
            <p style="font-size:0.85rem; color:var(--slate-500);">Live produce available for buyer matching & pooling</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-refresh-listings">
            ↻ Refresh Listings
          </button>
        </div>

        <div class="crop-grid">
          ${crops.filter(c => c.farmerId === 'usr-f-1').map(crop => `
            <div class="crop-card">
              <div class="crop-img-wrap">
                <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
                <span class="badge badge-green crop-badge-top">${crop.quality}</span>
                <span class="crop-distance-badge">📍 ${crop.farmerLocation}</span>
              </div>
              <div class="crop-content">
                <div>
                  <div class="crop-header">
                    <h3 class="crop-name">${crop.crop}</h3>
                    <span class="badge badge-blue">${crop.quantity} ${crop.unit}</span>
                  </div>
                  <div class="farmer-tag">Harvested: ${crop.harvestDate}</div>

                  <div class="price-comparison-box">
                    <div>
                      <div class="price-item-label">Your Price</div>
                      <div class="price-item-val">₹${crop.farmerPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div class="price-item-label">AI Fair Corridor</div>
                      <div class="price-item-val fair">₹${crop.aiSuggestedMin} - ₹${crop.aiSuggestedMax}</div>
                    </div>
                  </div>
                </div>

                <div style="display:flex; gap:8px;">
                  <button class="btn btn-primary btn-sm btn-find-buyers-for-crop" data-crop-id="${crop.id}" style="flex:1;">
                    🤝 Find Buyers
                  </button>
                  <button class="btn btn-secondary btn-sm btn-pool-transport" data-crop-id="${crop.id}">
                    🚚 Logistics
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Active Orders & Shared Logistics Status -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">📦 Active Orders & Shared Transportation Status</h2>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-top:2px;">Real-time shipment tracking and digital escrow status</p>
          </div>
          <span class="badge badge-blue">1 In Transit</span>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-color); color:var(--slate-600); font-size:0.8rem; text-transform:uppercase;">
                <th style="padding:10px 14px;">Order ID</th>
                <th style="padding:10px 14px;">Crop</th>
                <th style="padding:10px 14px;">Quantity</th>
                <th style="padding:10px 14px;">Buyer</th>
                <th style="padding:10px 14px;">Total Value</th>
                <th style="padding:10px 14px;">Logistics Route</th>
                <th style="padding:10px 14px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(order => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:12px 14px; font-weight:700;">#${order.id}</td>
                  <td style="padding:12px 14px;">${order.cropName}</td>
                  <td style="padding:12px 14px; font-weight:600;">${order.quantity} ${order.unit}</td>
                  <td style="padding:12px 14px;">${order.buyerName}</td>
                  <td style="padding:12px 14px; font-weight:800; color:var(--primary-700);">₹${order.totalAmount.toLocaleString()}</td>
                  <td style="padding:12px 14px; font-size:0.825rem; color:var(--slate-600);">NH-75 Shared Pool (Kolar ➔ Bengaluru)</td>
                  <td style="padding:12px 14px;">
                    <span class="badge ${order.status.includes('Transit') ? 'badge-blue' : 'badge-green'}">
                      ${order.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function attachFarmerDashboardEvents(app) {
  // Voice Assistant button
  document.getElementById('btn-farmer-voice-speak')?.addEventListener('click', () => {
    app.openVoiceAssistant();
  });

  // View matches button
  document.getElementById('btn-farmer-view-matches')?.addEventListener('click', () => {
    app.navigateTo('smart-matching');
  });

  // "Get AI Fair Price" calculation button
  document.getElementById('btn-get-ai-fair-price')?.addEventListener('click', async () => {
    const crop = document.getElementById('f-crop-name').value;
    const qty = document.getElementById('f-crop-qty').value;
    const quality = document.getElementById('f-crop-quality').value;
    const location = document.getElementById('f-crop-location').value;

    app.showToast('Querying AI pricing model...', 'info');
    const prediction = await api.predictions.getFairPrice({ crop, quantity: qty, quality, location });

    document.getElementById('res-price-range').innerHTML = `
      ₹${prediction.suggestedMin}.00 – ₹${prediction.suggestedMax}.00 <span style="font-size:1.05rem; font-weight:600; color:var(--slate-600);">/ kg</span>
    `;
    document.getElementById('res-confidence').innerText = `Confidence: ${prediction.confidence}`;
    document.getElementById('res-demand').innerText = `Demand: ${prediction.demandLevel}`;
    document.getElementById('res-trend').innerText = `Trend: ${prediction.marketTrend}`;

    const factorsHtml = prediction.factors.map(f => `
      <div style="display:flex; justify-content:space-between; padding:6px 10px; background:white; border-radius:6px; border:1px solid var(--border-color);">
        <span>${f.name}</span>
        <strong style="color:${f.impact === 'positive' ? 'var(--primary-700)' : '#dc2626'};">${f.weight}</strong>
      </div>
    `).join('');
    document.getElementById('res-factors-list').innerHTML = factorsHtml;

    app.showToast(`AI Fair Price updated: ₹${prediction.suggestedMin} - ₹${prediction.suggestedMax}/kg`, 'success');
  });

  // Submit Listing
  document.getElementById('farmer-list-crop-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('f-crop-name').value;
    const category = document.getElementById('f-crop-category').value;
    const quantity = document.getElementById('f-crop-qty').value;
    const unit = document.getElementById('f-crop-unit').value;
    const location = document.getElementById('f-crop-location').value;
    const harvestDate = document.getElementById('f-crop-harvest-date').value;
    const quality = document.getElementById('f-crop-quality').value;
    const expectedPrice = document.getElementById('f-crop-expected-price').value;

    const newCrop = await api.crops.create({
      crop,
      category,
      quantity,
      unit,
      location,
      harvestDate,
      quality,
      farmerPrice: expectedPrice,
      farmerId: 'usr-f-1',
      farmerName: 'Ramesh Patel'
    });

    app.showToast(`Success! ${quantity} ${unit} of ${crop} listed successfully.`, 'success');
    app.renderView('farmer-dashboard');
  });

  // Action buttons on cards
  document.querySelectorAll('.btn-find-buyers-for-crop').forEach(btn => {
    btn.addEventListener('click', () => {
      app.navigateTo('smart-matching');
    });
  });

  document.querySelectorAll('.btn-pool-transport').forEach(btn => {
    btn.addEventListener('click', () => {
      app.navigateTo('group-logistics');
    });
  });

  document.getElementById('btn-refresh-listings')?.addEventListener('click', () => {
    app.renderView('farmer-dashboard');
  });
}
