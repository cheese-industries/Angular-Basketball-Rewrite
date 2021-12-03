import { HomeAway } from "./home-away";
import { LeadersParent } from "./leaders-parent";
import { Linescore } from "./linescore";
import { Records } from "./records";
import { Team } from "./team";
import { TotalScore } from "./total-score";

export interface Competitor{
    linescores: Linescore[];
    score: TotalScore;
    team: Team;
    homeAway: HomeAway;
    leaders: LeadersParent[];
    records: Records[];

}