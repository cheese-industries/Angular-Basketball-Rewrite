import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE, formatDate } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../models/game-data';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  dateToAppend: string | null;
  pipe = new DatePipe('en-us')

  constructor(private service: ScoreService) {
    this.form = new FormGroup({dateToCall: new FormControl(this.getTodaysDate(), [Validators.required])});
    this.dateToAppend = '';
   };

  ngOnInit(): void {
    this.getTheScores();
    this.setIntrvl();
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

  handleDateChange() {
    console.log(this.form.get('dateToCall')?.value)
    this.dateToAppend = this.pipe.transform(this.form.get('dateToCall')?.value, 'yyyyMMdd')
    console.log(this.dateToAppend)
  }

}
