import { Group4 } from "./group4";
import { Stats4 } from "./stats4";
import { Type4 } from "./type4";

export interface Stat4 {
    type: Type4;
    group: Group4;
    exemptions: any[];
    stats: Stats4;
}