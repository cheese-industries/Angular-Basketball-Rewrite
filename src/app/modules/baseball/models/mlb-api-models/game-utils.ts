export interface GameUtils {
    isAllStar: boolean;
    isCancelled: boolean;
    isClassicDoubleHeader: boolean;
    isCompletedEarly: boolean;
    isDelayed: boolean;
    isDoubleHeader: boolean;
    isNonDoubleHeaderTBD: boolean;
    isExhibition: boolean;
    isFinal: boolean;
    isForfeit: boolean;
    isFreeGame: boolean;
    isInstantReplay: boolean;
    isLive: boolean;
    isManagerChallenge: boolean;
    isNoHitter: boolean;
    isPerfectGame: boolean;
    isPostponed: boolean;
    isPreview: boolean;
    isSplitTicketDoubleHeader: boolean;
    isSpring: boolean;
    isSuspended: boolean;
    isSuspendedOnDate: boolean;
    isSuspendedResumptionOnDate: boolean;
    isTBD: boolean;
    isUmpireReview: boolean;
    isWarmup: boolean;
    isPostSeason: boolean;
    isTieBreaker: boolean;
    isPostSeasonReady: boolean;
    isWildCard: boolean;
    isDivisionSeries: boolean;
    isChampionshipSeries: boolean;
    isWorldSeries: boolean;
    isPreGameDelay: boolean;
    isInGameDelay: boolean;
    hasContextTeam: boolean;
    hasFavorites: boolean;
    hasMostFavorite: boolean;
    hasFollowed: boolean;
}