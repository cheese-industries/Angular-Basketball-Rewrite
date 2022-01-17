import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  Injectable,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameData } from '../../../../models/soccer/game-data';
import { MediaMatcher } from '@angular/cdk/layout';
import { SoccerService } from '../../soccer.service';
import { Router } from '@angular/router';
import { GameDetailsComponent } from 'src/app/game-details/game-details.component';
import { SbData } from 'src/app/models/sb-data';
import { Scores } from 'src/app/models/scores';

@Component({
  selector: 'app-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class SoccerComponent implements OnInit {
  data!: GameData;
  sbData!: SbData;
  scores!: Scores[];
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  totalLength: any;
  myControl: FormControl = new FormControl();
  gamesToday: boolean = true;

  constructor(
    private service: SoccerService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
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
  }
  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 50000);
  }

  getTheScores(dateToFetch: string) {
    console.log('the date to fetch is ');
    console.log(dateToFetch);
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        this.sbData = this.data.content.sbData;
        this.scores = this.sbData.scores;
        this.addMissingLogos();
        console.log(this.scores);
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
    console.log(this.getDateToCall());
    this.getTheScores(this.getDateToCall());
  }

  addMissingLogos() {
    for (var i = 0; i < this.scores.length; i++) {
      for (var j = 0; j < this.scores[i].events.length; j++) {
        for (var k = 0; k < 2; k++) {
          switch (
            this.scores[i].events[j].competitions[0].competitors[k].team
              .location
          ) {
            case 'Tapatío':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.tapatio.png';
              break;
            case 'Tlaxcala FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.tlaxcala.png';
              break;
            case 'Chengdu Rongcheng':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/cn.chengdu.png';
              break;
            case 'Zhejiang Professional FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/cn.zhejiang.png';
              break;
            case 'Persiraja Banda Aceh':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.persiraja.png';
              break;
            case 'PSIS Semarang':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.psis.png';
              break;
            case 'Raya2':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.raya2.png';
              break;
            case 'Cancún FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.cancun.png';
              break;
            case 'Cardiff MU':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.cardiffmet.png';
              break;
            case 'Barry Town':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.barrytown.png';
              break;
            case 'Warrenpoint Town':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.warrenpointtown.jpg';
              break;
            case 'Persita Tangerang':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.persita.png';
              break;
            case 'Bnei Sakhnin':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.bneisakhnin.png';
              break;
            case 'Hapoel Jerusalem':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoeljerusalem.png';
              break;
            case 'TIRA-Persikabo':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.persikabo.png';
              break;
            case 'Churchill Brothers':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.churchillbrothers.png';
              break;
            case 'Kenkre':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.kenkre.png';
              break;
            case 'Mohammedan SC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.mohammedan.png';
              break;
            case 'PSS Sleman':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.pss.png';
              break;
            case 'Tepatitlán FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.tepatitlan.png';
              break;
          }
        }
      }
    }
  }
}
