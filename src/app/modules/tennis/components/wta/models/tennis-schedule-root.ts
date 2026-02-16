import { Datum } from "./datum";

export interface TennisScheduleRoot {
    status: string;
    code: number;
    data: Datum[];
}