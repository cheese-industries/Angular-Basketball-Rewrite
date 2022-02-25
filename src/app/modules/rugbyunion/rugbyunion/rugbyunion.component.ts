import { DatePipe } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RugbyData } from '../models/rugby-data';
import { RugbyunionService } from './rugbyunion.service';

@Component({
  selector: 'app-rugbyunion',
  templateUrl: './rugbyunion.component.html',
  styleUrls: ['./rugbyunion.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class RugbyunionComponent implements OnInit {
  todayData!: RugbyData;
  pastData!: RugbyData;
  futureData!: RugbyData;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  myControl: FormControl = new FormControl();

  constructor(private service: RugbyunionService) {
    this.form = new FormGroup({
      //      dateToCall: new FormControl(this.getTodaysDate()),
    });
  }

  ngOnInit(): void {
    this.getTheScores();
    this.setIntrvl();
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(), 50000);
  }

  getTheScores() {
    this.getTodayGames();
    this.getPastGames();
    this.getFutureGames();
  }

  getTodayGames() {
    const subscription = this.service
      .getTodayGamesData()
      .subscribe((response) => {
        this.todayData = response;
        subscription.unsubscribe();
      });
  }

  getPastGames() {
    const subscription = this.service
      .getPastGamesData()
      .subscribe((response) => {
        this.pastData = response;
        subscription.unsubscribe();
      });
  }

  getFutureGames() {
    const subscription = this.service
      .getFutureGamesData()
      .subscribe((response) => {
        this.futureData = response;
        subscription.unsubscribe();
        this.getTheDates();
      });
  }

  getTheDates() {
    for (var i = 0; i < 25; i++) {
      this.futureData.Summary[i].gameYear = this.futureData.Summary[
        i
      ].eventDateStart.slice(0, 4);
      this.futureData.Summary[i].gameMonth = this.futureData.Summary[
        i
      ].eventDateStart.slice(5, 7);
      this.futureData.Summary[i].gameDay = this.futureData.Summary[
        i
      ].eventDateStart.slice(8, 10);
      switch (this.futureData.Summary[i].gameMonth) {
        case '01':
          this.futureData.Summary[i].gameMonth = 'January';
          break;
        case '02':
          this.futureData.Summary[i].gameMonth = 'February';
          break;
        case '03':
          this.futureData.Summary[i].gameMonth = 'March';
          break;
        case '04':
          this.futureData.Summary[i].gameMonth = 'April';
          break;
        case '05':
          this.futureData.Summary[i].gameMonth = 'May';
          break;
        case '06':
          this.futureData.Summary[i].gameMonth = 'June';
          break;
        case '07':
          this.futureData.Summary[i].gameMonth = 'July';
          break;
        case '08':
          this.futureData.Summary[i].gameMonth = 'August';
          break;
        case '09':
          this.futureData.Summary[i].gameMonth = 'September';
          break;
        case '10':
          this.futureData.Summary[i].gameMonth = 'October';
          break;
        case '11':
          this.futureData.Summary[i].gameMonth = 'November';
          break;
        case '12':
          this.futureData.Summary[i].gameMonth = 'December';
          break;
      }
      this.futureData.Summary[i].gameDate =
        this.futureData.Summary[i].gameMonth +
        ' ' +
        this.futureData.Summary[i].gameDay +
        ', ' +
        this.futureData.Summary[i].gameYear;
    }
  }
}
