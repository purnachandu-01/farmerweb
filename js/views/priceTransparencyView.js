/**
 * Farm2Fair — Price Transparency & Cost Disaggregation View
 * Complete visual breakdown of the consumer rupee: Farmer share, Freight, Handling, Platform fee
 */

import { api } from '../services/api.js';

export async function renderPriceTransparencyView(app) {
  const cropData = await api.priceBreakdown.get('Tomato');

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Zero Hidden Margins</span>
        <h1 class="section-title">Transparent Price Breakdown</h1>
        <p class="section-desc">
          “Understand where every part of the final price comes from.”
          Farm2Fair provides full transparency so buyers and consumers know exactly how much goes directly to the farmer.
        </p>
      </div>

      <!-- Crop Selector Toolbar -->
      <div class="card" style="padding:16px 20px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <label class="form-label" style="margin-bottom:4px;">Select Crop for Itemized Cost Audit</label>
            <select class="form-control" id="transparency-crop-select" style="min-width:280px;">
              <option value="Hybrid Tomato (Sahu Red)" selected>🍅 Hybrid Tomato (Sahu Red)</option>
              <option value="Red Onion (Bellary Medium)">🧅 Red Onion (Bellary Medium)</option>
              <option value="Fresh Green Chillies (G4)">🌶️ Fresh Green Chillies (G4)</option>
              <option value="Potatoes (Jyoti Grade-1)">🥔 Potatoes (Jyoti Grade-1)</option>
            </select>
          </div>

          <div style="display:flex; gap:10px;">
            <span class="badge badge-green" style="font-size:0.85rem; padding:6px 14px;">
              Farmer Share: <strong>82.3% of Retail Rupee</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Main Flow Breakdown Diagram -->
      <div class="card" style="margin-bottom:32px;">
        <div class="card-header">
          <h2 class="card-title" id="breakdown-chart-title">Tomato Value Chain Breakdown (Per Kilogram)</h2>
          <span class="badge badge-blue">Unit: INR (₹) / kg</span>
        </div>

        <div class="breakdown-chain" id="breakdown-chain-flow">
          <!-- Step 1: Farmer -->
          <div class="breakdown-pillar">
            <div class="pillar-icon">👨‍🌾</div>
            <div class="pillar-title">Farmer Receives</div>
            <div class="pillar-amount" id="bd-farmer" style="color:var(--primary-700);">₹${cropData.farmerShare.toFixed(2)}</div>
            <small style="color:var(--primary-700); font-weight:700; font-size:0.75rem;">Direct Electronic Escrow</small>
          </div>

          <div class="breakdown-plus">+</div>

          <!-- Step 2: Logistics -->
          <div class="breakdown-pillar">
            <div class="pillar-icon">🚚</div>
            <div class="pillar-title">Shared Logistics</div>
            <div class="pillar-amount" id="bd-transport">₹${cropData.transportation.toFixed(2)}</div>
            <small style="color:var(--slate-500); font-size:0.75rem;">Optimized freight</small>
          </div>

          <div class="breakdown-plus">+</div>

          <!-- Step 3: Handling & Storage -->
          <div class="breakdown-pillar">
            <div class="pillar-icon">📦</div>
            <div class="pillar-title">Crates & Handling</div>
            <div class="pillar-amount" id="bd-handling">₹${cropData.storageHandling.toFixed(2)}</div>
            <small style="color:var(--slate-500); font-size:0.75rem;">Reusable food-grade bins</small>
          </div>

          <div class="breakdown-plus">+</div>

          <!-- Step 4: Platform Fee -->
          <div class="breakdown-pillar">
            <div class="pillar-icon">⚡</div>
            <div class="pillar-title">Platform Fee</div>
            <div class="pillar-amount" id="bd-platform">₹${cropData.platformService.toFixed(2)}</div>
            <small style="color:var(--slate-500); font-size:0.75rem;">Software & verification</small>
          </div>

          <div class="breakdown-plus">=</div>

          <!-- Step 5: Final Price -->
          <div class="breakdown-pillar total">
            <div class="pillar-icon">🛒</div>
            <div class="pillar-title">Final Buyer Price</div>
            <div class="pillar-amount" id="bd-total">₹${cropData.finalConsumerPrice.toFixed(2)}</div>
            <small style="color:var(--primary-700); font-weight:700; font-size:0.75rem;">Fair & Transparent</small>
          </div>
        </div>

        <!-- Comparative Value Realization Analysis -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:24px;">
          <!-- Farm2Fair Model -->
          <div style="background:var(--primary-50); border:1.5px solid var(--primary-300); border-radius:var(--radius-lg); padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <strong style="color:var(--primary-800); font-size:1.1rem;">⚡ Farm2Fair Transparent Model</strong>
              <span class="badge badge-green">Win-Win</span>
            </div>
            <ul style="list-style:none; font-size:0.9rem; color:var(--slate-700); display:flex; flex-direction:column; gap:8px;">
              <li>• Farmer receives: <strong style="color:var(--primary-700);">₹${cropData.farmerShare.toFixed(2)}/kg</strong> (82% share)</li>
              <li>• Final buyer price: <strong style="color:var(--primary-700);">₹${cropData.finalConsumerPrice.toFixed(2)}/kg</strong></li>
              <li>• Farmer Earnings Gain: <strong style="color:var(--primary-700);">${cropData.farmerGainPercent}</strong></li>
              <li>• Total Intermediary Overhead: <strong>Only ₹${(cropData.finalConsumerPrice - cropData.farmerShare).toFixed(2)}/kg</strong></li>
            </ul>
          </div>

          <!-- Traditional Middleman Model -->
          <div style="background:#fee2e2; border:1.5px solid #fca5a5; border-radius:var(--radius-lg); padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <strong style="color:#991b1b; font-size:1.1rem;">❌ Traditional Fragmented Supply Chain</strong>
              <span class="badge badge-amber">Avoidable Inefficiency</span>
            </div>
            <ul style="list-style:none; font-size:0.9rem; color:var(--slate-700); display:flex; flex-direction:column; gap:8px;">
              <li>• Farmer typically received: <strong style="color:#dc2626;">₹21.00/kg</strong> (approx 45% share)</li>
              <li>• Final buyer paid: <strong style="color:#dc2626;">₹${cropData.traditionalMiddlemanPrice.toFixed(2)}/kg</strong></li>
              <li>• Hidden Commission & Handoffs: <strong style="color:#dc2626;">₹${(cropData.traditionalMiddlemanPrice - 21).toFixed(2)}/kg</strong></li>
              <li>• Average post-harvest damage waste: <strong>18% - 24%</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachPriceTransparencyEvents(app) {
  document.getElementById('transparency-crop-select')?.addEventListener('change', async (e) => {
    const cropName = e.currentTarget.value;
    const cropData = await api.priceBreakdown.get(cropName);

    document.getElementById('breakdown-chart-title').innerText = `${cropName} Value Chain Breakdown (Per Kilogram)`;
    document.getElementById('bd-farmer').innerText = `₹${cropData.farmerShare.toFixed(2)}`;
    document.getElementById('bd-transport').innerText = `₹${cropData.transportation.toFixed(2)}`;
    document.getElementById('bd-handling').innerText = `₹${cropData.storageHandling.toFixed(2)}`;
    document.getElementById('bd-platform').innerText = `₹${cropData.platformService.toFixed(2)}`;
    document.getElementById('bd-total').innerText = `₹${cropData.finalConsumerPrice.toFixed(2)}`;

    app.showToast(`Updated cost transparency flow for ${cropName}`, 'info');
  });
}
