import { useEffect, useMemo, useRef, useState } from 'react';
import { afterSave, removeFlag, setFlag } from '../model/actions';
import { analyze, type Analysis } from '../model/analysis';
import { EventLog } from '../model/events';
import { addGrant, saveGrant, setStateWithholding } from '../model/grants';
import { HOUSEHOLDS } from '../model/households';
import type { EmployerFlag, Firm, Grant, Household } from '../model/types';
import { Edits, FinancialHealth, Statements, visibleLines, type Mode } from './FinancialHealth';
import { adjustScore, shareAnalysis, type LineEdits } from '../model/sharing';
import { GrantsPanel, type GrantSave, type ProposalActions } from './GrantEditor';
import { IncomeStep, type QuestionnaireSubmit } from './Questionnaire';
import { confirmAll, confirmProposed, rejectProposed, uploadStatement } from '../model/extraction';
import { flagOnConfirm, opportunityAlerts, recordAlertChange, recordRowChange, submitQuestionnaire, type AutoFlag, type StockCompensationRow } from '../model/intake';
import { HoldingsEditor } from './HoldingsEditor';
import { InvestmentAnalysis } from './InvestmentAnalysis';
import { GuideStrip, Mark, TabDot } from './Guide';
import { SCREEN_GUIDES, tabMarks } from '../model/guide';

export type Tab = 'health' | 'investment' | 'statements' | 'income' | 'questionnaire' | 'data';

const byId = <T extends { id: string }>(xs: T[]) => Object.fromEntries(xs.map((x) => [x.id, x]));

/** A guided scene drives the view and tab from outside; the household state carries over. */
export interface Steering {
  mode: Mode; tab: Tab; step: number;
  /** The client's answers, prefilled so the scene shows only what matters. */
  questionnaire?: { rows: StockCompensationRow[]; documents: string[]; start: 'documents' | 'income' };
  /** "Do it": the step's action, run once per id. */
  run?: { id: number; kind: 'submit' | 'confirm' | 'share' | 'addGrant'; document?: string; grant?: Grant };
}

export function App({ initialHousehold = 'H2', initialMode = 'client', initialTab = 'health', households: seed = HOUSEHOLDS, steer, onState }: {
  initialHousehold?: string; initialMode?: Mode; initialTab?: Tab; households?: Household[];
  steer?: Steering; onState?: (h: Household, a: Analysis) => void;
}) {
  const log = useRef(new EventLog()).current;
  const [firm, setFirm] = useState<Firm>({ id: 'firm-sim', stockComp: true });
  const [households, setHouseholds] = useState<Record<string, Household>>(() => byId(seed));
  // Analyses are snapshots: they change only on reprocessing (AC-G-13).
  const [analyses, setAnalyses] = useState<Record<string, Analysis>>(() =>
    Object.fromEntries(seed.map((h) => [h.id, analyze(h, { id: 'firm-sim', stockComp: true })])));
  const [hid, setHid] = useState(initialHousehold);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [tab, setTab] = useState<Tab>(initialTab);

  const [edits, setEdits] = useState<Record<string, LineEdits>>({});
  const [shared, setShared] = useState<string | null>(null);
  const [adjust, setAdjust] = useState({ points: '', reason: '' });
  // A guided scene sets view and tab on each new step, in the same render (no stale frame).
  const [steered, setSteered] = useState<number | undefined>(undefined);
  if (steer && steer.step !== steered) { setSteered(steer.step); setMode(steer.mode); setTab(steer.tab); }
  const household = households[hid];
  const lineEdits = edits[hid] ?? {};
  const setEdit = (id: string, text: string | null | undefined) => setEdits((all) => {
    const mine = { ...(all[hid] ?? {}) };
    if (text === undefined) delete mine[id]; else mine[id] = text;
    return { ...all, [hid]: mine };
  });
  const analysis = analyses[hid];
  useEffect(() => { onState?.(household, analysis); }, [household, analysis]);

  const reprocess = (h: Household) => {
    recordAlertChange(households[h.id], h, firm, h.analysisDate, log); // EV-E-03
    setHouseholds((all) => ({ ...all, [h.id]: h }));
    setAnalyses((all) => ({ ...all, [h.id]: analyze(h, firm, log) }));
  };
  // AC-E-17: confirming a grant flags its employer's held shares; the notice offers Undo.
  const [autoFlags, setAutoFlags] = useState<{ hid: string; notices: AutoFlag[] } | null>(null);
  const confirmAndFlag = (next: Household) => {
    const r = flagOnConfirm(household, next, firm, log);
    if (r.notices.length > 0) setAutoFlags({ hid, notices: r.notices });
    reprocess(afterSave(r.household));
  };
  const undoAutoFlag = (n: AutoFlag) => {
    reprocess(afterSave(n.positionIds.reduce((h, id) => removeFlag(h, id, firm, log), household)));
    setAutoFlags((a) => (a ? { ...a, notices: a.notices.filter((x) => x !== n) } : a));
  };
  const saveFlag = (f: EmployerFlag) => reprocess(afterSave(setFlag(household, f, firm, log)));
  const dropFlag = (positionId: string) => reprocess(afterSave(removeFlag(household, positionId, firm, log)));
  const saveGrantEdit = ({ grant, employer, generated }: GrantSave) => {
    const base: Household = {
      ...household,
      employers: household.employers.map((e) => (e.id === employer.id ? employer : e)),
    };
    const isNew = !household.grants.some((g) => g.id === grant.id);
    const before = household.grants.find((g) => g.id === grant.id)?.stateWithholdingRate;
    let next = isNew ? addGrant(base, { ...grant, stateWithholdingRate: undefined }, firm, log) : saveGrant(base, { ...grant, stateWithholdingRate: before }, firm, log, generated);
    if (grant.stateWithholdingRate !== before) next = setStateWithholding(next, grant.id, grant.stateWithholdingRate, household.analysisDate, log);
    confirmAndFlag(next);
  };

  const proposals: ProposalActions = {
    onUpload: (doc) => reprocess(uploadStatement(household, doc, 'advisor', log).household),
    onConfirm: ({ grant, employer }, keep) => confirmAndFlag(confirmProposed({
      ...household,
      employers: household.employers.map((e) => (e.id === employer.id ? employer : e)),
    }, grant, log, keep)),
    onReject: (id) => reprocess(rejectProposed(household, id, log)),
    onConfirmAll: (doc) => confirmAndFlag(confirmAll(household, doc, log)),
  };
  const submitClient = ({ rows, documents }: QuestionnaireSubmit) => {
    let h = submitQuestionnaire(household, rows, firm, household.analysisDate, log);
    for (const d of documents) h = uploadStatement(h, d, 'client', log).household; // AC-F-13
    reprocess(h);
  };

  // "Do it" in a guided scene runs the step's action once, as the button on screen would.
  const [submitted, setSubmitted] = useState(false);
  const ran = useRef(new Set<number>()).current;
  useEffect(() => {
    const r = steer?.run;
    if (!r || ran.has(r.id)) return;
    ran.add(r.id);
    if (r.kind === 'submit' && steer?.questionnaire) { submitClient(steer.questionnaire); setSubmitted(true); }
    if (r.kind === 'confirm' && r.document) proposals.onConfirmAll(r.document);
    if (r.kind === 'addGrant' && r.grant) {
      const employer = household.employers.find((e) => e.id === r.grant!.employerId);
      if (employer) saveGrantEdit({ grant: r.grant, employer });
    }
    if (r.kind === 'share') { shareAnalysis(household, analysis.lines, lineEdits, log); setShared(hid); }
  }, [steer?.run?.id]);

  const tabs: [Tab, string][] = useMemo(() => {
    const t: [Tab, string][] = [['health', 'Financial health'], ['investment', 'Investment analysis'], ['statements', 'Statements']];
    if (mode === 'client') t.push(['income', 'Questionnaire']);
    if (mode === 'advisor') t.push(['questionnaire', 'Questionnaire · Investments'], ['data', 'Data & Assumptions']);
    return t;
  }, [mode]);
  const activeTab = tabs.some(([t]) => t === tab) ? tab : 'health';

  const notices = visibleLines(analysis, mode).filter((l) => l.surface === 'advisor.notices');
  const alerts = mode === 'advisor' ? opportunityAlerts(household, firm) : [];
  const marks = tabMarks({
    stockComp: firm.stockComp,
    surfaces: visibleLines(analysis, mode).map((l) => l.surface),
    flagged: household.flags.length > 0,
    score: analysis.score.score,
    scoreWithoutFeature: analyze(household, { ...firm, stockComp: false }).score.score,
  });
  const guide = SCREEN_GUIDES[mode === 'print' ? 'print' : activeTab === 'investment' || activeTab === 'statements' ? activeTab : `${mode}.${activeTab}`];

  return (
    <>
      <div className="sim-banner" role="region" aria-label="Prototype controls">
        <strong>SIMULATED prototype · not Sherpas code or data</strong>
        <label>Household
          <select value={hid} onChange={(e) => setHid(e.target.value)}>
            {Object.values(households).map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </label>
        <label>View
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} aria-label="View">
            <option value="client">Client view (live)</option>
            <option value="advisor">Advisor mode</option>
            <option value="print">Shared PDF (print view)</option>
          </select>
        </label>
        <label><input type="checkbox" checked={firm.stockComp} onChange={(e) => setFirm({ ...firm, stockComp: e.target.checked })} />
          Firm setting: stock compensation</label>
        {mode === 'advisor' && <button className="btn secondary" onClick={() => reprocess(household)}>Reprocess analysis</button>}
        {mode === 'advisor' && <button className="btn secondary" onClick={() => { shareAnalysis(household, analysis.lines, lineEdits, log); setShared(hid); }}>Share with client</button>}
        {mode === 'advisor' && (
          <span className="row">
            <input aria-label="Adjustment points" placeholder="± points" size={6} value={adjust.points} onChange={(e) => setAdjust({ ...adjust, points: e.target.value })} />
            <input aria-label="Adjustment reason" placeholder="Reason" size={18} value={adjust.reason} onChange={(e) => setAdjust({ ...adjust, reason: e.target.value })} />
            <button className="btn secondary" disabled={!adjust.points || !adjust.reason}
              onClick={() => { setHouseholds((all) => ({ ...all, [hid]: adjustScore(household, Number(adjust.points), adjust.reason, firm, log) })); setAdjust({ points: '', reason: '' }); }}>Adjust score</button>
          </span>
        )}
        {mode === 'advisor' && shared === hid && <span>Shared with the client.</span>}
      </div>
      {mode !== 'print' && (
        <nav className="topbar" role="tablist">
          {tabs.map(([t, label]) => (
            <button key={t} role="tab" aria-selected={activeTab === t} onClick={() => setTab(t)}>{label}{marks[t] && <TabDot kind={marks[t]!} />}</button>
          ))}
        </nav>
      )}
      {guide && !steer && <GuideStrip guide={guide} />}
      {alerts.length > 0 && (
        <div style={{ maxWidth: 960, margin: '16px auto 0', padding: '0 16px' }} aria-label="Opportunity alerts">
          {alerts.map((a) => <div key={a} className="warning"><strong>Opportunity alert:</strong> {a}</div>)}
        </div>
      )}
      {mode === 'advisor' && autoFlags?.hid === hid && autoFlags.notices.length > 0 && (
        <div style={{ maxWidth: 960, margin: '16px auto 0', padding: '0 16px' }} aria-label="Employer stock flagged">
          {autoFlags.notices.map((n) => (
            <div key={n.employerId} className="notice row" data-ac="AC-E-17">
              <span>{n.text}<Mark kind="new" why="Confirming a grant flags its employer's shares at once (AC-E-17)." /></span>
              <button className="link" onClick={() => undoAutoFlag(n)}>Undo</button>
            </div>
          ))}
        </div>
      )}
      {mode === 'advisor' && notices.length > 0 && (
        <div style={{ maxWidth: 960, margin: '16px auto 0', padding: '0 16px' }}>
          {notices.map((n) => <div key={n.id} className="notice" data-line={n.id}>{n.text}</div>)}
        </div>
      )}
      <Edits.Provider value={{ edits: lineEdits, setEdit, canEdit: mode === 'advisor' }}>
      {(mode === 'print' || activeTab === 'health') && <FinancialHealth household={household} analysis={analysis} mode={mode} />}
      {mode !== 'print' && activeTab === 'investment' && <InvestmentAnalysis household={household} analysis={analysis} firm={firm} mode={mode} />}
      {mode !== 'print' && activeTab === 'statements' && <Statements analysis={analysis} mode={mode} />}
      </Edits.Provider>
      {mode === 'client' && activeTab === 'income' && (
        <IncomeStep key={`${hid}-${submitted}-${steer?.step ?? ''}`} household={household} firm={firm} template="Financial Health & Portfolio Questionnaire"
          initialStep={submitted ? 'done' : steer?.questionnaire?.start ?? 'income'} initialRows={steer?.questionnaire?.rows} initialDocuments={steer?.questionnaire?.documents}
          onSubmit={(s) => { submitClient(s); setSubmitted(true); }} onRowChange={(a) => recordRowChange(household, firm, a, log)} />
      )}
      {mode === 'advisor' && activeTab === 'questionnaire' && (
        <main>
          <GrantsPanel household={household} enabled={firm.stockComp} onSave={saveGrantEdit} proposals={proposals} onDelete={(id) => reprocess(afterSave({ ...household, grants: household.grants.filter((g) => g.id !== id) }))} />
          <HoldingsEditor household={household} firm={firm} where="Investments (advisor mode)" onSaveFlag={saveFlag} onRemoveFlag={dropFlag} />
        </main>
      )}
      {mode === 'advisor' && activeTab === 'data' && (
        <main>
          <GrantsPanel household={household} enabled={firm.stockComp} onSave={saveGrantEdit} proposals={proposals} onDelete={(id) => reprocess(afterSave({ ...household, grants: household.grants.filter((g) => g.id !== id) }))} />
          <HoldingsEditor household={household} firm={firm} where="Data & Assumptions · Holdings" onSaveFlag={saveFlag} onRemoveFlag={dropFlag} />
        </main>
      )}
    </>
  );
}
