import { LeadersAthleteName } from "./leaders-athlete-name";
import {LeadersHeadshot} from "./leaders-headshot";

export interface LeadersAthlete{
    fullName: LeadersAthleteName,
    shortName: LeadersAthleteName,
    headshot: LeadersHeadshot
}