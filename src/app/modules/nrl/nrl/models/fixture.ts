import { AwayTeam } from "./away-team";
import { CallToAction } from "./call-to-action";
import { Clock } from "./clock";
import { HomeTeam } from "./home-team";

export interface Fixture {
    isCurrentRound: boolean;
    roundTitle: string;
    type: string;
    matchMode: string;
    matchState: string;
    venue: string;
    venueCity: string;
    matchCentreUrl: string;
    callToAction: CallToAction;
    homeTeam: HomeTeam;
    awayTeam: AwayTeam;
    clock: Clock;
    broadcastChannels: string[];
}