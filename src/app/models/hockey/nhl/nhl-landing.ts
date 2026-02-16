export interface NHLLanding {
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
    venueTimezone: string
    periodDescriptor: PeriodDescriptor
    tvBroadcasts: TvBroadcast[]
    gameState: string
    gameScheduleState: string
    specialEvent: SpecialEvent
    specialEventLogo: string
    specialEventLogoGc: string
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    shootoutInUse: boolean
    maxPeriods: number
    regPeriods: number
    otInUse: boolean
    tiesInUse: boolean
    summary: Summary
    clock: Clock
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
  
  export interface PeriodDescriptor {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface TvBroadcast {
    id: number
    market: string
    countryCode: string
    network: string
    sequenceNumber: number
  }
  
  export interface SpecialEvent {
    default: string
  }
  
  export interface AwayTeam {
    id: number
    name: Name
    abbrev: string
    placeName: PlaceName
    placeNameWithPreposition: PlaceNameWithPreposition
    score: number
    sog: number
    logo: string
    radioLink: string
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
    placeName: PlaceName2
    placeNameWithPreposition: PlaceNameWithPreposition2
    score: number
    sog: number
    logo: string
    radioLink: string
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
  
  export interface Summary {
    iceSurface: IceSurface
    scoring: Scoring[]
    shootout: any[]
    threeStars: any[]
    penalties: Penalty[]
  }
  
  export interface IceSurface {
    awayTeam: AwayTeam2
    homeTeam: HomeTeam2
  }
  
  export interface AwayTeam2 {
    forwards: Forward[]
    defensemen: Defensemen[]
    goalies: Goaly[]
    penaltyBox: any[]
  }
  
  export interface Forward {
    playerId: number
    name: Name3
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name3 {
    default: string
  }
  
  export interface Defensemen {
    playerId: number
    name: Name4
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name4 {
    default: string
  }
  
  export interface Goaly {
    playerId: number
    name: Name5
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name5 {
    default: string
  }
  
  export interface HomeTeam2 {
    forwards: Forward2[]
    defensemen: Defensemen2[]
    goalies: Goaly2[]
    penaltyBox: any[]
  }
  
  export interface Forward2 {
    playerId: number
    name: Name6
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name6 {
    default: string
  }
  
  export interface Defensemen2 {
    playerId: number
    name: Name7
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name7 {
    default: string
  }
  
  export interface Goaly2 {
    playerId: number
    name: Name8
    sweaterNumber: number
    positionCode: string
    headshot: string
    totalSOI: number
  }
  
  export interface Name8 {
    default: string
  }
  
  export interface Scoring {
    periodDescriptor: PeriodDescriptor2
    goals: Goal[]
  }
  
  export interface PeriodDescriptor2 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Goal {
    situationCode: string
    strength: string
    playerId: number
    firstName: FirstName
    lastName: LastName
    name: Name9
    teamAbbrev: TeamAbbrev
    headshot: string
    goalsToDate: number
    awayScore: number
    homeScore: number
    leadingTeamAbbrev?: LeadingTeamAbbrev
    timeInPeriod: string
    shotType: string
    goalModifier: string
    assists: Assist[]
    homeTeamDefendingSide: string
  }
  
  export interface FirstName {
    default: string
  }
  
  export interface LastName {
    default: string
  }
  
  export interface Name9 {
    default: string
  }
  
  export interface TeamAbbrev {
    default: string
  }
  
  export interface LeadingTeamAbbrev {
    default: string
  }
  
  export interface Assist {
    playerId: number
    firstName: FirstName2
    lastName: LastName2
    name: Name10
    assistsToDate: number
  }
  
  export interface FirstName2 {
    default: string
  }
  
  export interface LastName2 {
    default: string
  }
  
  export interface Name10 {
    default: string
  }
  
  export interface Penalty {
    periodDescriptor: PeriodDescriptor3
    penalties: Penalty2[]
  }
  
  export interface PeriodDescriptor3 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Penalty2 {
    timeInPeriod: string
    type: string
    duration: number
    committedByPlayer: string
    teamAbbrev: TeamAbbrev2
    drawnBy: string
    descKey: string
    servedBy?: string
  }
  
  export interface TeamAbbrev2 {
    default: string
  }
  
  export interface Clock {
    timeRemaining: string
    secondsRemaining: number
    running: boolean
    inIntermission: boolean
  }
  