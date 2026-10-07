// The guide strip (D-114): every screen and scene has one, and each line stays short.
import { describe, expect, it } from 'vitest';
import { MAX_WORDS, SCREEN_GUIDES, tabMarks } from '../../src/model/guide';
import { SCENES } from '../../src/model/scenes';

const words = (s: string) => s.trim().split(/\s+/).length;
const all = [...Object.entries(SCREEN_GUIDES), ...SCENES.map((s) => [`scene ${s.id}`, s.guide] as const)];

describe('Guide strip (D-114)', () => {
  it('covers every view and tab of Explore freely', () => {
    for (const k of ['client.income', 'client.health', 'advisor.health', 'advisor.questionnaire', 'advisor.data', 'print', 'investment', 'statements']) {
      expect(SCREEN_GUIDES[k], k).toBeDefined();
    }
  });
  it.each(all)('%s: "What you see" and "Model" stay within the word limit, and a step is lit', (_, g) => {
    expect(words(g.see)).toBeLessThanOrEqual(MAX_WORDS);
    expect(words(g.model)).toBeLessThanOrEqual(MAX_WORDS);
    expect(g.steps.length).toBeGreaterThan(0);
  });
});

describe('Tab dots (D-114)', () => {
  const base = { stockComp: true, surfaces: [] as string[], flagged: false, score: 70, scoreWithoutFeature: 70 };
  it('marks nothing while the firm setting is off', () => {
    expect(tabMarks({ ...base, stockComp: false, surfaces: ['assets.grants'] })).toEqual({});
  });
  it('marks a tab changed when its figures move, new when it only gains lines', () => {
    expect(tabMarks({ ...base, surfaces: ['assets.grants'] }).health).toBe('new');
    expect(tabMarks({ ...base, surfaces: ['assets.grants'], score: 66 }).health).toBe('changed');
    expect(tabMarks({ ...base, surfaces: ['statements.cashflow'] }).statements).toBe('changed');
    expect(tabMarks(base).investment).toBeUndefined();
    expect(tabMarks({ ...base, flagged: true }).investment).toBe('changed');
  });
});
