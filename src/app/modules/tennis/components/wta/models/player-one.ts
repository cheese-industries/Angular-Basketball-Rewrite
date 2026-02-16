export interface PlayerOne {
    first_name: string;
    last_name: string;
    country_flag: string;
    line_score: number[];
    tie_break_score: number[];
    id: number;
    winner?: boolean;
    tournament_rank?: number;
}