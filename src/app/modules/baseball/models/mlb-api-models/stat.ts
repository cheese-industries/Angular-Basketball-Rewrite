import { Group } from "./group";
import { Stats } from "./stats";
import { Type } from "./type";

export interface Stat {
    type: Type;
    group: Group;
    exemptions: any[];
    stats: Stats;
}
