import { Component, OnInit } from '@angular/core';
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
  constructor(private service: ScoreService) { };

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
}
