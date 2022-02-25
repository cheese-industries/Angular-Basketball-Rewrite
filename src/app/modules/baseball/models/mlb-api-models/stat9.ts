import { Group9 } from "./group9";
import { Stats9 } from "./stats9";
import { Type9 } from "./type9";

export interface Stat9 {
    type: Type9;
    group: Group9;
    exemptions: any[];
    stats: Stats9;
}
