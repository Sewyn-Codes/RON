/* ==========================================================================
   SETTINGS & APPEARANCE VIEW
   Theme Customizer (Dark/Light), Viewport Settings, Demo Reset
   ========================================================================== */

import { portalState } from '../state.js';

export function renderSettingsView() {
  const state = portalState.getState();
  const settings = state.settings;

  return `
    <div class="settings-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        <span>Portal Settings & Appearance</span>
      </div>

      <!-- Appearance Card -->
      <div class="portal-card">
        <div class="card-header-bar teal">
          <span>Appearance & Color Theme</span>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Theme Mode</label>
            <div style="display:flex;gap:10px;">
              <button 
                class="btn ${settings.theme === 'light' ? 'btn-primary' : 'btn-outline'} btn-sm flex-1" 
                onclick="window.portalApp.toggleTheme('light')"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                Light Institutional
              </button>
              <button 
                class="btn ${settings.theme === 'dark' ? 'btn-primary' : 'btn-outline'} btn-sm flex-1" 
                onclick="window.portalApp.toggleTheme('dark')"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                Dark Mode
              </button>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Device Display Mode</label>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" onclick="window.portalApp.setDeviceMode('mobile')">Mobile (390px)</button>
              <button class="btn btn-outline btn-sm" onclick="window.portalApp.setDeviceMode('tablet')">Tablet (768px)</button>
              <button class="btn btn-outline btn-sm" onclick="window.portalApp.setDeviceMode('desktop')">Full Width Desktop</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Demo Data Reset Card -->
      <div class="portal-card">
        <div class="card-header-bar navy">
          <span>Demo Data Management</span>
        </div>
        <div class="card-body">
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">
            Reset all course registrations, submitted requisitions, fee payment simulations, and evaluation ratings back to the initial demo baseline for Betty Aluso.
          </p>

          <button class="btn btn-outline btn-sm" style="color:#DC2626;border-color:#DC2626;" onclick="window.portalApp.resetDemoData()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            Reset Demo Data to Initial State
          </button>
        </div>
      </div>
    </div>
  `;
}
