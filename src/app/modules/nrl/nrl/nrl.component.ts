import { Component, OnInit } from '@angular/core';
import { NrlService } from '../nrl.service';
import { NrlApiReturn } from './models/nrl-api-return';

@Component({
  selector: 'app-nrl',
  templateUrl: './nrl.component.html',
  styleUrls: ['./nrl.component.css'],
})
export class NrlComponent implements OnInit {
  nrlData!: NrlApiReturn;
  yearsArray: number[] = [];
  roundsArray: number[] = [];
  roundToFetch: number = 1;
  yearToFetch: number = new Date().getFullYear();
  interval: any;

  constructor(private service: NrlService) {}

  ngOnInit(): void {
    this.makeArrayofRounds();
    this.makeArrayofYears();
    this.getDefaultNrlData();
    this.setIntrvl();
  }

  setIntrvl() {
    this.interval = setInterval(() => this.getDefaultNrlData, 30000);
  }

  getDefaultNrlData() {
    const subscription = this.service
      .getDefaultNrlData()
      .subscribe((response) => {
        this.nrlData = response;
        this.addTeamCityNames();
        subscription.unsubscribe;
      });
  }

  loadNewRound() {
    let x: any[] = [];
    let select = document.querySelectorAll('select');
    select.forEach(function (el, i) {
      x[i] = el.value;
    });
    this.yearToFetch = x[0];
    this.roundToFetch = x[1];
    clearInterval(this.interval);
    this.loadNewWeek();
  }

  loadNewWeek() {
    const subscription = this.service
      .getUserDefinedNrlData(
        this.yearToFetch,
        this.roundToFetch
      )
      .subscribe((response) => {
        console.log(response);
        this.nrlData = response;
        this.addTeamCityNames();
        subscription.unsubscribe;
      });
  }

  makeArrayofYears() {
    let year = new Date().getFullYear();
    for (var i = year; i > 1907; i--) {
      this.yearsArray.push(i);
    }
  }

  makeArrayofRounds() {
    for (var i = 1; i < 31; i++) {
      this.roundsArray.push(i);
    }
  }

  addTeamCityNames() {
    if (this.nrlData) {
      for (var i = 0; i < this.nrlData.fixtures.length; i++) {
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Panthers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Penrith';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Sea Eagles') {
          this.nrlData.fixtures[i].homeTeam.city = 'Manly';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Raiders') {
          this.nrlData.fixtures[i].homeTeam.city = 'Canberra';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Sharks') {
          this.nrlData.fixtures[i].homeTeam.city = 'Cronulla';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Broncos') {
          this.nrlData.fixtures[i].homeTeam.city = 'Brisbane';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Rabbitohs') {
          this.nrlData.fixtures[i].homeTeam.city = 'South Sydney';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Roosters') {
          this.nrlData.fixtures[i].homeTeam.city = 'Sydney';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Knights') {
          this.nrlData.fixtures[i].homeTeam.city = 'Newcastle';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Warriors') {
          this.nrlData.fixtures[i].homeTeam.city = 'New Zealand';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Dragons') {
          this.nrlData.fixtures[i].homeTeam.city = 'St. George Illawarra';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Tigers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Balmain';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Wests Tigers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Wests';
          this.nrlData.fixtures[i].homeTeam.nickName = 'Tigers';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Storm') {
          this.nrlData.fixtures[i].homeTeam.city = 'Melbourne';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Eels') {
          this.nrlData.fixtures[i].homeTeam.city = 'Parramatta';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Titans') {
          this.nrlData.fixtures[i].homeTeam.city = 'Gold Coast';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Cowboys') {
          this.nrlData.fixtures[i].homeTeam.city = 'North Queensland';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Bulldogs') {
          this.nrlData.fixtures[i].homeTeam.city = 'Canterbury';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Fruitpickers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Cumberland';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'The Dirty Reds') {
          this.nrlData.fixtures[i].homeTeam.city = 'Glebe';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Jets') {
          this.nrlData.fixtures[i].homeTeam.city = 'Newtown';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Rebels') {
          this.nrlData.fixtures[i].homeTeam.city = 'Newcastle';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Bears') {
          this.nrlData.fixtures[i].homeTeam.city = 'North Sydney';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Magpies') {
          this.nrlData.fixtures[i].homeTeam.city = 'Western Suburbs';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'University') {
          this.nrlData.fixtures[i].homeTeam.city = '';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'The Dales') {
          this.nrlData.fixtures[i].homeTeam.city = 'Annandale';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Steelers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Illawarra';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Chargers') {
          this.nrlData.fixtures[i].homeTeam.city = 'Gold Coast';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Crushers') {
          this.nrlData.fixtures[i].homeTeam.city = 'South Queensland';
        }
        if (this.nrlData.fixtures[i].homeTeam.nickName == 'Reds') {
          this.nrlData.fixtures[i].homeTeam.city = 'Western';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Panthers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Penrith';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Sea Eagles') {
          this.nrlData.fixtures[i].awayTeam.city = 'Manly';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Raiders') {
          this.nrlData.fixtures[i].awayTeam.city = 'Canberra';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Sharks') {
          this.nrlData.fixtures[i].awayTeam.city = 'Cronulla';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Broncos') {
          this.nrlData.fixtures[i].awayTeam.city = 'Brisbane';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Rabbitohs') {
          this.nrlData.fixtures[i].awayTeam.city = 'South Sydney';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Roosters') {
          this.nrlData.fixtures[i].awayTeam.city = 'Sydney';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Knights') {
          this.nrlData.fixtures[i].awayTeam.city = 'Newcastle';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Warriors') {
          this.nrlData.fixtures[i].awayTeam.city = 'New Zealand';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Dragons') {
          this.nrlData.fixtures[i].awayTeam.city = 'St. George Illawarra';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Tigers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Balmain';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Wests Tigers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Wests';
          this.nrlData.fixtures[i].awayTeam.nickName = 'Tigers';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Storm') {
          this.nrlData.fixtures[i].awayTeam.city = 'Melbourne';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Eels') {
          this.nrlData.fixtures[i].awayTeam.city = 'Parramatta';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Titans') {
          this.nrlData.fixtures[i].awayTeam.city = 'Gold Coast';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Cowboys') {
          this.nrlData.fixtures[i].awayTeam.city = 'North Queensland';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Bulldogs') {
          this.nrlData.fixtures[i].awayTeam.city = 'Canterbury';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Fruitpickers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Cumberland';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'The Dirty Reds') {
          this.nrlData.fixtures[i].awayTeam.city = 'Glebe';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Jets') {
          this.nrlData.fixtures[i].awayTeam.city = 'Newtown';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Rebels') {
          this.nrlData.fixtures[i].awayTeam.city = 'Newcastle';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Bears') {
          this.nrlData.fixtures[i].awayTeam.city = 'North Sydney';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Magpies') {
          this.nrlData.fixtures[i].awayTeam.city = 'Western Suburbs';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'University') {
          this.nrlData.fixtures[i].awayTeam.city = '';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Steelers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Illawarra';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Chargers') {
          this.nrlData.fixtures[i].awayTeam.city = 'Gold Coast';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Crushers') {
          this.nrlData.fixtures[i].awayTeam.city = 'South Queensland';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'Reds') {
          this.nrlData.fixtures[i].awayTeam.city = 'Western';
        }
        if (this.nrlData.fixtures[i].awayTeam.nickName == 'The Dales') {
          this.nrlData.fixtures[i].awayTeam.city = 'Annandale';
        }

      }
    }
  }
}
