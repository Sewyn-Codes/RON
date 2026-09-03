/* ==========================================================================
   HOSTEL BOOKING VIEW
   Residence Hall Selection, Floor Map & Interactive Bed Space Allocation
   ========================================================================== */

import { portalState } from '../state.js';

let selectedHall = 'Nursing Students Residence (Hall 4 - Female)';
let selectedRoom = 'Room 204';
let selectedBed = 'Bed B (Window Side)';

export function setSelectedBed(hall, room, bed) {
  selectedHall = hall;
  selectedRoom = room;
  selectedBed = bed;
  portalState.bookHostel(hall, room, '2nd Floor', bed);
}

export function renderHostelView() {
  const state = portalState.getState();
  const booking = state.hostelBooking;

  const halls = [
    {
      name: 'Nursing Students Residence (Hall 4 - Female)',
      type: 'Female Only',
      rate: 'KES 35,000 / Sem',
      amenities: ['Wi-Fi 6', 'Hot Showers', '24/7 Security', 'Study Library', 'Near Skills Lab'],
      rooms: ['Room 201', 'Room 202', 'Room 203', 'Room 204']
    },
    {
      name: 'Chuka Modern Hall of Residence',
      type: 'Female Wing',
      rate: 'KES 40,000 / Sem',
      amenities: ['En-suite Bathroom', 'High Speed Wi-Fi', 'Balcony', 'Backup Solar Power'],
      rooms: ['Room 101', 'Room 102', 'Room 103']
    }
  ];

  return `
    <div class="hostel-page">
      <!-- Section Header -->
      <div class="section-header-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>Hostel & Accommodation Booking</span>
      </div>

      <!-- Current Booking Status Card -->
      <div class="portal-card" style="border-left:4px solid var(--section-green);">
        <div class="card-header-bar teal">
          <span>Current Room Allocation (September 2026 – December 2026)</span>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;font-size:13px;">
            <div>
              <span class="text-muted">Allocated Residence Hall:</span>
              <div class="font-bold text-navy" style="font-size:14px;">${booking.hall}</div>
            </div>
            <div>
              <span class="text-muted">Room & Bed Space:</span>
              <div class="font-bold text-teal" style="font-size:14px;">${booking.room} &bull; ${booking.bedSpace}</div>
            </div>
            <div>
              <span class="text-muted">Booking Status:</span>
              <div><span class="badge badge-success">${booking.status}</span></div>
            </div>
            <div>
              <span class="text-muted">Accommodation Fee:</span>
              <div class="font-bold" style="font-family:var(--font-mono);">KES 35,000.00 (PAID & CLEARED)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Bed Space Selection Grid -->
      <div class="portal-card">
        <div class="card-header-bar navy">
          <span>Select Bed Space (Hall 4 &bull; Room 204)</span>
        </div>
        <div class="card-body">
          <p style="font-size:12.5px;color:var(--text-secondary);margin-bottom:12px;">
            Tap on any available bed space below to update your room selection:
          </p>

          <div class="bed-space-grid">
            <div 
              class="bed-box occupied"
              title="Occupied by Student HBS1/8110/24"
            >
              <div style="font-weight:700;">Bed A</div>
              <div style="font-size:11px;color:#DC2626;margin-top:4px;">Occupied</div>
            </div>

            <div 
              class="bed-box selected"
              onclick="window.portalApp.selectBedSpace('Nursing Students Residence (Hall 4 - Female)', 'Room 204', 'Bed B (Window Side)')"
            >
              <div style="font-weight:700;">Bed B</div>
              <div style="font-size:11px;margin-top:4px;">✓ Current Allocated</div>
            </div>

            <div 
              class="bed-box available"
              onclick="window.portalApp.selectBedSpace('Nursing Students Residence (Hall 4 - Female)', 'Room 204', 'Bed C')"
            >
              <div style="font-weight:700;">Bed C</div>
              <div style="font-size:11px;color:var(--section-green);margin-top:4px;">Available</div>
            </div>

            <div 
              class="bed-box available"
              onclick="window.portalApp.selectBedSpace('Nursing Students Residence (Hall 4 - Female)', 'Room 204', 'Bed D')"
            >
              <div style="font-weight:700;">Bed D</div>
              <div style="font-size:11px;color:var(--section-green);margin-top:4px;">Available</div>
            </div>
          </div>

          <div style="font-size:12px;color:var(--text-secondary);margin-top:14px;border-top:1px dashed var(--border-color);padding-top:8px;">
            <strong>Included Amenities:</strong> Wi-Fi 6 Access &bull; 24/7 Security CCTV &bull; Solar Hot Showers &bull; Study Desks &bull; Common Laundry Area
          </div>
        </div>
      </div>
    </div>
  `;
}
