import { useMemo, useRef, useState } from 'react';
import { afterSave, removeFlag, setFlag } from '../model/actions';
import { analyze, type Analysis } from '../model/analysis';
import { EventLog } from '../model/events';
import { addGrant, saveGrant, setStateWithholding } from '../model/grants';
import { HOUSEHOLDS } from '../model/households';
import type { EmployerFlag, Firm, Household } from '../model/types';
import { FinancialHealth, Statements, visibleLines, type Mode } from './FinancialHealth';
import { GrantsPanel, type GrantSave } from './GrantEditor';
import { HoldingsEditor } from './HoldingsEditor';
import { InvestmentAnalysis } from './InvestmentAnalysis';

type Tab = 'health' | 'investment' | 'statements' | 'questionnaire' | 'data';

const byId = <T extends { id: string }>(xs: T[]) => Object.fromEntries(xs.map((x) => [x.id, x]));

export function App({ initialHousehold = 'H2', initialMode = 'client', households: seed = HOUSEHOLDS }: { initialHousehold?: string; initialMode?: Mode; households?: Household[] }) {
  const log = useRef(new EventLog()).current;
  const [firm, setFirm] = useState<Firm>({ id: 'firm-sim', stockComp: true });
  const [households, setHouseholds] = useState<Record<string, Household>>(() => byId(seed));
  // Analyses are snapshots: they change only on reprocessing (AC-G-13).
  const [analyses, setAnalyses] = useState<Record<string, Analysis>>(() =>
    Object.fromEntries(seed.map((h) => [h.id, analyze(h, { id: 'firm-sim', stockComp: true })])));
  const [hid, setHid] = useState(initialHousehold);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [tab, setTab] = useState<Tab>('health');

  const household = households[hid];
  const analysis = analyses[hid];

  const reprocess = (h: Household) => {
    setHouseholds((all) => ({ ...all, [h.id]: h }));
    setAnalyses((all) => ({ ...all, [h.id]: analyze(h, firm, log) }));
  };
  const saveFlag = (f: EmployerFlag) => reprocess(afterSave(setFlag(household, f, firm, log)));
  const dropFlag = (positionId: string) => reprocess(afterSave(removeFlag(household, positionId, firm, log)));
  const saveGrantEdit = ({ grant, employer, incomeAnswer, generated }: GrantSave) => {
    const base: Household = {
      ...household,
      employers: household.employers.map((e) => (e.id === employer.id ? employer : e)),
      incomeIncludesVests: { ...household.incomeIncludesVests, [grant.ownerId]: incomeAnswer },
    };
    const isNew = !household.grants.some((g) => g.id === grant.id);
    const before = household.grants.find((g) => g.id === grant.id)?.stateWithholdingRate;
    let next = isNew ? addGrant(base, { ...grant, stateWithholdingRate: undefined }, firm, log) : saveGrant(base, { ...grant, stateWithholdingRate: before }, firm, log, generated);
    if (grant.stateWithholdingRate !== before) next = setStateWithholding(next, grant.id, grant.stateWithholdingRate, household.analysisDate, log);
    reprocess(afterSave(next));
  };

  const tabs: [Tab, string][] = useMemo(() => {
    const t: [Tab, string][] = [['health', 'Financial health'], ['investment', 'Investment analysis'], ['statements', 'Statements']];
    if (mode === 'advisor') t.push(['questionnaire', 'Questionnaire · Investments'], ['data', 'Data & Assumptions']);
    return t;
  }, [mode]);
  const activeTab = tabs.some(([t]) => t === tab) ? tab : 'health';

  const notices = visibleLines(analysis, mode).filter((l) => l.surface === 'advisor.notices');

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
      </div>
      {mode !== 'print' && (
        <nav className="topbar" role="tablist">
          {tabs.map(([t, label]) => (
            <button key={t} role="tab" aria-selected={activeTab === t} onClick={() => setTab(t)}>{label}</button>
          ))}
        </nav>
      )}
      {mode === 'advisor' && notices.length > 0 && (
        <div style={{ maxWidth: 960, margin: '16px auto 0', padding: '0 16px' }}>
          {notices.map((n) => <div key={n.id} className="notice" data-line={n.id}>{n.text}</div>)}
        </div>
      )}
      {(mode === 'print' || activeTab === 'health') && <FinancialHealth household={household} analysis={analysis} mode={mode} />}
      {mode !== 'print' && activeTab === 'investment' && <InvestmentAnalysis household={household} analysis={analysis} firm={firm} mode={mode} />}
      {mode !== 'print' && activeTab === 'statements' && <Statements analysis={analysis} mode={mode} />}
      {mode === 'advisor' && activeTab === 'questionnaire' && (
        <main><HoldingsEditor household={household} firm={firm} where="Investments (advisor mode)" onSaveFlag={saveFlag} onRemoveFlag={dropFlag} /></main>
      )}
      {mode === 'advisor' && activeTab === 'data' && (
        <main>
          <GrantsPanel household={household} enabled={firm.stockComp} onSave={saveGrantEdit} />
          <HoldingsEditor household={household} firm={firm} where="Data & Assumptions · Holdings" onSaveFlag={saveFlag} onRemoveFlag={dropFlag} />
        </main>
      )}
    </>
  );
}
