/* ==========================================================================
   MODALS & TOAST NOTIFICATION COMPONENT
   Academic Calendar Modal, Fee Payment Simulator, Receipt Modal, Toasts
   ========================================================================== */

import { portalState } from '../state.js';

export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : type === 'warning'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

  toast.innerHTML = `
    <span style="display:flex;align-items:center;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Render the Academic Calendar Modal
export function renderAcademicCalendarModal() {
  return `
    <div id="modal-academic-calendar" class="modal-backdrop" onclick="if(event.target === this) window.portalApp.closeModal('modal-academic-calendar')">
      <div class="modal-dialog">
        <div class="modal-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <h3 class="modal-title">Academic Calendar 2026/2027</h3>
          </div>
          <button class="modal-close-btn" onclick="window.portalApp.closeModal('modal-academic-calendar')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-info" style="margin-bottom:14px;">
            <strong>Bachelor of Science in Nursing</strong> – Year 3 Schedule of Events
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="border:1px solid var(--border-color);border-radius:6px;padding:12px;background:var(--card-subtle);">
              <div style="font-weight:700;color:var(--primary-teal);margin-bottom:6px;">FIRST SEMESTER (SEPTEMBER – DECEMBER 2026)</div>
              <table style="width:100%;font-size:12.5px;border-collapse:collapse;">
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Mon 01/09/2026</td>
                  <td style="padding:6px 0;">Reporting & Online Course Registration Commences</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Mon 08/09/2026</td>
                  <td style="padding:6px 0;">Lectures and Practical Lab Rotations Begin</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Fri 26/09/2026</td>
                  <td style="padding:6px 0;">Deadline for Course Add/Drop & Fee Clearance</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">19/10 – 23/10/2026</td>
                  <td style="padding:6px 0;">Continuous Assessment Tests (CATs) I</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">16/11 – 20/11/2026</td>
                  <td style="padding:6px 0;">Continuous Assessment Tests (CATs) II & Lab OSCE</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Fri 27/11/2026</td>
                  <td style="padding:6px 0;">Lectures End</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-weight:600;">07/12 – 18/12/2026</td>
                  <td style="padding:6px 0;color:var(--section-green);font-weight:700;">End of Semester University Examinations</td>
                </tr>
              </table>
            </div>

            <div style="border:1px solid var(--border-color);border-radius:6px;padding:12px;background:var(--card-subtle);">
              <div style="font-weight:700;color:var(--dark-nav-blue);margin-bottom:6px;">SECOND SEMESTER (JANUARY – APRIL 2027)</div>
              <table style="width:100%;font-size:12.5px;border-collapse:collapse;">
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Mon 11/01/2027</td>
                  <td style="padding:6px 0;">Reporting & Hospital Clinical Placement Posting</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 0;font-weight:600;">Mon 18/01/2027</td>
                  <td style="padding:6px 0;">Lectures & Advanced Clinical Rotations Commence</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-weight:600;">12/04 – 23/04/2027</td>
                  <td style="padding:6px 0;color:var(--section-green);font-weight:700;">End of Semester University Examinations</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Calendar
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.portalApp.closeModal('modal-academic-calendar')">Close</button>
        </div>
      </div>
    </div>
  `;
}

// Render the Fee Payment Simulator Modal
export function renderFeePaymentModal() {
  return `
    <div id="modal-fee-payment" class="modal-backdrop" onclick="if(event.target === this) window.portalApp.closeModal('modal-fee-payment')">
      <div class="modal-dialog">
        <div class="modal-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            <h3 class="modal-title">Fee Payment Simulator (Demo)</h3>
          </div>
          <button class="modal-close-btn" onclick="window.portalApp.closeModal('modal-fee-payment')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" style="font-size:12px;margin-bottom:14px;">
            This is a simulated demo payment channel for testing real-time portal fee clearance and instant receipt generation.
          </div>
          
          <form id="payment-sim-form" onsubmit="window.portalApp.handleDemoPayment(event)">
            <div class="form-group">
              <label class="form-label">Payment Channel</label>
              <select class="form-select" id="pay-channel" required>
                <option value="M-Pesa Paybill (247247)">M-Pesa Paybill (Paybill: 247247)</option>
                <option value="Equity Bank Direct Deposit">Equity Bank Direct Deposit</option>
                <option value="Co-operative Bank Branch">Co-operative Bank Branch</option>
                <option value="Visa/Mastercard (Online)">Visa / Mastercard (Online Gateway)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Amount to Pay (KES)</label>
              <input type="number" class="form-control" id="pay-amount" value="45000" min="1000" step="500" required />
            </div>

            <div class="form-group">
              <label class="form-label">Simulated Transaction Reference (Optional)</label>
              <input type="text" class="form-control" id="pay-ref" placeholder="e.g. QK89201LMN" />
            </div>

            <button type="submit" class="btn btn-green btn-block mt-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Confirm Simulated Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// Render Receipt View Modal
export function renderReceiptViewModal() {
  return `
    <div id="modal-receipt-view" class="modal-backdrop" onclick="if(event.target === this) window.portalApp.closeModal('modal-receipt-view')">
      <div class="modal-dialog" style="max-width:540px;">
        <div class="modal-header">
          <h3 class="modal-title" id="receipt-modal-title">Payment Receipt</h3>
          <button class="modal-close-btn" onclick="window.portalApp.closeModal('modal-receipt-view')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body" id="receipt-modal-body" style="background:#FFFFFF;color:#20242A;">
          <!-- Injected dynamically -->
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Receipt
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.portalApp.closeModal('modal-receipt-view')">Close</button>
        </div>
      </div>
    </div>
  `;
}
