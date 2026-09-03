/* ==========================================================================
   COURSE REGISTRATION VIEW
   Interactive Third Year Unit Selection & Registration Flow
   ========================================================================== */

import { portalState } from '../state.js';

let activeSemesterTab = 'semester1';

export function setActiveSemesterTab(tabKey) {
  activeSemesterTab = tabKey;
  const content = document.getElementById('reg-units-container');
  if (content) {
    content.innerHTML = renderUnitsForSemester(activeSemesterTab);
    updateRegistrationSummary();
  }
  
  document.querySelectorAll('.reg-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabKey);
  });
}

function renderUnitsForSemester(tabKey) {
  const state = portalState.getState();
  const units = state.year3Registration[tabKey] || [];

  return units.map(unit => `
    <div 
      class="unit-reg-card ${unit.selected ? 'selected' : ''}" 
      onclick="window.portalApp.toggleUnitRegistration('${tabKey}', '${unit.code}')"
    >
      <input 
        type="checkbox" 
        class="unit-reg-checkbox" 
        ${unit.selected ? 'checked' : ''} 
        onclick="event.stopPropagation(); window.portalApp.toggleUnitRegistration('${tabKey}', '${unit.code}')"
      />
      <div class="unit-reg-details">
        <div class="unit-reg-code">${unit.code}</div>
        <div class="unit-reg-name font-bold">${unit.name}</div>
        <div class="unit-reg-meta">
          <span>Credits: <strong>${unit.credits} CU</strong></span>
          <span>Status: <strong style="color:var(--section-green);">${unit.core ? 'Core Unit' : 'Elective'}</strong></span>
          <span>Level: <strong>Year 3</strong></span>
        </div>
      </div>
    </div>
  `).join('');
}

function updateRegistrationSummary() {
  const state = portalState.getState();
  const units = state.year3Registration[activeSemesterTab] || [];
  const selectedUnits = units.filter(u => u.selected);
  const totalCredits = selectedUnits.reduce((acc, u) => acc + (u.credits || 3), 0);

  const countEl = document.getElementById('selected-count-label');
  const creditsEl = document.getElementById('selected-credits-label');

  if (countEl) countEl.innerText = `${selectedUnits.length} of ${units.length} Units`;
  if (creditsEl) creditsEl.innerText = `${totalCredits} Credits`;
}

export function renderRegistrationView() {
  const state = portalState.getState();
  const student = state.student;
  const isRegistered = state.year3Registration.isRegistered;
  const units = state.year3Registration[activeSemesterTab] || [];
  const selectedUnits = units.filter(u => u.selected);
  const totalCredits = selectedUnits.reduce((acc, u) => acc + (u.credits || 3), 0);

  return `
    <div class="registration-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        <span>Course / Unit Registration</span>
      </div>

      <!-- Registration Info Banner -->
      <div class="portal-card">
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
            <div>
              <span class="text-muted">Student Name:</span>
              <div class="font-bold">${student.name}</div>
            </div>
            <div>
              <span class="text-muted">Registration Number:</span>
              <div class="font-bold text-teal">${student.regNo}</div>
            </div>
            <div>
              <span class="text-muted">Academic Level:</span>
              <div class="font-bold">${student.nextLevel} (2026/2027)</div>
            </div>
            <div>
              <span class="text-muted">Programme:</span>
              <div class="font-bold">${student.programme}</div>
            </div>
          </div>

          ${isRegistered ? `
            <div class="alert alert-success mt-3" style="margin-bottom:0;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong>Registration Confirmed!</strong> Your units for Third Year have been successfully logged in your academic profile.
              </div>
            </div>
          ` : `
            <div class="alert alert-info mt-3" style="margin-bottom:0;">
              Select all prescribed core and elective units for the September 2026 academic semester below.
            </div>
          `}
        </div>
      </div>

      <!-- Semester Selector Tabs -->
      <div class="reg-semester-tabs">
        <button 
          class="reg-tab-btn ${activeSemesterTab === 'semester1' ? 'active' : ''}" 
          data-tab="semester1"
          onclick="window.portalApp.switchSemesterTab('semester1')"
        >
          Semester 1 (Sep – Dec 2026)
        </button>
        <button 
          class="reg-tab-btn ${activeSemesterTab === 'semester2' ? 'active' : ''}" 
          data-tab="semester2"
          onclick="window.portalApp.switchSemesterTab('semester2')"
        >
          Semester 2 (Jan – Apr 2027)
        </button>
      </div>

      <!-- Unit Selection Quick Actions -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:12.5px;font-weight:700;color:var(--text-secondary);">Available Units for Third Year</span>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="window.portalApp.selectAllUnits('${activeSemesterTab}', true)">Select All</button>
          <button class="btn btn-outline btn-sm" onclick="window.portalApp.selectAllUnits('${activeSemesterTab}', false)">Clear</button>
        </div>
      </div>

      <!-- Units List Container -->
      <div id="reg-units-container">
        ${renderUnitsForSemester(activeSemesterTab)}
      </div>

      <!-- Sticky Registration Action Bar -->
      <div class="reg-summary-sticky">
        <div>
          <div style="font-size:11px;color:var(--text-secondary);text-transform:uppercase;">Selected Summary</div>
          <div style="font-size:14px;font-weight:800;color:var(--dark-nav-blue);">
            <span id="selected-count-label">${selectedUnits.length} of ${units.length} Units</span> &bull; 
            <span id="selected-credits-label" style="color:var(--primary-teal);">${totalCredits} Credits</span>
          </div>
        </div>

        <div style="display:flex;gap:10px;">
          <button class="btn btn-navy btn-sm" onclick="window.portalApp.selectAllUnits('${activeSemesterTab}', false)">Reset</button>
          <button class="btn btn-green btn-sm" onclick="window.portalApp.saveRegistration('${activeSemesterTab}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Save Registration
          </button>
        </div>
      </div>
    </div>
  `;
}
