import { BatSide12 } from "./bat-side12";
import { PitchHand12 } from "./pitch-hand12";
import { PrimaryPosition12 } from "./primary-position12";
import { Stat9 } from "./stat9";

export interface Save {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    primaryPosition: PrimaryPosition12;
    useName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    stats: Stat9[];
    batSide: BatSide12;
    pitchHand: PitchHand12;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    nameMatrilineal: string;
    pronunciation: string;
}