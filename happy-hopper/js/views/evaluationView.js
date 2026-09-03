/* ==========================================================================
   COURSE EVALUATION VIEW
   5-Star Rating System for Lecturer, Content, Environment + Comments
   ========================================================================== */

import { portalState } from '../state.js';

export function renderEvaluationView() {
  const state = portalState.getState();
  const evals = state.evaluations || {};

  const unitsToEvaluate = [
    { code: 'NURS 301', name: 'Advanced Medical Surgical Nursing I', lecturer: 'Dr. E. Mwangi' },
    { code: 'NURS 311', name: 'Critical Care Nursing', lecturer: 'Prof. K. Omondi' },
    { code: 'NURS 321', name: 'Community Health Nursing IV', lecturer: 'Dr. F. Mutua' },
    { code: 'NURS 331', name: 'Maternal and Newborn Health I', lecturer: 'Dr. C. Chebet' }
  ];

  const renderStars = (unitCode, category, currentVal) => {
    return [1, 2, 3, 4, 5].map(starNum => `
      <span 
        class="eval-star ${starNum <= (currentVal || 0) ? 'filled' : ''}" 
        onclick="window.portalApp.setEvaluationRating('${unitCode}', '${category}', ${starNum})"
        title="${starNum} Stars"
      >
        ★
      </span>
    `).join('');
  };

  const completedCount = unitsToEvaluate.filter(u => evals[u.code]?.completed).length;

  return `
    <div class="evaluation-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Course & Lecturer Evaluation</span>
      </div>

      <!-- Evaluation Progress -->
      <div class="portal-card">
        <div class="card-body" style="padding:14px;">
          <div class="flex-between">
            <div>
              <div class="font-bold">Evaluation Progress: ${completedCount} of ${unitsToEvaluate.length} Units Completed</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Your confidential feedback ensures high clinical teaching standards.</div>
            </div>
            <span class="badge ${completedCount === unitsToEvaluate.length ? 'badge-success' : 'badge-warning'}">
              ${completedCount === unitsToEvaluate.length ? 'All Completed' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      <!-- Evaluation Cards -->
      ${unitsToEvaluate.map(unit => {
        const evalData = evals[unit.code] || { effectiveness: 0, content: 0, environment: 0, comment: '', completed: false };
        return `
          <div class="portal-card" style="border-left:4px solid ${evalData.completed ? 'var(--section-green)' : 'var(--primary-teal)'};">
            <div class="card-header-bar ${evalData.completed ? '' : 'teal'}">
              <div class="flex-between" style="width:100%;">
                <span>${unit.code}: ${unit.name}</span>
                ${evalData.completed ? '<span class="badge badge-success" style="background:#FFFFFF;color:#065F46;">✓ Completed</span>' : '<span class="badge badge-warning">Pending</span>'}
              </div>
            </div>

            <div class="card-body">
              <div style="font-size:12.5px;color:var(--text-secondary);margin-bottom:12px;">
                Lecturer: <strong>${unit.lecturer}</strong> &bull; Semester: <strong>Year 3 Sem 1</strong>
              </div>

              <!-- Rating 1: Lecturer Effectiveness -->
              <div style="margin-bottom:12px;">
                <div style="font-size:13px;font-weight:600;">1. Lecturer Effectiveness & Clinical Teaching:</div>
                <div class="eval-star-group" id="stars-${unit.code}-effectiveness">
                  ${renderStars(unit.code, 'effectiveness', evalData.effectiveness)}
                </div>
              </div>

              <!-- Rating 2: Course Content -->
              <div style="margin-bottom:12px;">
                <div style="font-size:13px;font-weight:600;">2. Course Content, Clinical Syllabus & Materials:</div>
                <div class="eval-star-group" id="stars-${unit.code}-content">
                  ${renderStars(unit.code, 'content', evalData.content)}
                </div>
              </div>

              <!-- Rating 3: Learning Environment -->
              <div style="margin-bottom:12px;">
                <div style="font-size:13px;font-weight:600;">3. Skills Lab Equipment & Hospital Environment:</div>
                <div class="eval-star-group" id="stars-${unit.code}-environment">
                  ${renderStars(unit.code, 'environment', evalData.environment)}
                </div>
              </div>

              <!-- Comments -->
              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label">Constructive Feedback / Suggestions</label>
                <textarea 
                  class="form-textarea" 
                  id="comment-${unit.code}" 
                  placeholder="Share your experience or suggestions for this nursing unit..." 
                  style="min-height:60px;"
                >${evalData.comment || ''}</textarea>
              </div>

              <button 
                class="btn ${evalData.completed ? 'btn-green' : 'btn-primary'} btn-sm" 
                onclick="window.portalApp.submitCourseEvaluation('${unit.code}')"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${evalData.completed ? 'Update Evaluation' : 'Save Evaluation'}
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
