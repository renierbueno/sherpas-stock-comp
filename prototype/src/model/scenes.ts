// The guided scenes of "Start here" (D-065): each is a before and an after household.
// SIMULATED: every household, company, price and state tax rate is invented; the federal and
// FICA rules are the real 2026 ones (docs/12_stock_comp_rules.md).
import { H2, H2_COMPLETE } from './households';
import type { EmployerFlag, Household } from './types';

const flag = (positionId: string): EmployerFlag => ({ positionId, employerId: 'halden', personId: 'p1', currentEmployer: 'yes' });

export interface Scene {
  id: number;
  title: string;
  feature: string;
  spec: string;
  problem: string;
  advisorDid: string;
  lookAt: string;
  before: Household;
  after: Household;
  /** Household and view to open in "Try it yourself". */
  tryIt: { household: string; mode: 'client' | 'advisor' };
  ready: boolean;
}

const H2_NO_GRANT: Household = { ...H2, grants: [] };

/**
 * A household taxed at 32% with a $100K vest in January 2027 (EC-C-01 shape), holding $60K of
 * cash against $60K of near-term commitments: the case where the gap matters for Liquidity.
 */
const H2_GAP: Household = {
  ...H2_NO_GRANT,
  cash: 60_000,
  salary: { p1: 360_000, p2: 90_000 },
  grants: [{ id: 'gap', category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId: 'halden', grantDate: '2025-01-15',
    units: 2_000, tranches: [{ id: 't', date: '2027-01-15', units: 2_000 }], source: 'advisor' }],
};

/** Home purchase in 2028; vests of $40K in 2027 and 2028 (EC-D-01 shape). */
const H2_GOAL: Household = {
  ...H2_COMPLETE,
  goals: [{ id: 'home', name: 'Home purchase', year: 2028, amount: 250_000 }],
  grants: [{ ...H2_COMPLETE.grants[0], units: 1_600, tranches: [{ id: 'a', date: '2027-06-01', units: 800 }, { id: 'b', date: '2028-06-01', units: 800 }] }],
};

export const SCENES: Scene[] = [
  {
    id: 1, title: 'Employer stock in two accounts', feature: 'F-A', spec: 'docs/spec/F-A_employer-stock-concentration.md',
    problem: 'Maya holds $150,000 of her employer, Halden Robotics, in a brokerage account and another $150,000 in her 401(k). Today the concentration check reads each holding on its own and sees a 20% fund as the largest position.',
    advisorDid: 'The advisor flagged both Halden positions as employer stock, in Data & Assumptions.',
    lookAt: 'The concentration check now reads 30%: one company, which also pays Maya’s salary. The headline score barely moves (Investing is 15 of 100 points); the new lines carry the message.',
    before: H2_NO_GRANT,
    after: { ...H2_NO_GRANT, flags: [flag('h2-hldn-brk'), flag('h2-hldn-401k')] },
    tryIt: { household: 'H2', mode: 'advisor' }, ready: true,
  },
  {
    id: 2, title: 'A grant that vests over four years', feature: 'F-B', spec: 'docs/spec/F-B_record-grant-and-vests.md',
    problem: 'Maya also has 4,000 restricted stock units (RSUs) that vest quarterly until 2029. Today they have no place in the analysis: they are neither an asset nor income yet.',
    advisorDid: 'Maya reported "paid partly in stock" in the questionnaire; the advisor completed the grant: date, units and a four-year quarterly schedule.',
    lookAt: 'The ten future vests are listed with their value at today’s price, in their own block, and stay out of net worth.',
    before: H2, after: H2_COMPLETE,
    tryIt: { household: 'H2', mode: 'advisor' }, ready: true,
  },
  {
    id: 3, title: 'Withholding that will not cover the tax', feature: 'F-C', spec: 'docs/spec/F-C_tax-at-vest.md',
    problem: 'A $100,000 vest in January 2027 is taxed as salary. The employer usually withholds 22%; this household is in a higher bracket, so part of the tax is due later.',
    advisorDid: 'The advisor recorded the grant; nothing else. The tax comes from the household’s own tax profile.',
    lookAt: 'Savings & Expenses estimates the tax and the gap after withholding. The household holds just enough cash for what it already owes soon, so the Liquidity check, which now counts the gap as a near-term commitment, drops.',
    before: { ...H2_GAP, grants: [] }, after: H2_GAP,
    tryIt: { household: 'H2', mode: 'advisor' }, ready: true,
  },
  {
    id: 4, title: 'Vests that help fund a goal', feature: 'F-D', spec: 'docs/spec/F-D_vest-proceeds-dated-cash.md',
    problem: 'Maya and Sam plan to buy a home in 2028. $80,000 of vests arrive before then.',
    advisorDid: 'Nothing new: the goal and the grant were already there.',
    lookAt: 'Retirement & Goals shows the vests after tax beside the goal, and the projection marks the years with vests.',
    before: { ...H2_GOAL, grants: [] }, after: H2_GOAL,
    tryIt: { household: 'H2', mode: 'client' }, ready: true,
  },
  {
    id: 5, title: 'The client reports it', feature: 'F-E, F-F', spec: 'docs/spec/F-E_client-reports-stock-pay.md',
    problem: 'Most clients know they are paid partly in stock, not the schedule. Today the questionnaire has nowhere to say it.',
    advisorDid: 'The client picks a "Stock compensation" chip in Income and says what they know; the advisor sees an alert and completes the detail, by hand or from the plan statement.',
    lookAt: 'One new chip and one helper line for everyone; nothing else changes for households without stock pay.',
    before: H2_NO_GRANT, after: H2,
    tryIt: { household: 'H1', mode: 'client' }, ready: true,
  },
];
