import { AllPosition } from "./allposition";
import { GameStatus } from "./game-status";
import { Person } from "./person";
import { Position } from "./position";
import { SeasonStats } from "./season-stats";
import { Stats } from "./stats";
import { Status } from "./status";

export interface Player {
    person: Person;
    jerseyNumber: string;
    position: Position;
    stats: Stats;
    status: Status;
    parentTeamId: number;
    battingOrder: string;
    seasonStats: SeasonStats;
    gameStatus: GameStatus;
    allPositions: AllPosition[];
}