import { Away2 } from "./away2";
import { Home2 } from "./home2";

export interface Innings {
    num: number;
    ordinalNum: string;
    home: Home2;
    away: Away2;
}