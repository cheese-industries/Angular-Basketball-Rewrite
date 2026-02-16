export interface NHLBoxscore {
    id: number
    season: number
    gameType: number
    limitedScoring: boolean
    gameDate: string
    venue: Venue
    venueLocation: VenueLocation
    startTimeUTC: string
    easternUTCOffset: string
    venueUTCOffset: string
    tvBroadcasts: TvBroadcast[]
    gameState: string
    gameScheduleState: string
    specialEventLogoGc: string
    periodDescriptor: PeriodDescriptor
    regPeriods: number
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    clock: Clock
    playerByGameStats: PlayerByGameStats
    summary: Summary
    situation: Situation
  }
  
  export interface Venue {
    default: string
  }
  
  export interface VenueLocation {
    default: string
    cs: string
    de: string
    fi: string
    sk: string
    sv: string
  }
  
  export interface TvBroadcast {
    id: number
    market: string
    countryCode: string
    network: string
    sequenceNumber: number
  }
  
  export interface PeriodDescriptor {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface AwayTeam {
    id: number
    name: Name
    abbrev: string
    score: number
    sog: number
    logo: string
    radioLink: string
    placeName: PlaceName
    placeNameWithPreposition: PlaceNameWithPreposition
  }
  
  export interface Name {
    default: string
  }
  
  export interface PlaceName {
    default: string
  }
  
  export interface PlaceNameWithPreposition {
    default: string
    fr: string
  }
  
  export interface HomeTeam {
    id: number
    name: Name2
    abbrev: string
    score: number
    sog: number
    logo: string
    radioLink: string
    placeName: PlaceName2
    placeNameWithPreposition: PlaceNameWithPreposition2
  }
  
  export interface Name2 {
    default: string
  }
  
  export interface PlaceName2 {
    default: string
  }
  
  export interface PlaceNameWithPreposition2 {
    default: string
    fr: string
  }
  
  export interface Clock {
    timeRemaining: string
    secondsRemaining: number
    running: boolean
    inIntermission: boolean
  }
  
  export interface PlayerByGameStats {
    awayTeam: AwayTeam2
    homeTeam: HomeTeam2
  }
  
  export interface AwayTeam2 {
    forwards: Forward[]
    defense: Defense[]
    goalies: Goaly[]
  }
  
  export interface Forward {
    playerId: number
    sweaterNumber: number
    name: Name3
    position: string
    goals: number
    assists: number
    points: number
    plusMinus: number
    pim: number
    hits: number
    powerPlayGoals: number
    sog: number
    faceoffWinningPctg: number
    toi: string
    blockedShots: number
    shifts: number
    giveaways: number
    takeaways: number
  }
  
  export interface Name3 {
    default: string
  }
  
  export interface Defense {
    playerId: number
    sweaterNumber: number
    name: Name4
    position: string
    goals: number
    assists: number
    points: number
    plusMinus: number
    pim: number
    hits: number
    powerPlayGoals: number
    sog: number
    faceoffWinningPctg: number
    toi: string
    blockedShots: number
    shifts: number
    giveaways: number
    takeaways: number
  }
  
  export interface Name4 {
    default: string
  }
  
  export interface Goaly {
    playerId: number
    sweaterNumber: number
    name: Name5
    position: string
    evenStrengthShotsAgainst: string
    powerPlayShotsAgainst: string
    shorthandedShotsAgainst: string
    saveShotsAgainst: string
    savePctg: number
    evenStrengthGoalsAgainst: number
    powerPlayGoalsAgainst: number
    shorthandedGoalsAgainst: number
    goalsAgainst: number
    toi: string
    shotsAgainst: number
    saves: number
  }
  
  export interface Name5 {
    default: string
  }
  
  export interface HomeTeam2 {
    forwards: Forward2[]
    defense: Defense2[]
    goalies: Goaly2[]
  }
  
  export interface Forward2 {
    playerId: number
    sweaterNumber: number
    name: Name6
    position: string
    goals: number
    assists: number
    points: number
    plusMinus: number
    pim: number
    hits: number
    powerPlayGoals: number
    sog: number
    faceoffWinningPctg: number
    toi: string
    blockedShots: number
    shifts: number
    giveaways: number
    takeaways: number
  }
  
  export interface Name6 {
    default: string
  }
  
  export interface Defense2 {
    playerId: number
    sweaterNumber: number
    name: Name7
    position: string
    goals: number
    assists: number
    points: number
    plusMinus: number
    pim: number
    hits: number
    powerPlayGoals: number
    sog: number
    faceoffWinningPctg: number
    toi: string
    blockedShots: number
    shifts: number
    giveaways: number
    takeaways: number
  }
  
  export interface Name7 {
    default: string
  }
  
  export interface Goaly2 {
    playerId: number
    sweaterNumber: number
    name: Name8
    position: string
    evenStrengthShotsAgainst: string
    powerPlayShotsAgainst: string
    shorthandedShotsAgainst: string
    saveShotsAgainst: string
    savePctg: number
    evenStrengthGoalsAgainst: number
    powerPlayGoalsAgainst: number
    shorthandedGoalsAgainst: number
    goalsAgainst: number
    toi: string
    shotsAgainst: number
    saves: number
  }
  
  export interface Name8 {
    default: string
    cs?: string
    fi?: string
    sk?: string
  }
  
  export interface Summary {}
  
  export interface Situation {
    homeTeam: HomeTeam3
    awayTeam: AwayTeam3
    situationCode: string
  }
  
  export interface HomeTeam3 {
    abbrev: string
    situationDescriptions: string[]
    strength: number
  }
  
  export interface AwayTeam3 {
    abbrev: string
    strength: number
  }
  