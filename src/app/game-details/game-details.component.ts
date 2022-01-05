import { Component, Injectable, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { GameData } from '../models/game-data';
import { BasketballService } from '../modules/basketball/basketball.service';
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

  constructor(private service: BasketballService, private activatedRoute: ActivatedRoute) {
   };

   gameId: string = '';
    data!: GameData;
    leagueToFetch: string = '';

    ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['id'];
    console.log(this.gameId)
    this.getTheGame(this.gameId);
  }

  getTheGame(gameId: string | null) {
  const subscription = this.service.getIndividualGame(this.leagueToFetch, this.gameId).subscribe
  (response => {
    this.data = response;
    console.log(this.data)
    subscription.unsubscribe();
  })

}

}
