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

  it('scene 1: after marks the new lines with their requirement; before shows today with none', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^1/ }));
    expect(screen.getAllByText(/^New · AC-A-/).length).toBe(6);
    expect(screen.getByText(/6 new lines below.*also new in the Investment analysis tab/i)).toBeInTheDocument();
    expect(within(screen.getByLabelText('Key numbers')).getByText('was 20%')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Before (today)' }));
    expect(screen.queryAllByText(/^New · /)).toHaveLength(0);
    expect(screen.queryByText(/Halden Robotics stock held across/)).toBeNull();
  });

  it('scene 3: the tax gap is counted and Liquidity drops', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^3/ }));
    const keys = screen.getByLabelText('Key numbers');
    expect(within(keys).getByText('was $0')).toBeInTheDocument();
    expect(within(keys).getByText('was 10 / 15')).toBeInTheDocument();
  });

  it('next, previous and "Try it yourself" lead somewhere', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^1/ }));
    await user().click(screen.getByRole('button', { name: 'Next scene →' }));
    expect(screen.getByText('A grant that vests over four years')).toBeInTheDocument();
    await user().click(screen.getByRole('button', { name: 'Try it yourself' }));
    expect(screen.getByLabelText('View')).toHaveDisplayValue('Advisor mode');
  });

  it('each scene shows its inputs and its calculation, read from the model (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: /^1/ }));
    const calc = screen.getByLabelText('How it is computed');
    expect(within(calc).getByText(/\$150,000 \+ \$150,000 = \$300,000; \$300,000 \/ \$1,000,000 = 30%/)).toBeInTheDocument();
  });

  it('"How we know it works" shows the last test run, what it proves and what it does not (D-071)', async () => {
    render(<Root />);
    await user().click(screen.getByRole('button', { name: 'How we know it works →' }));
    expect(screen.getByText(/Generated from the last test run/)).toBeInTheDocument();
    expect(screen.getAllByText(/Does not prove:/)).toHaveLength(2);
  });
});
