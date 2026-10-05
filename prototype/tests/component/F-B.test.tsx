// F-B component tests: grant editor and the grant block (D-062). Households are SIMULATED.
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { H2_COMPLETE, H3, H4 } from '../../src/model/households';
import { App } from '../../src/ui/App';

const user = () => userEvent.setup();
const view = (v: 'client' | 'advisor' | 'print') => user().selectOptions(screen.getByLabelText('View'), v);
const tab = (name: string) => user().click(screen.getByRole('tab', { name }));
const change = (el: HTMLElement, value: string) => fireEvent.change(el, { target: { value } });

async function openEditor(which: 'Edit' | 'Add grant' = 'Edit') {
  await view('advisor');
  await tab('Data & Assumptions');
  const panel = screen.getByLabelText('Stock compensation grants');
  await user().click(within(panel).getAllByRole('button', { name: which })[0]);
  return screen.getByLabelText('Grant editor');
}

/** The advisor completes H2's pending grant: 4,000 units, 4 years quarterly, 1-year cliff. */
async function completeH2() {
  const ed = await openEditor();
  change(within(ed).getByLabelText('Grant date'), '2025-03-01');
  change(within(ed).getByLabelText('Units'), '4000');
  await user().click(within(ed).getByRole('button', { name: 'Generate tranches' }));
  return ed;
}


describe('F-B · screens', () => {
  it('AC-B-01 · AC-B-03 · AC-B-07 · the advisor adds a grant in Data & Assumptions, RSU or PSU, and generates tranches', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await completeH2();
    expect(within(ed).getByLabelText('Type')).toHaveTextContent('RSUPSU');
    expect(within(ed).getAllByLabelText(/Tranche \d+ date/)).toHaveLength(13);
  });

  it('AC-E-14 · the client estimate is shown, labelled as not used in the figures', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await openEditor();
    expect(within(ed).getByText('Client estimate, not used in the figures: type RSU, about $120,000 unvested, vests quarterly.')).toBeInTheDocument();
  });

  it('AC-B-08 · AC-B-09 · AC-B-10 · edit, delete and add tranches; a mismatch shows the notice without blocking', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await completeH2();
    change(within(ed).getByLabelText('Tranche 2 units'), '500');
    expect(within(ed).getByText('Tranches add up to 4,250 of 4,000 units.')).toBeInTheDocument();
    await user().click(within(ed).getAllByRole('button', { name: 'Delete' })[12]);
    expect(within(ed).getAllByLabelText(/Tranche \d+ date/)).toHaveLength(12);
    await user().click(within(ed).getByRole('button', { name: 'Add tranche' }));
    expect(within(ed).getAllByLabelText(/Tranche \d+ date/)).toHaveLength(13);
    change(within(ed).getByLabelText('Tranche 3 date'), '2026-07-15');
    expect(within(ed).getByLabelText('Tranche 3 date')).toHaveValue('2026-07-15');
    expect(within(ed).getByRole('button', { name: 'Save grant' })).toBeEnabled();
  });

  it('AC-B-14 · shares kept and cost basis are recorded per tranche', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await completeH2();
    change(within(ed).getByLabelText('Tranche 1 shares kept'), '620');
    change(within(ed).getByLabelText('Tranche 1 cost basis'), '31000');
    expect(within(ed).getByLabelText('Tranche 1 shares kept')).toHaveValue('620');
    expect(within(ed).getByLabelText('Tranche 1 cost basis')).toHaveValue('31000');
  });

  it('AC-B-29 · the income question is asked per person, prefilled with the client answer', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await openEditor();
    expect(within(ed).getByText('Does the salary on file include stock that vested this year? (Maya)')).toBeInTheDocument();
    expect(within(ed).getByLabelText('No')).toBeChecked();
  });

  it('AC-B-05 · AC-B-23 · AC-B-27 · AC-G-15 · saving reprocesses: the block lists future tranches after the asset totals, priced at the analysis date', async () => {
    render(<App initialHousehold="H2" />);
    const ed = await completeH2();
    await user().click(within(ed).getByRole('button', { name: 'Save grant' }));
    await view('client');
    await tab('Financial health');
    const block = screen.getByLabelText('Stock compensation not yet vested');
    expect(within(block).getByText('Stock compensation not yet vested (not in net worth)')).toBeInTheDocument();
    expect(within(block).getByText('December 1, 2026: 250 units, $12,500, at the October 5, 2026 price.')).toBeInTheDocument();
    expect(within(block).getAllByRole('listitem')).toHaveLength(10);
    const assets = screen.getByLabelText('Assets & Investments');
    expect(assets.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeTruthy();
  });

  it('AC-B-12 · AC-G-11 · the vested prompt shows in advisor mode, never in the client view or the PDF', async () => {
    render(<App initialHousehold="H2" households={[H2_COMPLETE]} />);
    await view('advisor');
    await user().click(screen.getByRole('button', { name: 'Reprocess analysis' }));
    expect(screen.getByText('Vested on March 1, 2026: record the shares kept as a held position.')).toBeInTheDocument();
    await view('client');
    expect(screen.queryByText(/Vested on/)).toBeNull();
    await view('print');
    expect(screen.queryByText(/Vested on/)).toBeNull();
  });

  it('AC-B-16 · AC-B-24 · AC-A-17 · PSU: terms in the editor; target value with its range in the block and the vest-all line', async () => {
    render(<App initialHousehold="H3" households={[H3]} />);
    expect(screen.getByText('February 15, 2028: 1,200 target units, $96,000 at target (range $0 to $192,000), at the October 5, 2026 price.')).toBeInTheDocument();
    expect(screen.getByText(/Arvo Health stock would be 16% at target \(range 0% to 28%\)/)).toBeInTheDocument();
    const ed = await openEditor();
    const terms = within(ed).getByLabelText('Performance terms');
    expect(within(terms).getByLabelText('Performance condition')).toHaveValue('Relative total shareholder return against a sector index');
    expect(within(terms).getByLabelText('Payout to (% of target)')).toHaveValue('200');
  });

  it('AC-A-16 · the vest-all line shows in Assets & Investments', async () => {
    render(<App initialHousehold="H2" households={[H2_COMPLETE]} />);
    expect(within(screen.getByLabelText('Assets & Investments')).getByText('If every scheduled grant vests, Halden Robotics stock would be 11% of investable assets, at the October 5, 2026 price, before shares withheld for tax.')).toBeInTheDocument();
  });

  it('AC-B-18 · AC-B-19 · AC-B-20 · AC-B-21 · private employer: saved without dates, awaiting, 409A for information', async () => {
    render(<App initialHousehold="H4" households={[H4]} />);
    const block = screen.getByLabelText('Stock compensation not yet vested');
    expect(within(block).getByText('Awaiting a liquidity event')).toBeInTheDocument();
    expect(within(block).getByText('409A value $12.40 per share as of June 30, 2026, for information only; not counted in the figures.')).toBeInTheDocument();
    const ed = await openEditor();
    expect(within(ed).getByLabelText('Latest 409A value per share')).toHaveValue('12.4');
    await user().click(within(ed).getByRole('button', { name: 'Save grant' }));
    await view('client');
    await tab('Financial health');
    expect(screen.getByText('Awaiting a liquidity event')).toBeInTheDocument();
  });

  it('AC-B-26 · no grant, no grant block', async () => {
    render(<App initialHousehold="H1" />);
    expect(screen.queryByLabelText('Stock compensation not yet vested')).toBeNull();
  });

  it('AC-B-30 · a grant whose ticker has no price: advisor notice only', async () => {
    const noPrice = { ...H2_COMPLETE, employers: [{ ...H2_COMPLETE.employers[0], ticker: 'SIMNP' }] };
    render(<App initialHousehold="H2" households={[noPrice]} />);
    expect(screen.queryByText(/grant not counted/)).toBeNull();
    await view('advisor');
    expect(screen.getByText('Price not available for SIMNP: grant not counted.')).toBeInTheDocument();
  });

  it('AC-B-06 · AC-G-09 · AC-G-08 · existing household: nothing changes until the advisor adds a grant; the save warns about the manual adjustment', async () => {
    render(<App initialHousehold="H7" />);
    expect(screen.queryByLabelText('Stock compensation not yet vested')).toBeNull();
    const ed = await openEditor('Add grant');
    change(within(ed).getByLabelText('Grant date'), '2026-01-15');
    change(within(ed).getByLabelText('Units'), '1000');
    await user().click(within(ed).getByRole('button', { name: 'Generate tranches' }));
    await user().click(within(ed).getByLabelText('No'));
    await user().click(within(ed).getByRole('button', { name: 'Save grant' }));
    expect(within(ed).getByRole('alert')).toHaveTextContent('Saving reprocesses the analysis and replaces your manual score adjustment.');
    await user().click(within(ed).getByRole('button', { name: 'Save and reprocess' }));
    expect(within(screen.getByLabelText('Stock compensation grants')).getByText('complete')).toBeInTheDocument();
  });
});
