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
    this.service.getData().subscribe(response => {
      let testingThis: GameData = response;
      this.data = response;
    })
    this.setIntrvl();
  }

  setIntrvl() {
    setInterval(() => this.service.getData().subscribe(response => {
      let testingThis: GameData = response;
      this.data = response;
    }), 30000);
  }
}
