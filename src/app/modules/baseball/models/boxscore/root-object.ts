import { Info3 } from "./info3";
import { Official } from "./official";
import { Teams } from "./teams";

export interface RootObject {
    copyright: string;
    teams: Teams;
    officials: Official[];
    info: Info3[];
    pitchingNotes: string[];
}