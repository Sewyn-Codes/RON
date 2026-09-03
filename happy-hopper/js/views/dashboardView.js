/* ==========================================================================
   DASHBOARD / PERSONAL PROFILE VIEW
   Inspired by Reference Screenshots: Basic Information + Academic Information + Progress Tracker
   ========================================================================== */

import { portalState } from '../state.js';

export function renderDashboardView() {
  const state = portalState.getState();
  const student = state.student;

  return `
    <div class="dashboard-page">
      <!-- Section 1: Basic Information -->
      <div class="portal-card">
        <div class="section-header-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Basic Information</span>
        </div>

        <div class="profile-avatar-container">
          <img 
            src="${student.avatar || 'assets/profile.jpg'}" 
            alt="${student.displayName || student.name}" 
            class="profile-large-avatar" 
            onerror="this.src='assets/avatar.jpg'"
          />
          <div class="profile-divider"></div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Reg. No</span>
            <span class="info-value highlight-teal">${student.regNo}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Name</span>
            <span class="info-value font-bold">${student.name}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Gender</span>
            <span class="info-value">${student.gender}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Address</span>
            <span class="info-value">${student.address}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Date Of Birth</span>
            <span class="info-value">${student.dob}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Campus</span>
            <span class="info-value">${student.campus}</span>
          </div>
        </div>

        <div class="calendar-action-container">
          <button class="btn btn-green btn-block" onclick="window.portalApp.openModal('modal-academic-calendar')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Get Academic Calendar
          </button>
        </div>
      </div>

      <!-- Section 2: Academic Information -->
      <div class="portal-card">
        <div class="section-header-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          <span>Academic Information</span>
        </div>

        <div class="info-grid">
          <div class="info-item" style="grid-column: 1 / -1;">
            <span class="info-label">Current Programme</span>
            <span class="info-value font-bold highlight-teal" style="font-size:15px;">${student.programme}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Academic Year</span>
            <span class="info-value">${student.academicYear}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Current Academic Status</span>
            <span class="info-value highlight-green font-bold">${student.currentStatus}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Previous Academic Level</span>
            <span class="info-value">${student.previousLevel}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Next Academic Level</span>
            <span class="info-value highlight-teal font-bold">${student.nextLevel}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Next Reporting Period</span>
            <span class="info-value">${student.nextReporting}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Academic Standing</span>
            <span class="info-value"><span class="badge badge-success">${student.academicStanding}</span></span>
          </div>
        </div>

        <!-- Quick Summary Stats Grid -->
        <div class="academic-stats-grid">
          <div class="stat-pill-box">
            <div class="stat-pill-title">Attempted Units</div>
            <div class="stat-pill-num">${student.attemptedUnits}</div>
          </div>
          <div class="stat-pill-box">
            <div class="stat-pill-title">Registered Units</div>
            <div class="stat-pill-num" style="color:var(--primary-teal);">${student.registeredUnitsCount}</div>
          </div>
          <div class="stat-pill-box">
            <div class="stat-pill-title">Completed Years</div>
            <div class="stat-pill-num" style="color:var(--section-green);">2</div>
          </div>
          <div class="stat-pill-box">
            <div class="stat-pill-title">Fee Clearance</div>
            <div class="stat-pill-num" style="color:var(--status-success);font-size:14px;margin-top:6px;">${student.feeClearanceStatus}</div>
          </div>
        </div>
      </div>

      <!-- Section 3: Academic Progress Tracker -->
      <div class="progress-tracker-card">
        <div class="progress-tracker-title">
          <span>Academic Progression Pathway</span>
          <span class="badge badge-teal">Bachelor of Science in Nursing</span>
        </div>

        <div class="timeline-steps">
          <!-- Year 1 -->
          <div class="timeline-step completed">
            <div class="step-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span class="step-label">YEAR 1</span>
            <span class="step-status">Completed</span>
          </div>

          <!-- Year 2 -->
          <div class="timeline-step completed">
            <div class="step-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span class="step-label">YEAR 2</span>
            <span class="step-status">Completed</span>
          </div>

          <!-- Year 3 -->
          <div class="timeline-step active">
            <div class="step-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"></circle></svg>
            </div>
            <span class="step-label">YEAR 3</span>
            <span class="step-status">${student.registeredUnitsCount > 0 ? 'Registered' : 'Upcoming / Reg Pending'}</span>
          </div>
        </div>

        <!-- Institutional Congratulatory Alert -->
        <div class="progress-congrats-banner">
          <div class="congrats-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="congrats-content">
            <h5>Academic Progress Notice</h5>
            <p>Congratulations, <strong>${student.displayName || student.name}</strong>. Your Second Year academic records are available. You are progressing to <strong>Third Year</strong> for the upcoming September academic period.</p>
          </div>
        </div>

        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
          <a href="#results" class="btn btn-outline btn-sm flex-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            View Academic Results
          </a>
          <a href="#registration" class="btn btn-primary btn-sm flex-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            Proceed to Registration
          </a>
        </div>
      </div>
    </div>
  `;
}
