/**
 * Farm2Fair — Buyer Dashboard View
 * Procurement hub for supermarkets, restaurants, cloud kitchens, and institutional buyers
 */

import { api } from '../services/api.js';

export async function renderBuyerDashboardView(app) {
  const crops = await api.crops.getAll();

  return `
    <div class="container">
      <!-- Section Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge badge-blue">B2B Commercial Procurement</span>
            <span class="badge badge-green">Verified Direct Sourcing</span>
          </div>
          <h1 style="font-size:1.85rem; margin-top:6px;">Buyer Sourcing Hub</h1>
          <p style="color:var(--slate-500); font-size:0.9rem;">
            Procuring directly from regional growers in Kolar, Malur & Bengaluru Rural corridors.
          </p>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-secondary btn-sm" id="buyer-refresh-btn">
            ↻ Refresh Produce
          </button>
          <button class="btn btn-primary btn-sm" id="buyer-view-logistics-btn">
            🚚 Track Shared Deliveries
          </button>
        </div>
      </div>

      <!-- Quick Metrics for Buyer -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Active Regional Listings</span>
          <span class="stat-value">${crops.length} Batches</span>
          <span class="stat-sub positive">Direct from 12 Verified Farms</span>
        </div>
        <div class="stat-card blue">
          <span class="stat-label">Average Sourcing Savings</span>
          <span class="stat-value">26% Saved</span>
          <span class="stat-sub positive">Compared to city APMC wholesalers</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Transit Time</span>
          <span class="stat-value">Same Day</span>
          <span class="stat-sub">Harvest to kitchen under 12 hrs</span>
        </div>
        <div class="stat-card amber">
          <span class="stat-label">Pending Deliveries</span>
          <span class="stat-value">1 Shipment</span>
          <span class="stat-sub">500 kg Tomatoes in transit</span>
        </div>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="card" style="padding:16px; margin-bottom:24px;">
        <div style="display:grid; grid-template-columns: 1.5fr 1fr 1fr 1fr auto; gap:12px; align-items:center;">
          <div>
            <input type="text" class="form-control" id="buyer-search-input" placeholder="🔍 Search crop (e.g., Tomato, Onion, Chilli)..." />
          </div>

          <div>
            <select class="form-control" id="buyer-filter-category">
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Spices">Spices</option>
            </select>
          </div>

          <div>
            <select class="form-control" id="buyer-filter-quality">
              <option value="All">All Quality Grades</option>
              <option value="Grade A">Grade A (Firm/Retail)</option>
              <option value="Grade B">Grade B (Processing)</option>
            </select>
          </div>

          <div>
            <select class="form-control" id="buyer-filter-radius">
              <option value="50">Radius: Within 50 km</option>
              <option value="25">Radius: Within 25 km</option>
              <option value="100">Radius: Within 100 km</option>
            </select>
          </div>

          <button class="btn btn-secondary" id="buyer-filter-clear-btn">
            Reset
          </button>
        </div>
      </div>

      <!-- Available Crops Grid -->
      <div class="crop-grid" id="buyer-crops-grid">
        ${crops.map(crop => `
          <div class="crop-card">
            <div class="crop-img-wrap">
              <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
              <span class="badge badge-green crop-badge-top">${crop.quality}</span>
              <span class="crop-distance-badge">📍 ${crop.distanceKm} km away</span>
            </div>

            <div class="crop-content">
              <div>
                <div class="crop-header">
                  <div>
                    <h3 class="crop-name">${crop.crop}</h3>
                    <div class="farmer-tag">👨‍🌾 ${crop.farmerName} • ${crop.farmerLocation}</div>
                  </div>
                  <span class="badge badge-blue">${crop.quantity} ${crop.unit}</span>
                </div>

                <div class="price-comparison-box">
                  <div>
                    <div class="price-item-label">Farmer Asking Price</div>
                    <div class="price-item-val">₹${crop.farmerPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div class="price-item-label">AI Fair Corridor</div>
                    <div class="price-item-val fair">₹${crop.aiSuggestedMin} - ₹${crop.aiSuggestedMax}</div>
                  </div>
                </div>

                <div style="font-size:0.8rem; color:var(--slate-600); margin-bottom:12px; line-height:1.4;">
                  📅 Harvested: <strong>${crop.harvestDate}</strong> • Shelf-life: ~${crop.shelfLifeDays} days
                </div>
              </div>

              <div style="display:flex; gap:8px;">
                <button class="btn btn-secondary btn-sm buyer-btn-details" data-crop-id="${crop.id}" style="flex:1;">
                  View Details
                </button>
                <button class="btn btn-primary btn-sm buyer-btn-order" data-crop-id="${crop.id}" data-crop-name="${crop.crop}" data-price="${crop.farmerPrice}" style="flex:1;">
                  🛒 Place Order
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachBuyerDashboardEvents(app) {
  // Search & Filter input
  const filterHandler = async () => {
    const search = document.getElementById('buyer-search-input').value;
    const category = document.getElementById('buyer-filter-category').value;
    const crops = await api.crops.getAll({ search, category });

    const grid = document.getElementById('buyer-crops-grid');
    if (!grid) return;

    if (crops.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--slate-500);">No crops matched your filters. Try clearing search filters.</div>`;
      return;
    }

    grid.innerHTML = crops.map(crop => `
      <div class="crop-card">
        <div class="crop-img-wrap">
          <img src="${crop.image}" class="crop-img" alt="${crop.crop}" />
          <span class="badge badge-green crop-badge-top">${crop.quality}</span>
          <span class="crop-distance-badge">📍 ${crop.distanceKm} km away</span>
        </div>

        <div class="crop-content">
          <div>
            <div class="crop-header">
              <div>
                <h3 class="crop-name">${crop.crop}</h3>
                <div class="farmer-tag">👨‍🌾 ${crop.farmerName} • ${crop.farmerLocation}</div>
              </div>
              <span class="badge badge-blue">${crop.quantity} ${crop.unit}</span>
            </div>

            <div class="price-comparison-box">
              <div>
                <div class="price-item-label">Farmer Asking Price</div>
                <div class="price-item-val">₹${crop.farmerPrice.toFixed(2)}</div>
              </div>
              <div>
                <div class="price-item-label">AI Fair Corridor</div>
                <div class="price-item-val fair">₹${crop.aiSuggestedMin} - ₹${crop.aiSuggestedMax}</div>
              </div>
            </div>

            <div style="font-size:0.8rem; color:var(--slate-600); margin-bottom:12px; line-height:1.4;">
              📅 Harvested: <strong>${crop.harvestDate}</strong> • Shelf-life: ~${crop.shelfLifeDays} days
            </div>
          </div>

          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm buyer-btn-details" data-crop-id="${crop.id}" style="flex:1;">
              View Details
            </button>
            <button class="btn btn-primary btn-sm buyer-btn-order" data-crop-id="${crop.id}" data-crop-name="${crop.crop}" data-price="${crop.farmerPrice}" style="flex:1;">
              🛒 Place Order
            </button>
          </div>
        </div>
      </div>
    `).join('');

    attachCardActions();
  };

  const attachCardActions = () => {
    document.querySelectorAll('.buyer-btn-order').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const cropId = e.currentTarget.dataset.cropId;
        const cropName = e.currentTarget.dataset.cropName;
        const price = Number(e.currentTarget.dataset.price);

        const confirmOrder = confirm(`Confirm wholesale purchase of ${cropName} at ₹${price}/kg with grouped logistics delivery?`);
        if (confirmOrder) {
          await api.orders.create({
            cropId,
            cropName,
            farmerName: 'Ramesh Patel',
            buyerName: 'Green Valley Fresh Supermarkets',
            quantity: 300,
            unit: 'kg',
            farmerPricePerKg: price,
            totalAmount: price * 300,
            deliveryAddress: 'Bengaluru East Central Hub'
          });
          app.showToast(`Order placed for 300 kg ${cropName}! Pooled transit scheduled.`, 'success');
        }
      });
    });

    document.querySelectorAll('.buyer-btn-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cropId = e.currentTarget.dataset.cropId;
        app.navigateTo('price-transparency');
      });
    });
  };

  document.getElementById('buyer-search-input')?.addEventListener('input', filterHandler);
  document.getElementById('buyer-filter-category')?.addEventListener('change', filterHandler);
  document.getElementById('buyer-filter-clear-btn')?.addEventListener('click', () => {
    document.getElementById('buyer-search-input').value = '';
    document.getElementById('buyer-filter-category').value = 'All';
    filterHandler();
  });

  document.getElementById('buyer-view-logistics-btn')?.addEventListener('click', () => {
    app.navigateTo('group-logistics');
  });

  attachCardActions();
}
