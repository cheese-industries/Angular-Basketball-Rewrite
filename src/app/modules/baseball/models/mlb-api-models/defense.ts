import { Catcher } from "./catcher";
import { Center } from "./center";
import { First } from "./first";
import { Left } from "./left";
import { Pitcher } from "./pitcher";
import { Right } from "./right";
import { Second } from "./second";
import { Shortstop } from "./shortstop";
import { Third } from "./third";

export interface Defense {
    pitcher: Pitcher;
    catcher: Catcher;
    first: First;
    second: Second;
    third: Third;
    shortstop: Shortstop;
    left: Left;
    center: Center;
    right: Right;
    battingOrder: number;
}
