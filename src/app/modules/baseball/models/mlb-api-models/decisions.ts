import { Loser } from "./loser";
import { Save } from "./save";
import { Winner } from "./winner";

export interface Decisions {
    winner: Winner;
    loser: Loser;
    save: Save;
}
