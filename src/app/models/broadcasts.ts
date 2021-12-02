import { BroadcastMarket } from "./broadcast-market";
import { Broadcasters } from "./broadcasters";

export interface Broadcasts{
    market: BroadcastMarket;
    names: Broadcasters[];
}