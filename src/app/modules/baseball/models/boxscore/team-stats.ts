import { Batting } from "./batting";
import { Fielding } from "./fielding";
import { Pitching } from "./pitching";

export interface TeamStats {
    batting: Batting;
    pitching: Pitching;
    fielding: Fielding;
}