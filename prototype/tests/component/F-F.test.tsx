// F-F component tests: uploading a plan statement and confirming what was extracted (D-062).
// Extraction is SIMULATED: each sample document returns a fixed result.
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { H2, H2_COMPLETE } from '../../src/model/households';
import { App } from '../../src/ui/App';

const user = () => userEvent.setup();
const HALDEN = 'Halden plan statement (SIMULATED).pdf';

async function upload(doc: string) {
  await user().selectOptions(screen.getByLabelText('View'), 'advisor');
  await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
  await user().selectOptions(screen.getByLabelText('Sample document'), doc);
  await user().click(screen.getByRole('button', { name: 'Upload plan statement' }));
}

describe('F-F · screens', () => {
  it('AC-F-01 · AC-F-02 · AC-F-04 · AC-F-12 · the advisor uploads a statement; each grant found is proposed beside the document, labelled not confirmed', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await upload('Brokerage statement with three grants (SIMULATED).pdf');
    expect(screen.getAllByLabelText('Proposed grant')).toHaveLength(3);
    expect(screen.getByLabelText('Document Brokerage statement with three grants (SIMULATED).pdf')).toBeInTheDocument();
    expect(screen.getAllByText('Extracted from Brokerage statement with three grants (SIMULATED).pdf, not confirmed')).toHaveLength(3);
  });

  it('AC-F-08 · nothing found: the advisor is told to enter the grants by hand', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await upload('Unreadable scan (SIMULATED).pdf');
    expect(screen.getByText('No grants found in this document. Enter them by hand.')).toBeInTheDocument();
  });

  it('AC-F-10 · past vests are proposed with the prompt to record held shares', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await upload(HALDEN);
    expect(within(screen.getByLabelText('Proposed grant')).getAllByText(/^Vested on .*record the shares kept as a held position\.$/)).toHaveLength(3);
  });

  it('AC-F-03 · AC-F-05 · AC-F-06 · proposals stay out of the analysis; the advisor edits, confirms and the analysis is reprocessed', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await upload(HALDEN);
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    expect(screen.queryByLabelText('Stock compensation not yet vested')).toBeNull();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getByRole('button', { name: 'Review and confirm' }));
    const ed = screen.getAllByLabelText('Grant editor').at(-1)!;
    await user().click(within(ed).getByLabelText('No'));
    await user().click(within(ed).getByRole('button', { name: 'Confirm grant' }));
    expect(screen.queryByLabelText('Proposed grant')).toBeNull();
    await user().click(screen.getByRole('tab', { name: 'Financial health' }));
    expect(within(screen.getByLabelText('Stock compensation not yet vested')).getAllByRole('listitem')).toHaveLength(10);
  });

  it('AC-F-07 · rejecting discards the proposal', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await upload(HALDEN);
    await user().click(screen.getByRole('button', { name: 'Reject' }));
    expect(screen.queryByLabelText('Proposed grant')).toBeNull();
  });

  it('AC-F-09 · a duplicate of an existing grant: both shown, the advisor chooses', async () => {
    render(<App initialHousehold="H2" households={[H2_COMPLETE]} />);
    await upload(HALDEN);
    expect(screen.getByText('Same employer and grant date as an existing grant. Choose which to keep.')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Keep existing' }));
    expect(screen.queryByLabelText('Proposed grant')).toBeNull();
  });

  it('AC-F-13 · a client upload in the questionnaire reaches the advisor as a proposal', async () => {
    render(<App initialHousehold="H2" households={[{ ...H2, grants: [] }]} />);
    await user().click(screen.getByRole('tab', { name: 'Questionnaire' }));
    await user().click(screen.getByRole('button', { name: '+ Stock compensation' }));
    await user().type(screen.getByLabelText('Employer'), 'Halden Robotics');
    await user().click(screen.getByRole('button', { name: 'go to the documents step' }));
    await user().click(screen.getByLabelText(HALDEN));
    await user().click(screen.getByRole('button', { name: 'Back to Income' }));
    await user().click(screen.getByRole('button', { name: 'Submit questionnaire' }));
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    expect(screen.getAllByText(`Extracted from ${HALDEN}, not confirmed`).length).toBeGreaterThan(0);
  });
});
