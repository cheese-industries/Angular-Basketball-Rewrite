import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RootObject } from '../../models/boxscore/root-object';
import { NorthAmericaService } from '../../north-america.service';

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class BoxscoreComponent implements OnInit {
  isSmallScreen: boolean = false;
  isSmallForPitchers: boolean = false;
  isSmallForPowerBattingStats: boolean = false;
  awayBattingLeaders: string[] = [];
  homeBattingLeaders: string[] = [];

  constructor(
    private service: NorthAmericaService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  gameId: number = 0;
  data!: RootObject;
  interval!: any;
  awayBatterArray: any[] = [];
  awayPitcherArray: any[] = [];
  homeBatterArray: any[] = [];
  homePitcherArray: any[] = [];

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['id'];
    this.getTheBoxscore(this.gameId);
    this.setIntrvl();

    this.breakpointObserver.observe(['(max-width: 443px)']).subscribe(result => {
      this.isSmallScreen = result.matches;
    });

    this.breakpointObserver.observe(['(max-width: 550px)']).subscribe(result => {
      this.isSmallForPitchers = result.matches;
    });

    this.breakpointObserver.observe(['(max-width: 789px)']).subscribe(result => {
      this.isSmallForPowerBattingStats = result.matches;
      if (this.data) {
        this.createBattingLeadersSummary();
      }
    });
  }

  setIntrvl() {
    this.interval = setInterval(
      () =>{
        this.getTheBoxscore(
          this.gameId)},
      15000
    );
  }


  getTheBoxscore(gameId: number) {
    const subscription = this.service
      .getBoxscore(this.gameId)
      .subscribe((response: any) => {
        this.data = response;
        this.applyAthleticsOverrides();
        this.createAwayBatterArray();
        this.createHomeBatterArray();
        this.createAwayPitcherArray();
        this.createHomePitcherArray();
        this.createBattingLeadersSummary();
        subscription.unsubscribe();
      });
  }

  createBattingLeadersSummary() {
    this.awayBattingLeaders = this.buildBattingLeaderLines(
      this.awayBatterArray,
      this.isSmallForPowerBattingStats
    );
    this.homeBattingLeaders = this.buildBattingLeaderLines(
      this.homeBatterArray,
      this.isSmallForPowerBattingStats
    );
  }

  buildBattingLeaderLines(batters: any[], includePowerStats: boolean): string[] {
    const categories = [
      { label: 'BB', key: 'baseOnBalls' },
      { label: 'SO', key: 'strikeOuts' },
      { label: 'SB', key: 'stolenBases' },
      { label: 'CS', key: 'caughtStealing' },
    ];

    if (includePowerStats) {
      categories.push(
        { label: '2B', key: 'doubles' },
        { label: '3B', key: 'triples' },
        { label: 'HR', key: 'homeRuns' }
      );
    }

    return categories
      .map((category) => this.buildBattingLeaderLine(category.label, category.key, batters))
      .filter((line): line is string => !!line);
  }

  buildBattingLeaderLine(label: string, statKey: string, batters: any[]): string | null {
    const leaders = batters
      .map((batter) => {
        const statValue = Number(batter?.stats?.batting?.[statKey] ?? 0);
        if (statValue <= 0) {
          return null;
        }

        const name = batter?.person?.fullName ?? batter?.person?.boxscoreName ?? '';
        return statValue >= 2 ? `${name} ${statValue}` : name;
      })
      .filter((entry): entry is string => !!entry);

    if (leaders.length === 0) {
      return null;
    }

    return `${label}: ${leaders.join(', ')}`;
  }

  applyAthleticsOverrides() {
    if (!this.shouldUseSacramentoBranding()) {
      return;
    }

    this.applyAthleticsOverrideToTeam(this.data?.teams?.away?.team);
    this.applyAthleticsOverrideToTeam(this.data?.teams?.home?.team);
  }

  shouldUseSacramentoBranding(): boolean {
    const gameYear = this.getBoxscoreYearFromInfo();
    return gameYear === null || gameYear >= 2025;
  }

  getBoxscoreYearFromInfo(): number | null {
    const infoItems = this.data?.info;
    if (!infoItems || infoItems.length === 0) {
      return null;
    }

    const lastInfo = infoItems[infoItems.length - 1] as any;
    const dateText = `${lastInfo?.label ?? ''} ${lastInfo?.value ?? ''}`.trim();
    const yearMatch = dateText.match(/\b(19|20)\d{2}\b/);

    return yearMatch ? Number(yearMatch[0]) : null;
  }

  applyAthleticsOverrideToTeam(team: any) {
    if (!team || +team.id !== 133) {
      return;
    }

    team.abbreviation = 'SAC';
    if (team.name === 'Athletics') {
      team.name = 'Sacramento Athletics';
    }
  }

  createAwayBatterArray() {
    this.awayBatterArray = [];
    let awayBatters = this.data.teams.away.batters;
    for (var i = 0; i < awayBatters.length; i++) {
      let batterID = 'ID' + awayBatters[i];
      this.awayBatterArray[i] = this.data.teams.away.players[batterID];
    }
  }

  createHomeBatterArray() {
    this.homeBatterArray = [];
    let homeBatters = this.data.teams.home.batters;
    for (var i = 0; i < homeBatters.length; i++) {
      let batterID = 'ID' + homeBatters[i];
      this.homeBatterArray[i] = this.data.teams.home.players[batterID];
    }
  }

  createAwayPitcherArray() {
    this.awayPitcherArray = [];
    let awayPitchers = this.data.teams.away.pitchers;
    for (var i = 0; i < awayPitchers.length; i++) {
      let pitcherID = 'ID' + awayPitchers[i];
      this.awayPitcherArray[i] = this.data.teams.away.players[pitcherID];
    }
  }

  createHomePitcherArray() {
    this.homePitcherArray = [];
    let homePitchers = this.data.teams.home.pitchers;
    for (var i = 0; i < homePitchers.length; i++) {
      let pitcherID = 'ID' + homePitchers[i];
      this.homePitcherArray[i] = this.data.teams.home.players[pitcherID];
    }
  }
}
