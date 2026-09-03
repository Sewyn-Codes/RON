/* ==========================================================================
   TRANSCRIPT VIEW
   Official Printable Consolidated Academic Transcript (Years 1 & 2)
   ========================================================================== */

import { portalState } from '../state.js';

export function renderTranscriptView() {
  const state = portalState.getState();
  const student = state.student;
  const y1 = state.year1Results;
  const y2 = state.year2Results;

  const renderUnitRows = (units) => {
    return units.map(u => `
      <tr>
        <td style="font-family:var(--font-mono);font-weight:700;padding:5px 8px;">${u.code}</td>
        <td style="padding:5px 8px;">${u.name}</td>
        <td style="text-align:center;padding:5px 8px;font-weight:600;">${u.mark}</td>
        <td style="text-align:center;padding:5px 8px;font-weight:800;">${u.grade}</td>
      </tr>
    `).join('');
  };

  return `
    <div class="transcript-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        <span>Official Consolidated Academic Transcript</span>
      </div>

      <!-- Action Bar -->
      <div class="flex-between no-print" style="margin-bottom:14px;">
        <span style="font-size:13px;color:var(--text-secondary);">Certified academic transcript of records for Year 1 and Year 2.</span>
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Download Certified Transcript
        </button>
      </div>

      <!-- Official Transcript Document -->
      <div class="official-doc-container">
        <!-- Header -->
        <div class="doc-header-block">
          <img src="assets/logo.jpg" alt="Chuka University Crest" class="doc-crest" onerror="this.src='assets/logo.png'" />
          <h2>OFFICIAL ACADEMIC TRANSCRIPT OF RECORDS</h2>
          <h4>School of Nursing & Public Health</h4>
          <p style="font-size:11px;color:#6B7280;margin-top:2px;">(Issued without alterations or erasures)</p>
        </div>

        <!-- Student Details Table -->
        <table class="doc-student-table" style="font-size:12px;border:1px solid #E5E7EB;margin-bottom:18px;">
          <tr>
            <td style="font-weight:700;width:20%;background:#F9FAFB;">STUDENT NAME:</td>
            <td style="width:30%;font-weight:800;">${student.name.toUpperCase()}</td>
            <td style="font-weight:700;width:20%;background:#F9FAFB;">REGISTRATION NO:</td>
            <td style="width:30%;font-weight:800;font-family:var(--font-mono);">${student.regNo}</td>
          </tr>
          <tr>
            <td style="font-weight:700;background:#F9FAFB;">PROGRAMME:</td>
            <td>${student.programme}</td>
            <td style="font-weight:700;background:#F9FAFB;">DATE OF BIRTH:</td>
            <td>${student.dob}</td>
          </tr>
          <tr>
            <td style="font-weight:700;background:#F9FAFB;">CAMPUS:</td>
            <td>${student.campus}</td>
            <td style="font-weight:700;background:#F9FAFB;">STATUS:</td>
            <td style="font-weight:700;color:green;">PROGRESSING TO THIRD YEAR</td>
          </tr>
        </table>

        <!-- Year 1 Results -->
        <div style="font-size:12.5px;font-weight:800;background:#F3F4F6;padding:4px 8px;margin:12px 0 6px;border-left:3px solid #147C70;">
          FIRST YEAR EXAMINATIONS (ACADEMIC YEAR 2024/2025)
        </div>

        <table class="statement-table" style="font-size:11.5px;margin-bottom:12px;">
          <thead>
            <tr>
              <th style="width:18%;">Course Code</th>
              <th>Course Title</th>
              <th style="width:12%;text-align:center;">Mark %</th>
              <th style="width:12%;text-align:center;">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" style="background:#FAF5FF;font-weight:700;font-size:11px;color:#6B21A8;">-- SEMESTER 1 --</td></tr>
            ${renderUnitRows(y1.semester1.units)}
            <tr style="font-weight:700;background:#F9FAFB;">
              <td colspan="2">Semester 1 Total:</td>
              <td style="text-align:center;">${y1.semester1.total}</td>
              <td style="text-align:center;color:green;">PASS</td>
            </tr>

            <tr><td colspan="4" style="background:#FAF5FF;font-weight:700;font-size:11px;color:#6B21A8;">-- SEMESTER 2 --</td></tr>
            ${renderUnitRows(y1.semester2.units)}
            <tr style="font-weight:700;background:#F9FAFB;">
              <td colspan="2">Semester 2 Total:</td>
              <td style="text-align:center;">${y1.semester2.total}</td>
              <td style="text-align:center;color:green;">PASS</td>
            </tr>
          </tbody>
        </table>

        <!-- Year 2 Results -->
        <div style="font-size:12.5px;font-weight:800;background:#F3F4F6;padding:4px 8px;margin:18px 0 6px;border-left:3px solid #1E3A8A;">
          SECOND YEAR EXAMINATIONS (ACADEMIC YEAR 2025/2026)
        </div>

        <table class="statement-table" style="font-size:11.5px;margin-bottom:16px;">
          <thead>
            <tr>
              <th style="width:18%;">Course Code</th>
              <th>Course Title</th>
              <th style="width:12%;text-align:center;">Mark %</th>
              <th style="width:12%;text-align:center;">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" style="background:#EFF6FF;font-weight:700;font-size:11px;color:#1E40AF;">-- SEMESTER 1 --</td></tr>
            ${renderUnitRows(y2.semester1.units)}
            <tr style="font-weight:700;background:#F9FAFB;">
              <td colspan="2">Semester 1 Total:</td>
              <td style="text-align:center;">${y2.semester1.total}</td>
              <td style="text-align:center;color:green;">${y2.semester1.average}</td>
            </tr>

            <tr><td colspan="4" style="background:#EFF6FF;font-weight:700;font-size:11px;color:#1E40AF;">-- SEMESTER 2 --</td></tr>
            ${renderUnitRows(y2.semester2.units)}
            <tr style="font-weight:700;background:#F9FAFB;">
              <td colspan="2">Semester 2 Total:</td>
              <td style="text-align:center;">${y2.semester2.total}</td>
              <td style="text-align:center;color:green;">${y2.semester2.average}</td>
            </tr>
          </tbody>
        </table>

        <!-- Grading Key -->
        <div style="font-size:10.5px;color:#4B5563;background:#F9FAFB;padding:8px 12px;border:1px solid #E5E7EB;border-radius:4px;">
          <strong>KEY TO GRADING SYSTEM:</strong><br />
          A: 70% – 100% (Excellent) &bull; B: 60% – 69% (Good) &bull; C: 50% – 59% (Satisfactory) &bull; D: 40% – 49% (Pass) &bull; F: 0% – 39% (Fail) &bull; INC: Incomplete
        </div>

        <!-- Official Signatures -->
        <div class="doc-signature-grid">
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Dean, School of Nursing & Public Health</div>
          </div>
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Registrar (Academic Affairs) & Official University Seal</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
