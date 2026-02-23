import { Component, OnInit } from '@angular/core';
import { NorthAmericaService } from '../../north-america.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mlbApiReturn } from '../../models/mlb-api-models/mlb-api-return';
import { WinProb } from '../../models/baseball-pbp/win-prob';
import { firstValueFrom } from 'rxjs';
import { WeatherAPIReturn } from 'src/app/models/weather-api-return';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrgNumbers } from '../../models/mlb-api-models/org-numbers';
import { DateTime } from 'luxon';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

type CardOrderEntry = {
  order: number[];
  expiresAt: string;
  updatedAt: string;
};

@Component({
  selector: 'app-north-america',
  templateUrl: './north-america.component.html',
  styleUrls: ['./north-america.component.css'],
})
export class NorthAmericaComponent implements OnInit {
  private readonly favoritesStorageKey: string = 'favoriteBaseballTeamIdsV2';
  private readonly favoriteLabelsStorageKey: string =
    'favoriteBaseballTeamLabelsV1';
  private readonly favoriteHelpDismissedStorageKey: string =
    'favoriteBaseballHelpDismissedV1';
  private readonly cardOrderStorageKey: string =
    'baseballCardOrderSlatesV1';
  private readonly cardOrderRetentionLimit: number = 45;
  showOneOrganization: boolean = false;
  filteredGames!: any[];
  liveGamesNow!: any[];
  liveGamesOnly: boolean = false;
  orgToFetch!: number;
  todaysDate!: Date;
  todayGamesFlag: boolean = true;
  todaysDateArray!: any[];
  baseballDataArray!: any[];
  weather!: WeatherAPIReturn;
  everyGame?: mlbApiReturn;
  everyGameForMLBToggle?: mlbApiReturn;
  everyGameForAAAToggle?: mlbApiReturn;
  everyGameForAAToggle?: mlbApiReturn;
  everyGameForHighAToggle?: mlbApiReturn;
  everyGameForLowAToggle?: mlbApiReturn;
  everyGameForLiveOnlyToggle?: mlbApiReturn;
  everyGameWithWeather?: mlbApiReturn;
  everyGameAfterFilters?: any[];
  everyGameGamePks?: number[] | string[];
  mlbGamePks?: number[] | string[];
  aaaGamePks?: number[] | string[];
  aaGamePks?: number[] | string[];
  highAGamePks?: number[] | string[];
  lowAGamePks?: number[] | string[];
  mlbData?: mlbApiReturn;
  aaaData?: mlbApiReturn;
  aaData?: mlbApiReturn;
  lowAData?: mlbApiReturn;
  highAData?: mlbApiReturn;
  rookieData?: mlbApiReturn;
  pbpData!: WinProb[];
  pbpDataArray: any[] = [];
  lastPlayArray: any[] = [];
  lastPlay: string = '';
  stringifiedPbpData?: string;
  JSONifiedPbpData?: any;
  yearNum!: number;
  monthNumBeforeSlice!: string;
  monthNum!: string;
  dayNum!: number;
  defaultDate!: string;
  form!: FormGroup;
  data!: mlbApiReturn;
  interval: any;
  weatherInterval: any;
  org: string | null;
  orgNumber!: number | null;
  mlbIsChecked: boolean = true;
  aaaIsChecked: boolean = true;
  aaIsChecked: boolean = true;
  highAIsChecked: boolean = true;
  lowAIsChecked: boolean = true;
  liveOnlyIsChecked: boolean = false;
  sortByStartTimeIsChecked: boolean = false;
  filterByOrg: boolean = false;
  filterByLevel: boolean = false;
  hasOrgFilter: boolean = false;
  initialState: boolean = true;
  showFavoriteHelp: boolean = true;
  favoriteTeamIds: number[] = [];
  favoriteTeamLabels: Record<number, string> = {};
  cardOrderBySlate: Record<string, CardOrderEntry> = {};

  orgOptions: any[] = [
    { value: '', label: 'Show all scores' },
    { value: 'ARI', label: 'Arizona Diamondbacks' },
    { value: 'ATL', label: 'Atlanta Braves' },
    { value: 'BAL', label: 'Baltimore Orioles' },
    { value: 'BOS', label: 'Boston Red Sox' },
    { value: 'CHW', label: 'Chicago White Sox' },
    { value: 'CHC', label: 'Chicago Cubs' },
    { value: 'CIN', label: 'Cincinnati Reds' },
    { value: 'CLE', label: 'Cleveland Guardians' },
    { value: 'COL', label: 'Colorado Rockies' },
    { value: 'DET', label: 'Detroit Tigers' },
    { value: 'HOU', label: 'Houston Astros' },
    { value: 'KC', label: 'Kansas City Royals' },
    { value: 'LAA', label: 'Los Angeles Angels' },
    { value: 'LAD', label: 'Los Angeles Dodgers' },
    { value: 'MIA', label: 'Miami Marlins' },
    { value: 'MIL', label: 'Milwaukee Brewers' },
    { value: 'MIN', label: 'Minnesota Twins' },
    { value: 'NYY', label: 'New York Yankees' },
    { value: 'NYM', label: 'New York Mets' },
    { value: 'SAC', label: 'Sacramento Athletics' },
    { value: 'PHI', label: 'Philadelphia Phillies' },
    { value: 'PIT', label: 'Pittsburgh Pirates' },
    { value: 'SD', label: 'San Diego Padres' },
    { value: 'SF', label: 'San Francisco Giants' },
    { value: 'SEA', label: 'Seattle Mariners' },
    { value: 'STL', label: 'St. Louis Cardinals' },
    { value: 'TB', label: 'Tampa Bay Rays' },
    { value: 'TEX', label: 'Texas Rangers' },
    { value: 'TOR', label: 'Toronto Blue Jays' },
    { value: 'WAS', label: 'Washington Nationals' },
  ];

  levelOptions: any[] = [
    { value: 'MLB', label: 'MLB' },
    { value: 'AAA', label: 'Triple A' },
    { value: 'AA', label: 'Double A' },
    { value: 'HighA', label: 'High A' },
    { value: 'LowA', label: 'Low A' },
  ];

  constructor(
    private service: NorthAmericaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.org = this.route.snapshot.queryParamMap.get('org');
    if (this.org && this.org?.length > 0) {
      this.hasOrgFilter = true;
    }
  }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.setTodayDate(), [Validators.required]),
    });
    this.loadCardOrderState();
    this.loadFavoriteHelpPreference();
    this.loadFavoriteTeams();
    this.route.queryParamMap.subscribe((data: ParamMap) => {
      this.org = data.get('org');
      this.hasOrgFilter = !!(this.org && this.org.length > 0);
      this.orgSwitchCase();

      this.getTheScores(
        this.getYearToCall(),
        this.getMonthToCall(),
        this.getDayToCall()
      );
    });

    this.setTodayDate();
    this.getTheScores(
      this.todaysDateArray[0],
      this.todaysDateArray[1],
      this.todaysDateArray[2]
    );
    await this.getTheWeather();
    this.setIntrvl();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearInterval(this.weatherInterval);
  }

  setIntrvl() {
    this.interval = setInterval(() => {
      this.getTheScores(
        this.getYearToCall(),
        this.getMonthToCall(),
        this.getDayToCall()
      );
      this.applyFilters();
    }, 30000);
  }

  setTodayDate() {
    const date = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' })
    );
    this.todaysDateArray = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ];
  }

  async getTheWeather() {
    let response = await firstValueFrom(this.service.getWeather());
    if (this.everyGame) {
      for (var i = 0; i < this.everyGame.dates[0].games.length; i++) {
        this.everyGame.dates[0].games[i].weather =
          response[this.everyGame.dates[0].games[i].gamePk];
      }
    }
  }

  async getEveryGameOnEveryLevel(
    year: number,
    month: number,
    day: number
  ): Promise<void> {
    let levelsToCall = '';
    if (Boolean(this.mlbIsChecked) == true) {
      levelsToCall += '1,';
    }
    if (Boolean(this.aaaIsChecked) == true) {
      levelsToCall += '11,';
    }
    if (Boolean(this.aaIsChecked) == true) {
      levelsToCall += '12,';
    }
    if (Boolean(this.highAIsChecked) == true) {
      levelsToCall += '13,';
    }
    if (Boolean(this.lowAIsChecked) == true) {
      levelsToCall += '14';
    }
    let response = await firstValueFrom(
      this.service.getEveryGameOnEveryLevel(
        this.getYearToCall(),
        this.getMonthToCall(),
        this.getDayToCall(),
        levelsToCall
      )
    );
    if (this.liveOnlyIsChecked) {
      let liveOnlyGames = response.dates[0].games;
      liveOnlyGames = liveOnlyGames.filter(
        (game) => game.gameUtils.isLive == true
      );
      response.dates[0].games = liveOnlyGames;
    }
    let games = response.dates[0].games;
    games.sort(
      (a, b) => a.teams.away.team.sport.id - b.teams.away.team.sport.id
    );
    response.dates[0].games = games;
    if (this.sortByStartTimeIsChecked) {
      let sortedByStartTime = response.dates[0].games;
      sortedByStartTime.map(
        (game) => (game.dateTime = new Date(game.gameDate))
      );
      sortedByStartTime.sort(
        (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
      );
      games = sortedByStartTime;
    }

    games.forEach((game) => this.applyAthleticsOverridesToGame(game));

    this.everyGame = { ...response, dates: [{ ...response.dates[0], games }] };

    this.hydrateFavoriteTeamLabelsFromGames();

    this.applyFilters();

    await Promise.all([
      this.makeTheHomeRunObjects(),
      this.makeMobileHRObject(),
      this.makeTheBroadcastDivs(),
      this.calculateSlg(),
      this.getLastPlay(),
      this.getTheWeather(),
    ]);
  }

  applyFilters() {
    if (!this.everyGame) {
      return;
    }

    let filteredGames = [...this.everyGame.dates[0].games];
    if (this.orgNumber) {
      filteredGames = filteredGames.filter(
        (game) =>
          game.teams.away.team.id == this.orgNumber ||
          game.teams.away.team.parentOrgId == this.orgNumber ||
          game.teams.home.team.id == this.orgNumber ||
          game.teams.home.team.parentOrgId == this.orgNumber
      );
    }

    const gamesSortedByFavorites = this.sortGamesWithFavoritesFirst(
      filteredGames
    );

    this.everyGame.dates[0].games = this.applySavedCardOrder(
      gamesSortedByFavorites
    );
  }

  canMoveGameCard(index: number, direction: number): boolean {
    if (!this.everyGame?.dates?.[0]?.games) {
      return false;
    }

    const newIndex = index + direction;
    return newIndex >= 0 && newIndex < this.everyGame.dates[0].games.length;
  }

  moveGameCard(index: number, direction: number, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (!this.everyGame?.dates?.[0]?.games) {
      return;
    }

    const newIndex = index + direction;
    if (!this.canMoveGameCard(index, direction)) {
      return;
    }

    const games = [...this.everyGame.dates[0].games];
    const [movedGame] = games.splice(index, 1);
    games.splice(newIndex, 0, movedGame);
    this.everyGame.dates[0].games = games;
    this.saveCurrentSlateCardOrder(games);
  }

  onGameCardDrop(event: CdkDragDrop<any[]>) {
    if (!this.everyGame?.dates?.[0]?.games) {
      return;
    }

    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const games = [...this.everyGame.dates[0].games];
    moveItemInArray(games, event.previousIndex, event.currentIndex);
    this.everyGame.dates[0].games = games;
    this.saveCurrentSlateCardOrder(games);
  }

  onSliderChange() {
    this.getTheScores(
      this.getYearToCall(),
      this.getMonthToCall(),
      this.getDayToCall()
    );
  }

  getTheScores(yearToFetch: string, monthToFetch: string, dayToFetch: string) {
    this.getEveryGameOnEveryLevel(+yearToFetch, +monthToFetch, +dayToFetch);
  }

  async getLastPlay() {
    if (!this.everyGame) return;
    for (let i = 0; i < this.everyGame.dates[0].games.length; i++) {
      const game = this.everyGame.dates[0].games[i];
      if (!game.gameUtils.isLive) {
        this.pbpDataArray[i] = '';
        continue;
      }
      const response = await firstValueFrom(
        this.service.getPBPData(game.gamePk)
      );
      const lastPlayIndex = response.length - 1;
      const lastPlay = response[lastPlayIndex].result.description
        ? response[lastPlayIndex]
        : response[lastPlayIndex - 1];
      this.everyGame.dates[0].games[i].lastPlay = lastPlay.result.description;
      this.everyGame.dates[0].games[i].leverageIndex = lastPlay.leverageIndex;
      this.everyGame.dates[0].games[i].homeWinProb =
        Math.round(lastPlay.homeTeamWinProbability * 10) / 10;
    }
  }

  makeTheBroadcastDivs() {
    if (!this.everyGame) return;
    this.everyGame.dates[0].games.forEach((game) => {
      game.homeTVArray =
        game.broadcasts
          ?.filter((b) => b.type === 'TV' && b.homeAway === 'home')
          .map((b) => b.name) || [];
      game.awayTVArray =
        game.broadcasts
          ?.filter((b) => b.type === 'TV' && b.homeAway === 'away')
          .map((b) => b.name) || [];
      game.homeTVDiv =
        game.homeTVArray.length > 0
          ? `${game.teams.home.team.abbreviation} TV: ${game.homeTVArray.join(
              ', '
            )}`
          : '';
      game.awayTVDiv =
        game.awayTVArray.length > 0
          ? `${game.teams.away.team.abbreviation} TV: ${game.awayTVArray.join(
              ', '
            )}`
          : '';
    });
  }

  calculateSlg() {
    if (!this.everyGame) {
      return;
    }

    const { games } = this.everyGame.dates[0];

    games.forEach((game) => {
      ['offense.batter', 'offense.onDeck', 'offense.inHole'].forEach(
        (position) => {
          const player = game.linescore.position;
          if (player && +player.stats[2].stats.atBats > 0) {
            const slg = (
              (player.stats[2].stats.hits +
                player.stats[2].stats.doubles * 2 +
                player.stats[2].stats.triples * 3 +
                player.stats[2].stats.homeRuns * 4) /
              player.stats[2].stats.atBats
            ).toFixed(3);
            player.stats[2].stats.slg = slg[0] === '0' ? slg.substring(1) : slg;
          } else if (player) {
            player.stats[2].stats.slg = '.000';
          }
        }
      );
    });
  }

  makeTheHomeRunObjects() {
    if (!this.everyGame) {
      return;
    }

    this.everyGame.dates[0].games.forEach((game) => {
      if (game.homeRuns && game.homeRuns.length > 0) {
        game.homeRuns.forEach((homeRun) => {
          const inning = homeRun.about.inning;
          const halfInning = homeRun.about.halfInning;
          const batterTeam =
            halfInning === 'bottom'
              ? game.teams.home.team.abbreviation
              : game.teams.away.team.abbreviation;
          let ordinalInning;

          if (inning % 10 === 1 && inning !== 11) {
            ordinalInning = `${inning}st Inning`;
          } else if (inning % 10 === 2 && inning !== 12) {
            ordinalInning = `${inning}nd Inning`;
          } else if (inning % 10 === 3 && inning !== 13) {
            ordinalInning = `${inning}rd Inning`;
          } else {
            ordinalInning = `${inning}th Inning`;
          }

          homeRun.matchup.batterTeam = batterTeam;
          homeRun.matchup.ordinalInning = ordinalInning;
          homeRun.homeRunNumber = this.extractHomeRunSeasonTotal(
            homeRun.result.description
          );
        });
      }
    });
  }

  makeMobileHRObject() {
    if (!this.everyGame) {
      return;
    }

    this.everyGame.dates[0].games.forEach((game) => {
      let mobileHRList = '';
      let homers: any[] = [];
      if (!game.homeRuns || (game.homeRuns && game.homeRuns.length == 0)){
        mobileHRList = 'None'
      }
      if (game.homeRuns && game.homeRuns.length > 0) {
        game.homeRuns.forEach((homeRun) => {
          let homerObject = {
            name: homeRun.matchup.batter.fullName,
            team: homeRun.about.halfInning === 'bottom'
            ? game.teams.home.team.abbreviation
            : game.teams.away.team.abbreviation,
            boxScoreName: homeRun.matchup.batter.boxscoreName,
            totalHR: this.extractHomeRunSeasonTotal(homeRun.result.description),
          };
          homers.push(homerObject);
        });
        const playerStats: Record<string, {name: string, team: string, appearances: number, totalHR: number}> = {};

        for (const player of homers) {
          if (!(player.boxScoreName in playerStats)) {
            playerStats[player.boxScoreName] = {
              name: player.name,
              team: player.team,
              appearances: 1,
              totalHR: parseInt(player.totalHR || '0', 10)
            };
          } else {
            playerStats[player.boxScoreName].appearances++;
            playerStats[player.boxScoreName].totalHR = Math.max(
              playerStats[player.boxScoreName].totalHR,
              parseInt(player.totalHR || '0', 10)
            );
          }
        }
        
        for (const [playerName, stats] of Object.entries(playerStats)) {
          if (stats.appearances === 1) {
            mobileHRList += `${playerName} ${stats.team} (${stats.totalHR}), `
          } else {
            mobileHRList += `${playerName} ${stats.team} ${stats.appearances} (${stats.totalHR}), `;
          }
        }        
      }
      if (mobileHRList.endsWith(", ")) {
        mobileHRList = mobileHRList.slice(0, -2); // remove the last two characters
      }
      game.mobileHomeRunList = mobileHRList;
    });
  }

  private extractHomeRunSeasonTotal(description: string): string {
    return description?.match(/\((\d+)\)/)?.[1] || '';
  }

  getYearToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return dateForTransform.getFullYear().toString();
  }

  getMonthToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    let monthToPass = dateForTransform.getMonth() + 1;
    let monthString;
    if (monthToPass < 10) {
      monthString = '0' + monthToPass;
    } else {
      monthString = monthToPass.toString();
    }
    return monthString;
  }

  getDayToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return dateForTransform.getDate().toString();
  }

  handleDateChange() {
    this.getTheScores(
      this.getYearToCall(),
      this.getMonthToCall(),
      this.getDayToCall()
    );
  }

  addOrgFilter(event: any) {
    this.org = event.target.value;
    this.hasOrgFilter = !!(this.org && this.org.length > 0);
    this.orgSwitchCase();
    this.router.navigate(['/'], {
      queryParams: { org: this.org || null },
      queryParamsHandling: 'merge',
    });
    this.applyFilters();
  }

  addFavoriteTeam(event: any) {
    const teamId = +(event.target?.value as string);
    if (!Number.isFinite(teamId)) {
      return;
    }

    this.addFavoriteTeamById(teamId);
    event.target.value = '';
  }

  removeFavoriteTeam(teamId: number) {
    this.favoriteTeamIds = this.favoriteTeamIds.filter((id) => id !== teamId);
    this.saveFavoriteTeams();
    this.applyFilters();
  }

  isFavoriteTeam(teamId: number): boolean {
    return this.favoriteTeamIds.includes(+teamId);
  }

  toggleFavoriteTeam(team: any, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    const teamId = +team?.id;
    if (!Number.isFinite(teamId)) {
      return;
    }

    if (this.isFavoriteTeam(teamId)) {
      this.removeFavoriteTeam(teamId);
      return;
    }

    this.addFavoriteTeamById(teamId, this.getTeamLabel(team));
  }

  dismissFavoriteHelp() {
    this.showFavoriteHelp = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.favoriteHelpDismissedStorageKey, 'true');
    }
  }

  getAvailableFavoriteTeamOptions() {
    if (!this.everyGame?.dates?.[0]?.games) {
      return [];
    }

    const optionMap = new Map<number, { teamId: number; label: string }>();
    this.everyGame.dates[0].games.forEach((game) => {
      [game?.teams?.away?.team, game?.teams?.home?.team].forEach((team) => {
        const teamId = +team?.id;
        if (!Number.isFinite(teamId)) {
          return;
        }
        const label = this.getTeamLabel(team);
        optionMap.set(teamId, { teamId, label });
      });
    });

    return Array.from(optionMap.values())
      .filter((option) => !this.favoriteTeamIds.includes(option.teamId))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  getFavoriteTeamLabel(teamId: number): string {
    return this.favoriteTeamLabels[teamId] || `Team ${teamId}`;
  }

  private loadFavoriteTeams() {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(this.favoritesStorageKey);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        this.favoriteTeamIds = parsed
          .map((value) => +value)
          .filter((value) => Number.isFinite(value));
      }
    } catch {
      this.favoriteTeamIds = [];
    }

    const storedLabels = window.localStorage.getItem(
      this.favoriteLabelsStorageKey
    );
    if (!storedLabels) {
      return;
    }

    try {
      const parsedLabels = JSON.parse(storedLabels);
      if (parsedLabels && typeof parsedLabels === 'object') {
        this.favoriteTeamLabels = parsedLabels;
      }
    } catch {
      this.favoriteTeamLabels = {};
    }
  }

  private saveFavoriteTeams() {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(
      this.favoritesStorageKey,
      JSON.stringify(this.favoriteTeamIds)
    );
    window.localStorage.setItem(
      this.favoriteLabelsStorageKey,
      JSON.stringify(this.favoriteTeamLabels)
    );
  }

  private loadFavoriteHelpPreference() {
    if (typeof window === 'undefined') {
      return;
    }

    this.showFavoriteHelp =
      window.localStorage.getItem(this.favoriteHelpDismissedStorageKey) !==
      'true';
  }

  private loadCardOrderState() {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(this.cardOrderStorageKey);
    if (!stored) {
      this.cardOrderBySlate = {};
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      this.cardOrderBySlate = parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      this.cardOrderBySlate = {};
    }

    this.cleanAndPersistCardOrderState();
  }

  private saveCurrentSlateCardOrder(games: any[]) {
    const slateId = this.getCurrentOrderSlateId();
    if (!slateId) {
      return;
    }

    const order = games
      .map((game) => +game?.gamePk)
      .filter((gamePk) => Number.isFinite(gamePk));

    this.cardOrderBySlate[slateId] = {
      order,
      expiresAt: this.getCurrentSlateExpiry(),
      updatedAt: DateTime.now().toISO() || '',
    };
    this.cleanAndPersistCardOrderState();
  }

  private applySavedCardOrder(games: any[]) {
    const slateId = this.getCurrentOrderSlateId();
    const slateOrder = slateId ? this.cardOrderBySlate[slateId] : null;
    if (!slateOrder?.order || slateOrder.order.length === 0) {
      return games;
    }

    const positionByGamePk = new Map<number, number>();
    slateOrder.order.forEach((gamePk, index) => {
      positionByGamePk.set(+gamePk, index);
    });

    const originalPosition = new Map<number, number>();
    games.forEach((game, index) => {
      originalPosition.set(+game?.gamePk, index);
    });

    return [...games].sort((a, b) => {
      const aGamePk = +a?.gamePk;
      const bGamePk = +b?.gamePk;
      const aPosition = positionByGamePk.get(aGamePk);
      const bPosition = positionByGamePk.get(bGamePk);

      if (aPosition !== undefined && bPosition !== undefined) {
        return aPosition - bPosition;
      }
      if (aPosition !== undefined) {
        return -1;
      }
      if (bPosition !== undefined) {
        return 1;
      }

      return (
        (originalPosition.get(aGamePk) ?? Number.MAX_SAFE_INTEGER) -
        (originalPosition.get(bGamePk) ?? Number.MAX_SAFE_INTEGER)
      );
    });
  }

  private getCurrentOrderSlateId(): string {
    const selectedDate = this.getSelectedDateKey();
    const levelState = [
      +this.mlbIsChecked,
      +this.aaaIsChecked,
      +this.aaIsChecked,
      +this.highAIsChecked,
      +this.lowAIsChecked,
    ].join('');
    const liveState = this.liveOnlyIsChecked ? '1' : '0';
    const startTimeState = this.sortByStartTimeIsChecked ? '1' : '0';
    const orgState = this.org || 'all';
    return `${selectedDate}|org:${orgState}|lvl:${levelState}|live:${liveState}|stime:${startTimeState}`;
  }

  private getSelectedDateKey(): string {
    const selectedDate =
      (this.form?.get('dateToCall')?.value as Date) ?? new Date();
    return DateTime.fromJSDate(selectedDate).toFormat('yyyy-LL-dd');
  }

  private getCurrentSlateExpiry(): string {
    const selectedDate =
      (this.form?.get('dateToCall')?.value as Date) ?? new Date();

    const selectedDateInEt = DateTime.fromJSDate(selectedDate).setZone(
      'America/New_York'
    );

    return (
      selectedDateInEt
        .plus({ days: 1 })
        .startOf('day')
        .plus({ hours: 10 })
        .toUTC()
        .toISO() || ''
    );
  }

  private cleanAndPersistCardOrderState() {
    const now = DateTime.now();

    const validEntries = Object.entries(this.cardOrderBySlate).filter(
      ([, entry]) => {
        if (!entry || !Array.isArray(entry.order) || !entry.expiresAt) {
          return false;
        }

        const expiresAt = DateTime.fromISO(entry.expiresAt);
        return expiresAt.isValid && expiresAt > now;
      }
    );

    validEntries.sort((a, b) => {
      const aUpdated = DateTime.fromISO(a[1]?.updatedAt || '').toMillis() || 0;
      const bUpdated = DateTime.fromISO(b[1]?.updatedAt || '').toMillis() || 0;
      return bUpdated - aUpdated;
    });

    this.cardOrderBySlate = Object.fromEntries(
      validEntries.slice(0, this.cardOrderRetentionLimit)
    );

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        this.cardOrderStorageKey,
        JSON.stringify(this.cardOrderBySlate)
      );
    }
  }

  private addFavoriteTeamById(teamId: number, label?: string) {
    if (this.favoriteTeamIds.includes(teamId)) {
      return;
    }

    this.favoriteTeamIds = [...this.favoriteTeamIds, teamId];
    if (label) {
      this.favoriteTeamLabels[teamId] = label;
    } else {
      this.hydrateFavoriteTeamLabelsFromGames();
    }
    this.saveFavoriteTeams();
    this.applyFilters();
  }

  private sortGamesWithFavoritesFirst(games: any[]) {
    if (!this.favoriteTeamIds || this.favoriteTeamIds.length === 0) {
      return games;
    }

    return [...games].sort((a, b) => {
      const aFavorite = this.isFavoriteGame(a) ? 1 : 0;
      const bFavorite = this.isFavoriteGame(b) ? 1 : 0;
      return bFavorite - aFavorite;
    });
  }

  private isFavoriteGame(game: any): boolean {
    const favoriteSet = new Set(this.favoriteTeamIds);
    const awayTeam = game?.teams?.away?.team;
    const homeTeam = game?.teams?.home?.team;

    return favoriteSet.has(+awayTeam?.id) || favoriteSet.has(+homeTeam?.id);
  }

  private hydrateFavoriteTeamLabelsFromGames() {
    if (!this.everyGame?.dates?.[0]?.games) {
      return;
    }

    this.everyGame.dates[0].games.forEach((game) => {
      [game?.teams?.away?.team, game?.teams?.home?.team].forEach((team) => {
        const teamId = +team?.id;
        if (!Number.isFinite(teamId)) {
          return;
        }
        this.favoriteTeamLabels[teamId] = this.getTeamLabel(team);
      });
    });
  }

  getTeamLabel(team: any): string {
    if (team?.name) {
      return team.name;
    }
    return (
      team?.shortName ||
      team?.name ||
      team?.clubName ||
      team?.abbreviation ||
      `Team ${team?.id}`
    );
  }

  reloadThePage() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  orgSwitchCase() {
    this.orgNumber = null;
    if (this.org !== null) {
      this.orgNumber = this.getOrgNumberByCode(this.org);
    }
  }

  private getOrgNumberByCode(code: string | null): number | null {
    if (!code) {
      return null;
    }

    const orgNumberMap: OrgNumbers = {
      LAA: 108,
      ARI: 109,
      AZ: 109,
      ARZ: 109,
      BAL: 110,
      BOS: 111,
      CHC: 112,
      CHN: 112,
      CIN: 113,
      CLE: 114,
      COL: 115,
      DET: 116,
      HOU: 117,
      KC: 118,
      KCR: 118,
      KCA: 118,
      LAD: 119,
      LAN: 119,
      WSH: 120,
      WAS: 120,
      NYM: 121,
      NYN: 121,
      OAK: 133,
      ATH: 133,
      SAC: 133,
      PIT: 134,
      SDP: 135,
      SDN: 135,
      SD: 135,
      SDG: 135,
      SEA: 136,
      SF: 137,
      SFG: 137,
      SFN: 137,
      SFR: 137,
      STL: 138,
      SL: 138,
      SLC: 138,
      SLN: 138,
      TBR: 139,
      TAM: 139,
      TB: 139,
      TBA: 139,
      TEX: 140,
      TOR: 141,
      MIN: 142,
      PHI: 143,
      ATL: 144,
      CHA: 145,
      CHW: 145,
      MIA: 146,
      NYA: 147,
      NYY: 147,
      MIL: 158,
    };

    return orgNumberMap[code] || null;
  }

  applyAthleticsOverridesToGame(game: any) {
    if (!this.shouldUseSacramentoBranding(game)) {
      return;
    }

    this.applyAthleticsOverridesToTeam(game?.teams?.away?.team);
    this.applyAthleticsOverridesToTeam(game?.teams?.home?.team);
  }

  shouldUseSacramentoBranding(game: any): boolean {
    const gameYear = game?.gameDate ? new Date(game.gameDate).getFullYear() : null;
    return gameYear === null || gameYear >= 2025;
  }

  applyAthleticsOverridesToTeam(team: any) {
    if (!team || +team.id !== 133) {
      return;
    }

    team.abbreviation = 'SAC';
    team.shortName = 'Sacramento';
    team.teamName = 'Sacramento';
    team.locationName = 'Sacramento';
    if (team.name === 'Athletics') {
      team.name = 'Sacramento Athletics';
    }
  }
}
