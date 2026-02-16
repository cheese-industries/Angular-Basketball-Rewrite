import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PgaData } from '../../models/pga-data';
import { ChampionsTourService } from './champions-tour.service';

@Component({
  selector: 'app-champions-tour',
  templateUrl: './champions-tour.component.html',
  styleUrls: ['./champions-tour.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ChampionsTourComponent implements OnInit {
  data!: PgaData;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  myControl: FormControl = new FormControl();
  constructor( private service: ChampionsTourService) { 
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
    const subscription = this.service.getGameData().subscribe((response) => {
      this.data = response;
      this.sortTheGolfers();
      subscription.unsubscribe();
    });
  }

 compare(a: any, b: any) {
    let playerA = a.sortOrder;
    let playerB = b.sortOrder;
    if (playerA > playerB)
    return 1;
    if (playerA < playerB)
    return -1;
    return 0;
  }

sortTheGolfers() {
  this.data.events[0].competitions[0].competitors.sort(function (a, b) {
  return a.sortOrder - b.sortOrder;
  });
}


}
