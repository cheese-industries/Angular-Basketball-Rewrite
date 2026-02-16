import { Game } from "./game";


export interface NcaaBaseballApiReturn {
    inputMD5Sum: string;
    updated_at: string;
    games: Game[];
}