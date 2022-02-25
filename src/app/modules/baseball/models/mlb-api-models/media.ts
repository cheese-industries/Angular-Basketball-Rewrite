import { Epg } from "./epg";
import { FeaturedMedia } from "./featured-media";

export interface Media {
    epg: Epg[];
    featuredMedia: FeaturedMedia;
    freeGame: boolean;
    enhancedGame: boolean;
}