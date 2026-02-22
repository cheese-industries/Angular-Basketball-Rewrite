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

@Component({
  selector: 'app-north-america',
  templateUrl: './north-america.component.html',
  styleUrls: ['./north-america.component.css'],
})
export class NorthAmericaComponent implements OnInit {
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
    if (this.everyGame && this.orgNumber) {
      let filteredGames = this.everyGame.dates[0].games.filter(
        (game) =>
          game.teams.away.team.id == this.orgNumber ||
          game.teams.away.team.parentOrgId == this.orgNumber ||
          game.teams.home.team.id == this.orgNumber ||
          game.teams.home.team.parentOrgId == this.orgNumber
      );
      this.everyGame.dates[0].games = filteredGames;
    }
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
          homeRun.homeRunNumber = homeRun.result.description.replace(/\D/g, '');
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
            totalHR: homeRun.result.description.replace(/\D/g, ''),
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
              totalHR: parseInt(player.totalHR)
            };
          } else {
            playerStats[player.boxScoreName].appearances++;
            playerStats[player.boxScoreName].totalHR = Math.max(
              playerStats[player.boxScoreName].totalHR,
              parseInt(player.totalHR)
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

  reloadThePage() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  orgSwitchCase() {
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

    this.orgNumber = null;
    if (this.org !== null) {
      this.orgNumber = orgNumberMap[this.org] || null;
    }
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
    if (team.name === 'Athletics') {
      team.name = 'Sacramento Athletics';
    }
  }
}
