import { Data } from "./data";

export interface AtpApiReturn {
    status: string;
    code: number;
    data: Data;
}