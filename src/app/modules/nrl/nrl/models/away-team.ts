import { Theme2 } from "./theme2";

export interface AwayTeam {
    teamId: number;
    nickName: string;
    odds: string;
    city: string;
    teamPosition: string;
    theme: Theme2;
    score: number;
}