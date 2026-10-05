// F-A component tests: rendered screens, no browser (D-062). Households are SIMULATED.
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../src/ui/App';
import { H2 } from '../../src/model/households';
import type { Household } from '../../src/model/types';

const user = () => userEvent.setup();

async function asAdvisor() {
  await user().selectOptions(screen.getByLabelText('View'), 'advisor');
}

async function flagPosition(name: RegExp, opts: { current?: 'Yes' | 'No' | 'Unknown'; basis?: string; tab?: string } = {}) {
  const u = user();
  await u.click(screen.getByRole('tab', { name: opts.tab ?? 'Data & Assumptions' }));
  await u.click(screen.getByRole('button', { name }));
  const form = screen.getByLabelText('Employer stock flag');
  if (opts.current) await u.click(within(form).getByLabelText(opts.current));
  if (opts.basis) await u.type(within(form).getByLabelText(/Cost basis/), opts.basis);
  await u.click(within(form).getByRole('button', { name: /Save/ }));
}

async function flagBothHalden() {
  await asAdvisor();
  await flagPosition(/Flag Halden Robotics as employer stock/, { current: 'Yes' });
  await flagPosition(/Flag Halden Robotics stock fund as employer stock/, { current: 'Yes' });
}

describe('F-A · screens', () => {
  it('AC-A-01 · AC-A-02 · AC-A-03 · the flag names employer and person, asks current employer, takes cost basis', async () => {
    render(<App initialHousehold="H2" />);
    await asAdvisor();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getByRole('button', { name: /Flag Halden Robotics as employer stock/ }));
    const form = screen.getByLabelText('Employer stock flag');
    expect(within(form).getByLabelText('Employer')).toHaveDisplayValue('Halden Robotics (HLDN)');
    expect(within(form).getByLabelText('Person')).toHaveDisplayValue('Maya');
    expect(within(form).getByText("Is it this person's current employer?")).toBeInTheDocument();
    for (const o of ['Yes', 'No', 'Unknown']) expect(within(form).getByLabelText(o)).toBeInTheDocument();
    expect(within(form).getByLabelText(/Cost basis/)).toBeInTheDocument();
  });

  it('AC-A-20 · the flag is offered in Data & Assumptions and in the advisor-mode Investments block', async () => {
    render(<App initialHousehold="H2" />);
    await asAdvisor();
    for (const tab of ['Data & Assumptions', 'Questionnaire · Investments']) {
      await user().click(screen.getByRole('tab', { name: tab }));
      expect(screen.getAllByRole('button', { name: /as employer stock/ }).length).toBe(5);
    }
  });

  it('AC-G-01 · with the setting off, no flag is offered', async () => {
    render(<App initialHousehold="H2" />);
    await asAdvisor();
    await user().click(screen.getByLabelText(/Firm setting/));
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    expect(screen.queryByRole('button', { name: /as employer stock/ })).toBeNull();
  });

  it('AC-A-21 · a flagged position shows the tag "Employer stock (<Name>)" in the holdings panel', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().click(screen.getByRole('tab', { name: 'Investment analysis' }));
    const panel = screen.getByLabelText('Accounts and holdings');
    expect(within(panel).getAllByText('Employer stock (Maya)')).toHaveLength(2);
  });

  it('AC-A-14 · AC-A-15 · Assets bullet and "We should look into" line', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    const assets = screen.getByLabelText('Assets & Investments');
    expect(within(assets).getByText('Halden Robotics stock held across 2 accounts: $300,000, 30% of investable assets.')).toBeInTheDocument();
    expect(within(screen.getByLabelText('We should look into')).getByText('30% of investable assets is in Halden Robotics stock.')).toBeInTheDocument();
  });

  it('AC-A-23 · the look-into line is offered as a Summary recommendation, phrased as a fact', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    expect(within(screen.getByLabelText('Recommendations')).getByText('30% of investable assets is in Halden Robotics stock.')).toBeInTheDocument();
  });

  it('AC-A-12 · AC-A-13 · View more shows both readings and the pay link', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().selectOptions(screen.getByLabelText('View'), 'client');
    await user().click(screen.getByRole('button', { name: 'View more' }));
    const reading = screen.getByLabelText('Concentration reading');
    expect(within(reading).getByText('Largest position: SIMTM 20%.')).toBeInTheDocument();
    expect(within(reading).getByText('Employer stock (Halden Robotics): 30% of investable assets, counted as one position across all accounts.')).toBeInTheDocument();
    expect(within(reading).getByText("Maya's pay comes from the same company.")).toBeInTheDocument();
  });

  it('AC-A-19 · no threshold or target for employer stock is shown', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().selectOptions(screen.getByLabelText('View'), 'client');
    await user().click(screen.getByRole('button', { name: 'View more' }));
    expect(document.body.textContent).not.toMatch(/threshold|target of|limit of|should be below/i);
  });

  it('AC-A-22 · the Investment analysis snapshot adds the AC-A-14 line', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().click(screen.getByRole('tab', { name: 'Investment analysis' }));
    expect(within(screen.getByLabelText('Investment snapshot')).getByText('Halden Robotics stock held across 2 accounts: $300,000, 30% of investable assets.')).toBeInTheDocument();
  });

  it('AC-A-22 · AC-G-10 · the shared PDF (print view) carries the same lines as the live client view', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().selectOptions(screen.getByLabelText('View'), 'client');
    const live = [...document.querySelectorAll('[data-line]')].map((n) => n.textContent);
    await user().selectOptions(screen.getByLabelText('View'), 'print');
    const pdf = [...document.querySelectorAll('[data-line]')].map((n) => n.textContent);
    for (const text of live) expect(pdf).toContain(text);
  });

  it('AC-A-08 · AC-G-11 · the missing-price notice shows in advisor mode only', async () => {
    const noPrice: Household = {
      ...H2,
      flags: [{ positionId: 'h2-hldn-401k', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' }],
      accounts: H2.accounts.map((a) => ({ ...a, positions: a.positions.map((p) => (p.id === 'h2-hldn-401k' ? { ...p, value: null } : p)) })),
    };
    render(<App initialHousehold="H2" households={[noPrice]} />);
    expect(screen.queryByText(/Price not available/)).toBeNull();
    await asAdvisor();
    expect(screen.getByText('Price not available for HLDN: not counted in concentration.')).toBeInTheDocument();
    await user().selectOptions(screen.getByLabelText('View'), 'print');
    expect(screen.queryByText(/Price not available/)).toBeNull();
  });

  it('AC-B-06 · AC-G-12 · saving a flag on a household with a manual adjustment warns first', async () => {
    render(<App initialHousehold="H7" />);
    await asAdvisor();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getByRole('button', { name: /Flag Orrin Software as employer stock/ }));
    const form = screen.getByLabelText('Employer stock flag');
    await user().click(within(form).getByRole('button', { name: 'Save' }));
    expect(within(form).getByRole('alert')).toHaveTextContent('Saving reprocesses the analysis and replaces your manual score adjustment.');
    await user().click(within(form).getByRole('button', { name: 'Save and reprocess' }));
    expect(screen.getAllByText('Employer stock (Claire)').length).toBeGreaterThan(0);
  });

  it('AC-G-12 · removing a flag also warns first while a manual adjustment exists', async () => {
    const adjusted: Household = { ...H2, manualAdjustment: { points: 2, reason: 'SIMULATED' },
      flags: [{ positionId: 'h2-hldn-brk', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' }] };
    render(<App initialHousehold="H2" households={[adjusted]} />);
    await asAdvisor();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getByRole('button', { name: 'Remove flag' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Saving reprocesses the analysis and replaces your manual score adjustment.');
    expect(screen.getByText('Employer stock (Maya)')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Remove and reprocess' }));
    expect(screen.queryByText('Employer stock (Maya)')).toBeNull();
  });

  it('AC-G-13 · turning the setting off leaves the generated analysis unchanged until reprocessing', async () => {
    render(<App initialHousehold="H2" />);
    await flagBothHalden();
    await user().click(screen.getByLabelText(/Firm setting/));
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    expect(screen.getByText('30% of investable assets is in Halden Robotics stock.', { selector: '.lookinto li' })).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Reprocess analysis' }));
    expect(screen.queryByText('30% of investable assets is in Halden Robotics stock.')).toBeNull();
  });
});
