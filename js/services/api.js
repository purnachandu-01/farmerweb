/**
 * Farm2Fair — Centralized API Client Layer
 * Connects directly to the Python Flask REST backend (/api/...)
 * Automatically falls back to local in-memory mockDb if server is offline.
 */

import { mockDb } from './mockDb.js';

// Base API configuration (empty prefix uses same-origin relative URLs)
const API_BASE = (typeof window !== 'undefined' && window.ENV && window.ENV.API_URL) 
  ? window.ENV.API_URL 
  : '';

// Generic fetch helper with timeout and automatic fallback
async function fetchWithFallback(url, options = {}, fallbackFn) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(API_BASE + url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    // console.info(`Backend fetch failed for ${url}, using offline fallback:`, err.message);
  }

  // If backend is unavailable or error, call offline fallback
  if (fallbackFn) {
    return await fallbackFn();
  }
  throw new Error(`Request to ${url} failed`);
}

export const api = {
  // Authentication endpoints
  auth: {
    async login(identifier, password, role) {
      return fetchWithFallback('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password, role })
      }, async () => {
        const user = mockDb.users.find(u => 
          (u.email.toLowerCase() === identifier.toLowerCase() || u.phone.includes(identifier))
        ) || {
          id: 'usr-' + Date.now(),
          name: identifier.split('@')[0] || 'Demo User',
          role: role || 'farmer',
          email: identifier,
          phone: '+91 98000 00000',
          location: 'Bengaluru Agri Hub'
        };
        return { success: true, user };
      });
    },

    async register(userData) {
      return fetchWithFallback('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      }, async () => {
        const newUser = { id: 'usr-' + Date.now(), ...userData, verified: true };
        mockDb.users.push(newUser);
        return { success: true, user: newUser };
      });
    }
  },

  // Crop listings endpoints
  crops: {
    async getAll(filters = {}) {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const qs = params.toString() ? `?${params.toString()}` : '';
      return fetchWithFallback(`/api/crops${qs}`, { method: 'GET' }, async () => {
        let results = [...mockDb.crops];
        if (filters.category && filters.category !== 'All') {
          results = results.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters.search) {
          const q = filters.search.toLowerCase();
          results = results.filter(c => c.crop.toLowerCase().includes(q) || c.farmerLocation.toLowerCase().includes(q));
        }
        return results;
      });
    },

    async getById(id) {
      return fetchWithFallback(`/api/crops/${id}`, { method: 'GET' }, async () => {
        const crop = mockDb.crops.find(c => c.id === id);
        if (!crop) throw new Error('Crop not found');
        return crop;
      });
    },

    async create(cropData) {
      return fetchWithFallback('/api/crops', {
        method: 'POST',
        body: JSON.stringify(cropData)
      }, async () => {
        const baseEstimate = cropData.farmerPrice || 25;
        const newListing = {
          id: 'crop-' + Date.now(),
          farmerId: cropData.farmerId || 'usr-f-1',
          farmerName: cropData.farmerName || 'Ramesh Patel',
          farmerLocation: cropData.location || 'Kolar, Karnataka',
          crop: cropData.crop,
          category: cropData.category || 'Vegetables',
          quantity: Number(cropData.quantity),
          unit: cropData.unit || 'kg',
          quality: cropData.quality || 'Grade A',
          farmerPrice: Number(cropData.farmerPrice),
          aiSuggestedMin: Math.round(baseEstimate * 0.95),
          aiSuggestedMax: Math.round(baseEstimate * 1.18),
          harvestDate: cropData.harvestDate || new Date().toISOString().split('T')[0],
          distanceKm: 38,
          shelfLifeDays: 10,
          image: cropData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
          status: 'active',
          description: cropData.description || 'Farm-fresh quality produce directly listed by the grower.'
        };
        mockDb.crops.unshift(newListing);
        return newListing;
      });
    }
  },

  // AI Fair Price Prediction endpoint
  predictions: {
    async getFairPrice(params) {
      return fetchWithFallback('/api/predictions/price', {
        method: 'POST',
        body: JSON.stringify(params)
      }, async () => {
        const { crop, quantity = 500, quality = 'Grade A', location = 'Kolar' } = params;
        const min = 28;
        const max = 34;
        return {
          crop,
          location,
          quantity,
          quality,
          currency: '₹',
          unit: 'kg',
          suggestedMin: min,
          suggestedMax: max,
          confidence: '91%',
          demandLevel: 'High',
          marketTrend: '+14% upward',
          factors: [
            { name: 'Seasonal Festivity & Mandi Arrival Flow', weight: '+12%', impact: 'positive' },
            { name: 'Regional Wholesale Shortfall (APMC Catchment)', weight: '+8%', impact: 'positive' },
            { name: 'Quality Grade Premium (Grade A)', weight: '+5%', impact: 'positive' },
            { name: 'Inter-district Transport Fuel Index', weight: '-3%', impact: 'negative' }
          ],
          historicalTrend: [
            { day: 'Day -14', mandiPrice: 23, fairCorridor: 25 },
            { day: 'Day -10', mandiPrice: 24, fairCorridor: 26 },
            { day: 'Day -7',  mandiPrice: 25, fairCorridor: 28 },
            { day: 'Day -3',  mandiPrice: 27, fairCorridor: 30 },
            { day: 'Today',   mandiPrice: 28, fairCorridor: 31 },
            { day: 'Day +3 (Forecast)', mandiPrice: 29, fairCorridor: 33 },
            { day: 'Day +7 (Forecast)', mandiPrice: 30, fairCorridor: 34 }
          ],
          disclaimer: 'Illustrative prototype result generated by Farm2Fair AI engine.'
        };
      });
    }
  },

  // Smart Buyer Matching
  buyers: {
    async getMatches(cropId) {
      return fetchWithFallback('/api/buyers/matches', { method: 'GET' }, async () => {
        return mockDb.buyers;
      });
    }
  },

  // Logistics & Shared Pooling
  transport: {
    async getPools() {
      return fetchWithFallback('/api/transport/pools', { method: 'GET' }, async () => {
        return mockDb.transportationPools;
      });
    },

    async optimizeRoute(clusterId) {
      return fetchWithFallback('/api/transport/optimize', {
        method: 'POST',
        body: JSON.stringify({ clusterId })
      }, async () => {
        const pool = mockDb.transportationPools[0];
        return {
          ...pool,
          optimizedStatus: 'Optimized',
          savingsSummary: 'Combining 3 farmer pickups on NH-75 reduces transit expenses by 38% vs individual van rentals.'
        };
      });
    }
  },

  // Price Transparency Breakdown
  priceBreakdown: {
    async get(cropName = 'Tomato') {
      return fetchWithFallback(`/api/price-breakdown?crop=${encodeURIComponent(cropName)}`, { method: 'GET' }, async () => {
        const found = Object.keys(mockDb.priceBreakdownData).find(k => k.toLowerCase().includes(cropName.toLowerCase()));
        return mockDb.priceBreakdownData[found] || mockDb.priceBreakdownData['Hybrid Tomato (Sahu Red)'];
      });
    }
  },

  // Smart Storage Recommendation ("Sell Now or Store?")
  storage: {
    async getAdvice(params) {
      return fetchWithFallback('/api/storage/advice', {
        method: 'POST',
        body: JSON.stringify(params)
      }, async () => {
        const { crop, quantity = 1000, currentPrice = 28, storageCostPerDay = 0.15, storageDays = 20 } = params;
        const totalStorageCost = (storageCostPerDay * storageDays * quantity);
        const projectedFuturePrice = currentPrice * 1.18;
        const netGain = (projectedFuturePrice * quantity) - totalStorageCost - (currentPrice * quantity);

        return {
          crop,
          quantity,
          currentPrice,
          projectedFuturePrice: projectedFuturePrice.toFixed(2),
          totalStorageCost: totalStorageCost.toFixed(2),
          estimatedNetGain: netGain.toFixed(2),
          recommendation: netGain > 1500 ? 'Consider Short-Term Cold Storage (15-25 Days)' : 'Consider Selling Fresh Produce Now',
          rationale: netGain > 1500 
            ? `Expected mandi arrivals will dip in 3 weeks, yielding a projected net upside of ₹${netGain.toFixed(0)} after accounting for storage rentals.`
            : 'High spoilage risk or storage cost outweighs projected price appreciation. Selling fresh is optimal.',
          riskLevel: netGain > 1500 ? 'Moderate (Cold-Chain Dependent)' : 'Low',
          confidence: '84% (Prototype Model)'
        };
      });
    }
  },

  // Unsold Produce Rescue
  rescue: {
    async getDestinations() {
      return fetchWithFallback('/api/rescue/destinations', { method: 'GET' }, async () => {
        return mockDb.unsoldRescueOptions;
      });
    },

    async submitRescueRequest(requestData) {
      return fetchWithFallback('/api/rescue/request', {
        method: 'POST',
        body: JSON.stringify(requestData)
      }, async () => {
        mockDb.adminMetrics.recentActivity.unshift({
          time: 'Just now',
          text: `Unsold produce rescue requested: ${requestData.quantity} kg of ${requestData.crop}`
        });
        return {
          success: true,
          message: 'Rescue request broadcasted to 4 nearby processing & community food channels.'
        };
      });
    }
  },

  // Orders
  orders: {
    async create(orderData) {
      return fetchWithFallback('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      }, async () => {
        const newOrder = {
          id: 'ord-' + Date.now().toString().slice(-4),
          ...orderData,
          status: 'Order Placed & Scheduled',
          createdAt: new Date().toLocaleString()
        };
        mockDb.orders.unshift(newOrder);
        mockDb.adminMetrics.activeOrders += 1;
        return newOrder;
      });
    },

    async getAll() {
      return fetchWithFallback('/api/orders', { method: 'GET' }, async () => {
        return mockDb.orders;
      });
    }
  },

  // Admin Metrics
  admin: {
    async getMetrics() {
      return fetchWithFallback('/api/admin/metrics', { method: 'GET' }, async () => {
        return mockDb.adminMetrics;
      });
    }
  }
};
