import { LeadersCategory } from "./leaders-category";
import { LeadersChild } from "./leaders-child";

export interface LeadersParent{
    shortDisplayName: LeadersCategory;
    leaders: LeadersChild[];
}