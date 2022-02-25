import { Group10 } from "./group10";
import { Stats10 } from "./stats10";
import { Type10 } from "./type10";

export interface Stat10 {
    type: Type10;
    group: Group10;
    exemptions: any[];
    stats: Stats10;
}
