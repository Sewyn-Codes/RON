/* ==========================================================================
   FEE STATEMENT VIEW
   Matches the institutional Chuka University Student Portal reference layout:
   - Pink/Red "Print Fee Statement" Button
   - Black Table Header with White Text
   - Columns: Posting Date | Ref # | Description | Debit Amount | Credit Amount | Running Balance
   - Striped alternating rows with right-aligned monetary values
   - Dark Navy Bottom Summary Bar with exact totals: Balance -45,080.00 | 419,000.00 | 464,080.00
   - Live Search & Filtering
   ========================================================================== */

import { portalState } from '../state.js';

let feeSearchQuery = '';

export function setFeeSearchQuery(query) {
  feeSearchQuery = query.toLowerCase().trim();
  const tableBody = document.getElementById('fee-statement-tbody');
  const emptyState = document.getElementById('fee-empty-state');
  if (tableBody) {
    const rowsHtml = renderFeeRows(feeSearchQuery);
    tableBody.innerHTML = rowsHtml;
    if (emptyState) {
      emptyState.style.display = rowsHtml.trim() === '' ? 'block' : 'none';
    }
  }
}

function formatCurrency(val) {
  if (val === null || val === undefined || val === '') return '0.00';
  const num = typeof val === 'number' ? val : parseFloat(val) || 0;
  // Format with comma separators and 2 decimal places (e.g. 70,000.00 or -45,080.00)
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function renderFeeRows(filterText = '') {
  const state = portalState.getState();
  const transactions = state.financials.feeTransactions || [];

  const filtered = transactions.filter(t => {
    if (!filterText) return true;
    const dateMatch = (t.postingDate || '').toLowerCase().includes(filterText);
    const refMatch = (t.refNo || '').toLowerCase().includes(filterText);
    const descMatch = (t.description || '').toLowerCase().includes(filterText);
    return dateMatch || refMatch || descMatch;
  });

  if (filtered.length === 0) {
    return '';
  }

  return filtered.map((t, idx) => {
    const isEven = idx % 2 === 1;
    const debitFormatted = t.debit === 0 ? '0.00' : formatCurrency(t.debit);
    const creditFormatted = t.credit === 0 ? '0.00' : formatCurrency(t.credit);
    const balanceFormatted = formatCurrency(t.balance);

    return `
      <tr class="fee-row ${isEven ? 'row-even' : 'row-odd'}">
        <td class="fee-date-cell">${t.postingDate}</td>
        <td class="fee-ref-cell">${t.refNo}</td>
        <td class="fee-desc-cell">${t.description}</td>
        <td class="fee-amount-cell debit-cell">${debitFormatted}</td>
        <td class="fee-amount-cell credit-cell">${creditFormatted}</td>
        <td class="fee-amount-cell balance-cell ${t.balance < 0 ? 'negative-balance' : ''}">${balanceFormatted}</td>
      </tr>
    `;
  }).join('');
}

export function renderFeesView() {
  const state = portalState.getState();
  const summary = state.financials.summary || {
    totalDebit: 419000.00,
    totalCredit: 464080.00,
    finalBalance: -45080.00
  };

  return `
    <div class="fee-statement-page">
      
      <!-- Page Heading -->
      <div class="fee-page-header">
        <h2 class="fee-main-title">Fee Statement</h2>
      </div>

      <!-- Main White Content Card -->
      <div class="fee-statement-card">
        
        <!-- Upper Header Action Bar: Pink/Red Print Button & Search Field -->
        <div class="fee-card-top-bar no-print">
          <!-- Pink/Red Print Button -->
          <button 
            class="btn-print-fee-statement" 
            onclick="window.print()" 
            title="Print Official Fee Statement"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span>Print Fee Statement</span>
          </button>

          <!-- Search & Filter Bar -->
          <div class="fee-search-filter-box">
            <svg class="fee-filter-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              class="fee-filter-input" 
              placeholder="Filter by date, ref#, or description..." 
              value="${feeSearchQuery}"
              oninput="window.portalApp.handleFeeSearch(event)"
            />
            ${feeSearchQuery ? `
              <button class="fee-filter-clear" onclick="window.portalApp.clearFeeSearch()">✕</button>
            ` : ''}
          </div>
        </div>

        <!-- Printable University Document Header (Visible in Print & Official Preview) -->
        <div class="fee-print-header">
          <div class="fee-print-brand">
            <img src="assets/logo.jpg" alt="Chuka University Crest" class="fee-print-crest" onerror="this.src='assets/logo.png'" />
            <div class="fee-print-titles">
              <h2>CHUKA UNIVERSITY</h2>
              <h3>OFFICIAL STUDENT FINANCIAL FEE STATEMENT</h3>
              <p>Student Financial Services &bull; Directorate of Finance</p>
            </div>
          </div>
          <div class="fee-print-student-info">
            <div class="fee-info-row">
              <span class="info-tag">Student Name:</span>
              <span class="info-val"><strong>${state.student.displayName || state.student.name}</strong></span>
              <span class="info-tag">Reg Number:</span>
              <span class="info-val font-mono"><strong>${state.student.regNo}</strong></span>
            </div>
            <div class="fee-info-row">
              <span class="info-tag">Programme:</span>
              <span class="info-val">${state.student.programme}</span>
              <span class="info-tag">Academic Status:</span>
              <span class="info-val" style="color:#059669;font-weight:700;">Year 3 &bull; Full Time</span>
            </div>
          </div>
        </div>

        <!-- Fee Transactions Responsive Table Container -->
        <div class="fee-table-responsive-container">
          <table class="fee-transaction-table" id="fee-statement-table">
            <thead>
              <tr class="fee-table-dark-header">
                <th class="col-date">Posting Date</th>
                <th class="col-ref">Ref #</th>
                <th class="col-desc">Description</th>
                <th class="col-amount text-right">Debit Amount</th>
                <th class="col-amount text-right">Credit Amount</th>
                <th class="col-amount text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody id="fee-statement-tbody">
              ${renderFeeRows(feeSearchQuery)}
            </tbody>
          </table>

          <!-- Empty search state -->
          <div id="fee-empty-state" class="fee-empty-notice" style="display:none;">
            No transaction records matched your search query.
          </div>
        </div>

        <!-- Dark Navy Bottom Summary / Footer Bar matching Reference Screenshot -->
        <div class="fee-bottom-summary-bar">
          <div class="summary-balance-badge">
            <span class="summary-balance-label">Balance:</span>
            <span class="summary-balance-value">${formatCurrency(summary.finalBalance)}</span>
          </div>

          <div class="summary-totals-cluster">
            <div class="summary-column debit-col">
              <span class="summary-col-label">Total Debit</span>
              <span class="summary-col-value gold-text">${formatCurrency(summary.totalDebit)}</span>
            </div>

            <div class="summary-column credit-col">
              <span class="summary-col-label">Total Credit</span>
              <span class="summary-col-value gold-text">${formatCurrency(summary.totalCredit)}</span>
            </div>
          </div>
        </div>

        <!-- Print Sign-off block -->
        <div class="fee-print-signatures">
          <div class="sig-box">
            <div class="sig-line"></div>
            <p>Student Signature &bull; Date</p>
          </div>
          <div class="sig-box">
            <div class="sig-line"></div>
            <p>Finance Officer Official Stamp</p>
          </div>
        </div>

      </div>

      <!-- Quick Payment Action Floating Bar (Demo) -->
      <div class="portal-card mt-3 no-print" style="background:#FFFFFF;border-left:4px solid var(--primary-teal);">
        <div class="card-body flex-between" style="padding:14px 18px;">
          <div>
            <div style="font-weight:700;font-size:14px;color:var(--dark-nav-blue);">Need to settle semester fees or view receipts?</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
              Current balance is <strong style="color:${summary.finalBalance <= 0 ? '#10B981' : '#DC2626'};">${formatCurrency(summary.finalBalance)} KES</strong> (All accounts in good standing).
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-green btn-sm" onclick="window.portalApp.openModal('modal-fee-payment')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Make Payment (Demo)
            </button>
            <a href="#receipts" class="btn btn-outline btn-sm">
              Official Receipts &rarr;
            </a>
          </div>
        </div>
      </div>

    </div>
  `;
}
