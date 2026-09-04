/**
 * Farm2Fair — Group Transportation & Logistics Pooling Module
 * Aggregates smallholder harvest shipments into shared vehicles, reducing freight costs by 38%
 */

import { api } from '../services/api.js';

export async function renderGroupLogisticsView(app) {
  const pools = await api.transport.getPools();
  const activePool = pools[0];

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Shared Agri-Logistics</span>
        <h1 class="section-title">Group Transportation & Route Pooling</h1>
        <p class="section-desc">
          Smallholder farmers lose significant margins when hiring independent mini-trucks for partial loads.
          Farm2Fair groups neighbouring shipments heading to common city hubs along highway corridors.
        </p>
      </div>

      <!-- Conceptual Flow Diagram -->
      <div class="card" style="margin-bottom:24px; background:linear-gradient(135deg, #ffffff, #f0fdf4); border:1.5px solid var(--primary-200);">
        <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--primary-800); margin-bottom:14px;">
          Dynamic Shipment Aggregation Concept:
        </div>
        
        <div style="display:flex; align-items:center; justify-content:center; gap:20px; flex-wrap:wrap; padding:10px 0;">
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="badge badge-green" style="padding:6px 14px; font-size:0.85rem;">👨‍🌾 Farmer A (Ramesh - 500 kg Tomatoes)</div>
            <div class="badge badge-green" style="padding:6px 14px; font-size:0.85rem;">👨‍🌾 Farmer B (Suresh - 300 kg Chillies)</div>
            <div class="badge badge-green" style="padding:6px 14px; font-size:0.85rem;">👨‍🌾 Farmer C (Venkatesh - 400 kg Capsicum)</div>
          </div>

          <div style="font-size:2rem; font-weight:800; color:var(--primary-600);">➔</div>

          <div style="background:var(--primary-600); color:white; padding:16px 22px; border-radius:var(--radius-lg); text-align:center; box-shadow:var(--shadow-md);">
            <div style="font-size:1.8rem; margin-bottom:4px;">🚚</div>
            <div style="font-weight:800; font-size:1rem;">Shared Tata 407 Eco-Van</div>
            <small style="opacity:0.9;">1,200 kg Total Payload (80% full)</small>
          </div>

          <div style="font-size:2rem; font-weight:800; color:var(--primary-600);">➔</div>

          <div style="background:white; border:2px solid var(--tech-500); padding:16px 20px; border-radius:var(--radius-lg); text-align:center;">
            <div style="font-size:1.8rem; margin-bottom:4px;">🏢</div>
            <div style="font-weight:800; font-size:1rem; color:var(--slate-900);">Bengaluru Hub</div>
            <small style="color:var(--slate-500);">Green Valley & Supermarkets</small>
          </div>
        </div>
      </div>

      <!-- Active Pooling Cluster Details -->
      <div style="display:grid; grid-template-columns: 1.15fr 0.85fr; gap:24px; margin-bottom:32px;">
        <!-- Interactive Route Schematic Map -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">🗺️ Route Visualization (NH-75 Corridor)</h2>
              <p style="font-size:0.85rem; color:var(--slate-500);">Simulated multi-stop milk-run route (illustrative map representation)</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-optimize-route-sim">
              ⚡ Optimize Route
            </button>
          </div>

          <!-- Stylized Dark Vector Map -->
          <div class="route-map-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span style="font-size:0.85rem; color:var(--primary-300); font-weight:700;">
                Live Route: Kolar ➔ Malur ➔ Tekal ➔ KR Puram Hub
              </span>
              <span class="badge badge-amber">Departure: Today 4:30 PM</span>
            </div>

            <svg viewBox="0 0 540 220" style="width:100%; height:200px; overflow:visible;">
              <!-- Highway Line -->
              <path d="M 50 140 Q 150 60 270 120 T 480 80" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round" />
              <path id="route-animated-path" d="M 50 140 Q 150 60 270 120 T 480 80" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="8,5" />

              <!-- Waypoint 1: Kolar -->
              <circle cx="50" cy="140" r="10" fill="#10b981" stroke="#ffffff" stroke-width="2" />
              <text x="50" y="172" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Stop 1: Kolar</text>
              <text x="50" y="186" fill="#94a3b8" font-size="9" text-anchor="middle">Ramesh (500 kg)</text>

              <!-- Waypoint 2: Malur -->
              <circle cx="190" cy="88" r="9" fill="#3b82f6" stroke="#ffffff" stroke-width="2" />
              <text x="190" y="66" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Stop 2: Malur</text>
              <text x="190" y="52" fill="#94a3b8" font-size="9" text-anchor="middle">Suresh (300 kg)</text>

              <!-- Waypoint 3: Tekal -->
              <circle cx="310" cy="115" r="9" fill="#f59e0b" stroke="#ffffff" stroke-width="2" />
              <text x="310" y="148" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Stop 3: Tekal</text>
              <text x="310" y="162" fill="#94a3b8" font-size="9" text-anchor="middle">Venkatesh (400 kg)</text>

              <!-- Destination Hub -->
              <circle cx="480" cy="80" r="13" fill="#ef4444" stroke="#ffffff" stroke-width="3" />
              <text x="480" y="115" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Bengaluru Hub</text>
              <text x="480" y="129" fill="#cbd5e1" font-size="9" text-anchor="middle">Delivery Central</text>
            </svg>

            <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:0.8rem; color:#cbd5e1; border-top:1px solid #334155; padding-top:10px;">
              <span>Total Distance: <strong>58 km</strong></span>
              <span>Est. Transit Duration: <strong>1 hr 45 min</strong></span>
              <span>Vehicle Capacity: <strong>1,500 kg</strong></span>
            </div>
          </div>
        </div>

        <!-- Savings & Pool Breakdown -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div class="card" style="border-top:4px solid var(--primary-600);">
            <div class="card-header">
              <h3 style="font-size:1.15rem; margin:0;">💰 Cost Optimization Impact</h3>
              <span class="badge badge-green">38% Cost Cut</span>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
              <div style="background:#fee2e2; border-radius:var(--radius-md); padding:14px; text-align:center;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#991b1b;">Independent Vans</div>
                <div style="font-size:1.5rem; font-weight:800; color:#dc2626;">₹4,600</div>
                <small style="color:#7f1d1d; font-size:0.75rem;">3 separate empty trips</small>
              </div>

              <div style="background:var(--primary-100); border-radius:var(--radius-md); padding:14px; text-align:center;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary-900);">Farm2Fair Pooled</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--primary-800);">₹2,850</div>
                <small style="color:var(--primary-800); font-size:0.75rem;">Shared single transit</small>
              </div>
            </div>

            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:12px 14px; font-size:0.85rem;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span>Ramesh Patel (500 kg share):</span>
                <strong>₹1,187 <span style="color:var(--primary-700);">(Saved ₹713)</span></strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span>Suresh Gowda (300 kg share):</span>
                <strong>₹712 <span style="color:var(--primary-700);">(Saved ₹488)</span></strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span>Venkatesh R. (400 kg share):</span>
                <strong>₹951 <span style="color:var(--primary-700);">(Saved ₹549)</span></strong>
              </div>
            </div>
          </div>

          <!-- Pickup Roster Card -->
          <div class="card">
            <h3 style="font-size:1.05rem; margin-bottom:12px;">👨‍🌾 Farmers in this Shared Run</h3>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${activePool.farmers.map(f => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--slate-50); border-radius:6px; border:1px solid var(--border-color); font-size:0.85rem;">
                  <div>
                    <strong style="color:var(--slate-900);">${f.name}</strong>
                    <div style="font-size:0.75rem; color:var(--slate-500);">${f.village}</div>
                  </div>
                  <div style="text-align:right;">
                    <span class="badge badge-blue">${f.qty} kg</span>
                    <div style="font-size:0.75rem; color:var(--slate-500); margin-top:2px;">${f.crop}</div>
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

export function attachGroupLogisticsEvents(app) {
  document.getElementById('btn-optimize-route-sim')?.addEventListener('click', async () => {
    app.showToast('Running TSP Dijkstra Route Optimization algorithm...', 'info');
    const result = await api.transport.optimizeRoute('tr-pool-01');

    const path = document.getElementById('route-animated-path');
    if (path) {
      path.setAttribute('stroke', '#38bdf8');
      path.setAttribute('stroke-width', '5');
      setTimeout(() => {
        path.setAttribute('stroke', '#10b981');
        path.setAttribute('stroke-width', '4');
      }, 1000);
    }

    app.showToast('Route re-optimized! Fuel consumption reduced by an extra 4.2%.', 'success');
  });
}
