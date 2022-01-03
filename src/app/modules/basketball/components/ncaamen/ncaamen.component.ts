import { DatePipe } from '@angular/common';
import {
  Component,
  Injectable,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../../../../models/game-data';
import { MediaMatcher } from '@angular/cdk/layout';
import { BasketballService } from '../../basketball.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ncaamen',
  templateUrl: './ncaamen.component.html',
  styleUrls: ['./ncaamen.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class NcaamenComponent implements OnInit {
  data!: GameData;
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  totalLength: any;
  page: number = 1;
  view: string = 'main';
  arrayForFilter = [''];
  leagueToFetch = 'mens-college-basketball';
  conferenceIds: object = {
    '3': 'A-10',
    '2': 'ACC',
    '46': 'A-Sun',
    '1': 'AmEast',
    '62': 'AAC',
    '8': 'Big 12',
    '4': 'Big East',
    '5': 'Big Sky',
    '6': 'Big South',
    '7': 'Big Ten',
    '9': 'Big West',
    '11': 'C-USA',
    '10': 'CAA',
    '45': 'Horizon',
    '12': 'Ivy',
    '13': 'MAAC',
    '14': 'MAC',
    '16': 'MEAC',
    '18': 'MVC',
    '44': 'MWC',
    '19': 'NEC',
    '20': 'OVC',
    '21': 'Pac-12',
    '22': 'Patriot',
    '23': 'SEC',
    '26': 'SWAC',
    '24': 'SoCon',
    '25': 'Southland',
    '49': 'Summit',
    '27': 'Sun Belt',
    '30': 'WAC',
    '29': 'WCC',
  };

  constructor(
    private service: BasketballService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.form = new FormGroup({
      dateToCall: new FormControl(this.getTodaysDate(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTheScores(this.makeDefaultDate());
    this.setIntrvl();
    this.getTodaysDate();
    this.service.leagueToFetch = this.leagueToFetch;
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  getTheScores(dateToFetch: string) {
    const subscription = this.service
      .getGameData(this.leagueToFetch, dateToFetch, true)
      .subscribe((response) => {
        this.page = 1;
        this.data = response;
        this.totalLength = this.data.events.length;
        this.conferenceLookup();
        this.checkForRankings();
        this.shrinkLongSchoolNames();
        this.createArrayForFilter();
        // console.log(this.arrayForFilter);
        subscription.unsubscribe();
      });
  }

  createArrayForFilter() {
    this.arrayForFilter = [''];
    for (var i = 0; i < this.data.events.length; i++) {
      for (var j = 0; j < 2; j++) {
        this.arrayForFilter.push(
          JSON.stringify(
            this.data.events[i].competitions[0].competitors[j].team.location
          )
        );
      }
    }
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
            case '3':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'A-10';
              break;
            case '2':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'ACC';
              break;
            case '46':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'A-Sun';
              break;
            case '1':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'AmEast';
              break;
            case '62':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'AAC';
              break;
            case '8':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big 12';
              break;
            case '4':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big East';
              break;
            case '5':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big Sky';
              break;
            case '6':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big South';
              break;
            case '7':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big Ten';
              break;
            case '9':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Big West';
              break;
            case '11':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'C-USA';
              break;
            case '10':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'CAA';
              break;
            case '45':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Horizon';
              break;
            case '12':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Ivy';
              break;
            case '13':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MAAC';
              break;
            case '14':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MAC';
              break;
            case '16':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MEAC';
              break;
            case '18':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MVC';
              break;
            case '44':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'MWC';
              break;
            case '19':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'NEC';
              break;
            case '20':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'OVC';
              break;
            case '21':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Pac-12';
              break;
            case '22':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Patriot';
              break;
            case '23':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SEC';
              break;
            case '26':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SWAC';
              break;
            case '24':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'SoCon';
              break;
            case '25':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Southland';
              break;
            case '49':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Summit';
              break;
            case '27':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'Sun Belt';
              break;
            case '30':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'WAC';
              break;
            case '29':
              this.data.events[g].competitions[0].competitors[
                t
              ].team.conferenceId = 'WCC';
          }
        } else {
          this.data.events[g].competitions[0].competitors[t].team.conferenceId =
            '';
        }
      }
    }
  }

  checkForRankings() {
    for (var g = 0; g < this.totalLength; g++) {
      for (var t = 0; t < 2; t++) {
        try {
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
        } catch (error) {}
      }
    }
  }
}
