import { Component, OnInit } from '@angular/core';
import { WtaService } from './wta.service';

@Component({
  selector: 'app-wta',
  templateUrl: './wta.component.html',
  styleUrls: ['./wta.component.css'],
})
export class WtaComponent implements OnInit {
  calendar!: any;
  tournamentNameArray!: string[];
  tournamentStartDatesArray!: number[];
  tournamentEndDatesArray!: number[];
  tournamentInfo!: any;

  constructor(private service: WtaService) {}

  ngOnInit(): void {
    this.getSchedule();
  }
  getSchedule() {
    const subscription = this.service
      .getScheduleObject()
      .subscribe((response) => {
        this.calendar = response;
        this.sortSchedule();
        this.convertDates();
        this.populateScheduleDropdown();
        subscription.unsubscribe();
      });
  }

  sortSchedule() {
    this.calendar.data.sort(function (a: any, b: any) {
      return a.start - b.start;
    });
  }

  convertDates() {
    for (var i = 0; i < this.calendar.data.length; i++) {
      this.calendar.data[i].startForDisplay = new Date(
        this.calendar.data[i].start * 1000
      );
      this.calendar.data[i].startForDisplay =
        this.calendar.data[i].startForDisplay.toLocaleDateString('en-US');
      this.calendar.data[i].endForDisplay = new Date(
        this.calendar.data[i].end * 1000
      );
      this.calendar.data[i].endForDisplay =
        this.calendar.data[i].endForDisplay.toLocaleDateString('en-US');
    }
  }

  onChange(event: any) {
    this.getTournament(this.calendar.data[event.target.value].id);
    setInterval(() => this.getTournament(this.calendar.data[event.target.value].id), 120000);
  }

  convertZeroesToTruthy() {
    for (var i = 0; i < this.tournamentInfo.data.matches.length; i++) {
      if (this.tournamentInfo.data.matches[i].player_one.line_score) {
        for (
          var j = 0;
          j < this.tournamentInfo.data.matches[i].player_one.line_score.length;
          j++
        ) {
          this.tournamentInfo.data.matches[i].player_one.line_score[j] =
            this.tournamentInfo.data.matches[i].player_one.line_score[
              j
            ].toString();
        }
        for (
          var j = 0;
          j < this.tournamentInfo.data.matches[i].player_two.line_score.length;
          j++
        ) {
          this.tournamentInfo.data.matches[i].player_two.line_score[j] =
            this.tournamentInfo.data.matches[i].player_two.line_score[
              j
            ].toString();
        }
      }
    }
  }

  getMatchStartTimes() {
    let currentTime = Math.floor(new Date().getTime() / 1000.0);
    for (var i = 0; i < this.tournamentInfo.data.matches.length; i++) {
      if (this.tournamentInfo.data.matches[i].start > currentTime) {
        this.tournamentInfo.data.matches[i].startForDisplay =
          new Date(
            this.tournamentInfo.data.matches[i].start * 1000
          ).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'});
      } else {
        this.tournamentInfo.data.matches[i].startForDisplay = '';
      }
    }
  }

  getTournament(id: number) {
    const subscription = this.service
      .getIndividualEvent(id)
      .subscribe((response) => {
        console.log(response);
        this.tournamentInfo = response;
        this.convertZeroesToTruthy();
        this.getMatchStartTimes();
        subscription.unsubscribe();
      });
  }

  populateScheduleDropdown(): void {
    this.tournamentNameArray = [];
    this.tournamentEndDatesArray = [];
    this.tournamentStartDatesArray = [];
    for (var i = 0; i < this.calendar.data.length; i++) {
      this.tournamentNameArray.push(this.calendar.data[i].name);
      this.tournamentStartDatesArray.push(
        this.calendar.data[i].startForDisplay
      );
      this.tournamentEndDatesArray.push(this.calendar.data[i].endForDisplay);
    }
    let tournament = document.getElementById('tournament');
    for (var i = 0; i < this.tournamentNameArray.length; i++) {
      var option = document.createElement('option');
      var txt = document.createTextNode(
        this.tournamentNameArray[i] +
          ', ' +
          this.tournamentStartDatesArray[i] +
          ' - ' +
          this.tournamentEndDatesArray[i]
      );
      option.appendChild(txt);
      option.setAttribute('value', i.toString());
      tournament?.insertBefore(option, tournament.lastChild);
    }
  }
}
