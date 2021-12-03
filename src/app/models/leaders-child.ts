import { LeadersAthlete } from "./leaders-athlete";
import { LeadersTotal } from "./leaders-total";

export interface LeadersChild{
    displayValue: LeadersTotal,
    athlete: LeadersAthlete
}