/* ==========================================================================
   GENERATE GATE PASS VIEW
   Campus Entry & Security Clearance Permit with QR Code & Watermark
   ========================================================================== */

import { portalState } from '../state.js';

export function renderGatePassView() {
  const state = portalState.getState();
  const student = state.student;
  const todayStr = new Date().toLocaleDateString('en-GB');

  return `
    <div class="gate-pass-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        <span>Campus Entry Gate Pass Permit</span>
      </div>

      <!-- Clearance Status Alert -->
      <div class="portal-card">
        <div class="card-body">
          <div class="flex-between">
            <div>
              <div class="font-bold" style="font-size:15px;color:var(--dark-nav-blue);">Financial & Academic Clearance Status</div>
              <div style="font-size:12.5px;color:var(--section-green);font-weight:700;margin-top:2px;">
                ✓ ALL FEES CLEARED &bull; ELIGIBLE FOR SEMESTER GATE ACCESS
              </div>
            </div>
            <span class="badge badge-success" style="font-size:12px;padding:6px 12px;">ACTIVE / VALID</span>
          </div>
        </div>
      </div>

      <!-- Gate Pass Certificate Card -->
      <div class="gate-pass-container">
        <!-- Background Security Demo Watermark -->
        <div class="gate-pass-watermark">DEMO GATE PASS</div>

        <!-- Header -->
        <div class="gate-pass-header">
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="assets/logo.png" alt="Chuka University Crest" style="width:48px;height:48px;object-fit:contain;" />
            <div class="gate-pass-title">
              <h3>STUDENT SEMESTER GATE PASS</h3>
              <p>School of Nursing & Public Health &bull; Main Campus</p>
            </div>
          </div>
          <div class="text-right">
            <span class="badge badge-teal" style="font-size:11px;">SEM 1: 2026/2027</span>
          </div>
        </div>

        <!-- Body -->
        <div class="gate-pass-body">
          <!-- Student Photo -->
          <div style="text-align:center;">
            <img 
              src="${student.avatar || 'assets/profile.jpg'}" 
              alt="${student.displayName || student.name}" 
              class="gate-pass-photo" 
              onerror="this.src='assets/avatar.jpg'"
            />
            <div style="font-size:11px;font-weight:700;color:var(--dark-nav-blue);margin-top:4px;">VERIFIED STUDENT</div>
          </div>

          <!-- Student Information -->
          <div class="gate-pass-details">
            <div>
              <span class="text-muted" style="font-size:11px;text-transform:uppercase;">Student Name</span>
              <div style="font-weight:800;font-size:15px;color:var(--text-primary);">${student.name}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size:11px;text-transform:uppercase;">Registration Number</span>
              <div style="font-weight:700;font-size:14px;color:var(--primary-teal);font-family:var(--font-mono);">${student.regNo}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size:11px;text-transform:uppercase;">Programme & Level</span>
              <div style="font-weight:600;font-size:12.5px;">${student.programme} (Year 3)</div>
            </div>
            <div>
              <span class="text-muted" style="font-size:11px;text-transform:uppercase;">Hostel Residence</span>
              <div style="font-weight:600;font-size:12.5px;color:var(--section-green);">Hall 4 - Female (Room 204)</div>
            </div>
          </div>

          <!-- QR Code for Gate Scanner -->
          <div class="gate-pass-qr">
            <img src="assets/qrcode.svg" alt="Security Verification QR" />
            <span style="font-size:10px;font-family:var(--font-mono);color:var(--text-secondary);">SCAN-8115-2026</span>
          </div>
        </div>

        <!-- Footer / Validity -->
        <div class="gate-pass-footer">
          <div>
            <span>Issued Date: <strong>${todayStr}</strong></span> &bull; 
            <span>Valid Until: <strong>20/12/2026</strong></span>
          </div>
          <div style="font-style:italic;color:var(--deep-teal);font-weight:600;">
            Authorized by Chief Security Officer (Demo)
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;gap:12px;margin-top:10px;">
        <button class="btn btn-green btn-block" onclick="window.print()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Download Official Gate Pass
        </button>
      </div>

      <div style="font-size:11.5px;color:var(--text-muted);text-align:center;margin-top:16px;">
        * Note: This is a demo security pass for academic simulation and portal demonstration.
      </div>
    </div>
  `;
}
