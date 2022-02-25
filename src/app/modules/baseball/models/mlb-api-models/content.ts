import { Editorial } from "./editorial";
import { GameNotes } from "./game-notes";
import { Highlights } from "./highlights";
import { Media } from "./media";
import { Summary } from "./summary";

export interface Content {
    link: string;
    editorial: Editorial;
    media: Media;
    highlights: Highlights;
    summary: Summary;
    gameNotes: GameNotes;
}