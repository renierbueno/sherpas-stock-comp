// SIMULATED households H1 to H7 (docs/10_flow_review.md, walk-throughs).
// SIMULATED: every name, company, ticker, price and figure here is invented. Not Sherpas data,
// not real people or companies.
import { generateTranches } from './grants';
import type { Grant, Household } from './types';

export const ANALYSIS_DATE = '2026-10-05';

/** Checks the change does not touch: fixed SIMULATED values (D-063). */
// nearTermCommitments is computed by the simulator (F-C); the rest stay fixed.
const UNTOUCHED = {
  savingsRate: 70,
  fixedCommitments: 80,
  housingLoad: 75,
  revolvingBalance: 100,
  coverVsNeed: 60,
  umbrella: 0,
  monthsOfReserve: 80,
  allocationVsTarget: 70,
  idleCash: 60,
  taxLocation: 80,
};

const base = (id: string, name: string, people: Household['people']): Household => ({
  id,
  name: `SIMULATED · ${name}`,
  analysisDate: ANALYSIS_DATE,
  people,
  accounts: [],
  cash: 0,
  employers: [],
  flags: [],
  grants: [],
  incomeIncludesVests: {},
  goals: [],
  annualSavings: 30_000,
  salary: Object.fromEntries(people.map((p) => [p.id, 120_000])),
  filingStatus: people.length > 1 ? 'joint' : 'single',
  stateTaxRate: 0.05,
  nearTermCommitments: 40_000,
  untouchedChecks: { ...UNTOUCHED },
});

/** H1 · No stock pay. Largest position a total market fund, 45% (EC-A-02 shape, no employer stock). */
export const H1: Household = {
  ...base('H1', 'H1 No stock pay · Rivera household', [
    { id: 'p1', name: 'Ana', role: 'client' },
    { id: 'p2', name: 'Luis', role: 'coclient' },
  ]),
  cash: 100_000,
  accounts: [
    { id: 'h1-brk', name: 'Joint brokerage', type: 'Brokerage', owners: ['p1', 'p2'], positions: [
      { id: 'h1-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 450_000 },
      { id: 'h1-bnd', ticker: 'SIMBD', name: 'Aggregate bond fund', value: 250_000 },
    ] },
    { id: 'h1-401k', name: 'Ana 401(k)', type: '401k', owners: ['p1'], positions: [
      { id: 'h1-tdf', ticker: 'SIMTD', name: 'Target date 2050 fund', value: 200_000 },
    ] },
  ],
};

const HALDEN = { id: 'halden', name: 'Halden Robotics', listed: true, ticker: 'HLDN' };

/**
 * H2 · RSU only, listed employer. Holdings are EC-A-01: $1M investable, $150K of employer
 * stock in each of two accounts, largest fund line 20%.
 */
export const H2: Household = {
  ...base('H2', 'H2 RSU only, listed · Chen household', [
    { id: 'p1', name: 'Maya', role: 'client' },
    { id: 'p2', name: 'Sam', role: 'coclient' },
  ]),
  cash: 150_000,
  employers: [HALDEN],
  accounts: [
    { id: 'h2-brk', name: 'Maya brokerage', type: 'Brokerage', owners: ['p1'], positions: [
      { id: 'h2-hldn-brk', ticker: 'HLDN', name: 'Halden Robotics', value: 150_000 },
      { id: 'h2-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 200_000 },
      { id: 'h2-intl', ticker: 'SIMIN', name: 'International index fund', value: 150_000 },
    ] },
    { id: 'h2-401k', name: 'Maya 401(k)', type: '401k', owners: ['p1'], positions: [
      { id: 'h2-hldn-401k', ticker: 'HLDN', name: 'Halden Robotics stock fund', value: 150_000 },
      { id: 'h2-bnd', ticker: 'SIMBD', name: 'Aggregate bond fund', value: 200_000 },
    ] },
  ],
  // Reported in the questionnaire: employer only plus estimates; pending detail (AC-E-07).
  grants: [{ id: 'h2-g1', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'halden',
    tranches: [], source: 'questionnaire', reportedOn: '2026-09-28',
    clientEstimate: { type: 'RSU', unvestedValue: 120_000, frequency: 'quarterly' } }],
  incomeIncludesVests: { p1: 'no' },
  salary: { p1: 260_000, p2: 90_000 },
  goals: [{ id: 'home', name: 'Home purchase', year: 2028, amount: 250_000 }, { id: 'college', name: 'College (Leo)', year: 2026, amount: 40_000 }],
  stateTaxRate: 0.06,
  nearTermCommitments: 60_000,
};

/**
 * H2 after the advisor completes the grant: 4,000 units granted 2025-03-01, four years,
 * quarterly, one-year cliff (EC-B-01 shape). Three tranches are past; ten are future.
 */
export const H2_GRANT: Grant = {
  ...H2.grants[0],
  grantDate: '2025-03-01',
  units: 4_000,
  tranches: generateTranches('2025-03-01', 4_000, { lengthMonths: 48, frequencyMonths: 3, cliffMonths: 12 }),
};
export const H2_COMPLETE: Household = { ...H2, grants: [H2_GRANT] };

/** H3 · With PSU. Listed employer; employer shares held in one account. */
export const H3: Household = {
  ...base('H3', 'H3 With PSU · Okafor household', [{ id: 'p1', name: 'Grace', role: 'client' }]),
  cash: 80_000,
  employers: [{ id: 'arvo', name: 'Arvo Health', listed: true, ticker: 'ARVH' }],
  accounts: [
    { id: 'h3-brk', name: 'Grace brokerage', type: 'Brokerage', owners: ['p1'], positions: [
      { id: 'h3-arvh', ticker: 'ARVH', name: 'Arvo Health', value: 120_000 },
      { id: 'h3-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 300_000 },
    ] },
  ],
  grants: [{ id: 'h3-psu', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'PSU', employerId: 'arvo',
    grantDate: '2025-02-15', units: 1_200, source: 'advisor', reportedOn: '2026-09-20',
    psu: { condition: 'Relative total shareholder return against a sector index', periodEnd: '2027-12-31', rangeMin: 0, rangeMax: 2 },
    tranches: [{ id: 't1', date: '2028-02-15', units: 1_200 }] }],
  incomeIncludesVests: { p1: 'no' },
};

/** H4 · Private employer. Private shares held as a free-text instrument (EC-A-07). */
export const H4: Household = {
  ...base('H4', 'H4 Private employer · Novak household', [{ id: 'p1', name: 'Petra', role: 'client' }]),
  cash: 60_000,
  employers: [{ id: 'lumen', name: 'Lumen Freight', listed: false, fmv409a: { value: 12.4, date: '2026-06-30' } }],
  accounts: [
    { id: 'h4-brk', name: 'Petra brokerage', type: 'Brokerage', owners: ['p1'], positions: [
      { id: 'h4-lumen', name: 'Lumen Freight common shares', value: 90_000, privateInstrument: true },
      { id: 'h4-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 250_000 },
    ] },
  ],
  grants: [{ id: 'h4-g1', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'lumen',
    grantDate: '2023-05-01', units: 8_000, source: 'advisor', tranches: [] }],
  incomeIncludesVests: { p1: 'no' },
};

/** H5 · Detail pending. The client knows only the employer. */
export const H5: Household = {
  ...base('H5', 'H5 Detail pending · Haddad household', [{ id: 'p1', name: 'Omar', role: 'client' }]),
  cash: 40_000,
  employers: [{ id: 'kestrel', name: 'Kestrel Bank', listed: true, ticker: 'KSTB' }],
  accounts: [
    { id: 'h5-401k', name: 'Omar 401(k)', type: '401k', owners: ['p1'], positions: [
      { id: 'h5-tdf', ticker: 'SIMTD', name: 'Target date 2050 fund', value: 310_000 },
    ] },
  ],
  grants: [{ id: 'h5-g1', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'kestrel',
    tranches: [], source: 'questionnaire', reportedOn: '2026-10-01', clientEstimate: { type: 'not sure', frequency: 'not sure' } }],
  incomeIncludesVests: { p1: 'not sure' },
};

/** H6 · Co-client with stock pay: both work for the same employer and both hold its shares (EC-A-03). */
export const H6: Household = {
  ...base('H6', 'H6 Co-client with stock pay · Lindqvist household', [
    { id: 'p1', name: 'Erik', role: 'client' },
    { id: 'p2', name: 'Noor', role: 'coclient' },
  ]),
  cash: 120_000,
  employers: [HALDEN],
  accounts: [
    { id: 'h6-brk1', name: 'Erik brokerage', type: 'Brokerage', owners: ['p1'], positions: [
      { id: 'h6-hldn-1', ticker: 'HLDN', name: 'Halden Robotics', value: 90_000 },
      { id: 'h6-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 260_000 },
    ] },
    { id: 'h6-brk2', name: 'Noor brokerage', type: 'Brokerage', owners: ['p2'], positions: [
      { id: 'h6-hldn-2', ticker: 'HLDN', name: 'Halden Robotics', value: 70_000 },
      { id: 'h6-bnd', ticker: 'SIMBD', name: 'Aggregate bond fund', value: 160_000 },
    ] },
  ],
  grants: [
    { id: 'h6-g1', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'halden',
      grantDate: '2026-02-01', units: 2_400, source: 'advisor', tranches: generateTranches('2026-02-01', 2_400, { lengthMonths: 36, frequencyMonths: 12, cliffMonths: 12 }) },
    { id: 'h6-g2', category: 'stockCompensation', subType: 'RSU', ownerId: 'p2', type: 'RSU', employerId: 'halden',
      grantDate: '2026-04-01', units: 1_200, source: 'advisor', tranches: generateTranches('2026-04-01', 1_200, { lengthMonths: 24, frequencyMonths: 6, cliffMonths: 6 }) },
  ],
  incomeIncludesVests: { p1: 'yes', p2: 'no' },
  salary: { p1: 210_000, p2: 180_000 },
  stateTaxRate: 0, // a state with no income tax (EC-C-03)
};

/** H7 · Existing household, analysed before the setting was on, with a manual score adjustment. */
export const H7: Household = {
  ...base('H7', 'H7 Existing household · Moreau household', [{ id: 'p1', name: 'Claire', role: 'client' }]),
  cash: 90_000,
  employers: [{ id: 'orrin', name: 'Orrin Software', listed: true, ticker: 'ORSW' }],
  manualAdjustment: { points: 3, reason: 'Pension not captured in the questionnaire' },
  accounts: [
    { id: 'h7-brk', name: 'Claire brokerage', type: 'Brokerage', owners: ['p1'], positions: [
      { id: 'h7-orsw', ticker: 'ORSW', name: 'Orrin Software', value: 140_000 },
      { id: 'h7-tmf', ticker: 'SIMTM', name: 'Total market index fund', value: 420_000 },
    ] },
  ],
};

export const HOUSEHOLDS: Household[] = [H1, H2, H3, H4, H5, H6, H7];
