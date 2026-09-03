/* ==========================================================================
   NAVIGATION DRAWER COMPONENT
   Dark Navy-Blue Slide-in Drawer (#263B61) with Icons and Hierarchical Structure
   ========================================================================== */

import { portalState } from '../state.js';

export function renderDrawer(currentRoute = 'dashboard') {
  const state = portalState.getState();

  const navCategories = [
    {
      category: 'DASHBOARD',
      items: [
        {
          id: 'dashboard',
          label: 'Personal Profile',
          hash: '#dashboard',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
        }
      ]
    },
    {
      category: 'ACADEMICS',
      items: [
        {
          id: 'registration',
          label: 'Course Registration',
          hash: '#registration',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
        },
        {
          id: 'results',
          label: 'Academic Results',
          hash: '#results',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
        },
        {
          id: 'timetable',
          label: 'TimeTable',
          hash: '#timetable',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
        },
        {
          id: 'requisitions',
          label: 'Academic Requisition',
          hash: '#requisitions',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`
        },
        {
          id: 'evaluation',
          label: 'Course Evaluation',
          hash: '#evaluation',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        }
      ]
    },
    {
      category: 'FINANCIALS',
      items: [
        {
          id: 'fees',
          label: 'Fee Statement',
          hash: '#fees',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`
        },
        {
          id: 'legacy-fees',
          label: 'Legacy Statement',
          hash: '#legacy-fees',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`
        },
        {
          id: 'receipts',
          label: 'Receipts',
          hash: '#receipts',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`
        },
        {
          id: 'gate-pass',
          label: 'Generate Gate Pass',
          hash: '#gate-pass',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
        },
        {
          id: 'proforma',
          label: 'Semester Proforma',
          hash: '#proforma',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`
        }
      ]
    },
    {
      category: 'ACCOMMODATION',
      items: [
        {
          id: 'hostel',
          label: 'Hostel Booking',
          hash: '#hostel',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
        }
      ]
    },
    {
      category: 'EXAMINATION',
      items: [
        {
          id: 'exam-card',
          label: 'Exam Card',
          hash: '#exam-card',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
        },
        {
          id: 'transcript',
          label: 'Transcript',
          hash: '#transcript',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
        }
      ]
    },
    {
      category: 'SETTINGS',
      items: [
        {
          id: 'settings',
          label: 'Account & Appearance',
          hash: '#settings',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
        }
      ]
    }
  ];

  return `
    <div id="drawer-backdrop" class="drawer-backdrop" onclick="window.portalApp.closeDrawer()">
      <nav class="nav-drawer" onclick="event.stopPropagation()">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="drawer-student-info">
            <img 
              src="${state.student.avatar || 'assets/profile.jpg'}" 
              alt="${state.student.displayName || state.student.name}" 
              class="drawer-avatar" 
              onerror="this.src='assets/avatar.jpg'"
            />
            <div class="drawer-student-text">
              <h4>${state.student.displayName || state.student.name}</h4>
              <p>${state.student.regNo}</p>
            </div>
          </div>
          <button class="drawer-close-btn" onclick="window.portalApp.closeDrawer()" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Drawer Nav Sections -->
        <div class="drawer-content">
          ${navCategories.map(cat => `
            <div class="nav-section">
              <div class="nav-section-title">${cat.category}</div>
              <ul class="nav-list">
                ${cat.items.map(item => {
                  const isActive = currentRoute === item.id;
                  return `
                    <li class="nav-item">
                      <a 
                        href="${item.hash}" 
                        class="nav-link ${isActive ? 'active' : ''}" 
                        onclick="window.portalApp.closeDrawer()"
                      >
                        <span class="nav-icon">${item.icon}</span>
                        <span>${item.label}</span>
                      </a>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Drawer Footer -->
        <div class="drawer-footer">
          <div>BSc Nursing &bull; Year 3</div>
          <button class="drawer-logout-btn" onclick="window.portalApp.showToast('Demo session remains active.', 'info')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Session Active (Demo)
          </button>
        </div>
      </nav>
    </div>
  `;
}
