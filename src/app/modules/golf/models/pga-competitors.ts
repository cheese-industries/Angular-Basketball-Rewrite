import { PgaAthlete } from "./pga-athlete";
import { PgaLinescores } from "./pga-linescores";
import { PgaScore } from "./pga-score";
import { PgaStatistics } from "./pga-statistics";
import { PgaStatus } from "./pga-status";

export interface PgaCompetitors {
athlete: PgaAthlete;
status: PgaStatus;
score: PgaScore;
linescores: PgaLinescores[];
statistics: PgaStatistics[];
movement: string;
sortOrder: number;
}