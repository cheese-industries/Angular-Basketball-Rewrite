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
  
  constructor(private service: ScoreService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.form = new FormGroup({dateToCall: new FormControl(this.getTodaysDate(), [Validators.required])});
    this.mobileQuery = media.matchMedia('(max-width: 556px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
   };


   private mobileQueryListener: () => void;

   ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();
    this.getIsMobileScreen();
 }

  
  getIsMobileScreen() {
    if (window.window.innerWidth < 556) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  getTheScores(dateToFetch: string | null) {
    const subscription = this.service.getData(dateToFetch).subscribe
      (response => {
        let testingThis: GameData = response;
        console.log(testingThis)
        this.data = response;
        subscription.unsubscribe();
      })
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall() {
    return this.pipe.transform(this.form.get('dateToCall')?.value, 'yyyyMMdd');
  }

   makeDefaultDate(): string {
    let month: string = String(this.getTodaysDate().getMonth() + 1);
    let day: string = String(this.getTodaysDate().getDate());
    let year: string = String(this.getTodaysDate().getFullYear());
    let dateString: string = year + month + day;
    return dateString;
  }
 
  handleDateChange() {
    console.log(this.form.get('dateToCall')?.value)
    this.getTheScores(this.getDateToCall())
  }

}