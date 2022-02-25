import { Group5 } from "./group5";
import { Stats5 } from "./stats5";
import { Type5 } from "./type5";

export interface Stat5 {
    type: Type5;
    group: Group5;
    exemptions: any[];
    stats: Stats5;
}