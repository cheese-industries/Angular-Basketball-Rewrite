import { RugbyScore } from "./rugby-score";
import { RugbyStatus } from "./rugby-status";
import { RugbyTeam } from "./rugby-team";
import { RugbyTour } from "./rugby-tour";
import { RugbyVenue } from "./rugby-venue";


export interface RugbyEvents {
    eventDateEnd: string;
    eventDateStart: string;
    gameDate: string;
    gameYear: string;
    gameMonth: string;
    gameDay: string;
    eventId: number;
    eventName: string;
    matchSubStatus: string;
    status: RugbyStatus;
    score: RugbyScore;
    rugbyTeam: RugbyTeam;
    tour: RugbyTour;
    venue: RugbyVenue;
}