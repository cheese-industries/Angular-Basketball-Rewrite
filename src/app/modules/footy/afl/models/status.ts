import { StatusType } from "./status-type";


export interface Status {
    period: number;
    displayClock: string;
    type: StatusType;
}