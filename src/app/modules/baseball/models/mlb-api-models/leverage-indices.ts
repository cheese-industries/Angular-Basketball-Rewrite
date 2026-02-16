    export interface LeverageIndices {
            [key: string]: number | null;
    }

    export interface WinProbabilityInterface {
        situation: number,
        homeScoreDiff: number,
        homeWinProb: number,
        games: number
}