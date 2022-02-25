import { HomeAway } from "./home-away";
import { LeadersParent } from "./leaders-parent";
import { Linescore } from "./linescore";
import { Records } from "./records";
import { Team } from "./team";
import { TotalScore } from "./total-score";
import { Rank} from './rank'
import { TeamName } from "./team-name";

export interface Competitor{
    linescores: Linescore[];
    score: TotalScore;
    team: Team;
    homeAway: HomeAway;
    leaders: LeadersParent[];
    records: Records[];
    curatedRank: Rank;
    name: TeamName;
}