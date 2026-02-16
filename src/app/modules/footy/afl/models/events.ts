import { Competitions } from "./competitions";
import { Status } from "./status";


export interface Events {
    name: string;
    date: string;
    competitions: Competitions[];
    status: Status;
}