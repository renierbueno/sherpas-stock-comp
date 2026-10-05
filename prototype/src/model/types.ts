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
