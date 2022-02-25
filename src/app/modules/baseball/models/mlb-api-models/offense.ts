import { Batter } from "./batter";
import { First2 } from "./first2";
import { InHole } from "./in-hole";
import { OnDeck } from "./on-deck";
import { Second2 } from "./second2";
import { Team3 } from "./team3";
import { Third2 } from "./third2";

export interface Offense {
    batter: Batter;
    onDeck: OnDeck;
    inHole: InHole;
    battingOrder: number;
    team: Team3;
    first: First2;
    third: Third2;
    second: Second2;
}