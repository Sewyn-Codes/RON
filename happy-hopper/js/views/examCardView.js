/* ==========================================================================
   EXAM CARD VIEW
   Official Examination Permit, Timetable, Seat Allocation & Regulations
   ========================================================================== */

import { portalState } from '../state.js';

export function renderExamCardView() {
  const state = portalState.getState();
  const student = state.student;

  const examUnits = [
    { code: 'NURS 301', name: 'Advanced Medical Surgical Nursing I', date: '07/12/2026', time: '09:00 – 12:00', venue: 'Main Exam Hall A', seat: 'A-42' },
    { code: 'NURS 302', name: 'Advanced Medical Surgical Nursing II', date: '09/12/2026', time: '09:00 – 12:00', venue: 'Main Exam Hall A', seat: 'A-42' },
    { code: 'NURS 311', name: 'Critical Care Nursing', date: '11/12/2026', time: '14:00 – 17:00', venue: 'Nursing Hall B', seat: 'B-18' },
    { code: 'NURS 321', name: 'Community Health Nursing IV', date: '14/12/2026', time: '09:00 – 12:00', venue: 'Main Exam Hall A', seat: 'A-42' },
    { code: 'NURS 331', name: 'Maternal and Newborn Health I (Theory & OSCE)', date: '16/12/2026', time: '08:30 – 12:30', venue: 'Clinical Skills Lab', seat: 'SL-09' },
    { code: 'NURS 361', name: 'Health Systems Management', date: '18/12/2026', time: '09:00 – 12:00', venue: 'Room B12', seat: 'C-04' }
  ];

  return `
    <div class="exam-card-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        <span>Student Examination Card & Entry Permit</span>
      </div>

      <!-- Action bar -->
      <div class="flex-between no-print" style="margin-bottom:14px;">
        <span style="font-size:13px;color:var(--text-secondary);">Present this printed examination card at all examination rooms.</span>
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print Exam Card
        </button>
      </div>

      <!-- Official Exam Document -->
      <div class="official-doc-container">
        <div class="doc-header-block">
          <img src="assets/logo.png" alt="Chuka University Crest" class="doc-crest" />
          <h2>OFFICIAL EXAMINATION CARD / ENTRY PERMIT</h2>
          <h4>School of Nursing & Public Health &bull; First Semester Examinations</h4>
          <p style="font-size:11px;color:#6B7280;margin-top:2px;">Academic Year: 2026/2027 &bull; Examination Series: December 2026</p>
        </div>

        <div style="display:grid;grid-template-columns:100px 1fr 90px;gap:14px;align-items:center;margin-bottom:16px;">
          <img 
            src="${student.avatar || 'assets/profile.jpg'}" 
            alt="${student.displayName || student.name}" 
            style="width:90px;height:90px;border-radius:4px;border:1px solid #CCC;background:#FFF;object-fit:cover;" 
            onerror="this.src='assets/avatar.jpg'"
          />
          <table class="doc-student-table" style="margin-bottom:0;">
            <tr>
              <td style="font-weight:700;padding:2px 0;">Name:</td>
              <td style="padding:2px 0;">${student.displayName || student.name}</td>
            </tr>
            <tr>
              <td style="font-weight:700;padding:2px 0;">Reg No:</td>
              <td style="font-weight:700;font-family:var(--font-mono);padding:2px 0;">${student.regNo}</td>
            </tr>
            <tr>
              <td style="font-weight:700;padding:2px 0;">Programme:</td>
              <td style="padding:2px 0;">${student.programme}</td>
            </tr>
            <tr>
              <td style="font-weight:700;padding:2px 0;">Level & Status:</td>
              <td style="color:green;font-weight:700;padding:2px 0;">Third Year &bull; FULLY CLEARED</td>
            </tr>
          </table>
          <div style="text-align:center;">
            <img src="assets/qrcode.svg" alt="QR" style="width:75px;height:75px;" />
            <div style="font-size:9px;font-family:var(--font-mono);">EXAM-VERIFIED</div>
          </div>
        </div>

        <!-- Exam Schedule Table -->
        <table class="statement-table" style="font-size:12px;margin-bottom:16px;">
          <thead>
            <tr>
              <th>Unit Code</th>
              <th>Unit Title</th>
              <th>Exam Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th style="text-align:center;">Seat</th>
              <th style="text-align:center;">Invigilator Sign</th>
            </tr>
          </thead>
          <tbody>
            ${examUnits.map(unit => `
              <tr>
                <td style="font-weight:700;font-family:var(--font-mono);">${unit.code}</td>
                <td>${unit.name}</td>
                <td style="white-space:nowrap;">${unit.date}</td>
                <td style="white-space:nowrap;">${unit.time}</td>
                <td>${unit.venue}</td>
                <td style="text-align:center;font-weight:700;">${unit.seat}</td>
                <td style="text-align:center;border-bottom:1px dashed #999;">&nbsp;</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Examination Rules -->
        <div style="font-size:11px;color:#4B5563;background:#F9FAFB;padding:10px;border-radius:4px;border:1px solid #E5E7EB;">
          <strong>Important Instructions to Candidates:</strong>
          <ol style="margin-left:16px;margin-top:4px;">
            <li>Candidates must present both this card and the University Student ID Card before entering the examination room.</li>
            <li>No mobile phones, smartwatches, or unauthorized materials are permitted inside the examination venue.</li>
            <li>Candidates must be seated at least 15 minutes prior to the scheduled examination commencement.</li>
          </ol>
        </div>

        <div class="doc-signature-grid">
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Candidate Signature</div>
          </div>
          <div>
            <div class="sig-line"></div>
            <div style="font-size:11px;font-weight:700;">Registrar (Academic Affairs) Signature & Seal</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
