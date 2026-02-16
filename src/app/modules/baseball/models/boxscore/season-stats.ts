import { Batting3 } from "./batting3";
import { Fielding3 } from "./fielding3";
import { Pitching3 } from "./pitching3";

export interface SeasonStats {
    batting: Batting3;
    pitching: Pitching3;
    fielding: Fielding3;
}
