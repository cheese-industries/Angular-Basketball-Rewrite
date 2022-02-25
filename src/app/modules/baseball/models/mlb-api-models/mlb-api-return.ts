import { DateArray } from "./date";



export interface mlbApiReturn {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    dates: DateArray[];
    headers: Headers;
    status: number;
}