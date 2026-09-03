/* ==========================================================================
   HEADER COMPONENT
   Fixed Green Top Navigation Bar with Chuka University Branding, Search,
   Hamburger Menu, Profile Photo, Student Name & Dropdown Chevron
   ========================================================================== */

import { portalState } from '../state.js';

export function renderHeader() {
  const state = portalState.getState();
  const unreadNotifs = state.notifications.filter(n => !n.read).length;
  const avatarUrl = state.student.avatar || 'assets/profile.jpg';

  return `
    <header class="portal-header fixed-top-header">
      <div class="header-top-row">
        
        <!-- Left Side: Chuka University Branding & Hamburger Menu -->
        <div class="header-left-cluster">
          <!-- Chuka University Crest / Logo -->
          <a href="#dashboard" class="header-brand-link" title="Chuka University Student Portal">
            <img 
              src="assets/logo.jpg" 
              alt="Chuka University" 
              class="header-crest-img" 
              onerror="this.src='assets/logo.png'"
            />
            <div class="header-brand-text">
              <span class="brand-title">CHUKA UNIVERSITY</span>
              <span class="brand-sub">Student Portal</span>
            </div>
          </a>

          <!-- Hamburger Button beside University Logo -->
          <button class="hamburger-btn" id="drawer-toggle-btn" aria-label="Open Navigation Menu" onclick="window.portalApp.toggleDrawer()" title="Menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>

        <!-- Center: Pill-shaped Domain / Portal Badge -->
        <div class="portal-pill-badge" title="Chuka University Student Portal">
          <span class="portal-pill-dot"></span>
          <span>Chuka.University.student.portal</span>
        </div>

        <!-- Right Side: Search Field + Notification + Profile Cluster -->
        <div class="header-right-cluster">
          <!-- Search Field -->
          <div class="header-search-box">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              class="header-search-input" 
              placeholder="Search portal..." 
              id="global-portal-search"
              oninput="window.portalApp.handleGlobalSearch(event)"
            />
          </div>

          <!-- Notification Bell -->
          <button class="notification-bell-btn" aria-label="Notifications" onclick="window.portalApp.showNotificationsMenu()" title="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            ${unreadNotifs > 0 ? `<span class="bell-badge">${unreadNotifs}</span>` : ''}
          </button>

          <!-- Student Profile Photo & Name with Dropdown Chevron -->
          <div class="header-profile-cluster" onclick="window.portalApp.toggleProfileDropdown()" title="Profile & Account">
            <img 
              src="assets/profile.jpg" 
              alt="${state.student.displayName || state.student.name}" 
              class="header-avatar" 
              onerror="this.src='assets/avatar.jpg'"
            />
            <div class="header-user-info">
              <span class="header-user-name">${state.student.displayName || state.student.name}</span>
              <span class="header-user-reg">${state.student.regNo}</span>
            </div>
            <!-- Profile Dropdown Arrow -->
            <svg class="profile-dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

      </div>

      <!-- Quick Status Sub-bar -->
      <div class="header-sub-bar">
        <div class="header-student-name">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>${state.student.displayName || state.student.name}</span>
        </div>
        <div class="header-academic-tag">
          ${state.student.programme} &bull; ${state.student.nextLevel} (Sep 2026)
        </div>
      </div>
    </header>
  `;
}
