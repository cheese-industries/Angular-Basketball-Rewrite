import { Division2 } from "./division2";
import { League2 } from "./league2";
import { Sport2 } from "./sport2";
import { Venue2 } from "./venue2";

export interface Team2 {
    id: number;
    name: string;
    link: string;
    season: number;
    venue: Venue2;
    teamCode: string;
    fileCode: string;
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    league: League2;
    division: Division2;
    sport: Sport2;
    shortName: string;
    parentOrgName: string;
    parentOrgId: number;
    franchiseName: string;
    clubName: string;
    allStarStatus: string;
    active: boolean;
}