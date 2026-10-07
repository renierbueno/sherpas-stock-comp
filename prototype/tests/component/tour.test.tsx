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

  it('scene 2: the tax gap is counted and Liquidity drops', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^2/ }));
    const keys = screen.getByLabelText('Key numbers');
    expect(within(keys).getByText('was $0')).toBeInTheDocument();
    expect(within(keys).getByText('was 10 / 15')).toBeInTheDocument();
  });

  it('next scene and "Try it yourself" lead somewhere', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^2/ }));
    await user().click(screen.getByRole('button', { name: 'Next scene →' }));
    expect(screen.getByText('Vests that help fund a goal')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: '← Previous' }));
    await user().click(screen.getByRole('button', { name: 'Try it yourself' }));
    expect(screen.getByLabelText('View')).toHaveDisplayValue('Advisor mode');
  });

  it('a before-and-after scene shows its inputs and its calculation, read from the model (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^2/ }));
    expect(screen.getByLabelText('How it is computed')).toBeInTheDocument();
  });

  it('"How we know it works" shows the last test run, what it proves and what it does not (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: 'How we know it works →' }));
    expect(screen.getByText(/Generated from the last test run/)).toBeInTheDocument();
    expect(screen.getAllByText(/Does not prove:/)).toHaveLength(2);
  });
});
