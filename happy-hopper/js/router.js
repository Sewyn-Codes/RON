/* ==========================================================================
   SPA HASH ROUTER
   Routes mapping and dynamic view rendering
   ========================================================================== */

import { renderDashboardView } from './views/dashboardView.js';
import { renderResultsView } from './views/resultsView.js';
import { renderRegistrationView } from './views/registrationView.js';
import { renderTimetableView } from './views/timetableView.js';
import { renderRequisitionsView } from './views/requisitionsView.js';
import { renderEvaluationView } from './views/evaluationView.js';
import { renderFeesView } from './views/feesView.js';
import { renderLegacyFeesView } from './views/legacyFeesView.js';
import { renderReceiptsView } from './views/receiptsView.js';
import { renderGatePassView } from './views/gatePassView.js';
import { renderProformaView } from './views/proformaView.js';
import { renderHostelView } from './views/hostelView.js';
import { renderExamCardView } from './views/examCardView.js';
import { renderTranscriptView } from './views/transcriptView.js';
import { renderSettingsView } from './views/settingsView.js';
import { renderDrawer } from './components/drawer.js';

const routes = {
  'dashboard': { render: renderDashboardView, title: 'Personal Profile & Academic Information' },
  'results': { render: renderResultsView, title: 'Academic Results & Progression' },
  'registration': { render: renderRegistrationView, title: 'Course / Unit Registration' },
  'timetable': { render: renderTimetableView, title: 'Class & Clinical Timetable' },
  'requisitions': { render: renderRequisitionsView, title: 'Academic Requisitions' },
  'evaluation': { render: renderEvaluationView, title: 'Course Evaluation' },
  'fees': { render: renderFeesView, title: 'Fee Statement & Ledger' },
  'legacy-fees': { render: renderLegacyFeesView, title: 'Legacy Fee Statement' },
  'receipts': { render: renderReceiptsView, title: 'Payment Receipts' },
  'gate-pass': { render: renderGatePassView, title: 'Student Gate Pass' },
  'proforma': { render: renderProformaView, title: 'Semester Proforma' },
  'hostel': { render: renderHostelView, title: 'Hostel Accommodation' },
  'exam-card': { render: renderExamCardView, title: 'Examination Permit Card' },
  'transcript': { render: renderTranscriptView, title: 'Consolidated Academic Transcript' },
  'settings': { render: renderSettingsView, title: 'Portal Settings & Appearance' }
};

export class Router {
  constructor(appContainerId) {
    this.container = document.getElementById(appContainerId);
    this.currentRoute = 'dashboard';
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  init() {
    this.handleHashChange();
  }

  getCurrentRouteKey() {
    const rawHash = window.location.hash.replace('#', '').trim();
    return routes[rawHash] ? rawHash : 'dashboard';
  }

  handleHashChange() {
    this.currentRoute = this.getCurrentRouteKey();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update drawer active state
    const drawerContainer = document.getElementById('drawer-root');
    if (drawerContainer) {
      drawerContainer.innerHTML = renderDrawer(this.currentRoute);
    }
  }

  render() {
    if (!this.container) {
      this.container = document.getElementById('main-content-view');
    }
    const route = routes[this.currentRoute] || routes['dashboard'];
    document.title = `${route.title} - Betty Aluso Student Portal`;
    if (this.container) {
      this.container.innerHTML = route.render();
    }
  }
}
