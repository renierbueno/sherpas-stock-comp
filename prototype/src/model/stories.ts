// Guided scenes on the live prototype (D-117): each is a household and a sequence of steps in
// flow order; each step sets the view and tab, says what to do and how the model changes.
// What the reader does on one step carries over to the next. SIMULATED households only.
import type { Guide } from './guide';
import type { StockCompensationRow } from './intake';
import { H2 } from './households';
import type { Household } from './types';

export interface StoryStep {
  mode: 'client' | 'advisor' | 'print';
  tab: 'health' | 'investment' | 'statements' | 'income' | 'questionnaire' | 'data';
  /** The client's answers, prefilled: the scene shows the stock compensation part only. */
  questionnaire?: { rows: StockCompensationRow[]; documents: string[]; start: 'documents' | 'income' };
  /** "Do it": runs the step's action, so the reader only presses Do it and Next. */
  act?: { label: string; kind: 'submit' | 'confirm' | 'share'; document?: string };
  guide: Guide & { doThis: string };
  /** Show what moved since the first step. */
  showMoved?: boolean;
}

export interface Story {
  id: string;
  title: string;
  household: Household;
  steps: StoryStep[];
}

/** H2 before the client reports anything: no grant, no flag. */
const H2_START: Household = { ...H2, grants: [] };
const HALDEN_STATEMENT = 'Halden plan statement (SIMULATED).pdf';
/** What Maya answers in the questionnaire, prefilled. */
const ANSWERS = { documents: [HALDEN_STATEMENT], rows: [{ id: 'r1', ownerId: 'p1', employer: 'Halden Robotics', ticker: 'HLDN', type: 'RSU' as const, unvestedValue: 120_000, frequency: 'quarterly' as const }] };

export const STORY_RSU: Story = {
  id: 'rsu', title: 'Maya is paid partly in RSUs: from questionnaire to shared report', household: H2_START,
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
