import { Batting2 } from "./batting2";
import { Fielding2 } from "./fielding2";
import { Pitching2 } from "./pitching2";

export interface Stats {
    batting: Batting2;
    pitching: Pitching2;
    fielding: Fielding2;
}