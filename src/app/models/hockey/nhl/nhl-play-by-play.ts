export interface NHLPlayByPlay {
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
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    shootoutInUse: boolean
    otInUse: boolean
    clock: Clock
    displayPeriod: number
    maxPeriods: number
    plays: Play[]
    rosterSpots: RosterSpot[]
    regPeriods: number
    summary: Summary
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
  
  export interface Play {
    eventId: number
    periodDescriptor: PeriodDescriptor2
    timeInPeriod: string
    timeRemaining: string
    situationCode: string
    homeTeamDefendingSide: string
    typeCode: number
    typeDescKey: string
    sortOrder: number
    details?: Details
  }
  
  export interface PeriodDescriptor2 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Details {
    xCoord?: number
    yCoord?: number
    zoneCode?: string
    reason?: string
    shootingPlayerId?: number
    goalieInNetId?: number
    eventOwnerTeamId?: number
    awaySOG?: number
    homeSOG?: number
    shotType?: string
    losingPlayerId?: number
    winningPlayerId?: number
    blockingPlayerId?: number
    typeCode?: string
    descKey?: string
    duration?: number
    committedByPlayerId?: number
    drawnByPlayerId?: number
    secondaryReason?: string
    playerId?: number
    scoringPlayerId?: number
    scoringPlayerTotal?: number
    assist1PlayerId?: number
    assist1PlayerTotal?: number
    assist2PlayerId?: number
    assist2PlayerTotal?: number
    awayScore?: number
    homeScore?: number
    discreteClip?: number
    hittingPlayerId?: number
    hitteePlayerId?: number
    highlightClip?: number
    servedByPlayerId?: number
  }
  
  export interface RosterSpot {
    teamId: number
    playerId: number
    firstName: FirstName
    lastName: LastName
    sweaterNumber: number
    positionCode: string
    headshot: string
  }
  
  export interface FirstName {
    default: string
    cs?: string
    sk?: string
  }
  
  export interface LastName {
    default: string
    cs?: string
    fi?: string
    sk?: string
  }
  
  export interface Summary {
    iceSurface: IceSurface
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
  