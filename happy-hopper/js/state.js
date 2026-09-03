/* ==========================================================================
   STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
   Central data store for Beatrice Aluso Mukobe - Chuka University Student Portal
   ========================================================================== */

const STORAGE_KEY = 'CHUKA_STUDENT_PORTAL_STATE_V4';

// Initial default state
const defaultState = {
  student: {
    name: 'Beatrice Aluso Mukobe',
    displayName: 'Beatrice Aluso Mukobe',
    regNo: 'HBS1/8115/24',
    gender: 'Female',
    dob: '26/05/2003',
    address: '18385',
    campus: 'Main Campus',
    programme: 'BACHELOR OF SCIENCE IN NURSING',
    faculty: 'School of Nursing & Public Health',
    academicYear: '2026/2027',
    currentStatus: 'PROGRESSING TO THIRD YEAR',
    previousLevel: 'SECOND YEAR COMPLETED',
    nextLevel: 'THIRD YEAR',
    nextReporting: 'SEPTEMBER 2026',
    academicStanding: 'GOOD STANDING',
    attemptedUnits: 20,
    registeredUnitsCount: 0,
    feeClearanceStatus: 'CLEARED',
    avatar: 'assets/profile.jpg'
  },

  // First Year Academic Results
  year1Results: {
    semester1: {
      title: 'YEAR 1 – SEMESTER 1',
      academicYear: '2024/2025',
      units: [
        { code: 'MATH 100', name: 'General Mathematics', mark: 45, grade: 'F' },
        { code: 'NURS 111', name: 'Human Anatomy I', mark: 45, grade: 'F' },
        { code: 'NURS 112', name: 'Human Anatomy II', mark: 60, grade: 'C' },
        { code: 'NURS 113', name: 'Medical Physiology I', mark: 60, grade: 'F' },
        { code: 'NURS 114', name: 'Medical Physiology II', mark: 45, grade: 'C' },
        { code: 'NURS 131', name: 'Medical Sociology and Anthropology', mark: 45, grade: 'B' },
        { code: 'NURS 132', name: 'Communication and Counselling', mark: 45, grade: 'A' },
        { code: 'NURS 151', name: 'Medical Biochemistry I', mark: 45, grade: 'C' },
        { code: 'NURS 171', name: 'Nutrition and Health', mark: 45, grade: 'C' },
        { code: 'NURS 191', name: 'Fundamentals of Nursing Practice I', mark: 75, grade: 'B' },
        { code: 'PHIL 104', name: 'Philosophy and Society', mark: 45, grade: 'C' }
      ],
      total: 555,
      average: '50.45%'
    },
    semester2: {
      title: 'YEAR 1 – SEMESTER 2',
      academicYear: '2024/2025',
      units: [
        { code: 'NURS 115', name: 'Human Anatomy III', mark: 45, grade: 'C' },
        { code: 'NURS 116', name: 'Human Anatomy IV', mark: 60, grade: 'C' },
        { code: 'NURS 117', name: 'Medical Physiology III', mark: 0, grade: 'INC' },
        { code: 'NURS 118', name: 'Medical Physiology IV', mark: 45, grade: 'C' },
        { code: 'NURS 133', name: 'Psychology in Nursing and Health', mark: 45, grade: 'B' },
        { code: 'NURS 152', name: 'Medical Biochemistry II', mark: 60, grade: 'F' },
        { code: 'NURS 172', name: 'Community Health Nursing I', mark: 45, grade: 'C' },
        { code: 'NURS 181', name: 'Midwifery I (Introduction to Midwifery and Pregnancy)', mark: 105, grade: 'C' },
        { code: 'NURS 182', name: 'Midwifery II (The Pregnant Mother)', mark: 60, grade: 'A' },
        { code: 'NURS 192', name: 'Introduction to Health Assessment', mark: 45, grade: 'A' }
      ],
      total: 555,
      average: '55.50%'
    }
  },

  // Second Year Academic Results
  year2Results: {
    semester1: {
      title: 'YEAR 2 – SEMESTER 1',
      academicYear: '2025/2026',
      units: [
        { code: 'NURS 201', name: 'Medical Surgical Nursing I', mark: 68, grade: 'B' },
        { code: 'NURS 202', name: 'Medical Surgical Nursing II', mark: 72, grade: 'A' },
        { code: 'NURS 211', name: 'Pharmacology I', mark: 64, grade: 'B' },
        { code: 'NURS 212', name: 'Pharmacology II', mark: 58, grade: 'C' },
        { code: 'NURS 221', name: 'Community Health Nursing II', mark: 70, grade: 'A' },
        { code: 'NURS 231', name: 'Nursing Research and Statistics', mark: 62, grade: 'B' },
        { code: 'NURS 241', name: 'Pathophysiology I', mark: 66, grade: 'B' },
        { code: 'NURS 251', name: 'Mental Health and Psychiatric Nursing I', mark: 74, grade: 'A' },
        { code: 'NURS 261', name: 'Leadership and Management in Nursing', mark: 61, grade: 'B' }
      ],
      total: 575,
      average: '63.89%'
    },
    semester2: {
      title: 'YEAR 2 – SEMESTER 2',
      academicYear: '2025/2026',
      units: [
        { code: 'NURS 203', name: 'Medical Surgical Nursing III', mark: 71, grade: 'A' },
        { code: 'NURS 204', name: 'Medical Surgical Nursing IV', mark: 67, grade: 'B' },
        { code: 'NURS 213', name: 'Advanced Pharmacology', mark: 63, grade: 'B' },
        { code: 'NURS 222', name: 'Community Health Nursing III', mark: 69, grade: 'B' },
        { code: 'NURS 232', name: 'Research Methods in Nursing', mark: 73, grade: 'A' },
        { code: 'NURS 242', name: 'Pathophysiology II', mark: 65, grade: 'B' },
        { code: 'NURS 252', name: 'Mental Health and Psychiatric Nursing II', mark: 70, grade: 'A' },
        { code: 'NURS 262', name: 'Nursing Leadership and Management II', mark: 68, grade: 'B' },
        { code: 'NURS 271', name: 'Health Informatics', mark: 75, grade: 'A' }
      ],
      total: 621,
      average: '69.00%'
    }
  },

  // Third Year Units Available for Registration
  year3Registration: {
    semester1: [
      { code: 'NURS 301', name: 'Advanced Medical Surgical Nursing I', credits: 3, core: true, selected: false },
      { code: 'NURS 302', name: 'Advanced Medical Surgical Nursing II', credits: 3, core: true, selected: false },
      { code: 'NURS 311', name: 'Critical Care Nursing', credits: 3, core: true, selected: false },
      { code: 'NURS 321', name: 'Community Health Nursing IV', credits: 3, core: true, selected: false },
      { code: 'NURS 331', name: 'Maternal and Newborn Health I', credits: 3, core: true, selected: false },
      { code: 'NURS 341', name: 'Nursing Research Project I', credits: 3, core: true, selected: false },
      { code: 'NURS 351', name: 'Paediatric Nursing I', credits: 3, core: true, selected: false },
      { code: 'NURS 361', name: 'Health Systems Management', credits: 3, core: true, selected: false }
    ],
    semester2: [
      { code: 'NURS 303', name: 'Advanced Medical Surgical Nursing III', credits: 3, core: true, selected: false },
      { code: 'NURS 312', name: 'Critical Care Nursing II', credits: 3, core: true, selected: false },
      { code: 'NURS 322', name: 'Community Health Nursing V', credits: 3, core: true, selected: false },
      { code: 'NURS 332', name: 'Maternal and Newborn Health II', credits: 3, core: true, selected: false },
      { code: 'NURS 342', name: 'Nursing Research Project II', credits: 3, core: true, selected: false },
      { code: 'NURS 352', name: 'Paediatric Nursing II', credits: 3, core: true, selected: false },
      { code: 'NURS 362', name: 'Health Policy and Leadership', credits: 3, core: true, selected: false }
    ],
    isRegistered: false,
    registrationDate: null
  },

  // Timetable Data
  timetable: [
    { day: 'Monday', time: '08:00 – 10:00', code: 'NURS 301', name: 'Advanced Medical Surgical Nursing I', venue: 'Room B12', lecturer: 'Dr. E. Mwangi' },
    { day: 'Monday', time: '10:00 – 12:00', code: 'NURS 311', name: 'Critical Care Nursing', venue: 'Simulation Lab 2', lecturer: 'Prof. K. Omondi' },
    { day: 'Tuesday', time: '08:00 – 11:00', code: 'NURS 351', name: 'Paediatric Nursing I (Clinical Practice)', venue: 'Skills Lab A', lecturer: 'Dr. S. Wanjiku' },
    { day: 'Tuesday', time: '14:00 – 16:00', code: 'NURS 321', name: 'Community Health Nursing IV', venue: 'Nursing Lecture Hall 1', lecturer: 'Dr. F. Mutua' },
    { day: 'Wednesday', time: '08:00 – 12:00', code: 'NURS 331', name: 'Maternal and Newborn Health I (Practicum)', venue: 'Maternity Wing (Demo)', lecturer: 'Dr. C. Chebet' },
    { day: 'Wednesday', time: '14:00 – 16:00', code: 'NURS 361', name: 'Health Systems Management', venue: 'Room C04', lecturer: 'Mr. P. Njoroge' },
    { day: 'Thursday', time: '09:00 – 12:00', code: 'NURS 302', name: 'Advanced Medical Surgical Nursing II', venue: 'Nursing Lecture Hall 2', lecturer: 'Dr. E. Mwangi' },
    { day: 'Friday', time: '08:00 – 11:00', code: 'NURS 341', name: 'Nursing Research Project I (Seminar)', venue: 'Postgrad Seminar Room', lecturer: 'Prof. A. Barasa' }
  ],

  // Academic Requisitions
  requisitions: [
    {
      id: 'REQ-2026-0891',
      type: 'Request Academic Transcript',
      subject: 'Official Transcript for Scholarship Application',
      description: 'Requesting certified copies of Year 1 and Year 2 completed transcripts.',
      date: '2026-08-15',
      status: 'Approved',
      remarks: 'Signed transcript ready for collection at Registrar Office.'
    },
    {
      id: 'REQ-2026-0942',
      type: 'Request Academic Letter',
      subject: 'Bonafide Student Introductory Letter',
      description: 'Letter of confirmation for clinical placement internship.',
      date: '2026-08-22',
      status: 'Pending',
      remarks: 'Under verification by School of Nursing Dean.'
    }
  ],

  // Course Evaluations
  evaluations: {
    'NURS 301': { effectiveness: 5, content: 4, environment: 5, comment: 'Very engaging clinical case studies.', completed: true },
    'NURS 311': { effectiveness: 4, content: 5, environment: 4, comment: 'Hands-on simulation equipment is great.', completed: true },
    'NURS 321': { effectiveness: 0, content: 0, environment: 0, comment: '', completed: false },
    'NURS 331': { effectiveness: 0, content: 0, environment: 0, comment: '', completed: false }
  },

  // Fee Financial Statement & Ledger (Exact 28 Transactions from Reference Data)
  financials: {
    openingBalance: 0.00,
    currentCharges: 419000.00,
    totalPayments: 464080.00,
    outstandingBalance: -45080.00,
    summary: {
      totalDebit: 419000.00,
      totalCredit: 464080.00,
      finalBalance: -45080.00
    },
    feeTransactions: [
      { postingDate: '05/09/2024', refNo: 'KCB1/206425', description: 'Fee Payment Bank Slip FT242497W8Y6', debit: 0.00, credit: 89500.00, balance: -89500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254317', description: 'Tuition for HB1B-Y1S1-Full Time SEM1-24/25', debit: 70000.00, credit: 0.00, balance: -19500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254318', description: 'Activity Fee SEM1-24/25', debit: 1000.00, credit: 0.00, balance: -18500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254319', description: 'Caution Money SEM1-24/25', debit: 2000.00, credit: 0.00, balance: -16500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254320', description: 'CUE Quality Assurance SEM1-24/25', debit: 1000.00, credit: 0.00, balance: -15500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254321', description: 'Examination SEM1-24/25', debit: 3000.00, credit: 0.00, balance: -12500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254322', description: 'Library Use SEM1-24/25', debit: 2000.00, credit: 0.00, balance: -10500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254323', description: 'Material Development SEM1-24/25', debit: 3000.00, credit: 0.00, balance: -7500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254324', description: 'Mentorship SEM1-24/25', debit: 5000.00, credit: 0.00, balance: -2500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254325', description: 'Registration Fee SEM1-24/25', debit: 1000.00, credit: 0.00, balance: -1500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254326', description: 'Student Union SEM1-24/25', debit: 1000.00, credit: 0.00, balance: -500.00 },
      { postingDate: '19/11/2024', refNo: 'TR254327', description: 'Student ID Card SEM1-24/25', debit: 500.00, credit: 0.00, balance: 0.00 },
      { postingDate: '06/01/2025', refNo: 'TR326791', description: 'Tuition for HB1B-Y1S2-Full Time SEM2-24/25', debit: 70000.00, credit: 0.00, balance: 70000.00 },
      { postingDate: '06/01/2025', refNo: 'TR326792', description: 'Mentorship SEM2-24/25', debit: 10000.00, credit: 0.00, balance: 80000.00 },
      { postingDate: '07/05/2025', refNo: 'TR369288', description: 'Tuition for HB1B-Y1S3-Full Time SEM3-24/25', debit: 70000.00, credit: 0.00, balance: 150000.00 },
      { postingDate: '08/10/2025', refNo: 'KCB1/229129', description: 'Fee Payment Bank Slip FT25281Q67HM', debit: 0.00, credit: 89500.00, balance: 60500.00 },
      { postingDate: '14/10/2025', refNo: 'RG141328', description: 'Tuition for HB1B-Y1S1-Full Time SEM1-25/26', debit: 86500.00, credit: 0.00, balance: 147000.00 },
      { postingDate: '14/10/2025', refNo: 'RG141328', description: 'Caution Money SEM1-25/26', debit: 2000.00, credit: 0.00, balance: 149000.00 },
      { postingDate: '14/10/2025', refNo: 'RG141328', description: 'Student Union SEM1-25/26', debit: 1000.00, credit: 0.00, balance: 150000.00 },
      { postingDate: '16/10/2025', refNo: 'RC-0113857', description: 'Fee Payment Unreferenced KCB1/213915', debit: 0.00, credit: 80000.00, balance: 70000.00 },
      { postingDate: '11/01/2026', refNo: 'KCB1/232766', description: 'Fee Payment Bank Slip FT260129F8NV', debit: 0.00, credit: 80000.00, balance: -10000.00 },
      { postingDate: '14/01/2026', refNo: 'RG155861', description: 'Tuition for HB1B-Y1S2-Full Time SEM2-25/26', debit: 80000.00, credit: 0.00, balance: 70000.00 },
      { postingDate: '16/02/2026', refNo: 'RC-0116171', description: 'Fee Payment Unreferenced KCB1/215132', debit: 0.00, credit: 70000.00, balance: 0.00 },
      { postingDate: '26/03/2026', refNo: 'KCB1/234932', description: 'SEM1-25/26-HELB 6734-1-42410251-1-SEM1-Helb', debit: 0.00, credit: 27540.00, balance: -27540.00 },
      { postingDate: '26/03/2026', refNo: 'KCB1/234932', description: 'SEM1-25/26-HELB 6734-1-42410251-2-SEM1-Helb', debit: 0.00, credit: 27540.00, balance: -55080.00 },
      { postingDate: '23/04/2026', refNo: 'RG167146', description: 'Supp. Fees for HB1B-MATH 100 SEM2-25/26', debit: 3000.00, credit: 0.00, balance: -52080.00 },
      { postingDate: '23/04/2026', refNo: 'RG167146', description: 'Supp. Fees for HB1B-NURS 111 SEM2-25/26', debit: 3000.00, credit: 0.00, balance: -49080.00 },
      { postingDate: '23/04/2026', refNo: 'RG167146', description: 'Supp. Fees for HB1B-NURS 113 SEM2-25/26', debit: 4000.00, credit: 0.00, balance: -45080.00 }
    ]
  },

  // Legacy Statements (Historical balances)
  legacyStatements: [
    { year: '2024/2025', semester: 'Year 1 Sem 1', opening: 0.00, charges: 89500.00, payments: 89500.00, closing: 0.00 },
    { year: '2024/2025', semester: 'Year 1 Sem 2', opening: 0.00, charges: 80000.00, payments: 80000.00, closing: 0.00 },
    { year: '2024/2025', semester: 'Year 1 Sem 3', opening: 0.00, charges: 70000.00, payments: 70000.00, closing: 0.00 },
    { year: '2025/2026', semester: 'Year 2 Sem 1', opening: 0.00, charges: 89500.00, payments: 89500.00, closing: 0.00 },
    { year: '2025/2026', semester: 'Year 2 Sem 2', opening: 0.00, charges: 80000.00, payments: 80000.00, closing: -45080.00 }
  ],

  // Payment Receipts
  receipts: [
    {
      id: 'REC-2026-09812',
      date: '26/03/2026',
      amount: 55080.00,
      channel: 'HELB Government Disbursement',
      refCode: 'KCB1/234932',
      status: 'VERIFIED',
      purpose: 'HELB Loan & Bursary Allocation (SEM1-25/26)'
    },
    {
      id: 'REC-2026-09142',
      date: '16/02/2026',
      amount: 70000.00,
      channel: 'KCB Bank Direct Deposit',
      refCode: 'RC-0116171',
      status: 'VERIFIED',
      purpose: 'Tuition Fee (HB1B-Y1S2)'
    },
    {
      id: 'REC-2026-04120',
      date: '11/01/2026',
      amount: 80000.00,
      channel: 'KCB Bank Slip Deposit',
      refCode: 'FT260129F8NV',
      status: 'VERIFIED',
      purpose: 'Fee Payment Bank Slip'
    }
  ],

  // Hostel Accommodation Booking
  hostelBooking: {
    hall: 'Nursing Students Residence (Hall 4 - Female)',
    room: 'Room 204',
    floor: '2nd Floor',
    bedSpace: 'Bed B (Window Side)',
    status: 'CONFIRMED',
    semester: 'September 2026 – December 2026',
    fee: 35000.00,
    isBooked: true
  },

  // Notifications
  notifications: [
    { id: 1, title: 'Fee Statement Updated', time: 'Just now', text: 'Your official fee transaction ledger is now available with current balance of KES -45,080.00.', read: false },
    { id: 2, title: 'Third Year Registration Open', time: '2 hours ago', text: 'Registration for September 2026 semester is now active. Complete your unit selection.', read: false },
    { id: 3, title: 'Second Year Results Published', time: '1 day ago', text: 'Congratulations, your Year 2 examination results are available for review.', read: true }
  ],

  // User Settings
  settings: {
    theme: 'light',
    viewportMode: 'desktop', // Default to desktop view or full width
    fontSize: 'normal',
    emailNotifications: true,
    smsAlerts: true
  }
};

class StateManager {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        parsed.student = parsed.student || {};
        parsed.student.avatar = 'assets/profile.jpg';
        parsed.student.name = 'Beatrice Aluso Mukobe';
        parsed.student.displayName = 'Beatrice Aluso Mukobe';
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // Action helpers
  toggleYear3Unit(semesterKey, unitCode) {
    const units = this.state.year3Registration[semesterKey];
    if (units) {
      const unit = units.find(u => u.code === unitCode);
      if (unit) {
        unit.selected = !unit.selected;
        this.saveState();
      }
    }
  }

  selectAllYear3Units(semesterKey, selectAll = true) {
    const units = this.state.year3Registration[semesterKey];
    if (units) {
      units.forEach(u => { u.selected = selectAll; });
      this.saveState();
    }
  }

  saveCourseRegistration(semesterKey) {
    const units = this.state.year3Registration[semesterKey] || [];
    const selectedCount = units.filter(u => u.selected).length;
    this.state.year3Registration.isRegistered = true;
    this.state.year3Registration.registrationDate = new Date().toISOString();
    this.state.student.registeredUnitsCount = selectedCount;
    this.saveState();
  }

  submitRequisition(type, subject, description) {
    const newReq = {
      id: 'REQ-2026-' + Math.floor(1000 + Math.random() * 9000),
      type,
      subject,
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      remarks: 'Submitted for administrative approval.'
    };
    this.state.requisitions.unshift(newReq);
    this.saveState();
    return newReq;
  }

  saveEvaluation(unitCode, ratings) {
    this.state.evaluations[unitCode] = {
      ...ratings,
      completed: true
    };
    this.saveState();
  }

  makeDemoPayment(amount, method, refCode) {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0) return false;

    const newReceipt = {
      id: 'REC-2026-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString('en-GB'),
      amount: numAmount,
      channel: method,
      refCode: refCode || ('PAY-' + Math.random().toString(36).substring(2, 8).toUpperCase()),
      status: 'VERIFIED',
      purpose: 'Fee Settlement'
    };

    this.state.receipts.unshift(newReceipt);

    // Update financials
    this.state.financials.totalPayments += numAmount;
    this.state.financials.outstandingBalance = this.state.financials.currentCharges - this.state.financials.totalPayments;
    this.state.financials.summary.totalCredit = this.state.financials.totalPayments;
    this.state.financials.summary.finalBalance = this.state.financials.outstandingBalance;

    this.state.financials.feeTransactions.push({
      postingDate: new Date().toLocaleDateString('en-GB'),
      refNo: newReceipt.refCode,
      description: `Fee Payment - ${method}`,
      debit: 0.00,
      credit: numAmount,
      balance: this.state.financials.outstandingBalance
    });

    this.saveState();
    return newReceipt;
  }

  bookHostel(hall, room, floor, bedSpace) {
    this.state.hostelBooking = {
      hall,
      room,
      floor,
      bedSpace,
      status: 'CONFIRMED',
      semester: 'September 2026 – December 2026',
      fee: 35000.00,
      isBooked: true
    };
    this.saveState();
  }

  setTheme(theme) {
    this.state.settings.theme = theme;
    this.saveState();
  }

  setViewportMode(mode) {
    this.state.settings.viewportMode = mode;
    this.saveState();
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
  }
}

export const portalState = new StateManager();
