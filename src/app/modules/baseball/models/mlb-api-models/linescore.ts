import { Defense } from "./defense";
import { Innings } from "./innings";
import { Offense } from "./offense";
import { Teams2 } from "./teams2";

export interface Linescore {
    currentInning: number;
    currentInningOrdinal: string;
    currentInningState: string;
    inningState: string;
    inningHalf: string;
    isTopInning: boolean;
    scheduledInnings: number;
    innings: Innings[];
    teams: Teams2;
    defense: Defense;
    offense: Offense;
    balls: number;
    strikes: number;
    outs: number;
    note: string;
    position: any;
}

