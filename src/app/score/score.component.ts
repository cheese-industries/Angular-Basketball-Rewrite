import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE, formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../models/game-data';
import { ScoreService } from './score.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ScoreComponent implements OnInit {
  mobileQuery: MediaQueryList;
  mobile: boolean | undefined | void;
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us')
  dateToAppend: string | null = this.pipe.transform(this.getTodaysDate(), 'yyyyMMdd');
  urlToFetch: string = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

  constructor(private service: ScoreService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.form = new FormGroup({dateToCall: new FormControl(this.getTodaysDate(), [Validators.required])});
    this.mobileQuery = media.matchMedia('(max-width: 500px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
   };

   private mobileQueryListener: () => void;

   ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.getTheScores();
    this.setIntrvl();
    this.getTodaysDate();
    this.makeTodaysDateString();
    this.dateToAppend = this.makeTodaysDateString();
    this.getIsMobileScreen();
/*     window.onresize = () => {
      this.mobile = this.getIsMobileScreen();
      location.reload()
    }; */
  }


  
  getIsMobileScreen() {
    console.log(window.window.innerWidth)
    if (window.window.innerWidth < 500) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    console.log(this.mobile);
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(), 30000);
  }

  getTheScores() {
    this.service.getData().subscribe
      (response => {
        let testingThis: GameData = response;
        this.data = response;
      })
      .unsubscribe
  }

  getTodaysDate(): Date {
    return new Date();
  }

  makeTodaysDateString(): string {
    let month: string = String(this.getTodaysDate().getMonth() + 1);
    let day: string = String(this.getTodaysDate().getDate());
    let year: string = String(this.getTodaysDate().getFullYear());
    let dateString : string = year + month + day;
    console.log(dateString)
    console.log("I want to fetch https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=" + dateString)
    return dateString;
    }

  handleDateChange() {
    console.log(this.form.get('dateToCall')?.value)
    this.dateToAppend = this.pipe.transform(this.form.get('dateToCall')?.value, 'yyyyMMdd')
    console.log(this.dateToAppend)
    this.urlToFetch = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=" + this.dateToAppend;  
    console.log('i want to fetch ' + this.urlToFetch)
    this.getTheScores()
  }

}
