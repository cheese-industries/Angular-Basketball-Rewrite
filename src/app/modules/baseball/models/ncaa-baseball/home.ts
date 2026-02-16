import { Conference } from "./conference";
import { Names } from "./names";

export interface Home {
  score: string;
  names: Names;
  winner: boolean;
  seed: string;
  description: string;
  rank: string;
  conferences: Conference[];
}
