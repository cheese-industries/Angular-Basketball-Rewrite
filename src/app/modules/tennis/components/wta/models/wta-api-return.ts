import { Data } from "./data";

export interface WtaApiReturn {
    status: string;
    code: number;
    data: Data;
}