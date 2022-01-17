import { TeamLinks } from './team-links';
import { TeamName } from './team-name';

export interface Team {
  name: TeamName;
  longName: TeamName;
  shortDisplayName: TeamName;
  location: TeamName;
  abbreviation: TeamName;
  logo: TeamName;
  links: TeamLinks[];
  conferenceId: TeamName;
}
