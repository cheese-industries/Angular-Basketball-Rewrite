import { BatSide3 } from "./bat-side3";
import { PitchHand3 } from "./pitch-hand3";
import { PrimaryPosition3 } from "./primary-position3";
import { Stat3 } from "./stat3";

export interface Pitcher {
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
    primaryPosition: PrimaryPosition3;
    useName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    pronunciation: string;
    stats: Stat3[];
    batSide: BatSide3;
    pitchHand: PitchHand3;
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
    middleName: string;
    nameMatrilineal: string;
    mlbDebutDate: string;
    nickName: string;
}