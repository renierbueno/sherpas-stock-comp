// G component tests: editing new lines before sharing, sharing, manual adjustment (D-062).
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { H2_COMPLETE } from '../../src/model/households';
import type { Household } from '../../src/model/types';
import { App } from '../../src/ui/App';

const user = () => userEvent.setup();
const FLAGGED: Household = { ...H2_COMPLETE, flags: [
  { positionId: 'h2-hldn-brk', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
  { positionId: 'h2-hldn-401k', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
] };

describe('G · screens', () => {
  it('AC-G-07 · AC-G-10 · the advisor edits and deletes new lines; the client view and the PDF show the edited text', async () => {
    render(<App initialHousehold="H2" households={[FLAGGED]} />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    const look = screen.getByLabelText('We should look into');
    await user().click(within(look).getByRole('button', { name: 'Edit' }));
    const input = within(look).getByLabelText('Edit line A-15');
    await user().clear(input);
    await user().type(input, 'Close to a third of what you invest is Halden stock.{Enter}');
    const rec = within(screen.getByLabelText('Recommendations')).getByText(/is in Halden Robotics stock/).closest('li')!;
    await user().click(within(rec as HTMLElement).getByRole('button', { name: 'Delete' }));
    for (const v of ['client', 'print'] as const) {
      await user().selectOptions(screen.getByLabelText('View'), v);
      expect(screen.getByText('Close to a third of what you invest is Halden stock.')).toBeInTheDocument();
      expect(within(screen.getByLabelText('Recommendations')).queryByText(/is in Halden Robotics stock/)).toBeNull();
      expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    }
  });

  it('AC-G-12 · EV-A-03 · the advisor adjusts the score; the next stock-compensation save warns first', async () => {
    render(<App initialHousehold="H2" households={[FLAGGED]} />);
    await user().selectOptions(screen.getByLabelText('View'), 'advisor');
    await user().type(screen.getByLabelText('Adjustment points'), '2');
    await user().type(screen.getByLabelText('Adjustment reason'), 'Concentration threshold too hard');
    await user().click(screen.getByRole('button', { name: 'Adjust score' }));
    expect(screen.getByText(/Includes a manual adjustment of \+2/)).toBeInTheDocument();
    await user().click(screen.getByRole('tab', { name: 'Data & Assumptions' }));
    await user().click(screen.getAllByRole('button', { name: 'Remove flag' })[0]);
    expect(screen.getByRole('alert')).toHaveTextContent('Saving reprocesses the analysis and replaces your manual score adjustment.');
  });
});
