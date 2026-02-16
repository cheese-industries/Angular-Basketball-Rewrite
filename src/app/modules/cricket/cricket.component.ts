import { Component, OnInit } from '@angular/core';
import { CricketService } from './cricket.service';
import { GameData } from 'src/app/models/cricket/game-data';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css'],
})
export class CricketComponent implements OnInit {
  data!: GameData;
  events = this.data?.matches;
  constructor(private service: CricketService) {}

  ngOnInit(): void {
    this.getTheScores();
    this.setIntrvl();
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(), 30000);
  }

  getTheScores() {
    const subscription = this.service.getGameData().subscribe((response) => {
      this.data = response;
      this.events = this.data.matches;
      this.convertDateFormat();
      this.setLogoUrl();
      this.fixScheduledMatchStatus();
      subscription.unsubscribe();
    });
  }

  setLogoUrl() {
    for (var i = 0; i < this.events.length; i++) {
      for (var j = 0; j < 2; j++) {
        if (this.events[i].teams[j].team.image) {
          this.events[i].teams[j].team.image.url =
            'https://img1.hscicdn.com/image/upload/f_auto/lsci' +
            this.events[i].teams[j].team.image.url;
        }
      }
    }
  }

  fixScheduledMatchStatus() {
    for (var i = 0; i < this.events.length; i++) {
      if (this.events[i].status !== 'Stumps') {
        this.events[i].status = '';
      }
      if (this.events[i].statusText.includes('Match starts in')){
        this.events[i].statusText = '';
      }
    }
  }

  convertDateFormat() {
    for (var i = 0; i < this.events.length; i++) {
      let date = JSON.stringify(this.events[i].startDate);
      date = date.substring(1);
      date = date.slice(0, -1);
      let isoDate = new Date(date);
      let DateString =
        isoDate.getMonth() +
        1 +
        '/' +
        isoDate.getDate() +
        '/' +
        isoDate.getFullYear();
      this.events[i].startDate = DateString;
    }
  }
}
