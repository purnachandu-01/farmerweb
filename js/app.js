/**
 * Farm2Fair — Master SPA Orchestrator & Router
 * Smart India Hackathon 2026 Prototype
 */

import { translations } from './services/i18n.js';
import { AuthModal } from './components/authModal.js';
import { JudgeDemoModal } from './components/judgeDemoModal.js';
import { VoiceAssistantModal } from './components/voiceAssistantModal.js';

// Views
import { renderLandingView, attachLandingEvents } from './views/landingView.js';
import { renderFarmerDashboardView, attachFarmerDashboardEvents } from './views/farmerDashboardView.js';
import { renderAiPriceView, attachAiPriceEvents } from './views/aiPriceView.js';
import { renderBuyerDashboardView, attachBuyerDashboardEvents } from './views/buyerDashboardView.js';
import { renderSmartMatchingView, attachSmartMatchingEvents } from './views/smartMatchingView.js';
import { renderGroupLogisticsView, attachGroupLogisticsEvents } from './views/groupLogisticsView.js';
import { renderPriceTransparencyView, attachPriceTransparencyEvents } from './views/priceTransparencyView.js';
import { renderSmartStorageView, attachSmartStorageEvents } from './views/smartStorageView.js';
import { renderUnsoldCropRescueView, attachUnsoldCropRescueEvents } from './views/unsoldCropRescueView.js';
import { renderMarketplaceView, attachMarketplaceEvents } from './views/marketplaceView.js';
import { renderDemandInsightsView } from './views/demandInsightsView.js';
import { renderConsumerMarketplaceView, attachConsumerMarketplaceEvents } from './views/consumerMarketplaceView.js';
import { renderAdminDashboardView, attachAdminDashboardEvents } from './views/adminDashboardView.js';
import { renderAboutView } from './views/aboutView.js';

class Farm2FairApp {
  constructor() {
    this.currentView = 'landing';
    this.currentRole = 'farmer';
    this.currentLang = 'en';
    this.currentUser = {
      name: 'Ramesh Patel',
      role: 'farmer',
      location: 'Kolar, Karnataka',
      email: 'ramesh.patel@kolarfarms.in'
    };

    this.authModal = new AuthModal(this);
    this.judgeDemoModal = new JudgeDemoModal(this);
    this.voiceModal = new VoiceAssistantModal(this);

    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.renderHeader();
    this.renderView('landing');

    // Handle initial hash routing if present
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      this.navigateTo(initialHash);
    }
  }

  t(key) {
    return translations[this.currentLang]?.[key] || translations['en']?.[key] || key;
  }

  setRole(role) {
    this.currentRole = role;
    this.currentUser.role = role;
    this.renderHeader();
    this.showToast(`Switched active perspective to: ${role.toUpperCase()}`, 'info');
  }

  setUser(userData) {
    this.currentUser = { ...this.currentUser, ...userData };
    this.currentRole = userData.role || this.currentRole;
    this.renderHeader();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.renderHeader();
    this.renderView(this.currentView);
    this.showToast(`Language set to ${lang.toUpperCase()}`, 'info');
  }

  navigateTo(viewName, options = {}) {
    this.currentView = viewName;
    window.location.hash = viewName;
    this.renderHeader();
    this.renderView(viewName, options);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToRoleDashboard(role) {
    switch (role) {
      case 'farmer':
        this.navigateTo('farmer-dashboard');
        break;
      case 'buyer':
        this.navigateTo('buyer-dashboard');
        break;
      case 'consumer':
        this.navigateTo('consumer-marketplace');
        break;
      case 'admin':
        this.navigateTo('admin-dashboard');
        break;
      default:
        this.navigateTo('farmer-dashboard');
    }
  }

  renderHeader() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    const navItems = [
      { id: 'landing', label: 'Home', icon: '🏠' },
      { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
      { id: 'ai-price', label: 'AI Price', icon: '📊' },
      { id: 'smart-matching', label: 'Find Buyers', icon: '🤝' },
      { id: 'group-logistics', label: 'Logistics', icon: '🚚' },
      { id: 'price-transparency', label: 'Price Transparency', icon: '🔍' },
      { id: 'smart-storage', label: 'Storage', icon: '🏪' },
      { id: 'unsold-rescue', label: 'Rescue', icon: '🛡️' },
      { id: 'demand-insights', label: 'Insights', icon: '📈' },
      { id: 'about', label: 'About', icon: 'ℹ️' }
    ];

    navContainer.innerHTML = `
      <div class="nav-container">
        <!-- Logo -->
        <div class="brand-logo" id="brand-home-btn">
          <div class="brand-icon">F2F</div>
          <div class="brand-text">
            <span class="brand-title">Farm2<span>Fair</span></span>
            <span class="brand-subtitle">${this.t('brandSubtitle')}</span>
          </div>
        </div>

        <!-- Desktop Navigation Links -->
        <ul class="nav-links">
          ${navItems.map(item => `
            <li>
              <button class="nav-link ${this.currentView === item.id ? 'active' : ''}" data-view="${item.id}">
                <span>${item.icon}</span> ${item.label}
              </button>
            </li>
          `).join('')}
        </ul>

        <!-- Controls: Language, Voice, Role Switcher, Auth -->
        <div class="nav-controls">
          <!-- Voice Button -->
          <button class="btn-voice" id="header-voice-btn" title="Speak to Farm2Fair">
            🎤 Speak
          </button>

          <!-- Language Selector -->
          <select class="lang-select" id="header-lang-select">
            <option value="en" ${this.currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="te" ${this.currentLang === 'te' ? 'selected' : ''}>తెలుగు</option>
            <option value="hi" ${this.currentLang === 'hi' ? 'selected' : ''}>हिन्दी</option>
            <option value="ta" ${this.currentLang === 'ta' ? 'selected' : ''}>தமிழ்</option>
            <option value="kn" ${this.currentLang === 'kn' ? 'selected' : ''}>ಕನ್ನಡ</option>
          </select>

          <!-- Quick Role Switcher for Hackathon Judges -->
          <div class="role-pill-selector">
            <button class="role-pill-btn ${this.currentRole === 'farmer' ? 'active' : ''}" data-role="farmer" title="Switch to Farmer View">
              Farmer
            </button>
            <button class="role-pill-btn ${this.currentRole === 'buyer' ? 'active' : ''}" data-role="buyer" title="Switch to Buyer View">
              Buyer
            </button>
            <button class="role-pill-btn ${this.currentRole === 'consumer' ? 'active' : ''}" data-role="consumer" title="Switch to Consumer View">
              Consumer
            </button>
            <button class="role-pill-btn ${this.currentRole === 'admin' ? 'active' : ''}" data-role="admin" title="Switch to Admin View">
              Admin
            </button>
          </div>

          <!-- Auth Button -->
          <button class="btn btn-primary btn-sm" id="header-auth-btn">
            👤 ${this.currentUser.name ? this.currentUser.name.split(' ')[0] : 'Sign In'}
          </button>
        </div>
      </div>
    `;

    this.attachHeaderEvents();
  }

  attachHeaderEvents() {
    document.getElementById('brand-home-btn')?.addEventListener('click', () => this.navigateTo('landing'));

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.navigateTo(view);
      });
    });

    document.getElementById('header-lang-select')?.addEventListener('change', (e) => {
      this.setLanguage(e.currentTarget.value);
    });

    document.getElementById('header-voice-btn')?.addEventListener('click', () => {
      this.voiceModal.open();
    });

    document.querySelectorAll('.role-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const role = e.currentTarget.dataset.role;
        this.setRole(role);
        this.navigateToRoleDashboard(role);
      });
    });

    document.getElementById('header-auth-btn')?.addEventListener('click', () => {
      this.authModal.open('login');
    });

    // Mobile nav links
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.navigateTo(view);
      });
    });
  }

  async renderView(viewName, options = {}) {
    const root = document.getElementById('app-root');
    if (!root) return;

    // Render loading state briefly for smooth transition
    root.innerHTML = `
      <div style="text-align:center; padding:80px 20px; color:var(--slate-400);">
        <div style="font-size:2rem; margin-bottom:12px;">🌱</div>
        <div>Loading Farm2Fair Intelligence...</div>
      </div>
    `;

    try {
      let content = '';

      switch (viewName) {
        case 'landing':
          content = renderLandingView(this);
          root.innerHTML = content;
          attachLandingEvents(this);
          break;

        case 'farmer-dashboard':
          content = await renderFarmerDashboardView(this, options);
          root.innerHTML = content;
          attachFarmerDashboardEvents(this);
          break;

        case 'ai-price':
          content = await renderAiPriceView(this);
          root.innerHTML = content;
          attachAiPriceEvents(this);
          break;

        case 'buyer-dashboard':
          content = await renderBuyerDashboardView(this);
          root.innerHTML = content;
          attachBuyerDashboardEvents(this);
          break;

        case 'smart-matching':
          content = await renderSmartMatchingView(this);
          root.innerHTML = content;
          attachSmartMatchingEvents(this);
          break;

        case 'group-logistics':
          content = await renderGroupLogisticsView(this);
          root.innerHTML = content;
          attachGroupLogisticsEvents(this);
          break;

        case 'price-transparency':
          content = await renderPriceTransparencyView(this);
          root.innerHTML = content;
          attachPriceTransparencyEvents(this);
          break;

        case 'smart-storage':
          content = await renderSmartStorageView(this);
          root.innerHTML = content;
          attachSmartStorageEvents(this);
          break;

        case 'unsold-rescue':
          content = await renderUnsoldCropRescueView(this);
          root.innerHTML = content;
          attachUnsoldCropRescueEvents(this);
          break;

        case 'marketplace':
          content = await renderMarketplaceView(this);
          root.innerHTML = content;
          attachMarketplaceEvents(this);
          break;

        case 'demand-insights':
          content = renderDemandInsightsView(this);
          root.innerHTML = content;
          break;

        case 'consumer-marketplace':
          content = await renderConsumerMarketplaceView(this);
          root.innerHTML = content;
          attachConsumerMarketplaceEvents(this);
          break;

        case 'admin-dashboard':
          content = await renderAdminDashboardView(this);
          root.innerHTML = content;
          attachAdminDashboardEvents(this);
          break;

        case 'about':
          content = renderAboutView(this);
          root.innerHTML = content;
          break;

        default:
          content = renderLandingView(this);
          root.innerHTML = content;
          attachLandingEvents(this);
      }
    } catch (err) {
      console.error('View render error:', err);
      root.innerHTML = `
        <div class="container" style="padding:60px 20px; text-align:center;">
          <h3>Error loading view</h3>
          <p style="color:var(--slate-500);">${err.message}</p>
          <button class="btn btn-primary" onclick="window.farm2fairApp.navigateTo('landing')">Return Home</button>
        </div>
      `;
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div style="font-size:1.1rem;">
        ${type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : 'ℹ️')}
      </div>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  launchJudgeDemo() {
    this.judgeDemoModal.open(1);
  }

  openVoiceAssistant() {
    this.voiceModal.open();
  }

  bindGlobalEvents() {
    document.getElementById('top-banner-demo-btn')?.addEventListener('click', () => {
      this.launchJudgeDemo();
    });
  }
}

// Instantiate and expose to window
window.addEventListener('DOMContentLoaded', () => {
  window.farm2fairApp = new Farm2FairApp();
});
