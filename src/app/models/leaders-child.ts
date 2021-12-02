import { LeadersAthlete } from "./leaders-athlete";
import { LeadersTotal } from "./leaders-total";

export interface LeadersChild{
    displayValue: LeadersTotal | null,
    athlete: LeadersAthlete | null
}