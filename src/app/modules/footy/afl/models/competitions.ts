import { Competitors } from "./competitors";
import { Leaders } from "./leaders";
import { Notes } from "./notes";
import { Venue } from "./venue";

export interface Competitions {
    date: Date;
    venue: Venue;
    notes: Notes[];
    leaders: Leaders[];
    competitors: Competitors[];
}