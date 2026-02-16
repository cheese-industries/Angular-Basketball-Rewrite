import { DefendingChampion } from "./defending-champion";
import { Match } from "./match";

export interface Datum {
    id: number;
    name: string;
    start: number;
    end: number;
    status: string;
    prize: number;
    country: string;
    surface: string;
    city: string;
    short_name: string;
    state: string;
    defending_champion: DefendingChampion;
    venue: string;
    matches: Match[];
}