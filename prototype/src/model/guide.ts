// The guide every screen and scene carries: where the reader is in the flow, what the screen
// shows, and how the model changes. One line each; the reason stays folded under "Why".

export type Step = 1 | 2 | 3 | 4 | 5;

/** The five steps of the flow, the same stages as the Miro change maps. */
export const FLOW: { step: Step; who: string; what: string }[] = [
  { step: 1, who: 'Client answers', what: 'Questionnaire' },
  { step: 2, who: 'Advisor completes', what: 'Grant and statement' },
  { step: 3, who: 'Analysis recalculates', what: 'Score and figures' },
  { step: 4, who: 'Advisor shares', what: 'Shared PDF' },
  { step: 5, who: 'Client reads', what: 'Live view and PDF' },
];

export interface Guide {
  /** Steps lit on the flow rail; the first is the step this screen belongs to. */
  steps: Step[];
  see: string;
  model: string;
  why?: string;
}

/** At most 15 words per line, so the strip stays one line on a laptop screen. */
export const MAX_WORDS = 15;

/** Screens of "Explore freely", by view and tab. */
export const SCREEN_GUIDES: Record<string, Guide> = {
  'client.income': {
    steps: [1],
    see: 'Income asks for pay before taxes, not counting stock compensation.',
    model: 'Salary stays cash pay; each vest is added once, beside it.',
    why: 'If salary included vested stock, the model would count those vests twice (D-094).',
  },
  'advisor.questionnaire': {
    steps: [2],
    see: 'The advisor records the grant and its vest dates, or confirms the statement.',
    model: 'Only a complete grant enters the figures; each vest is dated and taxed.',
    why: 'A client estimate is shown to the advisor but never used in a figure (AC-E-10, AC-G-04).',
  },
  'advisor.data': {
    steps: [2],
    see: 'Grants and holdings; confirming a grant flags its employer’s shares, with Undo.',
    model: 'Flagged shares join the concentration check, summed across accounts and owners.',
    why: 'Employer stock split across accounts looks small one holding at a time (F-A).',
  },
  'advisor.health': {
    steps: [3],
    see: 'The analysis after reprocessing, as the advisor reviews it before sharing.',
    model: 'Concentration, vest tax and vest proceeds feed the score.',
    why: 'Figures change only when the analysis is reprocessed (AC-G-13).',
  },
  'client.health': {
    steps: [5],
    see: 'The client’s Financial health, with stock compensation wherever it changes a figure.',
    model: 'Same score and lines the advisor reviewed; nothing is recalculated here.',
  },
  print: {
    steps: [4, 5],
    see: 'The shared PDF: the live view’s figures and lines, with the advisor’s edits.',
    model: 'No new calculation; the PDF repeats the live view.',
    why: 'The client reads the same figures on screen and on paper (AC-G-10, AC-G-11).',
  },
  investment: {
    steps: [5],
    see: 'Investment analysis adds an employer stock line when shares are flagged.',
    model: 'Holdings and the proposal do not change.',
    why: 'Stock compensation does not change what the client holds or the proposal (D-055).',
  },
  statements: {
    steps: [5],
    see: 'The cash flow adds one line with this year’s vests, outside the totals.',
    model: 'Totals keep reported income; vests sit beside them, never inside.',
    why: 'Income is reported without stock compensation, so vests are never in the totals (D-094).',
  },
};

export type MarkKind = 'new' | 'changed';

/**
 * Which tabs hold something the feature adds (new) or changes (changed), for the dot on the tab.
 * Changed wins over new. Nothing is marked while the firm setting is off.
 */
export function tabMarks(
  input: { stockComp: boolean; surfaces: string[]; flagged: boolean; score: number; scoreWithoutFeature: number },
): Record<string, MarkKind | undefined> {
  if (!input.stockComp) return {};
  const has = (s: string) => input.surfaces.includes(s);
  const healthLines = input.surfaces.some((s) => !['investment.snapshot', 'statements.cashflow', 'advisor.notices'].includes(s));
  return {
    health: input.score !== input.scoreWithoutFeature ? 'changed' : healthLines ? 'new' : undefined,
    investment: has('investment.snapshot') || input.flagged ? 'changed' : undefined,
    statements: has('statements.cashflow') ? 'changed' : undefined,
    income: 'changed',
    questionnaire: 'new',
    data: 'new',
  };
}
