// F-C component tests: rendered tax lines, View more, statements, state rate field (D-062).
// Tax amounts come from the SIMULATED engine; the tests read labels and where lines appear.
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { H2, H3, H6 } from '../../src/model/households';
import type { Household } from '../../src/model/types';
import { App } from '../../src/ui/App';

const user = () => userEvent.setup();
const view = (v: 'client' | 'advisor' | 'print') => user().selectOptions(screen.getByLabelText('View'), v);
const tab = (name: string) => user().click(screen.getByRole('tab', { name }));

/** SIMULATED: a $100K vest in January 2027, household taxed at 32%, no state rate. */
const NEAR: Household = {
  ...H2, salary: { p1: 360_000, p2: 90_000 }, incomeIncludesVests: { p1: 'no' },
  grants: [{ id: 'n', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'halden', grantDate: '2025-01-15',
    units: 2_000, tranches: [{ id: 't', date: '2027-01-15', units: 2_000 }], source: 'advisor' }],
};

describe('F-C · screens', () => {
  it('AC-C-23 · AC-C-24 · AC-C-28 · Savings & Expenses: per-year bullet and the look-into; the line is a Summary candidate', () => {
    render(<App initialHousehold="H2" households={[NEAR]} />);
    const savings = screen.getByLabelText('Savings & Expenses');
    expect(within(savings).getByText(/^2027 vests: \$100,000 of income, estimated tax \$[\d,]+, gap after withholding \$[\d,]+\.$/)).toBeInTheDocument();
    const look = within(screen.getByLabelText('We should look into (savings)')).getByText(/^Tax on the January 2027 vest may exceed withholding by \$[\d,]+\.$/);
    expect(within(screen.getByLabelText('Recommendations')).getByText(look.textContent!)).toBeInTheDocument();
  });

  it('AC-C-29 · AC-C-04 · AC-C-06 · AC-C-12 · AC-C-14 · tax on each vest, collapsible in Savings & Expenses: price date and tax rules, withholding label, federal-only state line, FICA apart', async () => {
    render(<App initialHousehold="H2" households={[NEAR]} />);
    const each = screen.getByLabelText('Tax on each vest');
    expect(within(each).getByText('Federal withholding estimated at the supplemental rate (22%, 37% above $1 million).')).toBeInTheDocument();
    expect(within(each).getByText(/^Estimated tax on this vest: .*at the October 5, 2026 price and today's tax rules\.$/)).toBeInTheDocument();
    expect(within(each).getByText('Estimated state tax on this vest: $6,000. Your state withholding was not provided, so the gap shown is federal only.')).toBeInTheDocument();
    expect(within(each).getByText(/^Social Security and Medicare tax on this vest: \$[\d,]+, not included in the gap\.$/)).toBeInTheDocument();
  });

  it('AC-C-15 · a household whose withholding covers the tax says so', () => {
    const low: Household = { ...NEAR, salary: { p1: 60_000, p2: 20_000 }, grants: [{ ...NEAR.grants[0], units: 200, tranches: [{ id: 't', date: '2027-01-15', units: 200 }] }] };
    render(<App initialHousehold="H2" households={[low]} />);
    expect(screen.getByText('Withholding covers the estimated tax on this vest.')).toBeInTheDocument();
  });

  it('AC-C-16 · a PSU vest shows tax and gap at target with the range', () => {
    render(<App initialHousehold="H3" households={[H3]} />);
    expect(within(screen.getByLabelText('Tax on each vest')).getAllByText(/at target \(range \$0 to \$[\d,]+\)/).length).toBeGreaterThan(0);
  });

  it('AC-C-20 · AC-C-21 · AC-C-27 · View more: tax counted in near-term commitments, federal only; reported-income note', async () => {
    render(<App initialHousehold="H2" households={[NEAR]} />);
    await user().click(screen.getByRole('button', { name: 'View more' }));
    expect(within(screen.getByLabelText('Near-term commitments reading')).getByText(/^Tax due on upcoming vests counted in near-term commitments: \$[\d,]+\. \(federal only; state withholding not entered\)$/)).toBeInTheDocument();
    expect(within(screen.getByLabelText('Savings rate reading')).getByText('Savings rate and debt ratios read reported income; vests are shown separately.')).toBeInTheDocument();
  });

  it('AC-C-22 · View more says performance units are counted at target', async () => {
    const near: Household = { ...H3, salary: { p1: 420_000 }, grants: [{ ...H3.grants[0], tranches: [{ id: 't1', date: '2027-02-15', units: 1_200 }] }] };
    render(<App initialHousehold="H3" households={[near]} />);
    await user().click(screen.getByRole('button', { name: 'View more' }));
    expect(screen.getByText('Performance units counted at target.')).toBeInTheDocument();
  });

  it('AC-C-26 · the cash flow statement shows this year\'s vests below its total', async () => {
    const thisYear: Household = { ...NEAR, grants: [{ ...NEAR.grants[0], tranches: [{ id: 't', date: '2026-12-01', units: 2_000 }] }] };
    render(<App initialHousehold="H2" households={[thisYear]} />);
    await tab('Statements');
    expect(within(screen.getByLabelText('Cash flow statement')).getByText(/^Stock compensation \(vests this year\), not in the totals above: \$100,000, estimated tax \$[\d,]+\.$/)).toBeInTheDocument();
  });

  it('AC-C-07 · AC-C-13 · the state withholding field and its notice, in advisor mode; entering it removes the federal-only label', async () => {
    render(<App initialHousehold="H2" households={[NEAR]} />);
    expect(screen.queryByText(/State withholding not entered/)).toBeNull();
    await view('advisor');
    expect(screen.getByText('State withholding not entered for Halden Robotics RSU.')).toBeInTheDocument();
    await tab('Data & Assumptions');
    await user().click(within(screen.getByLabelText('Stock compensation grants')).getByRole('button', { name: 'Edit' }));
    const ed = screen.getByLabelText('Grant editor');
    expect(within(ed).getByText('From the paystub or plan statement')).toBeInTheDocument();
    fireEvent.change(within(ed).getByLabelText(/State withholding rate/), { target: { value: '6' } });
    await user().click(within(ed).getByRole('button', { name: 'Save grant' }));
    expect(screen.queryByText(/State withholding not entered/)).toBeNull();
    await tab('Financial health');
    expect(screen.queryByText(/so the gap shown is federal only/)).toBeNull();
  });

  it('AC-C-08 · AC-C-09 · no state field where the state has no income tax; never in the client view', async () => {
    render(<App initialHousehold="H6" households={[H6]} />);
    expect(screen.queryByText(/State withholding/)).toBeNull();
    await view('advisor');
    await tab('Data & Assumptions');
    await user().click(within(screen.getByLabelText('Stock compensation grants')).getAllByRole('button', { name: 'Edit' })[0]);
    expect(within(screen.getByLabelText('Grant editor')).queryByLabelText(/State withholding rate/)).toBeNull();
  });
});
