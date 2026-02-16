import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameDetailsComponent } from 'src/app/game-details/game-details.component';
import { GameData } from 'src/app/models/game-data';
import { NhlService } from './nhl.service';
import { NHLGameData } from 'src/app/models/hockey/nhl/nhl-game-data';

@Component({
  selector: 'app-nhl',
  templateUrl: './nhl.component.html',
  styleUrls: ['./nhl.component.css'],
})
export class NhlComponent implements OnInit {
  data!: NHLGameData;
  form: FormGroup;
  totalLength: any;
  page: number = 1;
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private service: NhlService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private details: GameDetailsComponent
  ) {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.getTodaysDate(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  getTheScores(dateToFetch: string) {
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        this.totalLength = this.data.games.length;
        subscription.unsubscribe();
      });
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return formatDate(dateForTransform, 'yyyy-MM-dd', 'en-US');
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
