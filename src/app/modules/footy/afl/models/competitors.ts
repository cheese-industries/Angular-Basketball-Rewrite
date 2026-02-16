import { Leaders } from "./leaders";
import { Leaders2 } from "./leaders2";
import { Linescores } from "./linescores";
import { Records } from "./records";
import { Team } from "./team";

export interface Competitors {
    homeAway: string;
    score: number;
    winner: boolean;
    records: Records[];
    leaders: Leaders[];
    id: number;
    team: Team;
    linescores: Linescores[];  
}