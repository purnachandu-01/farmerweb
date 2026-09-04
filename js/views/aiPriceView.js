/**
 * Farm2Fair — AI Fair-Price Prediction Module
 * Multi-factor agricultural price corridor forecasting workbench
 */

import { api } from '../services/api.js';

export async function renderAiPriceView(app) {
  // Default query
  const defaultPrediction = await api.predictions.getFairPrice({
    crop: 'Tomato',
    quantity: 500,
    quality: 'Grade A',
    location: 'Kolar'
  });

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Machine Learning Prototype</span>
        <h1 class="section-title">AI Fair-Price Prediction Engine</h1>
        <p class="section-desc">
          Predicts dynamic, equitable price corridors for farmers and buyers by synthesizing wholesale mandi feeds, seasonal demand cycles, and quality metrics.
        </p>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="prototype-disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>Disclaimer:</strong> Prototype estimates are for demonstration and should not be treated as guaranteed market prices. The frontend connects to <code>POST /api/predictions/price</code> designed for Scikit-learn/FastAPI backend microservices.
        </div>
      </div>

      <!-- Two-Column Workbench Layout -->
      <div style="display:grid; grid-template-columns: 380px 1fr; gap:24px; margin-bottom:32px;">
        <!-- Input Parameters Panel -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" style="font-size:1.15rem;">⚙️ Model Inputs</h2>
            <span class="badge badge-green">Live Parameters</span>
          </div>

          <form id="ai-price-workbench-form">
            <div class="form-group">
              <label class="form-label">Agricultural Commodity</label>
              <select class="form-control" id="wb-crop">
                <option value="Tomato" selected>Hybrid Tomato (Sahu Red)</option>
                <option value="Onion">Red Onion (Bellary)</option>
                <option value="Potato">Potatoes (Jyoti Grade-1)</option>
                <option value="Green Chilli">Fresh Green Chillies (G4)</option>
                <option value="Turmeric">Raw Turmeric Rhizomes</option>
                <option value="Rice/Paddy">Basmati Paddy Grain</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Volume (kg)</label>
                <input type="number" class="form-control" id="wb-quantity" value="500" min="50" step="50" required />
              </div>

              <div class="form-group">
                <label class="form-label">Season Cycle</label>
                <select class="form-control" id="wb-season">
                  <option value="Kharif Late">Kharif Late (Current)</option>
                  <option value="Rabi Early">Rabi Early</option>
                  <option value="Zaid">Zaid / Summer</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Farming Region / Mandi Catchment</label>
              <select class="form-control" id="wb-location">
                <option value="Kolar" selected>Kolar APMC Belt, Karnataka</option>
                <option value="Nashik">Nashik Region, Maharashtra</option>
                <option value="Chittoor">Chittoor District, Andhra Pradesh</option>
                <option value="Indore">Indore Mandi Catchment, MP</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Produce Quality Grading</label>
              <select class="form-control" id="wb-quality">
                <option value="Grade A" selected>Grade A (Premium, Firm, Export/Retail)</option>
                <option value="Grade B">Grade B (Commercial / Processing Quality)</option>
                <option value="Mixed">Field Run / Unsorted</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Anticipated Harvest Date</label>
              <input type="date" class="form-control" id="wb-date" value="${new Date().toISOString().split('T')[0]}" />
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">
              ⚡ Run AI Price Prediction
            </button>
          </form>
        </div>

        <!-- Output Analytics Panel -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          <!-- Primary Estimate Banner -->
          <div class="card" style="border-top:4px solid var(--primary-500);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
              <div>
                <span class="badge badge-green" style="margin-bottom:8px;">Predicted Fair-Price Corridor</span>
                <div id="wb-display-price" style="font-size:2.8rem; font-weight:800; font-family:var(--font-display); color:var(--primary-700); line-height:1.1;">
                  ₹${defaultPrediction.suggestedMin}.00 – ₹${defaultPrediction.suggestedMax}.00
                  <span style="font-size:1.2rem; font-weight:600; color:var(--slate-500);">/ kg</span>
                </div>
                <div style="color:var(--slate-500); font-size:0.875rem; margin-top:6px;">
                  Baseline APMC Mandi Spot Rate: <strong>₹${defaultPrediction.suggestedMin - 4}.00/kg</strong> (Farm2Fair corridor provides +16% higher realization)
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:6px; min-width:180px;">
                <div style="background:var(--slate-50); border:1px solid var(--border-color); padding:8px 12px; border-radius:8px;">
                  <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Model Confidence</small>
                  <div id="wb-display-conf" style="font-weight:800; color:var(--primary-700); font-size:1.1rem;">${defaultPrediction.confidence}</div>
                </div>
                <div style="background:var(--slate-50); border:1px solid var(--border-color); padding:8px 12px; border-radius:8px;">
                  <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Market Demand</small>
                  <div id="wb-display-demand" style="font-weight:800; color:var(--tech-600); font-size:1.1rem;">${defaultPrediction.demandLevel} Demand</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Trend Interactive SVG Chart -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 style="font-size:1.1rem; margin:0;">Price Trajectory (Historical Mandi vs Farm2Fair Fair Corridor)</h3>
                <small style="color:var(--slate-500);">Past 14 days actuals + 7 days predictive forward forecast</small>
              </div>
              <div style="display:flex; gap:12px; font-size:0.8rem; font-weight:600;">
                <span style="display:flex; align-items:center; gap:5px; color:#94a3b8;">
                  <span style="width:12px; height:3px; background:#94a3b8; display:inline-block;"></span> Mandi Baseline
                </span>
                <span style="display:flex; align-items:center; gap:5px; color:var(--primary-600);">
                  <span style="width:12px; height:3px; background:var(--primary-600); display:inline-block;"></span> Fair-Price Corridor
                </span>
              </div>
            </div>

            <!-- SVG Chart -->
            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
              <svg id="price-trend-svg" viewBox="0 0 600 200" style="width:100%; height:180px; overflow:visible;">
                <!-- Grid lines -->
                <line x1="40" y1="30" x2="570" y2="30" stroke="#e2e8f0" stroke-dasharray="4" />
                <line x1="40" y1="80" x2="570" y2="80" stroke="#e2e8f0" stroke-dasharray="4" />
                <line x1="40" y1="130" x2="570" y2="130" stroke="#e2e8f0" stroke-dasharray="4" />
                <line x1="40" y1="170" x2="570" y2="170" stroke="#cbd5e1" stroke-width="1.5" />

                <!-- Price Labels Y -->
                <text x="32" y="34" font-size="10" fill="#94a3b8" text-anchor="end">₹40</text>
                <text x="32" y="84" font-size="10" fill="#94a3b8" text-anchor="end">₹32</text>
                <text x="32" y="134" font-size="10" fill="#94a3b8" text-anchor="end">₹24</text>
                <text x="32" y="174" font-size="10" fill="#94a3b8" text-anchor="end">₹16</text>

                <!-- Mandi Line (Slate) -->
                <polyline id="svg-mandi-line"
                  fill="none"
                  stroke="#94a3b8"
                  stroke-width="2.5"
                  stroke-dasharray="4,3"
                  points="60,140 140,135 220,130 300,120 380,110 460,105 540,100" />

                <!-- Farm2Fair Corridor (Emerald Green with shaded area) -->
                <polygon id="svg-corridor-area"
                  fill="rgba(16, 185, 129, 0.15)"
                  points="60,130 140,120 220,110 300,95 380,80 460,70 540,65 540,110 460,115 380,120 300,130 220,140 140,145 60,150" />

                <polyline id="svg-fair-line"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="3"
                  points="60,125 140,115 220,105 300,90 380,75 460,65 540,60" />

                <!-- Today Marker Line -->
                <line x1="380" y1="20" x2="380" y2="170" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" />
                <text x="380" y="15" fill="#d97706" font-size="10" font-weight="bold" text-anchor="middle">TODAY</text>

                <!-- X Axis Day Labels -->
                <text x="60" y="188" font-size="10" fill="#64748b" text-anchor="middle">-14d</text>
                <text x="140" y="188" font-size="10" fill="#64748b" text-anchor="middle">-10d</text>
                <text x="220" y="188" font-size="10" fill="#64748b" text-anchor="middle">-7d</text>
                <text x="300" y="188" font-size="10" fill="#64748b" text-anchor="middle">-3d</text>
                <text x="380" y="188" font-size="10" fill="#0f172a" font-weight="bold" text-anchor="middle">Today</text>
                <text x="460" y="188" font-size="10" fill="#10b981" font-weight="bold" text-anchor="middle">+3d (F)</text>
                <text x="540" y="188" font-size="10" fill="#10b981" font-weight="bold" text-anchor="middle">+7d (F)</text>
              </svg>
            </div>
          </div>

          <!-- Feature Influence Factor Breakdown -->
          <div class="card">
            <h3 style="font-size:1.05rem; margin-bottom:12px;">📊 Regression Factor Attribution</h3>
            <div id="wb-factors-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
              ${defaultPrediction.factors.map(f => `
                <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:10px 14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.8rem; font-weight:600; color:var(--slate-700);">${f.name}</span>
                    <span class="badge ${f.impact === 'positive' ? 'badge-green' : 'badge-amber'}">${f.weight}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachAiPriceEvents(app) {
  document.getElementById('ai-price-workbench-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('wb-crop').value;
    const quantity = document.getElementById('wb-quantity').value;
    const location = document.getElementById('wb-location').value;
    const quality = document.getElementById('wb-quality').value;

    app.showToast(`Calculating dynamic fair price for ${crop}...`, 'info');
    const prediction = await api.predictions.getFairPrice({ crop, quantity, location, quality });

    // Update Banner
    document.getElementById('wb-display-price').innerHTML = `
      ₹${prediction.suggestedMin}.00 – ₹${prediction.suggestedMax}.00
      <span style="font-size:1.2rem; font-weight:600; color:var(--slate-500);">/ kg</span>
    `;
    document.getElementById('wb-display-conf').innerText = prediction.confidence;
    document.getElementById('wb-display-demand').innerText = `${prediction.demandLevel} Demand`;

    // Re-render factors
    const factorsHtml = prediction.factors.map(f => `
      <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:10px 14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.8rem; font-weight:600; color:var(--slate-700);">${f.name}</span>
          <span class="badge ${f.impact === 'positive' ? 'badge-green' : 'badge-amber'}">${f.weight}</span>
        </div>
      </div>
    `).join('');
    document.getElementById('wb-factors-grid').innerHTML = factorsHtml;

    app.showToast(`Fair Price Corridor updated: ₹${prediction.suggestedMin} - ₹${prediction.suggestedMax}/kg`, 'success');
  });
}
