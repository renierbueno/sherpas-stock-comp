// F-E component tests: the client's Income step and what the advisor sees after (D-062). SIMULATED.
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { H1, H2 } from '../../src/model/households';
import type { Firm } from '../../src/model/types';
import { App } from '../../src/ui/App';
import { IncomeStep } from '../../src/ui/Questionnaire';

const user = () => userEvent.setup();
const ON: Firm = { id: 'firm-sim', stockComp: true };

describe('F-E · screens', () => {
  it('AC-E-01 · AC-E-02 · AC-E-25 · AC-G-02 · with the setting on, the income question excludes stock compensation and the helper line points to the chip', () => {
    render(<IncomeStep household={H1} firm={ON} template="T" onSubmit={() => {}} />);
    expect(screen.getAllByText(/Total annual income before taxes, not counting stock compensation/)).toHaveLength(2);
    expect(within(screen.getByLabelText('Other current income')).getByRole('button', { name: '+ Stock compensation' })).toBeInTheDocument();
    expect(screen.getAllByText('Receive stock compensation? Add it below.')).toHaveLength(2);
    expect(screen.queryByText(/vested this year/)).toBeNull();
  });

  it('AC-G-01 · with the setting off, no chip and no helper line', () => {
    render(<IncomeStep household={H1} firm={{ ...ON, stockComp: false }} template="T" onSubmit={() => {}} />);
    expect(screen.queryByRole('button', { name: '+ Stock compensation' })).toBeNull();
    expect(screen.queryByText(/Paid partly in stock compensation/)).toBeNull();
    expect(screen.getAllByText(/What is your total annual income before taxes\?/)).toHaveLength(2);
    expect(screen.queryByText(/not counting stock compensation/)).toBeNull();
  });

  it('AC-E-03 · AC-E-19 · each click adds a row: owner, employer, ticker, type, value, frequency; no income question, no upload prompt', async () => {
    render(<IncomeStep household={H2} firm={ON} template="T" onSubmit={() => {}} />);
    await user().click(screen.getByRole('button', { name: '+ Stock compensation' }));
    await user().click(screen.getByRole('button', { name: '+ Stock compensation' }));
    const rows = screen.getAllByLabelText('Stock compensation row');
    expect(rows).toHaveLength(2);
    const r = rows[0];
    for (const l of ['Owner', 'Employer', 'Ticker, if listed', 'Type', 'Approximate value of unvested stock', 'How often it vests']) expect(within(r).getByLabelText(l)).toBeInTheDocument();
    expect(within(r).getByLabelText('How often it vests')).toHaveTextContent('MonthlyQuarterlyEvery six monthsYearlyNot sure');
    expect(within(r).queryByText(/vested this year/)).toBeNull();
    expect(within(r).queryByText(/Upload your plan statement/)).toBeNull();
  });

  it('AC-E-04 · the employer is required; the rest may stay empty', async () => {
    const submit = vi.fn();
    render(<IncomeStep household={H2} firm={ON} template="T" onSubmit={submit} />);
    await user().click(screen.getByRole('button', { name: '+ Stock compensation' }));
    await user().click(screen.getByRole('button', { name: 'Submit questionnaire' }));
    expect(screen.getByText('Employer is required')).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('Employer'), { target: { value: 'Halden Robotics' } });
    await user().click(screen.getByRole('button', { name: 'Submit questionnaire' }));
    expect(submit).toHaveBeenCalledOnce();
  });

  it('AC-E-06 · no row: the questionnaire continues as today', async () => {
    const submit = vi.fn();
    render(<IncomeStep household={H1} firm={ON} template="T" onSubmit={submit} />);
    await user().click(screen.getByRole('button', { name: 'Submit questionnaire' }));
    expect(submit).toHaveBeenCalledWith({ rows: [], documents: [] });
  });

  it('AC-E-21 · the same Income widget, with the chip, serves any Financial Health template', () => {
    for (const t of ['Financial Health & Portfolio Questionnaire', 'Financial Health quick check (SIMULATED)']) {
      const { unmount } = render(<IncomeStep household={H1} firm={ON} template={t} onSubmit={() => {}} />);
      expect(screen.getByText(`${t} · Income`)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '+ Stock compensation' })).toBeInTheDocument();
      unmount();
    }
  });

  it('AC-E-07 · AC-E-08 · AC-E-10 · AC-E-20 · submitting creates a pending grant: the advisor sees the alert, the client the pending line', async () => {
    render(<App initialHousehold="H1" households={[H1]} />);
    await user().click(screen.getByRole('tab', { name: 'Questionnaire' }));
    await user().click(screen.getByRole('button', { name: '+ Stock compensation' }));
    fireEvent.change(screen.getByLabelText('Employer'), { target: { value: 'Sim Startup' } });
    await user().click(screen.getByRole('button', { name: 'Submit questionnaire' }));
    expect(screen.getByText('Thank you for providing your information!')).toBeInTheDocument();
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    expect(screen.getByText('Ana reported pay in Sim Startup stock. It is not yet included in these figures.')).toBeInTheDocument();
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    expect(within(screen.getByLabelText('Opportunity alerts')).getByText('Stock compensation: detail pending')).toBeInTheDocument();
  });

  it('AC-E-15 · AC-E-14 · in advisor mode, the stock-compensation block opens the full grant editor with the client estimate', async () => {
    render(<App initialHousehold="H2" />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().click(screen.getByRole('tab', { name: 'Questionnaire · Investments' }));
    await user().click(within(screen.getByLabelText('Stock compensation grants')).getByRole('button', { name: 'Edit' }));
    const ed = screen.getByLabelText('Grant editor');
    expect(within(ed).getByText(/^Client estimate, not used in the figures/)).toBeInTheDocument();
    expect(within(ed).getByRole('button', { name: 'Generate tranches' })).toBeInTheDocument();
  });

  it('AC-E-17 · AC-G-11 · completing the grant flags the employer shares with Undo, in advisor mode only', async () => {
    render(<App initialHousehold="H2" />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(within(screen.getByLabelText('Stock compensation grants')).getByRole('button', { name: 'Edit' }));
    const ed = screen.getByLabelText('Grant editor');
    fireEvent.change(within(ed).getByLabelText('Grant date'), { target: { value: '2025-03-01' } });
    await user().type(within(ed).getByLabelText('Units'), '4000');
    await user().click(within(ed).getByRole('button', { name: 'Generate tranches' }));
    await user().click(within(ed).getByRole('button', { name: 'Save grant' }));
    const note = 'Halden Robotics (HLDN) held in Maya brokerage and Maya 401(k) flagged as employer stock.';
    expect(screen.getByText(note)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove flag' })).toHaveLength(2);
    await user().selectOptions(screen.getByLabelText('View'), 'client');
    expect(screen.queryByText(note)).toBeNull();
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().click(screen.getByRole('button', { name: 'Undo' }));
    expect(screen.queryByText(note)).toBeNull();
    expect(screen.queryAllByRole('button', { name: 'Remove flag' })).toHaveLength(0);
  });

  it('AC-E-09 · EC-E-09 · the advisor deletes a grant reported by mistake; the alert goes', async () => {
    render(<App initialHousehold="H2" />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    expect(screen.getByLabelText('Opportunity alerts')).toBeInTheDocument();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getByRole('button', { name: 'Delete grant' }));
    expect(screen.queryByLabelText('Opportunity alerts')).toBeNull();
  });

  it('AC-E-16 · EC-E-06 · the editor of a grant reported from the questionnaire says which types are modelled and what to do otherwise', async () => {
    render(<App initialHousehold="H2" />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(within(screen.getByLabelText('Stock compensation grants')).getByRole('button', { name: 'Edit' }));
    expect(within(screen.getByLabelText('Grant editor')).getByText('Only RSU and PSU are modelled in this version. If this stock compensation is ESPP or options, delete the grant and flag any shares already held as employer stock.')).toBeInTheDocument();
  });
});
