/**
 * Farm2Fair — Unsold Crop Rescue Module
 * “Don’t Let Good Produce Go Unsold.”
 * Diverts surplus & near-expiry harvest to secondary food channels and bio-recycling.
 */

import { api } from '../services/api.js';

export async function renderUnsoldCropRescueView(app) {
  const destinations = await api.rescue.getDestinations();

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Zero Food Spoilage Initiative</span>
        <h1 class="section-title">“Don’t Let Good Produce Go Unsold.”</h1>
        <p class="section-desc">
          When primary market orders fall short or harvest batches approach expiration, Farm2Fair connects you with commercial processors, cloud kitchens, community food rescue NGOs, and organic bio-composting networks.
        </p>
      </div>

      <!-- Conceptual Routing Flow Diagram -->
      <div class="card" style="margin-bottom:28px; background:linear-gradient(135deg, #ffffff, #fef2f2); border:1.5px solid #fca5a5;">
        <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:#991b1b; margin-bottom:14px;">
          Dynamic Rescue Routing Hierarchy
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
          <div style="background:#fee2e2; border:1.5px solid #f87171; padding:10px 24px; border-radius:var(--radius-full); font-weight:800; color:#991b1b;">
            👨‍🌾 Farmer's Unsold / Time-Sensitive Harvest Batch
          </div>

          <div style="font-size:1.5rem; color:#dc2626; font-weight:bold;">↓</div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; width:100%;">
            <div style="background:white; border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.5rem; margin-bottom:4px;">🥫</div>
              <strong>Food Processors</strong>
              <small style="display:block; color:var(--slate-500); font-size:0.75rem;">Purees, Sauces, Dehydration</small>
            </div>

            <div style="background:white; border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.5rem; margin-bottom:4px;">🍲</div>
              <strong>Commercial Kitchens</strong>
              <small style="display:block; color:var(--slate-500); font-size:0.75rem;">Same-Day Cooking & Catering</small>
            </div>

            <div style="background:white; border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.5rem; margin-bottom:4px;">🤝</div>
              <strong>NGOs & Food Rescue</strong>
              <small style="display:block; color:var(--slate-500); font-size:0.75rem;">Community Distribution</small>
            </div>

            <div style="background:white; border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.5rem; margin-bottom:4px;">🐄</div>
              <strong>Animal Feed</strong>
              <small style="display:block; color:var(--slate-500); font-size:0.75rem;">Livestock Nutrition</small>
            </div>

            <div style="background:white; border:1px solid var(--border-color); padding:12px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.5rem; margin-bottom:4px;">🌱</div>
              <strong>Bio-Composting</strong>
              <small style="display:block; color:var(--slate-500); font-size:0.75rem;">Organic Soil Enrichment</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout: Broadcast Form + Available Rescue Channels -->
      <div style="display:grid; grid-template-columns: 400px 1fr; gap:24px; margin-bottom:32px;">
        <!-- Rescue Request Form -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" style="font-size:1.15rem;">🚨 Submit Rescue Request</h2>
            <span class="badge badge-amber">Urgent Priority</span>
          </div>

          <form id="rescue-submit-form">
            <div class="form-group">
              <label class="form-label">Produce Commodity</label>
              <select class="form-control" id="res-crop" required>
                <option value="Hybrid Tomato (Sahu Red)" selected>Ripe Hybrid Tomatoes (Surplus)</option>
                <option value="Red Onion (Bellary Medium)">Red Onion (Sprouting risk)</option>
                <option value="Fresh Green Chillies (G4)">Green Chillies (Color turning red)</option>
                <option value="Potatoes (Jyoti Grade-1)">Potatoes (Small/Irregular grade)</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Quantity to Rescue (kg)</label>
                <input type="number" class="form-control" id="res-qty" value="400" min="50" required />
              </div>

              <div class="form-group">
                <label class="form-label">Time Sensitivity</label>
                <select class="form-control" id="res-time-sens">
                  <option value="24 Hours">Critical (Under 24 hrs)</option>
                  <option value="48 Hours" selected>Moderate (24-48 hrs)</option>
                  <option value="3-5 Days">Flexible (3-5 days)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Current Condition / Grade</label>
              <select class="form-control" id="res-grade">
                <option value="Fully Ripe - Ready for Sauce">Fully Ripe (Ideal for Puree/Sauce)</option>
                <option value="Grade B - Minor Surface Blemishes">Grade B (Blemished skin, good pulp)</option>
                <option value="Surplus Unsold Fresh">Surplus Unsold Fresh Produce</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Farm Location</label>
              <input type="text" class="form-control" id="res-loc" value="Vokkaleri, Kolar, Karnataka" required />
            </div>

            <div class="form-group">
              <label class="form-label">Minimum Floor Price Acceptance (₹/kg)</label>
              <input type="number" class="form-control" id="res-min-price" value="16.00" step="0.5" required />
            </div>

            <button type="submit" class="btn btn-amber" style="width:100%; margin-top:6px;">
              🚨 Broadcast to Rescue Channels
            </button>
          </form>
        </div>

        <!-- Channel Cards -->
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="font-size:1.1rem; font-weight:700; color:var(--slate-900);">
            Verified Rescue Channels in Your Radius (50 km):
          </div>

          ${destinations.map(dest => `
            <div class="card" style="padding:18px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                  <h3 style="font-size:1.1rem; color:var(--slate-900); margin:0;">${dest.channel}</h3>
                  <div style="font-size:0.85rem; color:var(--slate-500); margin-top:2px;">
                    Suitability: <strong style="color:var(--primary-700);">${dest.suitability}</strong>
                  </div>
                </div>
                <span class="badge badge-green">${dest.turnaround}</span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--slate-50); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.85rem;">
                <span>Typical Price Recovery: <strong style="color:var(--primary-700);">${dest.priceRealization}</strong></span>
                <button class="btn btn-secondary btn-sm btn-quick-connect" data-channel="${dest.channel}">
                  Connect Channel
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function attachUnsoldCropRescueEvents(app) {
  document.getElementById('rescue-submit-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('res-crop').value;
    const quantity = document.getElementById('res-qty').value;
    const timeSensitivity = document.getElementById('res-time-sens').value;

    app.showToast('Broadcasting urgent rescue alert to partner channels...', 'info');
    await api.rescue.submitRescueRequest({ crop, quantity, timeSensitivity });

    alert(`Rescue Request Successfully Activated!\n\n${quantity} kg of ${crop} has been matched with 3 commercial food processors and 1 community kitchen within 35 km radius. Expect pickup verification within 4 hours.`);
    app.showToast('Rescue request sent to 4 food channels!', 'success');
  });

  document.querySelectorAll('.btn-quick-connect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const channel = e.currentTarget.dataset.channel;
      alert(`Initiating direct dispatch coordination with ${channel}.`);
    });
  });
}
