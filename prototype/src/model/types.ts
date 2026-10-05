// Household model of the prototype. Product terms from docs/spec/00_index.md "Shared data";
// field names are ours (engineering owns the real ones). SIMULATED data only.

export type PersonId = string;
export type Money = number; // US dollars
export type IsoDate = string; // YYYY-MM-DD

export interface Person {
  id: PersonId;
  name: string;
  role: 'client' | 'coclient';
}

/** A holding: an instrument and a balance, as the platform holds it today (no quantity). */
export interface Position {
  id: string;
  ticker?: string;
  name: string;
  /** Market value; null when the instrument has no market price. */
  value: Money | null;
  /** Free-text instrument not in the security search, such as private shares. */
  privateInstrument?: boolean;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  owners: PersonId[];
  positions: Position[];
}

export interface Employer {
  id: string;
  name: string;
  listed: boolean;
  ticker?: string;
  /** Latest 409A value per share, private employers only (AC-B-20). */
  fmv409a?: { value: Money; date: IsoDate };
}

export type YesNoUnknown = 'yes' | 'no' | 'unknown';

/** Employer flag on a held position (F-A). */
export interface EmployerFlag {
  positionId: string;
  employerId: string;
  personId: PersonId;
  currentEmployer: YesNoUnknown;
  costBasis?: Money;
}

export type IncomeAnswer = 'yes' | 'no' | 'not sure';

/** One vest of a grant (AC-B-07 to AC-B-14). A PSU tranche holds target units. */
export interface Tranche {
  id: string;
  date: IsoDate;
  units: number;
  forfeited?: boolean;
  /** Recorded when known, never estimated (AC-B-14, D-050). */
  sharesKept?: number;
  costBasis?: Money;
}

/** PSU terms (AC-B-16, AC-B-17); the payout range is a share of target, 0 to 2 by default. */
export interface PsuTerms {
  condition: string;
  periodEnd: IsoDate;
  rangeMin: number;
  rangeMax: number;
}

/** What the client told in the questionnaire: shown to the advisor, never used in figures (AC-E-14). */
export interface ClientEstimate {
  type?: 'RSU' | 'PSU' | 'other' | 'not sure';
  unvestedValue?: Money;
  frequency?: 'monthly' | 'quarterly' | 'every six months' | 'yearly' | 'not sure';
}

/**
 * A grant: an element of the platform's stock compensation asset category, sub-type RSU;
 * a PSU is an RSU with performance terms (AC-B-31, D-058). Unvested value is never net worth.
 */
export interface Grant {
  id: string;
  category: 'stockCompensation';
  subType: 'RSU';
  /** One person, never joint (AC-B-02). */
  ownerId: PersonId;
  type: 'RSU' | 'PSU';
  employerId: string;
  grantDate?: IsoDate;
  units?: number;
  tranches: Tranche[];
  psu?: PsuTerms;
  source: 'advisor' | 'questionnaire' | 'extraction';
  /** Extracted from a statement and not yet confirmed (F-F). */
  proposed?: { document: string };
  /** State withholding rate per grant, 0 to 1 (AC-C-07). */
  stateWithholdingRate?: number;
  clientEstimate?: ClientEstimate;
  reportedOn?: IsoDate;
}

export interface Household {
  id: string;
  /** Title; SIMULATED households say so in their name. */
  name: string;
  analysisDate: IsoDate;
  people: Person[];
  accounts: Account[];
  cash: Money;
  employers: Employer[];
  flags: EmployerFlag[];
  grants: Grant[];
  /** Per person: "Does the salary on file include stock that vested this year?" (AC-B-29, AC-E-05). */
  incomeIncludesVests: Record<PersonId, IncomeAnswer | undefined>;
  /** Manual score adjustment made by the advisor, if any (AC-B-06, AC-G-12). */
  manualAdjustment?: { points: number; reason: string };
  /** Score checks the change does not touch: fixed SIMULATED values, 0 to 100 (D-063). */
  untouchedChecks: Record<string, number>;
}

export interface Firm {
  id: string;
  /** The firm setting "stock compensation" (D-030, D-049). */
  stockComp: boolean;
}
