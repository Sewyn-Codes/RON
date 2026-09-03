/* ==========================================================================
   RECEIPTS VIEW
   Official Payment Receipts & Printable Modal Preview
   ========================================================================== */

import { portalState } from '../state.js';

export function renderReceiptsView() {
  const state = portalState.getState();
  const receipts = state.receipts || [];

  const formatKES = (val) => {
    return 'KES ' + (parseFloat(val) || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return `
    <div class="receipts-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        <span>Official Payment Receipts</span>
      </div>

      <!-- Receipts List -->
      <div style="margin-bottom:20px;">
        ${receipts.length === 0 ? `
          <div class="alert alert-info">No payment receipts found.</div>
        ` : receipts.map(rec => `
          <div class="receipt-card-item">
            <div class="receipt-top">
              <div>
                <span class="receipt-no">${rec.id}</span>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Channel: <strong>${rec.channel}</strong></div>
              </div>
              <div class="text-right">
                <span class="receipt-amount">${formatKES(rec.amount)}</span>
                <div style="margin-top:2px;"><span class="badge badge-success">${rec.status}</span></div>
              </div>
            </div>

            <div class="receipt-meta">
              <span>Date: <strong>${rec.date}</strong> &bull; Ref: <strong style="font-family:var(--font-mono);">${rec.refCode}</strong></span>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" onclick="window.portalApp.openReceiptModal('${rec.id}')">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  View Receipt
                </button>
                <button class="btn btn-primary btn-sm" onclick="window.portalApp.printReceipt('${rec.id}')">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Print / Download
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
