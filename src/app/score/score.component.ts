import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../models/game-data';
import { ScoreService } from './score.service';
import { MediaMatcher } from '@angular/cdk/layout';



@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ScoreComponent implements OnInit {
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us')
  totalLength: any;
  page: number = 1;
  view: string = 'main';

  constructor(private service: ScoreService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.form = new FormGroup({dateToCall: new FormControl(this.getTodaysDate(), [Validators.required])});
   };


  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();
 }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 150000);
  }

  getTheScores(dateToFetch: string | null) {
    const subscription = this.service.getData(dateToFetch).subscribe
      (response => {
        this.page = 1;
        this.data = response;
        this.totalLength = this.data.events.length;
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

  onSubmitClick(){
    this.getTheScores(this.getDateToCall());
  }
  
}

