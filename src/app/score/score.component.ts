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
  data!: GameData;

  /*=
    {
      events:
        [{date: '',
          { links: [{ href: '' }] },
          { status: { displayClock: '', period: '', type: { detail: '', completed: true } } },
          {
            competitions:
              [{ series: { summary: '' }}],
            notes: [{ headline: '' }],
            headlines: [{}],
            venue: { fullName: '', address: { city: '', state: '' } },
            broadcasts: [{ market: '', names: [{}] }],
            competitors: [{
              homeAway: 'home', score: '42', linescores: [{ value: '' }],
              team: { displayName: '' }, records: [{ summary: '' }], 
              leaders: [{ shortDisplayName: '', 
                  leaders: [{ displayValue: '', 
                      athlete: { displayName: '' } }] 
                        }]
            }]]
          }};
*/
  events = this.data?.events;
 // linescores = this.data.events[0].competitions[0].competitors[0].linescores;


  //score = this.data.events[0].competitions[0].competitors[0].score;
  constructor(private service: ScoreService) { };

  ngOnInit(): void {
    this.service.getData().subscribe(response => {
      let testingThis: GameData = response;
      this.data = response;
      console.log(this.data);
      console.log('events ');
      console.log(this.data.events[0].competitions[0].competitors[0])
      
      //      console.log(testingThis.events[0])
      //      console.log('events[0]' + testingThis.events[0])      

      //      console.log('this is the returned data ' + testingThis.events[0].competitions[0].competitors[0].score);

    }

    )
  }
}
