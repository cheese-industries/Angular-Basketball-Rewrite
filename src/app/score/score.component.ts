import { Component, OnInit } from '@angular/core';
import { GameData } from '../models/game-data';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  //data: Data = { events: [{ competitions: [{ competitors: [{ linescores: [{}] }] }] }] };
  data: GameData = { events: [{ competitions: [{ competitors: [{ linescores: [{}, {}, {}, {}, {}, {}] }] }] }] };


  events = this.data.events;
  linescores = this.data.events[0].competitions[0].competitors[0].linescores;
  constructor(private service: ScoreService) { }

  ngOnInit(): void {
    this.service.getData().subscribe(response => { 
      let testingThis: GameData = response
      console.log(testingThis) 
    })
  }


}
