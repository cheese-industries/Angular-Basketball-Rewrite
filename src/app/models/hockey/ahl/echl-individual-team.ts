import { EchlTeamCity } from "./echl-team-city";
import { EchlTeamLogo } from "./echl-team-logo";
import { EchlTeamName } from "./echl-team-name";

export interface EchlIndividualTeam {
    name: EchlTeamCity;
    shortname: EchlTeamName;
    logo: EchlTeamLogo;
    city: EchlTeamCity;
    nickname: EchlTeamCity;
}