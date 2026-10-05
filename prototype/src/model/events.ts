// Instrumentation events (EV- IDs in the specs). In the prototype they go to an in-memory log
// that tests read; where they are stored is engineering's call.

export interface StockPayEvent {
  id: string; // EV-A-01, ...
  householdId: string;
  data: Record<string, unknown>;
}

export class EventLog {
  readonly events: StockPayEvent[] = [];
  record(id: string, householdId: string, data: Record<string, unknown> = {}): void {
    this.events.push({ id, householdId, data });
  }
  of(id: string): StockPayEvent[] {
    return this.events.filter((e) => e.id === id);
  }
}
