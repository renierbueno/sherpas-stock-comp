// Guided scenes on the live prototype (D-117): each is a household and a sequence of steps in
// flow order; each step sets the view and tab, says what to do and how the model changes.
// What the reader does on one step carries over to the next. SIMULATED households only.
import type { Guide } from './guide';
import type { StockCompensationRow } from './intake';
import { H2 } from './households';
import type { Grant, Household } from './types';
import { H3, H7 } from './households';
import { H2_GAP, H2_GOAL } from './scenes';

export interface StoryStep {
  mode: 'client' | 'advisor' | 'print';
  tab: 'health' | 'investment' | 'statements' | 'income' | 'questionnaire' | 'data';
  /** The client's answers, prefilled: the scene shows the stock compensation part only. */
  questionnaire?: { rows: StockCompensationRow[]; documents: string[]; start: 'documents' | 'income' };
  /** "Do it": runs the step's action, so the reader only presses Do it and Next. */
  act?: { label: string; kind: 'submit' | 'confirm' | 'share' | 'addGrant'; document?: string; grant?: Grant };
  guide: Guide & { doThis: string };
  /** Show what moved since the first step. */
  showMoved?: boolean;
}

export type MetricKey = 'score' | 'concentration' | 'vests' | 'taxGap' | 'liquidity' | 'projected';

export interface Story {
  id: string;
  title: string;
  household: Household;
  steps: StoryStep[];
  /** The figures shown as "what moved"; default: score, concentration, vests, tax gap. */
  keys?: MetricKey[];
  /** Compare against this household instead of the starting one (a scene that starts complete). */
  baseline?: { household: Household; label: string };
  /** The before-and-after calculation of D-071 that explains this scene, by its scene id. */
  calculation?: number[];
}

/** H2 before the client reports anything: no grant, no flag. */
const H2_START: Household = { ...H2, grants: [] };
const HALDEN_STATEMENT = 'Halden plan statement (SIMULATED).pdf';
/** What Maya answers in the questionnaire, prefilled. */
const ANSWERS = { documents: [HALDEN_STATEMENT], rows: [{ id: 'r1', ownerId: 'p1', employer: 'Halden Robotics', ticker: 'HLDN', type: 'RSU' as const, unvestedValue: 120_000, frequency: 'quarterly' as const }] };

export const STORY_RSU: Story = {
  id: 'rsu', title: 'Maya is paid partly in RSUs: from questionnaire to shared report', household: H2_START, calculation: [1, 2],
  steps: [
    { mode: 'client', tab: 'income', questionnaire: { start: 'documents', ...ANSWERS }, guide: { steps: [1],
      doThis: 'See the plan statement among the documents, then go to Income.',
      see: 'The questionnaire’s documents step, after Welcome, as today (seen 2026-10-05).',
      model: 'An uploaded plan statement becomes a proposal; nothing counts yet.',
      why: 'The plan statement goes where clients already upload statements, no second upload point (D-077, AC-F-13).' } },
    { mode: 'client', tab: 'income', act: { label: 'Submit questionnaire', kind: 'submit' }, questionnaire: { start: 'income', ...ANSWERS },
      guide: { steps: [1],
      doThis: 'Read the Income answers, then submit; the grey sections are unchanged.',
      see: 'Income without stock compensation, and one Stock compensation row.',
      model: 'Nothing counts yet: the row is pending, the statement a proposal.',
      why: 'No figure uses data the advisor has not confirmed (AC-E-10, AC-F-03, D-042).' } },
    { mode: 'client', tab: 'health', guide: { steps: [1, 5],
      doThis: 'Find the line saying the stock compensation is reported, not yet counted.',
      see: 'The client’s analysis before the advisor confirms anything.',
      model: 'Figures unchanged; the client’s estimate is never used in them.',
      why: 'The pending line tells the client why nothing moved yet (AC-E-10, AC-G-04).' } },
    { mode: 'advisor', tab: 'data', act: { label: 'Confirm the statement', kind: 'confirm', document: HALDEN_STATEMENT }, guide: { steps: [2],
      doThis: 'See the alert and the grant read from the statement, then confirm.',
      see: 'The alert, the client’s estimate and the grant read from the statement.',
      model: 'Confirming completes the reported grant and flags Halden shares, with Undo.',
      why: 'One review, prefilled; the shares are flagged in every account at once (AC-F-14, AC-F-18, AC-E-17).' } },
    { mode: 'advisor', tab: 'health', act: { label: 'Share with client', kind: 'share' }, guide: { steps: [3, 4],
      doThis: 'Review the new lines; any wording can be edited; then share.',
      see: 'The reprocessed analysis, as the advisor reviews it before sharing.',
      model: 'Concentration, tax at vest and vests in the projection now reach the score.',
      why: 'Figures change only when the analysis is reprocessed; the advisor shares it (AC-G-12, AC-G-13).' }, showMoved: true },
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'Scroll: concentration, future vests, tax at vest and the projection.',
      see: 'What the client reads live, with the advisor’s edits.',
      model: 'Same figures the advisor reviewed; nothing is recalculated for the client.' }, showMoved: true },
    { mode: 'print', tab: 'health', guide: { steps: [4, 5],
      doThis: 'Compare with the live view: the same figures and lines.',
      see: 'The shared PDF.',
      model: 'No new calculation; the PDF repeats the live view.',
      why: 'The client reads the same figures on screen and on paper (AC-G-10, AC-G-11).' }, showMoved: true },
  ],
};

const GAP_GRANT = H2_GAP.grants[0];

export const STORY_GAP: Story = {
  id: 'gap', title: 'Withholding that will not cover the tax', household: { ...H2_GAP, grants: [] },
  keys: ['taxGap', 'liquidity', 'score'], calculation: [3],
  steps: [
    { mode: 'advisor', tab: 'data', act: { label: 'Save the grant', kind: 'addGrant', grant: GAP_GRANT }, guide: { steps: [2],
      doThis: 'Save the $100,000 RSU grant vesting in January 2027.',
      see: 'A household taxed at 32%, with just enough cash for what it owes soon.',
      model: 'The vest is wages of 2027; tax is computed beside the reported salary.',
      why: 'The vest value is added to the owner’s wages of its delivery year (AC-C-01, AC-E-12).' } },
    { mode: 'advisor', tab: 'health', guide: { steps: [3],
      doThis: 'Open "Tax on each vest" in Savings & Expenses, then View more.',
      see: 'Estimated tax, 22% withheld, the gap, and a look-into line.',
      model: 'The gap counts as a near-term commitment, so the Liquidity check drops.',
      why: 'Supplemental withholding is 22% (SC-14); the rest is owed later and counted within the horizon (AC-C-17, SC-17).' }, showMoved: true },
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'Read the same tax lines as the client sees them.',
      see: 'The client’s Savings & Expenses and Liquidity, after sharing.',
      model: 'Same figures the advisor reviewed; nothing is recalculated for the client.' }, showMoved: true },
  ],
};

export const STORY_GOAL: Story = {
  id: 'goal', title: 'Vests that help fund a goal', household: H2_GOAL,
  keys: ['vests', 'projected'], calculation: [4], baseline: { household: { ...H2_GOAL, grants: [] }, label: 'without stock compensation' },
  steps: [
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'Scroll to Retirement & Goals: the goal line, chart markers, projected figure.',
      see: 'A home purchase in 2028 and $80,000 of vests before it.',
      model: 'Vests are wages of their delivery year; the household saves its usual share.',
      why: 'Goal lines show vests after tax before the goal year; the projection treats vests as wages (AC-D-07, AC-D-10, D-118).' }, showMoved: true },
    { mode: 'print', tab: 'health', guide: { steps: [4, 5],
      doThis: 'Compare with the live view: the same goal line and figures.',
      see: 'The shared PDF.',
      model: 'No new calculation; the PDF repeats the live view.' }, showMoved: true },
  ],
};

export const STORY_PSU: Story = {
  id: 'psu', title: 'A PSU with a performance range', household: H3,
  keys: ['vests', 'taxGap', 'score'], baseline: { household: { ...H3, grants: [] }, label: 'without stock compensation' },
  steps: [
    { mode: 'advisor', tab: 'data', guide: { steps: [2],
      doThis: 'Press Edit on the PSU: condition, period end and payout range.',
      see: 'Grace’s 1,200 performance units, vesting February 2028.',
      model: 'Figures use target units, always shown with their range (0% to 200%).',
      why: 'A PSU is an RSU with performance terms; nothing assumes the outcome (D-058, AC-B-16, AC-B-17).' } },
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'See "at target" and its range in every figure, and the chart band.',
      see: 'Vest value, tax and projection at target, each with its range.',
      model: 'At target in the score; the range travels with every figure.',
      why: 'The client reads the possible outcome, not one number (AC-A-17, AC-B-24, AC-C-16, AC-D-04).' }, showMoved: true },
  ],
};

/** H7's employer grant, as the advisor would type it from the plan statement. */
const H7_GRANT: Grant = {
  id: 'h7-rsu', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'orrin', grantDate: '2026-02-01', units: 2_000, source: 'advisor',
  tranches: ['2027-02-01', '2027-05-01', '2027-08-01', '2027-11-01'].map((date, i) => ({ id: `h7-t${i + 1}`, date, units: 500 })),
};

export const STORY_EXISTING: Story = {
  id: 'existing', title: 'An existing client: the advisor adds the grant', household: H7,
  keys: ['score', 'vests', 'taxGap'],
  steps: [
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'Nothing to do: the firm turned the setting on and nothing changed.',
      see: 'Claire’s analysis from before, with the advisor’s manual adjustment.',
      model: 'Existing households stay as they are until the advisor adds data.',
      why: 'Clients are not asked again (D-052, AC-G-08).' } },
    { mode: 'advisor', tab: 'data', act: { label: 'Save the grant', kind: 'addGrant', grant: H7_GRANT }, guide: { steps: [2],
      doThis: 'Save the prepared grant; Add grant shows the salary check and adjustment warning.',
      see: 'The advisor adds Claire’s grant in Data & Assumptions.',
      model: 'Saving reprocesses the analysis and replaces the manual score adjustment.',
      why: 'Her salary was reported before the income question excluded stock compensation, so the review asks to check it (AC-F-17, AC-B-06, AC-G-12).' } },
    { mode: 'client', tab: 'health', guide: { steps: [5],
      doThis: 'See the new lines and what moved.',
      see: 'Claire’s analysis after the advisor shared it.',
      model: 'Her vests, tax at vest and projection now reach the score.' }, showMoved: true },
  ],
};
