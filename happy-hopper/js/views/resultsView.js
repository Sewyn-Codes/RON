/* ==========================================================================
   RESULTS / TRANSCRIPT PAGE VIEW
   Year 1 & Year 2 Results Tables, Progression Status, Year 3 Preview
   ========================================================================== */

import { portalState } from '../state.js';

export function renderResultsView() {
  const state = portalState.getState();
  const y1 = state.year1Results;
  const y2 = state.year2Results;

  const renderGradeBadge = (grade) => {
    return `<span class="grade-badge grade-${grade}">${grade}</span>`;
  };

  const renderTableRows = (units) => {
    return units.map(u => `
      <tr>
        <td class="unit-code-col">${u.code}</td>
        <td class="unit-name-col">${u.name}</td>
        <td class="mark-col">${u.mark}</td>
        <td class="grade-col">${renderGradeBadge(u.grade)}</td>
      </tr>
    `).join('');
  };

  return `
    <div class="results-page-container">
      <!-- Page Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
        <span>Academic Results & Transcript Summary</span>
      </div>

      <div class="alert alert-info" style="margin-bottom:16px;">
        Student: <strong>${state.student.name}</strong> &bull; Reg No: <strong>${state.student.regNo}</strong> &bull; Programme: <strong>${state.student.programme}</strong>
      </div>

      <!-- ====================================================================
           YEAR 2 RESULTS (Completed Successfully)
           ==================================================================== -->
      <div class="results-section-wrapper">
        <div class="semester-title-bar year2">
          <span>${y2.semester1.title} (${y2.semester1.academicYear})</span>
          <span class="badge" style="background:#FFFFFF;color:#1E3A8A;">Second Year</span>
        </div>
        <div class="results-table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Unit Code</th>
                <th>Unit Name</th>
                <th style="text-align:center;">Mark</th>
                <th style="text-align:center;">Grade</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(y2.semester1.units)}
              <tr class="results-total-row">
                <td colspan="2" style="font-weight:700;">Semester Totals</td>
                <td class="mark-col" style="font-weight:800;color:var(--dark-nav-blue);">${y2.semester1.total}</td>
                <td class="grade-col" style="font-weight:700;font-size:11px;color:var(--section-green);">${y2.semester1.average}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="results-section-wrapper">
        <div class="semester-title-bar year2">
          <span>${y2.semester2.title} (${y2.semester2.academicYear})</span>
          <span class="badge" style="background:#FFFFFF;color:#1E3A8A;">Second Year</span>
        </div>
        <div class="results-table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Unit Code</th>
                <th>Unit Name</th>
                <th style="text-align:center;">Mark</th>
                <th style="text-align:center;">Grade</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(y2.semester2.units)}
              <tr class="results-total-row">
                <td colspan="2" style="font-weight:700;">Semester Totals</td>
                <td class="mark-col" style="font-weight:800;color:var(--dark-nav-blue);">${y2.semester2.total}</td>
                <td class="grade-col" style="font-weight:700;font-size:11px;color:var(--section-green);">${y2.semester2.average}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ACADEMIC PROGRESSION STATUS SUCCESS PANEL -->
      <div class="progression-status-panel">
        <div class="progression-badge-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="progression-text">
          <h4>ACADEMIC PROGRESSION STATUS</h4>
          <p>SECOND YEAR COMPLETED SUCCESSFULLY</p>
          <div class="badge-pill">Eligible to Progress to Third Year</div>
        </div>
      </div>

      <!-- ====================================================================
           YEAR 1 RESULTS (Reference Data)
           ==================================================================== -->
      <div class="results-section-wrapper">
        <div class="semester-title-bar">
          <span>${y1.semester1.title} (${y1.semester1.academicYear})</span>
          <span class="badge" style="background:#FFFFFF;color:var(--deep-teal);">First Year</span>
        </div>
        <div class="results-table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Unit Code</th>
                <th>Unit Name</th>
                <th style="text-align:center;">Mark</th>
                <th style="text-align:center;">Grade</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(y1.semester1.units)}
              <tr class="results-total-row">
                <td colspan="2" style="font-weight:700;">Totals</td>
                <td class="mark-col" style="font-weight:800;color:var(--dark-nav-blue);">${y1.semester1.total}</td>
                <td class="grade-col" style="font-weight:700;font-size:11px;">PASS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="results-section-wrapper">
        <div class="semester-title-bar">
          <span>${y1.semester2.title} (${y1.semester2.academicYear})</span>
          <span class="badge" style="background:#FFFFFF;color:var(--deep-teal);">First Year</span>
        </div>
        <div class="results-table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Unit Code</th>
                <th>Unit Name</th>
                <th style="text-align:center;">Mark</th>
                <th style="text-align:center;">Grade</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(y1.semester2.units)}
              <tr class="results-total-row">
                <td colspan="2" style="font-weight:700;">Totals</td>
                <td class="mark-col" style="font-weight:800;color:var(--dark-nav-blue);">${y1.semester2.total}</td>
                <td class="grade-col" style="font-weight:700;font-size:11px;">PASS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ====================================================================
           YEAR 3 UPCOMING PREVIEW & CTA
           ==================================================================== -->
      <div class="upcoming-year-card">
        <div class="upcoming-year-header">
          <div>
            <h4>YEAR 3 – UPCOMING</h4>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
              Status: <span class="badge badge-teal">PREPARING FOR REGISTRATION</span> &bull; Expected Start: <strong>September 2026</strong>
            </div>
          </div>
        </div>

        <p style="font-size:12.5px;line-height:1.5;margin:10px 0;">
          Your Third Year academic programme is scheduled to commence in the upcoming September academic period. Please complete course registration and financial clearance where applicable.
        </p>

        <div class="upcoming-unit-list">
          <div class="upcoming-unit-item">
            <strong>NURS 301</strong> Advanced Medical Surgical Nursing I
            <span class="badge badge-warning" style="font-size:10px;">Upcoming</span>
          </div>
          <div class="upcoming-unit-item">
            <strong>NURS 302</strong> Advanced Medical Surgical Nursing II
            <span class="badge badge-warning" style="font-size:10px;">Upcoming</span>
          </div>
          <div class="upcoming-unit-item">
            <strong>NURS 311</strong> Critical Care Nursing
            <span class="badge badge-warning" style="font-size:10px;">Upcoming</span>
          </div>
          <div class="upcoming-unit-item">
            <strong>NURS 321</strong> Community Health Nursing IV
            <span class="badge badge-warning" style="font-size:10px;">Upcoming</span>
          </div>
        </div>

        <a href="#registration" class="btn btn-primary btn-block mt-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          Proceed to Third Year Registration
        </a>
      </div>

      <div style="font-size:11.5px;color:var(--text-muted);text-align:center;margin-top:20px;">
        * Note: All Second Year and Third Year units, marks, and statistics are sample demo records for Betty Aluso's academic portal demonstration.
      </div>
    </div>
  `;
}
