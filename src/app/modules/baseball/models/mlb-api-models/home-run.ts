import { About } from "./about";
import { Count } from "./count";
import { Matchup } from "./matchup";
import { Result } from "./result";

export interface HomeRun {
    result: Result;
    about: About;
    count: Count;
    matchup: Matchup;
    pitchIndex: any[];
    actionIndex: any[];
    runnerIndex: any[];
    runners: any[];
    playEvents: any[];
}