/* ==========================================================================
   TIMETABLE VIEW
   Weekly Interactive Timetable (Monday–Friday) with Filters & Venues
   ========================================================================== */

import { portalState } from '../state.js';

let selectedDayFilter = 'All';

export function setSelectedDayFilter(day) {
  selectedDayFilter = day;
  const container = document.getElementById('timetable-cards-container');
  if (container) {
    container.innerHTML = renderTimetableSlots();
  }
  document.querySelectorAll('.day-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === day);
  });
}

function renderTimetableSlots() {
  const state = portalState.getState();
  const allSlots = state.timetable;
  const filtered = selectedDayFilter === 'All' 
    ? allSlots 
    : allSlots.filter(s => s.day === selectedDayFilter);

  if (filtered.length === 0) {
    return `<div class="alert alert-info">No lectures or lab sessions scheduled for ${selectedDayFilter}.</div>`;
  }

  return filtered.map(slot => `
    <div class="timetable-slot">
      <div class="slot-time-row">
        <span>${slot.day} &bull; ${slot.time}</span>
        <span class="venue-badge">${slot.venue}</span>
      </div>
      <div class="slot-unit-title">${slot.code} – ${slot.name}</div>
      <div class="slot-meta">
        <span>Instructor: <strong>${slot.lecturer}</strong></span>
        <span>Semester: <strong>Year 3 Sem 1</strong></span>
        <span>Mode: <strong>In-Person / Clinical Lab</strong></span>
      </div>
    </div>
  `).join('');
}

export function renderTimetableView() {
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return `
    <div class="timetable-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Class & Clinical Timetable</span>
      </div>

      <!-- Overview Alert -->
      <div class="portal-card">
        <div class="card-body" style="padding:14px;">
          <div class="flex-between">
            <div>
              <div class="font-bold">Third Year &bull; Semester 1 (September 2026)</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">School of Nursing & Public Health</div>
            </div>
            <button class="btn btn-outline btn-sm no-print" onclick="window.print()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print Timetable
            </button>
          </div>
        </div>
      </div>

      <!-- Day Filter Pills -->
      <div class="timetable-filters">
        ${days.map(d => `
          <button 
            class="day-filter-btn ${selectedDayFilter === d ? 'active' : ''}" 
            data-day="${d}"
            onclick="window.portalApp.filterTimetable('${d}')"
          >
            ${d}
          </button>
        `).join('')}
      </div>

      <!-- Timetable Cards Container -->
      <div id="timetable-cards-container">
        ${renderTimetableSlots()}
      </div>
    </div>
  `;
}
