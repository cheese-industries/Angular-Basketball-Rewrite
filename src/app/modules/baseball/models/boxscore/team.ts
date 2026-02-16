import { Division } from './division';
import { League } from './league';
import { Sport } from './sport';
import { SpringVenue } from './spring-venue';
import { Venue } from './venue';
import { Record } from './record';
import { SpringLeague } from './spring-league';

export interface Team {
  id: number;
  name: string;
  link: string;
  season: number;
  venue: Venue;
  springVenue: SpringVenue;
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
  record: Record;
  franchiseName: string;
  clubName: string;
  springLeague: SpringLeague;
  allStarStatus: string;
  active: boolean;
}
