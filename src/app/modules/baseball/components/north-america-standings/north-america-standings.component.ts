import { Component, Injectable, OnInit } from '@angular/core';
import { NorthAmericaService } from '../../north-america.service';
import { ActivatedRoute } from '@angular/router';
import { StandingsRootObject } from '../../models/mlb-api-models/standings';
import { firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-north-america-standings',
  templateUrl: './north-america-standings.component.html',
  styleUrls: ['./north-america-standings.component.css']
})
@Injectable({
  providedIn: 'root',
})

export class NorthAmericaStandingsComponent implements OnInit {

  constructor(    private service: NorthAmericaService,
    private activatedRoute: ActivatedRoute
) { }
leagueId!: string;
leagueNumber!: string;
data!: StandingsRootObject;
 

  ngOnInit(): void {
    this.leagueId = this.activatedRoute.snapshot.params['id'];
    if (this.leagueId === 'mlb'){
      this.leagueNumber = '103,104'
    } else if (this.leagueId === 'aaa'){
      this.leagueNumber = '112,117'
    }else if (this.leagueId === 'aa'){
      this.leagueNumber = '113,111,109'
    }else if (this.leagueId === 'high-a'){
      this.leagueNumber = '118,126,116'
    }else if (this.leagueId === 'low-a'){
      this.leagueNumber = '110,122,123'
    }
//convert level name to league number(s)
    this.getTheStandings(this.leagueNumber);
  }

  async getTheStandings(leagueId: string){
    let currentDate = new Date
    let year = currentDate.getFullYear().toString();
    let response = await firstValueFrom(this.service.getStandings(year, leagueId));
    if(response){
      console.log(response)
    }
    //hit api via service, get json from mlb api
  }
}
