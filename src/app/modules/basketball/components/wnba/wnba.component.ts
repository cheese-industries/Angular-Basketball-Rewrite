import { DatePipe, formatDate } from '@angular/common';
import { Component, Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../../../../models/game-data';
import { MediaMatcher } from '@angular/cdk/layout';
import { BasketballService } from '../../basketball.service';

@Component({
  selector: 'app-wnba',
  templateUrl: './wnba.component.html',
  styleUrls: ['./wnba.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class WnbaComponent implements OnInit {
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us')
  totalLength: any;
  page: number = 1;
  view: string = 'main';
  leagueToFetch = 'wnba';




  constructor(
    private service: BasketballService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.getTodaysDate(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();
    this.service.leagueToFetch = this.leagueToFetch;
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  getTheScores(dateToFetch: string) {
    const subscription = this.service
      .getGameData(this.leagueToFetch, dateToFetch, false)
      .subscribe((response) => {
        this.page = 1;
        this.data = response;
        this.totalLength = this.data.events.length;
        subscription.unsubscribe();
      });
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return formatDate(dateForTransform, 'yyyyMMdd', 'en-US');
  }

  makeDefaultDate(): string {
    let month: string = String(this.getTodaysDate().getMonth() + 1);
    let day: string = String(this.getTodaysDate().getDate());
    let year: string = String(this.getTodaysDate().getFullYear());
    if (+day < 10) {
      day = '0' + day;
    }
    if (+month < 10) {
      month = '0' + month;
    }
    let dateString: string = year + month + day;
    return dateString;
  }

  handleDateChange() {
    this.getTheScores(this.getDateToCall());
  }
}
