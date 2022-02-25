import { DatePipe } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PgaData } from '../../models/pga-data';
import { PgaService } from './pga.service';

@Component({
  selector: 'app-pga',
  templateUrl: './pga.component.html',
  styleUrls: ['./pga.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class PgaComponent implements OnInit {
  data!: PgaData;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  myControl: FormControl = new FormControl();

  constructor(private service: PgaService) {
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
      console.log(this.data);
      this.sortTheGolfers();
      console.log(this.data);
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
