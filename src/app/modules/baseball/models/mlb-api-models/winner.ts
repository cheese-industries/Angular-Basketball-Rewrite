import { BatSide10 } from "./bat-side10";
import { PitchHand10 } from "./pitch-hand10";
import { PrimaryPosition10 } from "./primary-position10";
import { Stat7 } from "./stat7";

export interface Winner {
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
    primaryPosition: PrimaryPosition10;
    useName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    stats: Stat7[];
    mlbDebutDate: string;
    batSide: BatSide10;
    pitchHand: PitchHand10;
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
    nickName: string;
    nameTitle: string;
    pronunciation: string;
    nameMatrilineal: string;
}