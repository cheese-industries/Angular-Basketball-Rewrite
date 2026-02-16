import { Theme } from "./theme";

export interface HomeTeam {
    teamId: number;
    nickName: string;
    city: string;
    odds: string;
    teamPosition: string;
    theme: Theme;
    score: number;
}