import { Batter2 } from "./batter2";
import { Pitcher2 } from "./pitcher2";
import { Splits } from "./splits";

export interface Matchup {
    batter: Batter2;
    pitcher: Pitcher2;
    batterTeam: string;
    ordinalInning: string;
    batterHotColdZones: any[];
    pitcherHotColdZones: any[];
    splits: Splits;
}