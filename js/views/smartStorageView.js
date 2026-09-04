/**
 * Farm2Fair — Smart Storage Module ("Sell Now or Store?")
 * AI-driven decision engine weighing holding cost, shrinkage risk, and future price appreciation
 */

import { api } from '../services/api.js';

export async function renderSmartStorageView(app) {
  const defaultAdvice = await api.storage.getAdvice({
    crop: 'Red Onion (Bellary Medium)',
    quantity: 1200,
    currentPrice: 24.50,
    storageCostPerDay: 0.12,
    storageDays: 20
  });

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Holding Cost Optimization</span>
        <h1 class="section-title">Sell Now or Store? Smart Storage Advisor</h1>
        <p class="section-desc">
          Evaluate whether renting cold storage / warehouse space will yield net positive returns after accounting for rental charges, weight shrinkage, and forecasted market price shifts.
        </p>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="prototype-disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>AI Prototype Decision Engine:</strong> Storage forecasts are illustrative models based on seasonal mandi arrival schedules and regional cold-storage tariff estimates.
        </div>
      </div>

      <!-- Main Decision Workbench -->
      <div style="display:grid; grid-template-columns: 380px 1fr; gap:24px; margin-bottom:32px;">
        <!-- Input Form -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" style="font-size:1.15rem;">📦 Storage Assessment Inputs</h2>
            <span class="badge badge-green">Calculator</span>
          </div>

          <form id="storage-advisor-form">
            <div class="form-group">
              <label class="form-label">Produce Commodity</label>
              <select class="form-control" id="st-crop">
                <option value="Red Onion (Bellary Medium)" selected>Red Onion (High storability)</option>
                <option value="Potatoes (Jyoti Grade-1)">Potatoes (High storability)</option>
                <option value="Hybrid Tomato (Sahu Red)">Hybrid Tomato (Perishable - Max 10 days)</option>
                <option value="Organic Turmeric Rhizomes">Turmeric Rhizomes (Dry - Long term)</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Quantity (kg)</label>
                <input type="number" class="form-control" id="st-qty" value="1200" min="100" required />
              </div>

              <div class="form-group">
                <label class="form-label">Current Mandi Price (₹/kg)</label>
                <input type="number" class="form-control" id="st-price" value="24.50" step="0.5" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Storage Rent (₹/kg/day)</label>
                <input type="number" class="form-control" id="st-cost-day" value="0.12" step="0.01" required />
              </div>

              <div class="form-group">
                <label class="form-label">Planned Holding (Days)</label>
                <input type="number" class="form-control" id="st-days" value="20" min="5" max="90" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Estimated Shelf Life (Days)</label>
              <input type="number" class="form-control" id="st-shelf-life" value="45" readonly style="background:var(--slate-100);" />
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">
              ⚡ Evaluate Storage ROI
            </button>
          </form>
        </div>

        <!-- AI Recommendation Output -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          <!-- Primary Verdict Banner -->
          <div class="card" style="border-top: 4px solid var(--primary-600);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
              <div>
                <span class="badge badge-green" style="margin-bottom:8px;">AI Recommendation Verdict</span>
                <h2 id="st-rec-title" style="font-size:1.85rem; color:var(--primary-800); margin:4px 0 8px;">
                  ${defaultAdvice.recommendation}
                </h2>
                <p id="st-rec-rationale" style="color:var(--slate-600); font-size:0.92rem; max-width:620px; line-height:1.5;">
                  ${defaultAdvice.rationale}
                </p>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--border-color); padding:12px 18px; border-radius:var(--radius-md); text-align:right;">
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Estimated Net Upside</small>
                <div id="st-rec-gain" style="font-size:1.8rem; font-weight:800; font-family:var(--font-display); color:var(--primary-700);">
                  +₹${Number(defaultAdvice.estimatedNetGain).toLocaleString()}
                </div>
                <span class="badge badge-amber" id="st-rec-risk" style="margin-top:4px;">Risk: ${defaultAdvice.riskLevel}</span>
              </div>
            </div>
          </div>

          <!-- Financial Breakdown Table -->
          <div class="card">
            <h3 style="font-size:1.1rem; margin-bottom:16px;">📊 Financial Comparison Breakdown</h3>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:14px;">
              <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Immediate Sale Revenue</small>
                <div id="st-imm-rev" style="font-size:1.35rem; font-weight:800; color:var(--slate-800); margin-top:4px;">
                  ₹${(defaultAdvice.quantity * defaultAdvice.currentPrice).toLocaleString()}
                </div>
                <small style="color:var(--slate-500);">Current price ₹${defaultAdvice.currentPrice}/kg</small>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Total Storage Facility Fee</small>
                <div id="st-fee-total" style="font-size:1.35rem; font-weight:800; color:#dc2626; margin-top:4px;">
                  -₹${Number(defaultAdvice.totalStorageCost).toLocaleString()}
                </div>
                <small style="color:var(--slate-500);">20 days @ ₹0.12/kg/day</small>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
                <small style="color:var(--slate-500); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Projected Price in 20 Days</small>
                <div id="st-fut-price" style="font-size:1.35rem; font-weight:800; color:var(--primary-700); margin-top:4px;">
                  ₹${defaultAdvice.projectedFuturePrice}/kg
                </div>
                <small style="color:var(--primary-700); font-weight:600;">+18% seasonal appreciation</small>
              </div>

              <div style="background:var(--primary-50); border:1px solid var(--primary-300); border-radius:var(--radius-md); padding:14px;">
                <small style="color:var(--primary-800); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Net Additional Profit</small>
                <div id="st-net-profit" style="font-size:1.35rem; font-weight:800; color:var(--primary-700); margin-top:4px;">
                  +₹${Number(defaultAdvice.estimatedNetGain).toLocaleString()}
                </div>
                <small style="color:var(--primary-700); font-weight:600;">After all storage expenses</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachSmartStorageEvents(app) {
  document.getElementById('st-crop')?.addEventListener('change', (e) => {
    const val = e.currentTarget.value;
    const shelfInput = document.getElementById('st-shelf-life');
    const priceInput = document.getElementById('st-price');

    if (val.includes('Tomato')) {
      shelfInput.value = 10;
      priceInput.value = 28;
    } else if (val.includes('Onion')) {
      shelfInput.value = 45;
      priceInput.value = 24.5;
    } else if (val.includes('Potato')) {
      shelfInput.value = 35;
      priceInput.value = 21;
    } else {
      shelfInput.value = 180;
      priceInput.value = 85;
    }
  });

  document.getElementById('storage-advisor-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('st-crop').value;
    const quantity = Number(document.getElementById('st-qty').value);
    const currentPrice = Number(document.getElementById('st-price').value);
    const storageCostPerDay = Number(document.getElementById('st-cost-day').value);
    const storageDays = Number(document.getElementById('st-days').value);

    app.showToast('Evaluating holding cost economics...', 'info');
    const advice = await api.storage.getAdvice({ crop, quantity, currentPrice, storageCostPerDay, storageDays });

    document.getElementById('st-rec-title').innerText = advice.recommendation;
    document.getElementById('st-rec-rationale').innerText = advice.rationale;
    document.getElementById('st-rec-gain').innerText = `+₹${Number(advice.estimatedNetGain).toLocaleString()}`;
    document.getElementById('st-rec-risk').innerText = `Risk: ${advice.riskLevel}`;

    document.getElementById('st-imm-rev').innerText = `₹${(quantity * currentPrice).toLocaleString()}`;
    document.getElementById('st-fee-total').innerText = `-₹${Number(advice.totalStorageCost).toLocaleString()}`;
    document.getElementById('st-fut-price').innerText = `₹${advice.projectedFuturePrice}/kg`;
    document.getElementById('st-net-profit').innerText = `+₹${Number(advice.estimatedNetGain).toLocaleString()}`;

    app.showToast('Storage analysis updated successfully!', 'success');
  });
}
