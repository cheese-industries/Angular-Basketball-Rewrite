import { NcaaTeam } from "./ncaa-team";
import { Period } from "./period";

export interface NcaaEvent{
    away: NcaaTeam;
    home: NcaaTeam;
    currentPeriod: Period;
    game: NcaaEvent;
}