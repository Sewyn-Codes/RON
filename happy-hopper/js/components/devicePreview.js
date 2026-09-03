/* ==========================================================================
   DEVICE PREVIEW TOOLBAR COMPONENT
   Interactive Viewport Switcher (Mobile 390px, Tablet 768px, Full Desktop)
   ========================================================================== */

import { portalState } from '../state.js';

export function renderDevicePreviewToolbar() {
  const currentMode = portalState.getState().settings.viewportMode || 'mobile';

  return `
    <div class="device-preview-bar no-print">
      <div class="device-preview-brand">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
        <span>Institutional Student Portal &bull; Betty Aluso (Demo)</span>
      </div>

      <div class="device-preview-controls">
        <span style="font-size:11px;color:#9CA3AF;margin-right:4px;">Viewport:</span>
        
        <button 
          class="device-btn ${currentMode === 'mobile' ? 'active' : ''}" 
          onclick="window.portalApp.setDeviceMode('mobile')" 
          title="Mobile View (390px - 412px standard)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          Mobile (390px)
        </button>

        <button 
          class="device-btn ${currentMode === 'tablet' ? 'active' : ''}" 
          onclick="window.portalApp.setDeviceMode('tablet')" 
          title="Tablet View (768px)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          Tablet
        </button>

        <button 
          class="device-btn ${currentMode === 'desktop' ? 'active' : ''}" 
          onclick="window.portalApp.setDeviceMode('desktop')" 
          title="Full Width Desktop View"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Desktop
        </button>
      </div>
    </div>
  `;
}
