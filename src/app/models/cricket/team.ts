import { TeamLinks } from "./team-links";
import { TeamLinksHref } from "./team-links-href";
import { TeamName } from "./team-name";

export interface Team{
   name: TeamName
   shortDisplayName: TeamName
   location: TeamName
   abbreviation: TeamName
   logo: TeamName
   links: TeamLinks []
   conferenceId: TeamName
   longName: TeamName;
   image: TeamLinksHref;
}