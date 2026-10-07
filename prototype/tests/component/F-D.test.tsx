// F-D component tests: Retirement & Goals with the projection chart (D-062). SIMULATED.
import { render, screen, within } from '@testing-library/react';
import { H1, H2_COMPLETE, H3 } from '../../src/model/households';
import type { Household } from '../../src/model/types';
import { App } from '../../src/ui/App';

const GOAL: Household = {
  ...H2_COMPLETE,
  goals: [{ id: 'home', name: 'Home purchase', year: 2028, amount: 250_000 }],
  grants: [{ ...H2_COMPLETE.grants[0], units: 1_600, tranches: [{ id: 'a', date: '2027-06-01', units: 800 }, { id: 'b', date: '2028-06-01', units: 800 }] }],
};

describe('F-D · screens', () => {
  it('AC-D-03 · the projection marks each year with vests, beside the goal markers', () => {
    render(<App initialHousehold="H2" households={[GOAL]} />);
    const chart = screen.getByLabelText('Projected net worth');
    expect(chart.querySelectorAll('[data-vest-year]')).toHaveLength(2);
    expect(within(chart).getByText('Home purchase')).toBeInTheDocument();
  });

  it('AC-D-04 · a band where a year\'s vests include performance units', () => {
    render(<App initialHousehold="H3" households={[H3]} />);
    expect(within(screen.getByLabelText('Projected net worth')).getByText('Range of performance units')).toBeInTheDocument();
    expect(screen.getByLabelText('Projected net worth').querySelector('path.band')).not.toBeNull();
  });

  it('AC-D-02 · AC-D-06 · AC-D-07 · AC-D-08 · AC-G-15 · Retirement & Goals bullets with the price date and the sell-or-keep note', () => {
    render(<App initialHousehold="H2" households={[GOAL]} />);
    const goals = screen.getByLabelText('Retirement & Goals');
    expect(within(goals).getByText(/^Halden Robotics vests: \$[\d,]+ after estimated tax \(\$80,000 before tax\) between June 1, 2027 and June 1, 2028, at the October 5, 2026 price\.$/)).toBeInTheDocument();
    expect(within(goals).getByText(/^Vests before Home purchase \(2028\): \$[\d,]+ after estimated tax\.$/)).toBeInTheDocument();
    expect(within(goals).getByText("Value on the vest date; whether shares are sold or kept is the client's decision.")).toBeInTheDocument();
  });

  it('AC-D-09 · no complete grant: Retirement & Goals as today', () => {
    render(<App initialHousehold="H1" households={[H1]} />);
    expect(screen.queryByLabelText('Projected net worth')).toBeNull();
    expect(within(screen.getByLabelText('Retirement & Goals')).getByText('Unchanged, as today.')).toBeInTheDocument();
  });

  it('AC-D-11 · Retirement & Goals shows the projected figure with its label', () => {
    render(<App initialHousehold="H2" households={[GOAL]} />);
    expect(within(screen.getByLabelText('Projected net worth figure')).getByText(/includes future vests after estimated tax, at the October 5, 2026 price/)).toBeInTheDocument();
  });
});
