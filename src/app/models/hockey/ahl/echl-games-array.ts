
import { EchlResults } from "./echl-results";
import { EchlTeamsArray } from "./echl-teams-array";
import { GameStatus } from "./game-status";
import { Id } from "./id";
import { Venue } from "./venue";

export interface EchlGamesArray {
    teams: EchlTeamsArray;
    state: GameStatus;
    venue: Venue;
    results: EchlResults;
    startDate: Id;
}