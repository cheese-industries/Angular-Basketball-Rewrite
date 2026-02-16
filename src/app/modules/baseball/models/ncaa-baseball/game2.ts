import { Away } from "./away";
import { Home } from "./home";

export interface Game2 {
    gameID: string;
    away: Away;
    finalMessage: string;
    bracketRound: string;
    title: string;
    contestName: string;
    url: string;
    network: string;
    home: Home;
    liveVideoEnabled: boolean;
    startTime: string;
    startTimeEpoch: string;
    bracketId: string;
    gameState: string;
    startDate: string;
    currentPeriod: string;
    videoState: string;
    bracketRegion: string;
    contestClock: string;
}