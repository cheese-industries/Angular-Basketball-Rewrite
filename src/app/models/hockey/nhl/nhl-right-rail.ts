export interface NHLRightRail {
    seasonSeries: SeasonSery[]
    seasonSeriesWins: SeasonSeriesWins
    gameInfo: GameInfo
    linescore: Linescore
    shotsByPeriod: ShotsByPeriod[]
    teamGameStats: TeamGameStat[]
    gameReports: GameReports
  }
  
  export interface SeasonSery {
    id: number
    season: number
    gameType: number
    gameDate: string
    startTimeUTC: string
    easternUTCOffset: string
    venueUTCOffset: string
    gameState: string
    gameScheduleState: string
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    gameCenterLink: string
    periodDescriptor?: PeriodDescriptor
    gameOutcome?: GameOutcome
    clock?: Clock
  }
  
  export interface AwayTeam {
    id: number
    abbrev: string
    logo: string
    score?: number
  }
  
  export interface HomeTeam {
    id: number
    abbrev: string
    logo: string
    score?: number
  }
  
  export interface PeriodDescriptor {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface GameOutcome {
    lastPeriodType: string
  }
  
  export interface Clock {
    timeRemaining: string
    secondsRemaining: number
    running: boolean
    inIntermission: boolean
  }
  
  export interface SeasonSeriesWins {
    awayTeamWins: number
    homeTeamWins: number
  }
  
  export interface GameInfo {
    referees: Referee[]
    linesmen: Linesmen[]
    awayTeam: AwayTeam2
    homeTeam: HomeTeam2
  }
  
  export interface Referee {
    default: string
  }
  
  export interface Linesmen {
    default: string
  }
  
  export interface AwayTeam2 {
    headCoach: HeadCoach
    scratches: Scratch[]
  }
  
  export interface HeadCoach {
    default: string
  }
  
  export interface Scratch {
    id: number
    firstName: FirstName
    lastName: LastName
  }
  
  export interface FirstName {
    default: string
  }
  
  export interface LastName {
    default: string
  }
  
  export interface HomeTeam2 {
    headCoach: HeadCoach2
    scratches: Scratch2[]
  }
  
  export interface HeadCoach2 {
    default: string
  }
  
  export interface Scratch2 {
    id: number
    firstName: FirstName2
    lastName: LastName2
  }
  
  export interface FirstName2 {
    default: string
    cs?: string
    sk?: string
    de?: string
    es?: string
    fi?: string
    sv?: string
  }
  
  export interface LastName2 {
    default: string
    cs?: string
    sk?: string
  }
  
  export interface Linescore {
    byPeriod: ByPeriod[]
    totals: Totals
  }
  
  export interface ByPeriod {
    periodDescriptor: PeriodDescriptor2
    away: number
    home: number
  }
  
  export interface PeriodDescriptor2 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface Totals {
    away: number
    home: number
  }
  
  export interface ShotsByPeriod {
    periodDescriptor: PeriodDescriptor3
    away: number
    home: number
  }
  
  export interface PeriodDescriptor3 {
    number: number
    periodType: string
    maxRegulationPeriods: number
  }
  
  export interface TeamGameStat {
    category: string
    awayValue: any
    homeValue: any
  }
  
  export interface GameReports {
    gameSummary: string
    eventSummary: string
    playByPlay: string
    faceoffSummary: string
    faceoffComparison: string
    rosters: string
    shotSummary: string
    toiAway: string
    toiHome: string
  }
  