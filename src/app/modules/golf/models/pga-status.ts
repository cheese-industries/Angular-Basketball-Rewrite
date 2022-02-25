import { PgaPosition } from "./pga-position";

export interface PgaStatus {
  displayValue: string;
  hole: string;
  startHole: string;
  position: PgaPosition;
  thru: string;
  playoff: boolean;
  behindCurrentRound: boolean;
  displayThru: string;
}
