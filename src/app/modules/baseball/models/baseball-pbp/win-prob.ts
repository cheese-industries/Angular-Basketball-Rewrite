export interface WinProb {
  result: Result
  about: About
  count: Count
  matchup: Matchup
  pitchIndex: number[]
  actionIndex: number[]
  runnerIndex: number[]
  runners: Runner[]
  playEvents: PlayEvent[]
  credits?: Credit2[]
  flags?: Flag[]
  homeTeamWinProbability: number
  awayTeamWinProbability: number
  homeTeamWinProbabilityAdded: number
  contextMetrics: ContextMetrics2
  playEndTime: string
  atBatIndex: number
  leverageIndex?: number
}

export interface Result {
  type: string
  event: string
  eventType: string
  description: string
  rbi: number
  awayScore: number
  homeScore: number
  isOut: boolean
}

export interface About {
  atBatIndex: number
  halfInning: string
  isTopInning: boolean
  inning: number
  startTime: string
  endTime: string
  isComplete: boolean
  isScoringPlay: boolean
  hasReview?: boolean
  hasOut: boolean
  captivatingIndex: number
}

export interface Count {
  balls: number
  strikes: number
  outs: number
}

export interface Matchup {
  batter: Batter
  batSide: BatSide
  pitcher: Pitcher
  pitchHand: PitchHand
  batterHotColdZones: any[]
  pitcherHotColdZones: any[]
  splits: Splits
  postOnFirst?: PostOnFirst
  postOnSecond?: PostOnSecond
  postOnThird?: PostOnThird
}

export interface Batter {
  id: number
  fullName: string
  link: string
}

export interface BatSide {
  code: string
  description: string
}

export interface Pitcher {
  id: number
  fullName: string
  link: string
}

export interface PitchHand {
  code: string
  description: string
}

export interface Splits {
  batter: string
  pitcher: string
  menOnBase: string
}

export interface PostOnFirst {
  id: number
  fullName: string
  link: string
}

export interface PostOnSecond {
  id: number
  fullName: string
  link: string
}

export interface PostOnThird {
  id: number
  fullName: string
  link: string
}

export interface Runner {
  movement: Movement
  details: Details
  credits: Credit[]
}

export interface Movement {
  originBase?: string
  start?: string
  end?: string
  outBase?: string
  isOut: boolean
  outNumber?: number
}

export interface Details {
  event: string
  eventType: string
  movementReason?: string
  runner: Runner2
  responsiblePitcher?: ResponsiblePitcher
  isScoringEvent: boolean
  rbi: boolean
  earned: boolean
  teamUnearned: boolean
  playIndex: number
}

export interface Runner2 {
  id: number
  fullName: string
  link: string
}

export interface ResponsiblePitcher {
  id: number
  link: string
}

export interface Credit {
  player: Player
  position: Position
  credit: string
}

export interface Player {
  id: number
  link: string
}

export interface Position {
  code: string
  name: string
  type: string
  abbreviation: string
}

export interface PlayEvent {
  details: Details2
  count: Count2
  preCount: PreCount
  pitchData?: PitchData
  hitData?: HitData
  index: number
  playId?: string
  pitchNumber?: number
  startTime: string
  endTime: string
  isPitch: boolean
  type: string
  defense?: Defense
  offense?: Offense
  officials?: Official[]
  contextMetrics: ContextMetrics
  player?: Player3
  actionPlayId?: string
  isBaseRunningPlay?: boolean
  homeTeamWinProbability?: number
  awayTeamWinProbability?: number
  homeTeamWinProbabilityAdded?: number
  leverageIndex?: number
  isSubstitution?: boolean
  position?: Position2
}

export interface Details2 {
  call?: Call
  description: string
  code?: string
  ballColor?: string
  trailColor?: string
  isInPlay?: boolean
  isStrike?: boolean
  isBall?: boolean
  type?: Type
  isOut: boolean
  hasReview: boolean
  event?: string
  eventType?: string
  awayScore?: number
  homeScore?: number
  isScoringPlay?: boolean
  runnerGoing?: boolean
  fromCatcher?: boolean
  disengagementNum?: number
  violation?: Violation
}

export interface Call {
  code: string
  description: string
}

export interface Type {
  code: string
  description: string
}

export interface Violation {
  type: string
  description: string
  player: Player2
}

export interface Player2 {
  id: number
  fullName: string
}

export interface Count2 {
  balls: number
  strikes: number
  outs: number
}

export interface PreCount {
  balls: number
  strikes: number
  outs: number
}

export interface PitchData {
  startSpeed: number
  endSpeed: number
  strikeZoneTop: number
  strikeZoneBottom: number
  strikeZoneWidth: number
  strikeZoneDepth: number
  coordinates: Coordinates
  breaks: Breaks
  zone: number
  plateTime: number
  extension: number
}

export interface Coordinates {
  aY: number
  aZ: number
  pfxX: number
  pfxZ: number
  pX: number
  pZ: number
  vX0: number
  vY0: number
  vZ0: number
  x: number
  y: number
  x0: number
  y0: number
  z0: number
  aX: number
}

export interface Breaks {
  breakAngle: number
  spinRate: number
  spinDirection: number
}

export interface HitData {
  launchSpeed?: number
  launchAngle?: number
  totalDistance?: number
  trajectory: string
  hardness: string
  location: string
  coordinates: Coordinates2
}

export interface Coordinates2 {
  coordX: number
  coordY: number
}

export interface Defense {
  pitcher: Pitcher2
  catcher: Catcher
  first: First
  second: Second
  third: Third
  shortstop: Shortstop
  left: Left
  center: Center
  right: Right
}

export interface Pitcher2 {
  id: number
  link: string
  pitchHand: PitchHand2
}

export interface PitchHand2 {
  code: string
  description: string
}

export interface Catcher {
  id: number
  link: string
}

export interface First {
  id: number
  link: string
}

export interface Second {
  id: number
  link: string
}

export interface Third {
  id: number
  link: string
}

export interface Shortstop {
  id: number
  link: string
}

export interface Left {
  id: number
  link: string
}

export interface Center {
  id: number
  link: string
}

export interface Right {
  id: number
  link: string
}

export interface Offense {
  batter: Batter2
  first?: First2
  second?: Second2
  third?: Third2
  batterPosition: BatterPosition
  postOnSecond?: PostOnSecond2
  postOnThird?: PostOnThird2
  postOnFirst?: PostOnFirst2
}

export interface Batter2 {
  id: number
  link: string
  batSide: BatSide2
}

export interface BatSide2 {
  code: string
  description: string
}

export interface First2 {
  id: number
  link: string
}

export interface Second2 {
  id: number
  link: string
}

export interface Third2 {
  id: number
  link: string
}

export interface BatterPosition {
  code: string
  name: string
  type: string
  abbreviation: string
}

export interface PostOnSecond2 {
  id: number
  link: string
}

export interface PostOnThird2 {
  id: number
  link: string
}

export interface PostOnFirst2 {
  id: number
  link: string
}

export interface Official {
  official: Official2
  officialType: string
}

export interface Official2 {
  id: number
  link: string
}

export interface ContextMetrics {}

export interface Player3 {
  id: number
  link: string
}

export interface Position2 {
  code: string
  name: string
  type: string
  abbreviation: string
}

export interface Credit2 {
  player: Player4
  credit: string
}

export interface Player4 {
  id: number
  link: string
}

export interface Flag {
  credit: string
}

export interface ContextMetrics2 {}
