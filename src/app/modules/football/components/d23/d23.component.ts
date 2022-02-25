import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  Injectable,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../../models/nfl/game-data';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FcsService } from '../fcs/fcs.service';
import { ActivatedRoute } from '@angular/router';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { GameDetailsComponent } from 'src/app/game-details/game-details.component';
import { D23Service } from './d23.service';

@Component({
  selector: 'app-d23',
  templateUrl: './d23.component.html',
  styleUrls: ['./d23.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class D23Component implements OnInit {
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  leagueToFetch: string = '';
  pipe = new DatePipe('en-us');
  totalLength: any;
  page: number = 1;
  view: string = 'main';
  urlSuffix: string = '';
  myControl: FormControl = new FormControl();

  constructor(
    private service: D23Service,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private details: GameDetailsComponent
  ) {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.getTodaysDate(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value =>this._filter(value))
    // )
  }

  // private _filter(value: any): any[] {
  //   const filterValue = value.toLowerCase();

  //   return this.arrayForFilter.filter(option => option.toLowerCase().includes(filterValue));
  // }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  //Without a defined groups parameter in the URL for college games, the API only returns games involving the Top 25. "groups=50" displays every Division I game.
  //The "limit" parameter in college games tells the API to return every game, not just some subset.

  getTheScores(dateToFetch: string) {
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        this.totalLength = this.data.events.length;
        this.conferenceLookup();
        this.checkForRankings();
        this.shrinkLongSchoolNames();
        subscription.unsubscribe();
      });
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return formatDate(dateForTransform, 'yyyyMMdd', 'en-US');
  }

  makeDefaultDate(): string {
    let month: string = String(this.getTodaysDate().getMonth() + 1);
    let day: string = String(this.getTodaysDate().getDate());
    let year: string = String(this.getTodaysDate().getFullYear());
    if (+day < 10) {
      day = '0' + day;
    }
    if (+month < 10) {
      month = '0' + month;
    }
    let dateString: string = year + month + day;
    return dateString;
  }

  handleDateChange() {
    this.getTheScores(this.getDateToCall());
  }

  shrinkLongSchoolNames() {
    for (var i = 0; i < this.totalLength; i++) {
      for (var j = 0; j < 2; j++) {
        let schoolName = <string>(
          this.data.events[i].competitions[0].competitors[j].team.location
        );
        if (schoolName.length > 20) {
          schoolName = schoolName.replace('University', 'U');
          schoolName = schoolName.replace('College', 'Col');
          this.data.events[i].competitions[0].competitors[j].team.location =
            schoolName;
        }
        if (schoolName == 'U of Texas of the Permian Basin') {
          this.data.events[i].competitions[0].competitors[j].team.location =
            'Texas-Permian Basin';
        }
      }
    }
  }

  conferenceLookup() {
    for (var g = 0; g < this.totalLength; g++) {
      for (var t = 0; t < 2; t++) {
        if (
          this.data.events[g].competitions[0].competitors[t].team.conferenceId
        ) {
          switch (
            this.data.events[g].competitions[0].competitors[t].team.conferenceId
          ) {
            case '1':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'ACC';
              break;
            case '151':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'AAC';
              break;
            case '4':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big 12';
              break;
            case '5':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big Ten';
              break;
            case '9':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Pac-12';
              break;
            case '12':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'C-USA';
              break;
            case '15':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MAC';
              break;
            case '18':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Independent';
              break;
            case '17':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MWC';
              break;
            case '8':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SEC';
              break;
            case '37':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Sun Belt';
              break;
            case '22':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Ivy League';
              break;
            case '20':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big Sky';
              break;
            case '21':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Missouri Valley';
              break;
            case '25':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Northeast';
              break;
            case '27':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Patriot League';
              break;
            case '40':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big South';
              break;
            case '26':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Ohio Valley';
              break;
            case '30':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Southland';
              break;
            case '175':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'WAC-ASUN';
              break;
            case '24':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MEAC';
              break;
            case '31':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SWAC';
              break;
            case '48':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Colonial';
              break;
            case '29':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Southern';
              break;
            case '28':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Pioneer';
              break;

            case '131':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'OAC';
              break;
            case '104':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'CIAA';
              break;
            case '107':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'GLIAC';
              break;
            case '146':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Great American';
              break;
            case '108':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Great Lakes';
              break;
            case '165':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Great Midwest';
              break;
            case '109':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Great Northwest';
              break;
            case '110':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Gulf South';
              break;
            case '112':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'D2 Independent';
              break;
            case '116':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Lone Star';
              break;
            case '118':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Mid America';
              break;
            case '144':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Mountain East';
              break;
            case '127':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Northeast 10';
              break;
            case '129':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Northern Sun';
              break;
            case '133':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'PSAC';
              break;
            case '135':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Rocky Mountain';
              break;
            case '136':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SIAC';
              break;
            case '139':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'South Atlantic';
              break;
            case '114':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'American Rivers';
              break;
            case '100':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'American Southwest';
              break;
            case '102':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'CCIW';
              break;
            case '103':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Centennial';
              break;
            case '123':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Commonwealth Coast';
              break;
            case '105':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'ECFC';
              break;
            case '106':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Empire 8';
              break;

            case '111':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Heartland';
              break;
            case '113':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'D3 Independent';
              break;
            case '115':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Liberty League';
              break;
            case '160':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MSCAC';
              break;
            case '117':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Michigan';
              break;
            case '119':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Middle Atlantic';
              break;
            case '120':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Midwest';
              break;
            case '121':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Minnesota';
              break;
            case '128':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'NACC';
              break;
            case '122':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'NESCAC';
              break;
            case '166':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'NEWMAC';
              break;
            case '124':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'New Jersey';
              break;
            case '126':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'NCAC';
              break;
            case '130':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Northwest';
              break;
            case '132':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Old Dominion';
              break;
            case '134':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = "Presidents'";
              break;
            case '138':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SoCal';
              break;
            case '147':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Southern Athletic';
              break;
            case '143':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'USA South';
              break;
            case '142':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Upper Midwest';
              break;
            case '145':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Wisconsin';
              break;
          }
        } else {
          this.data.events[g].competitions[0].competitors[t].team.conferenceId =
            '';
        }
      }
    }
  }

  //Checking for rankings is only applicable for college teams. These league IDs are for women's and men's college basketball.
  checkForRankings() {
    if (this.data.leagues[0].id == 54 || this.data.leagues[0].id == 41) {
      for (var g = 0; g < this.totalLength; g++) {
        for (var t = 0; t < 2; t++) {
          if (
            !this.data.events[g].competitions[0].competitors[t].curatedRank
              .current
          ) {
            this.data.events[g].competitions[0].competitors[
              t
            ].curatedRank.current = '';
          } else if (
            this.data.events[g].competitions[0].competitors[t].curatedRank
              .current > 25
          ) {
            this.data.events[g].competitions[0].competitors[
              t
            ].curatedRank.current = '';
          }
        }
      }
    }
  }
}
