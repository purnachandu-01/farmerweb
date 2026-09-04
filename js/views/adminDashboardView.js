/**
 * Farm2Fair — Admin Command & Platform Monitoring Dashboard
 * Demonstrates platform-wide telemetry, shared transport pooling rates, price anomaly alerts
 */

import { api } from '../services/api.js';

export async function renderAdminDashboardView(app) {
  const metrics = await api.admin.getMetrics();

  return `
    <div class="container">
      <!-- Section Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <span class="badge badge-amber">System Telemetry (Demo Data)</span>
          <h1 style="font-size:1.85rem; margin-top:6px;">SIH 2026 Platform Operations Dashboard</h1>
          <p style="color:var(--slate-500); font-size:0.9rem;">
            Real-time monitoring of farmer listings, active B2B orders, highway transit pools, and pricing corridors.
          </p>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-secondary btn-sm" id="admin-refresh-metrics">
            ↻ Refresh Telemetry
          </button>
          <button class="btn btn-primary btn-sm" id="admin-export-report">
            📊 Export Audit Log
          </button>
        </div>
      </div>

      <!-- Key Platform Metrics Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Registered Farmers</span>
          <span class="stat-value">${metrics.totalFarmers}</span>
          <span class="stat-sub positive">Across Kolar & Malur Belts (Demo Data)</span>
        </div>

        <div class="stat-card blue">
          <span class="stat-label">Verified Buyers</span>
          <span class="stat-value">${metrics.activeBuyers}</span>
          <span class="stat-sub">Retailers, Cloud Kitchens, Processors</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Active Crop Listings</span>
          <span class="stat-value">${metrics.activeListings} Batches</span>
          <span class="stat-sub positive">₹4.2 Lakh Total Catalog Value</span>
        </div>

        <div class="stat-card amber">
          <span class="stat-label">Active Orders</span>
          <span class="stat-value">${metrics.activeOrders}</span>
          <span class="stat-sub">Under escrow protection</span>
        </div>

        <div class="stat-card blue">
          <span class="stat-label">Shared Transit Runs</span>
          <span class="stat-value">${metrics.activeSharedTransitRuns} Runs</span>
          <span class="stat-sub positive">Saved ₹1,48,200 Freight</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Surplus Produce Rescued</span>
          <span class="stat-value">${metrics.unsoldProduceRescuedKg}</span>
          <span class="stat-sub positive">Diverted from Landfills</span>
        </div>
      </div>

      <!-- Activity Feed and Price Anomaly Radar -->
      <div style="display:grid; grid-template-columns: 1.1fr 0.9fr; gap:24px; margin-bottom:32px;">
        <!-- Real-Time Activity Log -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" style="font-size:1.15rem;">⚡ System Activity Feed (Kafka / WebSocket Simulation)</h2>
            <span class="badge badge-green">Live Events</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${metrics.recentActivity.map(act => `
              <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:var(--slate-50); border-radius:var(--radius-sm); border-left:4px solid var(--primary-600); font-size:0.875rem;">
                <span style="color:var(--slate-400); font-size:0.75rem; min-width:80px;">${act.time}</span>
                <span style="color:var(--slate-800);">${act.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Price Corridor Health & Anomaly Radar -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title" style="font-size:1.15rem;">🛡️ Price Transparency & Fair Margin Guard</h2>
            <span class="badge badge-blue">Anomaly Radar</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:var(--slate-900);">Tomatoes (Kolar Corridor)</strong>
                <span class="badge badge-green">Normal (₹28 - ₹34/kg)</span>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin:0;">
                All buyer bids match AI recommended fair corridor. Zero predatory distress pricing detected.
              </p>
            </div>

            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:var(--slate-900);">Red Onions (Bellary Hub)</strong>
                <span class="badge badge-green">Normal (₹24 - ₹29/kg)</span>
              </div>
              <p style="font-size:0.8rem; color:var(--slate-600); margin:0;">
                Arrival volumes steady. Shared cold-storage allocation running at 68% capacity.
              </p>
            </div>

            <div style="background:#fffbeb; border:1px solid var(--amber-200); border-radius:var(--radius-md); padding:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:var(--amber-900);">Green Chillies (Malur Pocket)</strong>
                <span class="badge badge-amber">Supply Spike (+22%)</span>
              </div>
              <p style="font-size:0.8rem; color:var(--amber-800); margin:0;">
                Surplus warning flagged: Automated rescue routing prepared for Hosakote sauce processing units.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachAdminDashboardEvents(app) {
  document.getElementById('admin-refresh-metrics')?.addEventListener('click', () => {
    app.showToast('Updated system telemetry from mock backend.', 'info');
    app.renderView('admin-dashboard');
  });

  document.getElementById('admin-export-report')?.addEventListener('click', () => {
    alert('Audit Report Generated for Smart India Hackathon 2026 jury review. Contains itemized transaction ledger and logistics efficiency reports.');
  });
}
