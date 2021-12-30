import { Component, Injectable, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { GameData } from '../models/game-data';
import { ScoreService } from '../score/score.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class GameDetailsComponent implements OnInit {

  constructor(private service: ScoreService, private activatedRoute: ActivatedRoute) {
   };

   gameId: string = '';
    data!: GameData;

    ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['id'];
    console.log(this.gameId)
    this.getTheGame(this.gameId);
  }

  getTheGame(gameId: string | null) {
  const subscription = this.service.getGame(this.gameId).subscribe
  (response => {
    this.data = response;
    console.log(this.data)
    subscription.unsubscribe();
  })

}

//ask about getting dateToFetch from score component


}
