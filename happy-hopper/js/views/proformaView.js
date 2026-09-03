/* ==========================================================================
   SEMESTER PROFORMA VIEW
   Official Registration & Invoicing Proforma Document
   ========================================================================== */

import { portalState } from '../state.js';

export function renderProformaView() {
  const state = portalState.getState();
  const student = state.student;
  const units = state.year3Registration.semester1 || [];
  const selectedUnits = units.filter(u => u.selected);
  const fin = state.financials;

  const formatKES = (val) => {
    return 'KES ' + (parseFloat(val) || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return `
    <div class="proforma-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
        <span>Official Semester Proforma Invoice & Registration Slip</span>
      </div>

      <!-- Action Bar -->
      <div class="flex-between no-print" style="margin-bottom:14px;">
        <span style="font-size:13px;color:var(--text-secondary);">Official Academic Year 2026/2027 Billing & Course Schedule</span>
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Download Proforma
        </button>
      </div>

      <!-- Official Proforma Document -->
      <div class="official-doc-container">
        <!-- Header -->
        <div class="doc-header-block">
          <img src="assets/logo.jpg" alt="Chuka University Crest" class="doc-crest" onerror="this.src='assets/logo.png'" />
          <h2>OFFICIAL ACADEMIC REGISTRATION PROFORMA</h2>
          <h4>School of Nursing & Public Health &bull; Academic Year 2026/2027</h4>
          <p style="font-size:11px;color:#6B7280;margin-top:2px;">Reporting Period: September 2026 &bull; Status: REGISTERED & CLEARED</p>
        </div>

        <!-- Student Profile Table -->
        <table class="doc-student-table">
          <tr>
            <td style="width:20%;font-weight:700;">Student Name:</td>
            <td style="width:30%;">${student.name}</td>
            <td style="width:20%;font-weight:700;">Registration No:</td>
            <td style="width:30%;font-family:var(--font-mono);font-weight:700;">${student.regNo}</td>
          </tr>
          <tr>
            <td style="font-weight:700;">Programme:</td>
            <td>${student.programme}</td>
            <td style="font-weight:700;">Academic Level:</td>
            <td>Third Year (Year 3 Sem 1)</td>
          </tr>
          <tr>
            <td style="font-weight:700;">Campus:</td>
            <td>${student.campus}</td>
            <td style="font-weight:700;">Clearance Status:</td>
            <td style="color:green;font-weight:700;">FULL FINANCIAL CLEARANCE</td>
          </tr>
        </table>

        <!-- Units Table -->
        <div style="font-weight:700;margin:16px 0 8px;font-size:13px;border-bottom:1px solid #000;padding-bottom:4px;">
          I. REGISTERED COURSE UNITS (SEMESTER 1)
        </div>
        <table class="statement-table" style="font-size:12px;margin-bottom:18px;">
          <thead>
            <tr>
              <th style="width:15%;">Unit Code</th>
              <th>Unit Title</th>
              <th style="width:15%;text-align:center;">Credit Units</th>
              <th style="width:15%;text-align:center;">Type</th>
            </tr>
          </thead>
          <tbody>
            ${(selectedUnits.length > 0 ? selectedUnits : units).map(u => `
              <tr>
                <td style="font-family:var(--font-mono);font-weight:700;">${u.code}</td>
                <td>${u.name}</td>
                <td style="text-align:center;">${u.credits || 3}</td>
                <td style="text-align:center;">${u.core ? 'Core' : 'Elective'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Fee Summary Table -->
        <div style="font-weight:700;margin:16px 0 8px;font-size:13px;border-bottom:1px solid #000;padding-bottom:4px;">
          II. INVOICED FEE SUMMARY & SETTLEMENT
        </div>
        <table class="statement-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>Fee Category Item</th>
              <th style="text-align:right;">Invoiced Amount (KES)</th>
              <th style="text-align:right;">Paid (KES)</th>
              <th style="text-align:right;">Balance (KES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuition Fees (Year 3 Sem 1)</td>
              <td class="currency-cell">150,000.00</td>
              <td class="currency-cell">150,000.00</td>
              <td class="currency-cell">0.00</td>
            </tr>
            <tr>
              <td>Hostel Accommodation (Hall 4 - Female)</td>
              <td class="currency-cell">35,000.00</td>
              <td class="currency-cell">35,000.00</td>
              <td class="currency-cell">0.00</td>
            </tr>
            <tr>
              <td>Medical, Union & Library Levies</td>
              <td class="currency-cell">10,000.00</td>
              <td class="currency-cell">10,000.00</td>
              <td class="currency-cell">0.00</td>
            </tr>
            <tr style="font-weight:800;background:#F9FAFB;">
              <td>TOTALS</td>
              <td class="currency-cell">${formatKES(fin.currentCharges)}</td>
              <td class="currency-cell">${formatKES(fin.totalPayments)}</td>
              <td class="currency-cell" style="color:green;">0.00</td>
            </tr>
          </tbody>
        </table>

        <!-- Signatures block -->
        <div class="doc-signature-grid">
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Student's Signature / Date</div>
          </div>
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Dean of Nursing / Registrar Academic Stamp</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
