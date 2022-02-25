import { Group6 } from "./group6";
import { Stats6 } from "./stats6";
import { Type6 } from "./type6";

export interface Stat6 {
    type: Type6;
    group: Group6;
    exemptions: any[];
    stats: Stats6;
}