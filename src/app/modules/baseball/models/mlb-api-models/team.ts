import { Division } from "./division";
import { League } from "./league";
import { Sport } from "./sport";
import { Venue } from "./venue";

export interface Team {
    id: number;
    name: string;
    link: string;
    season: number;
    venue: Venue;
    teamCode: string;
    fileCode: string;
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    league: League;
    division: Division;
    sport: Sport;
    shortName: string;
    parentOrgName: string;
    parentOrgId: number;
    franchiseName: string;
    clubName: string;
    allStarStatus: string;
    active: boolean;
}