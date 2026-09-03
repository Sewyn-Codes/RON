/* ==========================================================================
   MAIN APPLICATION ENTRY POINT
   Betty Aluso - Academic Student Portal SPA
   ========================================================================== */

import { portalState } from './state.js';
import { Router } from './router.js';
import { renderHeader } from './components/header.js';
import { renderDrawer } from './components/drawer.js';
import { renderDevicePreviewToolbar } from './components/devicePreview.js';
import { 
  showToast, 
  openModal, 
  closeModal, 
  renderAcademicCalendarModal, 
  renderFeePaymentModal, 
  renderReceiptViewModal 
} from './components/modals.js';
import { setActiveSemesterTab } from './views/registrationView.js';
import { setSelectedDayFilter } from './views/timetableView.js';
import { setFeeSearchQuery } from './views/feesView.js';

class PortalApplication {
  constructor() {
    this.router = null;
  }

  init() {
    // Apply saved theme & viewport mode
    const state = portalState.getState();
    document.documentElement.setAttribute('data-theme', state.settings.theme || 'light');
    this.applyViewportMode(state.settings.viewportMode || 'mobile');

    // Render Shell Components
    this.renderShell();

    // Init Router
    this.router = new Router('main-content-view');
    this.router.init();

    // Subscribe to state updates
    portalState.subscribe(() => {
      this.updateHeader();
      this.router.render();
    });

    // Expose global controller
    window.portalApp = this;
  }

  renderShell() {
    // Viewport Toolbar
    const toolbarEl = document.getElementById('device-toolbar-root');
    if (toolbarEl) toolbarEl.innerHTML = renderDevicePreviewToolbar();

    // Header
    const headerEl = document.getElementById('header-root');
    if (headerEl) headerEl.innerHTML = renderHeader();

    // Drawer
    const drawerEl = document.getElementById('drawer-root');
    if (drawerEl) drawerEl.innerHTML = renderDrawer('dashboard');

    // Modals
    const modalsEl = document.getElementById('modals-root');
    if (modalsEl) {
      modalsEl.innerHTML = `
        ${renderAcademicCalendarModal()}
        ${renderFeePaymentModal()}
        ${renderReceiptViewModal()}
      `;
    }
  }

  updateHeader() {
    const headerEl = document.getElementById('header-root');
    if (headerEl) headerEl.innerHTML = renderHeader();
  }

  // Drawer Controls
  toggleDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.classList.toggle('open');
      document.body.style.overflow = backdrop.classList.contains('open') ? 'hidden' : '';
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Modal Controls
  openModal(id) {
    openModal(id);
  }

  closeModal(id) {
    closeModal(id);
  }

  showToast(msg, type = 'success') {
    showToast(msg, type);
  }

  // Viewport Mode Switcher
  setDeviceMode(mode) {
    portalState.setViewportMode(mode);
    this.applyViewportMode(mode);
    const toolbarEl = document.getElementById('device-toolbar-root');
    if (toolbarEl) toolbarEl.innerHTML = renderDevicePreviewToolbar();
  }

  applyViewportMode(mode) {
    const wrapper = document.getElementById('app-wrapper');
    if (wrapper) {
      wrapper.className = `app-wrapper mode-${mode}`;
    }
  }

  // Theme controls
  toggleTheme(theme) {
    portalState.setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} theme.`);
  }

  // Notifications Popup / Toast
  showNotificationsMenu() {
    const notifs = portalState.getState().notifications;
    const unread = notifs.filter(n => !n.read);
    if (unread.length > 0) {
      showToast(`🔔 ${unread[0].title}: ${unread[0].text}`, 'info');
    } else {
      showToast('All notifications have been read.', 'info');
    }
  }

  // Course Registration Actions
  switchSemesterTab(tabKey) {
    setActiveSemesterTab(tabKey);
  }

  toggleUnitRegistration(tabKey, unitCode) {
    portalState.toggleYear3Unit(tabKey, unitCode);
    setActiveSemesterTab(tabKey);
  }

  selectAllUnits(tabKey, selectAll) {
    portalState.selectAllYear3Units(tabKey, selectAll);
    setActiveSemesterTab(tabKey);
    showToast(selectAll ? 'All units selected.' : 'Selections cleared.', 'info');
  }

  saveRegistration(tabKey) {
    portalState.saveCourseRegistration(tabKey);
    const count = portalState.getState().student.registeredUnitsCount;
    showToast(`✓ Registration saved! ${count} units successfully registered for Third Year.`, 'success');
  }

  // Timetable Filter
  filterTimetable(day) {
    setSelectedDayFilter(day);
  }

  // Academic Requisitions Submit
  handleRequisitionSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('req-type').value;
    const subject = document.getElementById('req-subject').value;
    const desc = document.getElementById('req-desc').value;

    if (!type || !subject || !desc) {
      showToast('Please fill all requisition fields.', 'warning');
      return;
    }

    const newReq = portalState.submitRequisition(type, subject, desc);
    showToast(`Requisition ${newReq.id} submitted successfully!`, 'success');
    this.router.render();
  }

  // Course Evaluation Ratings
  setEvaluationRating(unitCode, category, starVal) {
    const evals = portalState.getState().evaluations || {};
    const unitEval = evals[unitCode] || { effectiveness: 0, content: 0, environment: 0, comment: '', completed: false };
    unitEval[category] = starVal;

    // Re-render star group visually
    const starContainer = document.getElementById(`stars-${unitCode}-${category}`);
    if (starContainer) {
      const stars = starContainer.querySelectorAll('.eval-star');
      stars.forEach((s, idx) => {
        s.classList.toggle('filled', idx < starVal);
      });
    }
  }

  submitCourseEvaluation(unitCode) {
    const commentEl = document.getElementById(`comment-${unitCode}`);
    const comment = commentEl ? commentEl.value : '';

    const starGroups = ['effectiveness', 'content', 'environment'];
    const ratings = { comment, completed: true };

    starGroups.forEach(cat => {
      const starContainer = document.getElementById(`stars-${unitCode}-${cat}`);
      if (starContainer) {
        ratings[cat] = starContainer.querySelectorAll('.eval-star.filled').length || 4;
      } else {
        ratings[cat] = 4;
      }
    });

    portalState.saveEvaluation(unitCode, ratings);
    showToast(`✓ Evaluation for ${unitCode} saved successfully!`, 'success');
    this.router.render();
  }

  // Fee Payment Simulation
  handleDemoPayment(e) {
    e.preventDefault();
    const channel = document.getElementById('pay-channel').value;
    const amount = document.getElementById('pay-amount').value;
    const ref = document.getElementById('pay-ref').value;

    const receipt = portalState.makeDemoPayment(amount, channel, ref);
    if (receipt) {
      this.closeModal('modal-fee-payment');
      showToast(`✓ Payment of KES ${parseFloat(amount).toLocaleString('en-KE')} processed! Receipt: ${receipt.id}`, 'success');
      this.router.render();
    }
  }

  // Open Receipt Modal
  openReceiptModal(receiptId) {
    const receipt = portalState.getState().receipts.find(r => r.id === receiptId);
    if (!receipt) return;

    const student = portalState.getState().student;
    const titleEl = document.getElementById('receipt-modal-title');
    const bodyEl = document.getElementById('receipt-modal-body');

    if (titleEl) titleEl.innerText = `Payment Receipt - ${receipt.id}`;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="text-align:center;border-bottom:2px solid #20242A;padding-bottom:12px;margin-bottom:14px;">
          <img src="assets/logo.jpg" alt="Chuka University Crest" style="width:58px;height:58px;object-fit:contain;" onerror="this.src='assets/logo.png'" />
          <h3 style="font-size:15px;font-weight:800;color:#1E3A8A;margin-top:4px;">OFFICIAL STUDENT PAYMENT RECEIPT</h3>
          <p style="font-size:11px;color:#6B7280;">Finance & Student Accounts Department</p>
        </div>

        <table class="doc-student-table" style="font-size:12px;margin-bottom:14px;">
          <tr>
            <td style="font-weight:700;">Receipt Number:</td>
            <td style="font-family:var(--font-mono);font-weight:800;color:var(--dark-nav-blue);">${receipt.id}</td>
            <td style="font-weight:700;">Payment Date:</td>
            <td>${receipt.date}</td>
          </tr>
          <tr>
            <td style="font-weight:700;">Student Name:</td>
            <td>${student.name}</td>
            <td style="font-weight:700;">Registration No:</td>
            <td style="font-family:var(--font-mono);font-weight:700;">${student.regNo}</td>
          </tr>
          <tr>
            <td style="font-weight:700;">Programme:</td>
            <td colspan="3">${student.programme}</td>
          </tr>
          <tr>
            <td style="font-weight:700;">Payment Channel:</td>
            <td>${receipt.channel}</td>
            <td style="font-weight:700;">Transaction Ref:</td>
            <td style="font-family:var(--font-mono);font-weight:700;">${receipt.refCode}</td>
          </tr>
        </table>

        <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;padding:12px;margin:12px 0;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-size:11px;color:#166534;font-weight:700;text-transform:uppercase;">Amount Paid</div>
            <div style="font-size:18px;font-weight:800;color:#15803D;font-family:var(--font-mono);">KES ${receipt.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <span class="badge badge-success" style="font-size:11px;">✓ VERIFIED & CREDITED</span>
        </div>

        <div style="font-size:11px;color:#4B5563;border-top:1px dashed #CCC;padding-top:8px;margin-top:12px;" class="flex-between">
          <span>Purpose: ${receipt.purpose}</span>
          <span>System Verified Demo Copy</span>
        </div>
      `;
    }

    this.openModal('modal-receipt-view');
  }

  printReceipt(receiptId) {
    this.openReceiptModal(receiptId);
    setTimeout(() => window.print(), 300);
  }

  // Hostel Selection
  selectBedSpace(hall, room, bed) {
    portalState.bookHostel(hall, room, '2nd Floor', bed);
    showToast(`✓ Hostel allocated: ${hall}, ${room}, ${bed}`, 'success');
    this.router.render();
  }

  // Fee Statement Search & Filter
  handleFeeSearch(e) {
    const val = e.target.value;
    setFeeSearchQuery(val);
  }

  clearFeeSearch() {
    const input = document.querySelector('.fee-filter-input');
    if (input) input.value = '';
    setFeeSearchQuery('');
  }

  // Global Header Search
  handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;
    if (query.includes('fee') || query.includes('money') || query.includes('statement') || query.includes('tuition')) {
      window.location.hash = '#fees';
    } else if (query.includes('reg') || query.includes('course') || query.includes('unit')) {
      window.location.hash = '#registration';
    } else if (query.includes('time') || query.includes('schedule') || query.includes('class')) {
      window.location.hash = '#timetable';
    } else if (query.includes('result') || query.includes('transcript') || query.includes('mark') || query.includes('grade')) {
      window.location.hash = '#results';
    } else if (query.includes('gate') || query.includes('pass')) {
      window.location.hash = '#gate-pass';
    } else if (query.includes('hostel') || query.includes('room') || query.includes('bed')) {
      window.location.hash = '#hostel';
    } else if (query.includes('exam')) {
      window.location.hash = '#exam-card';
    }
  }

  toggleProfileDropdown() {
    window.location.hash = '#dashboard';
    showToast('Viewing profile: Beatrice Aluso Mukobe (HBS1/8115/24)', 'info');
  }

  // Reset Demo Data
  resetDemoData() {
    if (confirm('Are you sure you want to reset all portal demo data back to default?')) {
      portalState.resetToDefault();
      showToast('Demo data reset to initial baseline.', 'info');
      this.router.render();
    }
  }
}

// Instantiate on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortalApplication();
  app.init();
});
