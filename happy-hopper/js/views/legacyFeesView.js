/* ==========================================================================
   LEGACY FEE STATEMENT VIEW
   Historical Semester-by-Semester Balances (Year 1 and Year 2)
   ========================================================================== */

import { portalState } from '../state.js';

export function renderLegacyFeesView() {
  const state = portalState.getState();
  const legacy = state.legacyStatements || [];

  const formatKES = (val) => {
    return (parseFloat(val) || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return `
    <div class="legacy-fees-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <span>Legacy Historical Fee Statement</span>
      </div>

      <div class="portal-card">
        <div class="card-header-bar navy">
          <span>Historical Financial Performance By Semester</span>
        </div>
        <div class="results-table-responsive">
          <table class="statement-table">
            <thead>
              <tr>
                <th>Academic Year</th>
                <th>Semester Level</th>
                <th style="text-align:right;">Opening Bal</th>
                <th style="text-align:right;">Billed Charges</th>
                <th style="text-align:right;">Payments</th>
                <th style="text-align:right;">Closing Bal</th>
              </tr>
            </thead>
            <tbody>
              ${legacy.map(row => `
                <tr>
                  <td style="font-weight:700;color:var(--dark-nav-blue);">${row.year}</td>
                  <td>${row.semester}</td>
                  <td class="currency-cell">${formatKES(row.opening)}</td>
                  <td class="currency-cell">${formatKES(row.charges)}</td>
                  <td class="currency-cell" style="color:var(--section-green);font-weight:600;">${formatKES(row.payments)}</td>
                  <td class="currency-cell" style="font-weight:700;color:var(--section-green);">${formatKES(row.closing)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="card-body" style="background:var(--card-subtle);">
          <div class="alert alert-success" style="margin-bottom:0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Historical Clearance Status:</strong> All historical semesters (Year 1 and Year 2) are fully settled with a closing balance of KES 0.00.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
