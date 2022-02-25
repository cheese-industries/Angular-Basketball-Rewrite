import { PgaCompetitions } from "./pga-competitions";

export interface PgaEvents {
    name: string;
    competitions: PgaCompetitions[];
}