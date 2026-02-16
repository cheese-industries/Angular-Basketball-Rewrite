export interface NHLGameData {
    prevDate: string
    currentDate: string
    nextDate: string
    gameWeek: GameWeek[]
    oddsPartners: OddsPartner[]
    games: Game[]
  }
  
  export interface GameWeek {
    date: string
    dayAbbrev: string
    numberOfGames: number
  }
  
  export interface OddsPartner {
    partnerId: number
    country: string
    name: string
    imageUrl: string
    siteUrl?: string
    bgColor: string
    textColor: string
    accentColor: string
  }
  
  export interface Game {
    id: number
    season: number
    gameType: number
    gameDate: string
    venue: Venue
    specialEvent?: SpecialEvent
    specialEventLogoURL?: string
    startTimeUTC: string
    easternUTCOffset: string
    venueUTCOffset: string
    tvBroadcasts: TvBroadcast[]
    gameState: string
    gameScheduleState: string
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    gameCenterLink: string
    clock?: Clock
    neutralSite: boolean
    venueTimezone: string
    period?: number
    periodDescriptor?: PeriodDescriptor
    situation?: Situation
    goals?: Goal[]
    ticketsLink?: string
    ticketsLinkFr?: string
    teamLeaders?: TeamLeader[]
  }
  
  export interface Venue {
    default: string
  }
  
  export interface SpecialEvent {
    default: string
  }
  
  export interface TvBroadcast {
    id: number
    market: string
    countryCode: string
    network: string
    sequenceNumber: number
  }
  
  export interface AwayTeam {
    id: number
    name: Name
    abbrev: string
    score?: number
    sog?: number
    logo: string
    record?: string
    odds?: Odd[]
  }
  
  export interface Name {
    default: string
  }
  
  export interface Odd {
    providerId: number
    value: string
  }
  
  export interface HomeTeam {
    id: number
    name: Name2
    abbrev: string
    score?: number
    sog?: number
    logo: string
    record?: string
    odds?: Odd2[]
  }
  
  export interface Name2 {
    default: string
    fr?: string
  }
  
  export interface Odd2 {
    providerId: number
    value: string
  }
  
  export interface Clock {
    timeRemaining: string
    secondsRemaining: number
    running: boolean
    inIntermission: boolean
  }
  
  export interface PeriodDescriptor {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Situation {
    homeTeam: HomeTeam2
    awayTeam: AwayTeam2
    situationCode: string
  }
  
  export interface HomeTeam2 {
    abbrev: string
    strength: number
  }
  
  export interface AwayTeam2 {
    abbrev: string
    situationDescriptions: string[]
    strength: number
  }
  
  export interface Goal {
    period: number
    periodDescriptor: PeriodDescriptor2
    timeInPeriod: string
    playerId: number
    name: Name3
    firstName: FirstName
    lastName: LastName
    goalModifier: string
    assists: Assist[]
    mugshot: string
    teamAbbrev: string
    goalsToDate: number
    awayScore: number
    homeScore: number
    strength: string
  }
  
  export interface PeriodDescriptor2 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Name3 {
    default: string
  }
  
  export interface FirstName {
    default: string
  }
  
  export interface LastName {
    default: string
  }
  
  export interface Assist {
    playerId: number
    name: Name4
    assistsToDate: number
  }
  
  export interface Name4 {
    default: string
  }
  
  export interface TeamLeader {
    id: number
    firstName: FirstName2
    lastName: LastName2
    headshot: string
    teamAbbrev: string
    category: string
    value: number
  }
  
  export interface FirstName2 {
    default: string
    cs?: string
    fi?: string
    sk?: string
    de?: string
    es?: string
    sv?: string
  }
  
  export interface LastName2 {
    default: string
    cs?: string
    sk?: string
    fi?: string
  }
  