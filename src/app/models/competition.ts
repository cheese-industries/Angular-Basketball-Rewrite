<<<<<<< Updated upstream
import { Competitor } from "./competitor";

export interface Competition{
    competitors: Competitor[];
=======
import { Broadcasts } from "./broadcasts";
import { Competitor } from "./competitor";
import { Headlines } from "./headlines";
import { Notes } from "./notes";
import { Series } from "./series";
import { Venue } from "./venue";

export interface Competition{
    competitors: Competitor[];
    broadcasts: Broadcasts[];
    venue: Venue;
    headlines: Headlines[];
    notes: Notes[];
    series: Series;
>>>>>>> Stashed changes
}