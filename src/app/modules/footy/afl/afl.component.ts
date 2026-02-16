import { Component, OnInit } from '@angular/core';
import { AflService } from './afl.service';
import { AFLDataReturn } from './models/afl-data-return';

@Component({
  selector: 'app-afl',
  templateUrl: './afl.component.html',
  styleUrls: ['./afl.component.css'],
})
export class AflComponent implements OnInit {
  aflData!: AFLDataReturn;
  seasonType: number = 2;
  weekToFetch: number = 1;
  yearToFetch: number = new Date().getFullYear();
  yearsArray: number[] = [];
  interval: any;

  constructor(private service: AflService) {}

  ngOnInit(): void {
    this.makeArrayOfYears();
    this.getDefaultAflData();
    this.setIntrvl();
  }

  setIntrvl() {
    this.interval = setInterval(() => this.getDefaultAflData(), 30000);
  }

  loadNewRound() {
    let x: any[] = [];
    let select = document.querySelectorAll('select');
    select.forEach(function (el, i) {
      x[i] = el.value;
    });
    if (+x[1] > 23) {
      x[2] = 3;
      x[1] = +x[1] - 23;
    } else {
      x[2] = 2;
    }
    if (x[0] != '') {
    this.yearToFetch = x[0];
    } else {
      this.yearToFetch = new Date().getFullYear();
    }
    this.weekToFetch = x[1];
    this.seasonType = x[2];
    clearInterval(this.interval);
    this.loadNewWeek();
  }

  loadNewWeek() {
    const subscription = this.service
      .getUserDefinedAflData(
        this.yearToFetch,
        this.weekToFetch,
        this.seasonType
      )
      .subscribe((response) => {
        this.aflData = response;
        this.addNicknames();
        subscription.unsubscribe;
      });
  }

  makeArrayOfYears() {
    let year = new Date().getFullYear();
    for (var i = year; i > 2017; i--) {
      this.yearsArray.push(i);
    }
  }

  getDefaultAflData() {
    const subscription = this.service
      .getDefaultAflData()
      .subscribe((response) => {
        this.aflData = response;
        this.addNicknames();
        subscription.unsubscribe;
      });
  }

  addNicknames() {
    if (this.aflData) {
      for (var i = 0; i < this.aflData.content.sbData.events.length; i++) {
        for (var j = 0; j < 2; j++) {
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Richmond'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Tigers';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Carlton'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Blues';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Essendon'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Bombers';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Adelaide Crows'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Adelaide';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Crows';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'St Kilda'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Saints';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Brisbane Lions'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Brisbane';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Lions';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Port Adelaide'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Power';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Fremantle'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Dockers';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Gold Coast Suns'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Gold Coast';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Suns';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'North Melbourne'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Kangaroos';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Hawthorn'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Hawks';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Collingwood'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Magpies';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'GWS Giants'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'GWS';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Giants';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Western Bulldogs'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Western';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Bulldogs';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Melbourne'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Demons';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Geelong Cats'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Geelong';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Cats';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'West Coast Eagles'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'West Coast';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Eagles';
          }
          if (
            this.aflData.content.sbData.events[i].competitions[0].competitors[j]
              .team.displayName == 'Sydney Swans'
          ) {
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.displayName = 'Sydney';
            this.aflData.content.sbData.events[i].competitions[0].competitors[
              j
            ].team.nickname = 'Swans';
          }
        }
      }
    }
  }
}
