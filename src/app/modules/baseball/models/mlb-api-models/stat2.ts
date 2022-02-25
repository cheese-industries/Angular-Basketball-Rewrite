import { Group2 } from "./group2";
import { Stats2 } from "./stats2";
import { Type2 } from "./type2";

export interface Stat2 {
    type: Type2;
    group: Group2;
    exemptions: any[];
    stats: Stats2;
}