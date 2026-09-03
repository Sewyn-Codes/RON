/* ==========================================================================
   ACADEMIC REQUISITIONS VIEW
   Student Requests Form + Live "My Requests" Status Tracking
   ========================================================================== */

import { portalState } from '../state.js';

export function renderRequisitionsView() {
  const state = portalState.getState();
  const requisitions = state.requisitions || [];

  return `
    <div class="requisitions-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
        <span>Academic Requisitions & Official Letters</span>
      </div>

      <!-- New Requisition Form Card -->
      <div class="portal-card">
        <div class="card-header-bar teal">
          <span>Submit New Academic Requisition</span>
        </div>
        <div class="card-body">
          <form id="requisition-form" onsubmit="window.portalApp.handleRequisitionSubmit(event)">
            <div class="form-group">
              <label class="form-label">Requisition Type</label>
              <select class="form-select" id="req-type" required>
                <option value="">-- Select Requisition Type --</option>
                <option value="Request Academic Transcript">Request Academic Transcript</option>
                <option value="Request Result Slip">Request Result Slip</option>
                <option value="Request Academic Letter">Request Academic Letter (Introductory / Visa / Placement)</option>
                <option value="Request Course Transfer Information">Request Course Transfer Information</option>
                <option value="Request Unit Exemption / Credit Transfer">Request Unit Exemption / Credit Transfer</option>
                <option value="Other Academic Request">Other Academic Request</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Subject / Purpose</label>
              <input type="text" class="form-control" id="req-subject" placeholder="e.g. Official Certified Transcript for Clinical Internship" required />
            </div>

            <div class="form-group">
              <label class="form-label">Detailed Description & Delivery Instructions</label>
              <textarea class="form-textarea" id="req-desc" placeholder="Provide any details regarding the requested documents or academic query..." required></textarea>
            </div>

            <button type="submit" class="btn btn-green btn-block">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Submit Academic Request
            </button>
          </form>
        </div>
      </div>

      <!-- Live "My Requests" List -->
      <div class="portal-card">
        <div class="card-header-bar navy">
          <span>My Submitted Requisitions (${requisitions.length})</span>
        </div>
        <div class="card-body" style="padding:10px;">
          ${requisitions.length === 0 ? `
            <div class="alert alert-info">No requisitions submitted yet.</div>
          ` : requisitions.map(req => {
            const statusClass = req.status === 'Approved' ? 'badge-success' : req.status === 'Pending' ? 'badge-warning' : 'badge-info';
            return `
              <div style="border:1px solid var(--border-color);border-radius:6px;padding:12px;margin-bottom:10px;background:var(--card-subtle);">
                <div class="flex-between" style="margin-bottom:6px;">
                  <span style="font-size:12px;font-family:var(--font-mono);font-weight:700;color:var(--dark-nav-blue);">${req.id}</span>
                  <span class="badge ${statusClass}">${req.status}</span>
                </div>
                <div style="font-weight:700;font-size:14px;color:var(--text-primary);">${req.subject}</div>
                <div style="font-size:12px;color:var(--primary-teal);font-weight:600;margin-top:2px;">${req.type}</div>
                <p style="font-size:12.5px;color:var(--text-secondary);margin:6px 0;">${req.description}</p>
                <div style="font-size:11px;color:var(--text-muted);border-top:1px dashed var(--border-color);padding-top:6px;margin-top:6px;" class="flex-between">
                  <span>Submitted on: ${req.date}</span>
                  <span><strong>Remarks:</strong> ${req.remarks}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
