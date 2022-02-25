import { DefaultCoordinates } from "./default-coordinates";

export interface Location {
    address1: string;
    city: string;
    state: string;
    stateAbbrev: string;
    postalCode: string;
    country: string;
    defaultCoordinates: DefaultCoordinates;
    phone: string;
}