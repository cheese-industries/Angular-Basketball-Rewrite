import { NcaaTeamNames } from "./ncaa-team-names";
import { Score } from "./score";
import { TeamName } from "./team-name";

export interface NcaaTeam{
   names: NcaaTeamNames;
   score: Score;
   description: Score;
   logo: TeamName;
}