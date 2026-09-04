/**
 * Farm2Fair — Demand Forecasting ("Demand Insights") Module
 * Predicts upcoming urban consumer and institutional demand to help farmers plan sowing & harvest
 */

import { mockDb } from '../services/mockDb.js';

export function renderDemandInsightsView(app) {
  const forecasts = mockDb.demandForecasts;

  return `
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" style="text-align:left; margin-bottom:24px;">
        <span class="section-tag">Market Intelligence</span>
        <h1 class="section-title">Demand Insights & Production Forecasting</h1>
        <p class="section-desc">
          Empowering farmers with forward-looking urban demand signals so you harvest and sell into rising price corridors rather than glutted markets.
        </p>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="prototype-disclaimer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>Demo Data:</strong> Demand forecasts are generated from simulated APMC arrival histories and Bengaluru commercial kitchen purchasing schedules.
        </div>
      </div>

      <!-- Live Demand Rank Cards -->
      <div class="stats-grid" style="margin-bottom:32px;">
        ${forecasts.map(f => `
          <div class="card" style="border-left:5px solid ${f.demandLevel === 'High' ? 'var(--primary-600)' : (f.demandLevel.includes('Medium') ? 'var(--tech-500)' : 'var(--amber-500)')};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
              <h3 style="font-size:1.2rem; margin:0;">${f.crop}</h3>
              <span class="badge ${f.demandLevel === 'High' ? 'badge-green' : 'badge-blue'}">
                ${f.demandLevel} Demand
              </span>
            </div>

            <div style="font-size:0.85rem; color:var(--slate-600); margin-bottom:8px;">
              Trend: <strong style="color:var(--primary-700);">${f.trend}</strong>
            </div>

            <div style="font-size:0.8rem; color:var(--slate-500); margin-bottom:12px; line-height:1.4;">
              💡 <em>${f.seasonality}</em>
            </div>

            <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:10px; font-size:0.8rem;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span>Buyer Inquiries Today:</span>
                <strong style="color:var(--tech-600);">${f.buyerInquiriesToday} RFQs</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span>Expected Corridor:</span>
                <strong style="color:var(--primary-700);">${f.priceOutlook}</strong>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Demand Projection Visual Chart -->
      <div class="card" style="margin-bottom:32px;">
        <div class="card-header">
          <div>
            <h2 class="card-title">📈 6-Month Projected Demand Indices (Festive vs Monsoon Cycles)</h2>
            <p style="font-size:0.85rem; color:var(--slate-500);">Anticipated commercial kitchen & retail buyer purchasing volumes</p>
          </div>
          <span class="badge badge-blue">Quarterly Trend</span>
        </div>

        <div style="background:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px;">
          <svg viewBox="0 0 700 220" style="width:100%; height:200px; overflow:visible;">
            <!-- Grid -->
            <line x1="40" y1="40" x2="680" y2="40" stroke="#e2e8f0" stroke-dasharray="4" />
            <line x1="40" y1="90" x2="680" y2="90" stroke="#e2e8f0" stroke-dasharray="4" />
            <line x1="40" y1="140" x2="680" y2="140" stroke="#e2e8f0" stroke-dasharray="4" />
            <line x1="40" y1="190" x2="680" y2="190" stroke="#cbd5e1" stroke-width="1.5" />

            <!-- Y labels -->
            <text x="32" y="44" font-size="10" fill="#94a3b8" text-anchor="end">Peak</text>
            <text x="32" y="94" font-size="10" fill="#94a3b8" text-anchor="end">High</text>
            <text x="32" y="144" font-size="10" fill="#94a3b8" text-anchor="end">Med</text>
            <text x="32" y="194" font-size="10" fill="#94a3b8" text-anchor="end">Low</text>

            <!-- Line 1: Tomatoes (Emerald) -->
            <polyline fill="none" stroke="#10b981" stroke-width="3"
              points="60,150 160,130 260,110 360,70 460,50 560,80 660,100" />
            
            <!-- Line 2: Onions (Tech Blue) -->
            <polyline fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="6,4"
              points="60,110 160,95 260,80 360,75 460,90 560,110 660,120" />

            <!-- Line 3: Potatoes (Amber) -->
            <polyline fill="none" stroke="#f59e0b" stroke-width="2.5"
              points="60,130 160,135 260,140 360,120 460,110 560,115 660,130" />

            <!-- X Labels -->
            <text x="60" y="208" font-size="10" fill="#64748b" text-anchor="middle">July</text>
            <text x="160" y="208" font-size="10" fill="#64748b" text-anchor="middle">August</text>
            <text x="260" y="208" font-size="10" fill="#0f172a" font-weight="bold" text-anchor="middle">September (Now)</text>
            <text x="360" y="208" font-size="10" fill="#64748b" text-anchor="middle">October (Navratri)</text>
            <text x="460" y="208" font-size="10" fill="#64748b" text-anchor="middle">November (Diwali)</text>
            <text x="560" y="208" font-size="10" fill="#64748b" text-anchor="middle">December</text>
            <text x="660" y="208" font-size="10" fill="#64748b" text-anchor="middle">January</text>
          </svg>

          <!-- Legend -->
          <div style="display:flex; justify-content:center; gap:24px; margin-top:16px; font-size:0.85rem; font-weight:600;">
            <span style="color:#10b981;">● Tomatoes (Festive Surge Oct-Nov)</span>
            <span style="color:#3b82f6;">● Onions (Steady Institutional Consumption)</span>
            <span style="color:#f59e0b;">● Potatoes (Balanced Baseline Demand)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
