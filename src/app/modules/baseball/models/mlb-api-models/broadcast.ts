import { VideoResolution } from "./video-resolution";

export interface Broadcast {
    id: number;
    name: string;
    type: string;
    language: string;
    homeAway: string;
    callSign: string;
    videoResolution: VideoResolution;
    sourceUrl: string;
}