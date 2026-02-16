import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private service: NorthAmericaService,
    private activatedRoute: ActivatedRoute
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
        this.createAwayBatterArray();
        this.createHomeBatterArray();
        this.createAwayPitcherArray();
        this.createHomePitcherArray();
        subscription.unsubscribe();
      });
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
