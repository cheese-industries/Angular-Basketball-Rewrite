import { Group3 } from "./group3";
import { Stats3 } from "./stats3";
import { Type3 } from "./type3";

export interface Stat3 {
    type: Type3;
    group: Group3;
    exemptions: any[];
    stats: Stats3;
}
