export interface StandingsRootObject {
    copyright: string
    records: Record[]
  }
  
  export interface Record {
    standingsType: string
    league: League
    division: Division
    sport: Sport3
    lastUpdated: string
    teamRecords: TeamRecord[]
  }
  
  export interface League {
    id: number
    name: string
    link: string
    abbreviation: string
    nameShort: string
    seasonState: string
    hasWildCard: boolean
    hasSplitSeason: boolean
    numGames: number
    hasPlayoffPoints: boolean
    numTeams: number
    numWildcardTeams: number
    seasonDateInfo: SeasonDateInfo
    season: string
    orgCode: string
    conferencesInUse: boolean
    divisionsInUse: boolean
    sport: Sport
    sortOrder: number
    active: boolean
  }
  
  export interface SeasonDateInfo {
    seasonId: string
    preSeasonStartDate: string
    preSeasonEndDate: string
    seasonStartDate: string
    springStartDate: string
    springEndDate: string
    regularSeasonStartDate: string
    lastDate1stHalf: string
    allStarDate: string
    firstDate2ndHalf: string
    regularSeasonEndDate: string
    postSeasonStartDate: string
    postSeasonEndDate: string
    seasonEndDate: string
    offseasonStartDate: string
    offSeasonEndDate: string
    seasonLevelGamedayType: string
    gameLevelGamedayType: string
    qualifierPlateAppearances: number
    qualifierOutsPitched: number
  }
  
  export interface Sport {
    id: number
    link: string
  }
  
  export interface Division {
    id: number
    name: string
    season: string
    nameShort: string
    link: string
    abbreviation: string
    league: League2
    sport: Sport2
    hasWildcard: boolean
    sortOrder: number
    numPlayoffTeams: number
    active: boolean
  }
  
  export interface League2 {
    id: number
    link: string
  }
  
  export interface Sport2 {
    id: number
    link: string
  }
  
  export interface Sport3 {
    id: number
    code: string
    link: string
    name: string
    abbreviation: string
    sortOrder: number
    activeStatus: boolean
  }
  
  export interface TeamRecord {
    team: Team
    season: string
    streak: Streak
    divisionRank: string
    leagueRank: string
    sportRank?: string
    gamesPlayed: number
    gamesBack: string
    wildCardGamesBack: string
    leagueGamesBack: string
    springLeagueGamesBack: string
    sportGamesBack: string
    divisionGamesBack: string
    conferenceGamesBack: string
    leagueRecord: LeagueRecord5
    lastUpdated: string
    records: Records
    runsAllowed: number
    runsScored: number
    divisionChamp?: boolean
    divisionLeader: boolean
    hasWildcard?: boolean
    clinched?: boolean
    eliminationNumber?: string
    wildCardEliminationNumber?: string
    magicNumber?: string
    wins: number
    losses: number
    runDifferential: number
    winningPercentage: string
    springLeagueRank?: string
    wildCardRank?: string
    wildCardLeader?: boolean
  }
  
  export interface Team {
    springLeague: SpringLeague
    allStarStatus: string
    id: number
    name: string
    link: string
    season: number
    venue: Venue
    springVenue: SpringVenue
    teamCode: string
    fileCode: string
    abbreviation: string
    teamName: string
    locationName: string
    firstYearOfPlay: string
    league: League3
    division: Division2
    sport: Sport4
    nextGameSchedule: NextGameSchedule
    previousGameSchedule: PreviousGameSchedule
    shortName: string
    franchiseName: string
    clubName: string
    active: boolean
  }
  
  export interface SpringLeague {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue {
    id: number
    name: string
    link: string
  }
  
  export interface SpringVenue {
    id: number
    link: string
  }
  
  export interface League3 {
    id: number
    name: string
    link: string
  }
  
  export interface Division2 {
    id: number
    name: string
    link: string
  }
  
  export interface Sport4 {
    id: number
    link: string
    name: string
  }
  
  export interface NextGameSchedule {
    totalItems: number
    totalEvents: number
    totalGames: number
    totalGamesInProgress: number
    dates: Date[]
  }
  
  export interface Date {
    date: string
    totalItems: number
    totalEvents: number
    totalGames: number
    totalGamesInProgress: number
    games: Game[]
    events: any[]
  }
  
  export interface Game {
    gamePk: number
    link: string
    gameType: string
    season: string
    gameDate: string
    officialDate: string
    status: Status
    teams: Teams
    venue: Venue4
    content: Content
    gameNumber: number
    publicFacing: boolean
    doubleHeader: string
    gamedayType: string
    tiebreaker: string
    calendarEventID: string
    seasonDisplay: string
    dayNight: string
    scheduledInnings: number
    reverseHomeAwayStatus: boolean
    inningBreakLength: number
    gamesInSeries: number
    seriesGameNumber: number
    seriesDescription: string
    recordSource: string
    ifNecessary: string
    ifNecessaryDescription: string
    description?: string
  }
  
  export interface Status {
    abstractGameState: string
    codedGameState: string
    detailedState: string
    statusCode: string
    startTimeTBD: boolean
    abstractGameCode: string
  }
  
  export interface Teams {
    away: Away
    home: Home
  }
  
  export interface Away {
    leagueRecord: LeagueRecord
    team: Team2
    splitSquad: boolean
    seriesNumber: number
    springLeague: SpringLeague3
  }
  
  export interface LeagueRecord {
    wins: number
    losses: number
    pct: string
  }
  
  export interface Team2 {
    springLeague: SpringLeague2
    allStarStatus: string
    id: number
    name: string
    link: string
    season: number
    venue: Venue2
    springVenue: SpringVenue2
    teamCode: string
    fileCode: string
    abbreviation: string
    teamName: string
    locationName: string
    firstYearOfPlay: string
    league: League4
    division: Division3
    sport: Sport5
    shortName: string
    franchiseName: string
    clubName: string
    active: boolean
  }
  
  export interface SpringLeague2 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue2 {
    id: number
    name: string
    link: string
  }
  
  export interface SpringVenue2 {
    id: number
    link: string
  }
  
  export interface League4 {
    id: number
    name: string
    link: string
  }
  
  export interface Division3 {
    id: number
    name: string
    link: string
  }
  
  export interface Sport5 {
    id: number
    link: string
    name: string
  }
  
  export interface SpringLeague3 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Home {
    leagueRecord: LeagueRecord2
    team: Team3
    splitSquad: boolean
    seriesNumber: number
    springLeague: SpringLeague5
  }
  
  export interface LeagueRecord2 {
    wins: number
    losses: number
    pct: string
  }
  
  export interface Team3 {
    springLeague: SpringLeague4
    allStarStatus: string
    id: number
    name: string
    link: string
    season: number
    venue: Venue3
    springVenue: SpringVenue3
    teamCode: string
    fileCode: string
    abbreviation: string
    teamName: string
    locationName: string
    firstYearOfPlay: string
    league: League5
    division: Division4
    sport: Sport6
    shortName: string
    franchiseName: string
    clubName: string
    active: boolean
  }
  
  export interface SpringLeague4 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue3 {
    id: number
    name: string
    link: string
  }
  
  export interface SpringVenue3 {
    id: number
    link: string
  }
  
  export interface League5 {
    id: number
    name: string
    link: string
  }
  
  export interface Division4 {
    id: number
    name: string
    link: string
  }
  
  export interface Sport6 {
    id: number
    link: string
    name: string
  }
  
  export interface SpringLeague5 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue4 {
    id: number
    name: string
    link: string
  }
  
  export interface Content {
    link: string
  }
  
  export interface PreviousGameSchedule {
    totalItems: number
    totalEvents: number
    totalGames: number
    totalGamesInProgress: number
    dates: Date2[]
  }
  
  export interface Date2 {
    date: string
    totalItems: number
    totalEvents: number
    totalGames: number
    totalGamesInProgress: number
    games: Game2[]
    events: any[]
  }
  
  export interface Game2 {
    gamePk: number
    link: string
    gameType: string
    season: string
    gameDate: string
    officialDate: string
    status: Status2
    teams: Teams2
    venue: Venue7
    content: Content2
    isTie: boolean
    gameNumber: number
    publicFacing: boolean
    doubleHeader: string
    gamedayType: string
    tiebreaker: string
    calendarEventID: string
    seasonDisplay: string
    dayNight: string
    scheduledInnings: number
    reverseHomeAwayStatus: boolean
    inningBreakLength: number
    gamesInSeries: number
    seriesGameNumber: number
    seriesDescription: string
    recordSource: string
    ifNecessary: string
    ifNecessaryDescription: string
    rescheduledFrom?: string
    rescheduledFromDate?: string
    description?: string
  }
  
  export interface Status2 {
    abstractGameState: string
    codedGameState: string
    detailedState: string
    statusCode: string
    startTimeTBD: boolean
    abstractGameCode: string
  }
  
  export interface Teams2 {
    away: Away2
    home: Home2
  }
  
  export interface Away2 {
    leagueRecord: LeagueRecord3
    score: number
    team: Team4
    isWinner: boolean
    splitSquad: boolean
    seriesNumber: number
    springLeague: SpringLeague7
  }
  
  export interface LeagueRecord3 {
    wins: number
    losses: number
    pct: string
  }
  
  export interface Team4 {
    springLeague: SpringLeague6
    allStarStatus: string
    id: number
    name: string
    link: string
    season: number
    venue: Venue5
    springVenue: SpringVenue4
    teamCode: string
    fileCode: string
    abbreviation: string
    teamName: string
    locationName: string
    firstYearOfPlay: string
    league: League6
    division: Division5
    sport: Sport7
    shortName: string
    franchiseName: string
    clubName: string
    active: boolean
  }
  
  export interface SpringLeague6 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue5 {
    id: number
    name: string
    link: string
  }
  
  export interface SpringVenue4 {
    id: number
    link: string
  }
  
  export interface League6 {
    id: number
    name: string
    link: string
  }
  
  export interface Division5 {
    id: number
    name: string
    link: string
  }
  
  export interface Sport7 {
    id: number
    link: string
    name: string
  }
  
  export interface SpringLeague7 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Home2 {
    leagueRecord: LeagueRecord4
    score: number
    team: Team5
    isWinner: boolean
    splitSquad: boolean
    seriesNumber: number
    springLeague: SpringLeague9
  }
  
  export interface LeagueRecord4 {
    wins: number
    losses: number
    pct: string
  }
  
  export interface Team5 {
    springLeague: SpringLeague8
    allStarStatus: string
    id: number
    name: string
    link: string
    season: number
    venue: Venue6
    springVenue: SpringVenue5
    teamCode: string
    fileCode: string
    abbreviation: string
    teamName: string
    locationName: string
    firstYearOfPlay: string
    league: League7
    division: Division6
    sport: Sport8
    shortName: string
    franchiseName: string
    clubName: string
    active: boolean
  }
  
  export interface SpringLeague8 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue6 {
    id: number
    name: string
    link: string
  }
  
  export interface SpringVenue5 {
    id: number
    link: string
  }
  
  export interface League7 {
    id: number
    name: string
    link: string
  }
  
  export interface Division6 {
    id: number
    name: string
    link: string
  }
  
  export interface Sport8 {
    id: number
    link: string
    name: string
  }
  
  export interface SpringLeague9 {
    id: number
    name: string
    link: string
    abbreviation: string
  }
  
  export interface Venue7 {
    id: number
    name: string
    link: string
  }
  
  export interface Content2 {
    link: string
  }
  
  export interface Streak {
    streakType: string
    streakNumber: number
    streakCode: string
  }
  
  export interface LeagueRecord5 {
    wins: number
    losses: number
    ties: number
    pct: string
  }
  
  export interface Records {
    splitRecords: SplitRecord[]
    divisionRecords: DivisionRecord[]
    overallRecords: OverallRecord[]
    leagueRecords: LeagueRecord6[]
    expectedRecords: ExpectedRecord[]
  }
  
  export interface SplitRecord {
    wins: number
    losses: number
    type: string
    pct: string
  }
  
  export interface DivisionRecord {
    wins: number
    losses: number
    pct: string
    division: Division7
  }
  
  export interface Division7 {
    id: number
    name: string
    link: string
  }
  
  export interface OverallRecord {
    wins: number
    losses: number
    type: string
    pct: string
  }
  
  export interface LeagueRecord6 {
    wins: number
    losses: number
    pct: string
    league: League8
  }
  
  export interface League8 {
    id: number
    name: string
    link: string
  }
  
  export interface ExpectedRecord {
    wins: number
    losses: number
    type: string
    pct: string
  }
  