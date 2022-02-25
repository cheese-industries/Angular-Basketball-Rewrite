import { Group7 } from "./group7";
import { Stats7 } from "./stats7";
import { Type7 } from "./type7";

export interface Stat7 {
    type: Type7;
    group: Group7;
    exemptions: any[];
    stats: Stats7;
}