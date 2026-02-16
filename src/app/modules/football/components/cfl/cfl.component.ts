import {
  Component,
  OnChanges,
  OnInit,
  ɵɵsetComponentScope,
} from '@angular/core';
import { CflService } from './cfl.service';

@Component({
  selector: 'app-cfl',
  templateUrl: './cfl.component.html',
  styleUrls: ['./cfl.component.css'],
})
export class CflComponent implements OnInit {
  weekNumber!: number;
  displayWeek!: string;
  scheduleObject?: any;
  gameData?: any;
  weeklyCalendar!: any;
  weekArray?: string[];

  constructor(private service: CflService) {}

  ngOnInit(): void {
    this.getDefaultWeekNumber();
    this.setIntrvl();
  }

  setIntrvl() {
    setInterval(() => this.getGameData(this.weekNumber), 30000);
  }

  getDefaultWeekNumber(): void {
    const subscription = this.service.getDefaultWeek().subscribe((response) => {
      this.weekNumber = response.currentWeek;
      this.weeklyCalendar = response.weeklyCalendar;
      this.populateScheduleDropdown();
      this.getGameData(this.weekNumber);
      subscription.unsubscribe();
    });
  }

  getGameData(weekNumber: number): void {
    const subscription = this.service
      .getCflData(this.weekNumber)
      .subscribe((response) => {
        this.gameData = [response];
        this.gameData = this.gameData[0][this.weekNumber].events
        console.log(this.gameData);
        subscription.unsubscribe();
      });
  }

  populateScheduleDropdown(): void {
    this.weekArray = [];
    let foo = [Object.values(this.weeklyCalendar)];
    let bar = [Object.values(foo)];
    let boo = JSON.stringify(bar);
    let bah: any[] = JSON.parse(boo);
    for (var i = 0; i < bah[0][0].length; i++) {
      this.weekArray.push(bah[0][0][i].label);
    }
    let week = document.getElementById('week');
    for (var i = 0; i < this.weekArray.length; i++) {
      var option = document.createElement('option');
      var txt = document.createTextNode(this.weekArray[i]);
      option.appendChild(txt);
      console.log(i + 1);
      option.setAttribute('value', (i + 1).toString());
      week?.insertBefore(option, week.lastChild);
    }
  }

  onChange(): void {
    this.weekNumber = +(<HTMLSelectElement>document.getElementById('week'))
      .value;
    this.displayWeek = (<HTMLSelectElement>document.getElementById('week'))[
      this.weekNumber - 1
    ].innerText;
    console.log('week number ' + this.weekNumber);
    console.log('week name ' + this.displayWeek);
    this.getGameData(this.weekNumber);
  }
}
