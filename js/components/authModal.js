/**
 * Farm2Fair — Authentication & Role Switcher Modal
 * Enables judges to switch between Farmer, Buyer, Consumer, and Admin views instantly
 * or sign in / sign up with custom credentials.
 */

export class AuthModal {
  constructor(app) {
    this.app = app;
    this.mode = 'login'; // 'login' | 'signup'
  }

  render() {
    let modal = document.getElementById('auth-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'auth-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:480px;">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">${this.mode === 'login' ? 'Welcome to Farm2Fair' : 'Create an Account'}</h3>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-top:2px;">
              ${this.mode === 'login' ? 'Sign in to access your role-specific dashboard' : 'Join the fair agri supply network'}
            </p>
          </div>
          <button class="modal-close" id="close-auth-modal">✕</button>
        </div>

        <div class="modal-body">
          <!-- Role Selector -->
          <div style="margin-bottom:18px;">
            <label class="form-label">Select Your Role</label>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:6px;">
              <button type="button" class="btn btn-sm role-select-btn ${this.app.currentRole === 'farmer' ? 'btn-primary' : 'btn-secondary'}" data-role="farmer">
                👨‍🌾 Farmer
              </button>
              <button type="button" class="btn btn-sm role-select-btn ${this.app.currentRole === 'buyer' ? 'btn-primary' : 'btn-secondary'}" data-role="buyer">
                🏢 Buyer
              </button>
              <button type="button" class="btn btn-sm role-select-btn ${this.app.currentRole === 'consumer' ? 'btn-primary' : 'btn-secondary'}" data-role="consumer">
                🛒 Consumer
              </button>
              <button type="button" class="btn btn-sm role-select-btn ${this.app.currentRole === 'admin' ? 'btn-primary' : 'btn-secondary'}" data-role="admin">
                ⚙️ Admin
              </button>
            </div>
          </div>

          <form id="auth-form">
            ${this.mode === 'signup' ? `
              <div class="form-group">
                <label class="form-label">Full Name / Organization</label>
                <input type="text" class="form-control" id="auth-name" placeholder="e.g., Ramesh Patel or Fresh Foods Ltd" required />
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">Email or Mobile Number</label>
              <input type="text" class="form-control" id="auth-identifier" 
                     value="${this.mode === 'login' ? this.getDefaultCredential() : ''}" 
                     placeholder="e.g., 9845012345 or user@example.com" required />
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" id="auth-password" value="demo123" placeholder="••••••••" required />
            </div>

            ${this.mode === 'signup' ? `
              <div class="form-group">
                <label class="form-label">Location / District</label>
                <input type="text" class="form-control" id="auth-location" placeholder="e.g., Kolar, Karnataka" required />
              </div>
            ` : ''}

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-size:0.85rem;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="checkbox" checked /> Remember session
              </label>
              <a href="#" id="auth-forgot" style="color:var(--primary-600); font-weight:600;">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:12px;">
              ${this.mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style="text-align:center; margin-top:16px; font-size:0.875rem; color:var(--slate-600);">
            ${this.mode === 'login' ? `
              Don't have an account? <a href="#" id="toggle-auth-mode" style="color:var(--primary-600); font-weight:700;">Sign Up</a>
            ` : `
              Already have an account? <a href="#" id="toggle-auth-mode" style="color:var(--primary-600); font-weight:700;">Sign In</a>
            `}
          </div>

          <div style="margin-top:18px; padding:12px; background:var(--slate-50); border-radius:var(--radius-md); font-size:0.8rem; color:var(--slate-500); border:1px dashed var(--slate-300);">
            💡 <strong>Hackathon Quick Tip:</strong> Click any role above to instantly switch your active dashboard perspective.
          </div>
        </div>
      </div>
    `;

    this.attachEvents(modal);
  }

  getDefaultCredential() {
    switch (this.app.currentRole) {
      case 'farmer': return 'ramesh.patel@kolarfarms.in';
      case 'buyer': return 'procure@greenvalleyfresh.com';
      case 'consumer': return 'priya.sharma@example.com';
      case 'admin': return 'admin@farm2fair.gov.in.demo';
      default: return 'demo@farm2fair.in';
    }
  }

  attachEvents(modal) {
    modal.querySelector('#close-auth-modal').addEventListener('click', () => this.close());

    modal.querySelectorAll('.role-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const role = e.currentTarget.dataset.role;
        this.app.setRole(role);
        this.render();
      });
    });

    modal.querySelector('#toggle-auth-mode').addEventListener('click', (e) => {
      e.preventDefault();
      this.mode = this.mode === 'login' ? 'signup' : 'login';
      this.render();
    });

    modal.querySelector('#auth-forgot')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.app.showToast('Password reset link sent to registered mobile/email (demo simulation).', 'info');
    });

    modal.querySelector('#auth-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const identifier = modal.querySelector('#auth-identifier').value;
      const name = modal.querySelector('#auth-name')?.value || 'Demo User';
      const location = modal.querySelector('#auth-location')?.value || 'Bengaluru';

      this.app.setUser({
        name: name,
        email: identifier,
        role: this.app.currentRole,
        location: location
      });

      this.close();
      this.app.showToast(`Logged in successfully as ${this.app.currentRole.toUpperCase()}`, 'success');
      this.app.navigateToRoleDashboard(this.app.currentRole);
    });
  }

  open(mode = 'login') {
    this.mode = mode;
    this.render();
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('open');
  }

  close() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('open');
  }
}
