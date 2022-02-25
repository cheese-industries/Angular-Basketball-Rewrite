import { Group8 } from "./group8";
import { Stats8 } from "./stats8";
import { Type8 } from "./type8";

export interface Stat8 {
    type: Type8;
    group: Group8;
    exemptions: any[];
    stats: Stats8;
}