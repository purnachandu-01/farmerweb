/**
 * Farm2Fair — About Page View
 * Mission, Architecture, Value Distribution Approach, SIH 2026 Background
 */

export function renderAboutView(app) {
  return `
    <div class="container" style="max-width:1000px; padding:40px 20px;">
      <!-- Main Mission Statement -->
      <div style="text-align:center; margin-bottom:48px;">
        <span class="badge badge-green" style="margin-bottom:12px; font-size:0.85rem; padding:6px 16px;">
          Smart India Hackathon 2026 Project
        </span>
        <h1 style="font-size:2.6rem; color:var(--slate-900); margin-bottom:16px;">
          About Farm2Fair
        </h1>
        <p style="font-size:1.15rem; color:var(--slate-600); max-width:800px; margin:0 auto; line-height:1.7;">
          Farm2Fair is an AI-powered agricultural supply-chain assistant designed to improve market transparency, connect farmers with suitable buyers, support smarter logistics and help create fairer value distribution across the agricultural supply chain.
        </p>
      </div>

      <!-- Core Approach Flow Diagram -->
      <div class="card" style="margin-bottom:40px; padding:32px; background:linear-gradient(135deg, #ffffff, #f0fdf4); border:1.5px solid var(--primary-300);">
        <h2 style="font-size:1.3rem; text-align:center; margin-bottom:24px; color:var(--primary-900);">
          Our Value Distribution Approach
        </h2>

        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">1</div>
            <strong style="font-size:0.85rem;">Farmer</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">2</div>
            <strong style="font-size:0.85rem;">Information</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">3</div>
            <strong style="font-size:0.85rem;">Fairer Price</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">4</div>
            <strong style="font-size:0.85rem;">Better Market Access</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">5</div>
            <strong style="font-size:0.85rem;">Efficient Logistics</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">6</div>
            <strong style="font-size:0.85rem;">Transparent Transaction</strong>
          </div>
          <span style="color:var(--primary-500); font-weight:bold;">→</span>

          <div style="text-align:center; flex:1; min-width:90px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--primary-600); color:white; display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-weight:bold;">7</div>
            <strong style="font-size:0.85rem; color:var(--primary-700);">Consumer</strong>
          </div>
        </div>
      </div>

      <!-- Key Philosophy & Realism Statement -->
      <div class="card" style="margin-bottom:32px;">
        <h2 style="font-size:1.3rem; margin-bottom:14px;">Our Core Philosophy: Preserving Essential Value</h2>
        <p style="font-size:0.95rem; color:var(--slate-600); line-height:1.6; margin-bottom:12px;">
          Many agri-tech concepts simplify reality by claiming to “eliminate all middlemen.” In Indian agriculture, services such as rural transportation, batch aggregation, quality grading, and cold storage are vital to keep supply chains running.
        </p>
        <p style="font-size:0.95rem; color:var(--slate-600); line-height:1.6;">
          <strong>Farm2Fair's distinctive innovation</strong> is eliminating <em>avoidable inefficiencies, information blindspots, and predatory margins</em> while providing technology to pool transportation, establish AI fair-price corridors, and guarantee complete price transparency.
        </p>
      </div>

      <!-- Technical Architecture Overview -->
      <div class="card">
        <h2 style="font-size:1.3rem; margin-bottom:14px;">Prototype Architecture (SIH 2026)</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; font-size:0.875rem;">
          <div style="background:var(--slate-50); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--slate-900);">Frontend Interface</strong>
            <p style="color:var(--slate-500); margin:4px 0 0;">Modular SPA with HTML5, modern CSS3, Lucide icons, responsive mobile layouts, and Web Speech API.</p>
          </div>

          <div style="background:var(--slate-50); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--slate-900);">Centralized API Layer</strong>
            <p style="color:var(--slate-500); margin:4px 0 0;"><code>services/api.js</code> REST architecture with mock persistence, environment-ready for Node.js / Express & MongoDB.</p>
          </div>

          <div style="background:var(--slate-50); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--slate-900);">AI / ML Services</strong>
            <p style="color:var(--slate-500); margin:4px 0 0;">Prototype multi-factor regression, buyer matching rankers, and Dijkstra route optimization designed for Python FastAPI endpoints.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
