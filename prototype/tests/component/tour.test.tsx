// The guided tour (D-065): a reader who did not build the prototype can follow it alone.
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Root } from '../../src/ui/Tour';

const user = () => userEvent.setup();

describe('Start here and the scenes (D-065)', () => {
  it('opens on Start here: the problem, five scenes and a way to explore freely', () => {
    render(<Root />);
    expect(screen.getByText('Stock compensation in the Financial Health analysis')).toBeInTheDocument();
    expect(within(screen.getByLabelText('Start here')).getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getByRole('button', { name: 'Explore freely →' })).toBeInTheDocument();
  });

  it('scene 1 is a guided walk (D-117): prefilled steps, "Do it" runs each action, and the state carries over', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^1/ }));
    expect(screen.getByLabelText('Documents step')).toBeInTheDocument();
    expect(screen.getByLabelText('Halden plan statement (SIMULATED).pdf')).toBeChecked();
    expect(within(screen.getByLabelText('Questionnaire sections')).getByText('Personal information')).toHaveAttribute('title', 'Unchanged, not in the prototype');
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(screen.getByDisplayValue('Halden Robotics')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Do it: Submit questionnaire' }));
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(screen.getByLabelText('View')).toHaveDisplayValue('Client view (live)');
    expect(screen.getByText('Maya reported pay in Halden Robotics stock. It is not yet included in these figures.')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(screen.getByLabelText('View')).toHaveDisplayValue('Advisor mode');
    await user().click(screen.getByRole('button', { name: 'Do it: Confirm the statement' }));
    expect(await screen.findByText('Halden Robotics (HLDN) held in Maya brokerage and Maya 401(k) flagged as employer stock.')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: '← Previous step' }));
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(within(screen.getByLabelText('Stock compensation grants')).getAllByRole('button', { name: 'Edit' })).toHaveLength(1);
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(within(screen.getByLabelText('Key numbers')).getByText('was 20%')).toBeInTheDocument();
  });

  it('scene 2: the advisor saves the grant; the tax gap is counted and Liquidity drops', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^2/ }));
    await user().click(screen.getByRole('button', { name: 'Do it: Save the grant' }));
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    const keys = screen.getByLabelText('Key numbers');
    expect(within(keys).getByText('was $0')).toBeInTheDocument();
    expect(within(keys).getByText('was 10 / 15')).toBeInTheDocument();
  });

  it('scene 3: a scene that starts complete compares with the household without stock compensation', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^3/ }));
    expect(within(screen.getByLabelText('Key numbers')).getByText(/^without stock compensation: 0 · \$0$/)).toBeInTheDocument();
    expect(screen.getByLabelText('Projected net worth figure')).toBeInTheDocument();
  });

  it('scene 5: the existing client changes only after the advisor saves the grant, which replaces the manual adjustment', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^5/ }));
    expect(screen.queryByLabelText('Stock compensation not yet vested')).toBeNull();
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    await user().click(screen.getByRole('button', { name: 'Do it: Save the grant' }));
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    expect(screen.getByLabelText('Stock compensation not yet vested')).toBeInTheDocument();
    expect(within(screen.getByLabelText('Key numbers')).getAllByText(/^was /).length).toBeGreaterThan(0);
  });

  it('the last step of a scene leads to the next scene', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^3/ }));
    await user().click(screen.getByRole('button', { name: 'Next step →' }));
    await user().click(screen.getByRole('button', { name: 'Next scene →' }));
    expect(screen.getByText('A PSU with a performance range')).toBeInTheDocument();
  });

  it('a scene keeps its inputs and calculation, read from the model, folded (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^2/ }));
    expect(screen.getByText('How it is computed (inputs and calculation, SIMULATED)')).toBeInTheDocument();
    expect(screen.getByLabelText('How it is computed')).toBeInTheDocument();
  });

  it('"How we know it works" shows the last test run, what it proves and what it does not (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: 'How we know it works →' }));
    expect(screen.getByText(/Generated from the last test run/)).toBeInTheDocument();
    expect(screen.getAllByText(/Does not prove:/)).toHaveLength(2);
  });
});
