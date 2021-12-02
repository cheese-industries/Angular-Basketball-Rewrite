<<<<<<< Updated upstream
import { Linescore } from "./linescore";

export interface Competitor{
    linescores: Linescore[] | null;
=======
import { HomeAway } from "./home-away";
import { LeadersParent } from "./leaders-parent";
import { Linescore } from "./linescore";
import { Records } from "./records";
import { Team } from "./team";
import { TotalScore } from "./total-score";

export interface Competitor{
    linescores: Linescore[] | null;
    score: TotalScore;
    team: Team | null;
    homeAway: HomeAway;
    leaders: LeadersParent[] | null;
    records: Records[];
>>>>>>> Stashed changes
}