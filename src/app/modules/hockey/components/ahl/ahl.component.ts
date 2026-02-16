import {
  Component,
  Injectable,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AhlService } from './ahl.service';
import { AhlData } from 'src/app/models/hockey/ahl/ahl-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-ahl',
  templateUrl: './ahl.component.html',
  styleUrls: ['./ahl.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AhlComponent implements OnInit {
  data!: AhlData;
  events = this.data?.events;
  form: FormGroup;
  pipe = new DatePipe('en-us');
  myControl: FormControl = new FormControl();
  awayTeamLogos: string[] = [];
  homeTeamLogos: string[] = [];
  constructor(private service: AhlService) {
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
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        let string = JSON.stringify(this.data);
        string = `{${string}.${dateToFetch}}`;
        string = string.substring(15, string.length - 12);
        string = string.split('"competition":null},')[0];
        string = string + '"competition":null}';
        this.data = JSON.parse(string);
        this.awayTeamLogos = [];
        this.homeTeamLogos = [];
        this.setTheLogos();
        subscription.unsubscribe();
      });
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return formatDate(dateForTransform, 'yyyy-MM-dd', 'en-US');
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
    let dateString: string = year + '-' + month + '-' + day;
    return dateString;
  }

  handleDateChange() {
    this.getTheScores(this.getDateToCall());
  }

  setTheLogos() {
    for (var i = 0; i < this.data.events.length; i++) {
      switch (this.data.events[i].awayEventResult.competitor.location) {
        case 'Abbotsford':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/abbotsford.jpg'
          );
          break;
        case 'Bakersfield':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/bakersfield.jpg'
          );
          break;
        case 'Belleville':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/belleville.jpg'
          );
          break;
        case 'Bridgeport':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/bridgeport.jpg'
          );
          break;
        case 'Charlotte':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/charlotte.jpg'
          );
          break;
        case 'Chicago':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/chicago.jpg'
          );
          break;
        case 'Cleveland':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/cleveland.jpg'
          );
          break;
        case 'Coachella Valley':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/coachella_valley.jpg'
          );
          break;
        case 'Colorado':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/colorado.jpg'
          );
          break;
        case 'Grand Rapids':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/grand_rapids.jpg'
          );
          break;
        case 'Hartford':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/hartford.jpg'
          );
          break;
        case 'Henderson':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/henderson.jpg'
          );
          break;
        case 'Hershey':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/hershey.jpg'
          );
          break;
        case 'Iowa':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/iowa.jpg'
          );
          break;
        case 'Laval':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/laval.jpg'
          );
          break;
        case 'Lehigh Valley':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/lehigh_valley.jpg'
          );
          break;
        case 'Manitoba':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/manitoba.jpg'
          );
          break;
        case 'Milwaukee':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/milwaukee.jpg'
          );
          break;
        case 'Ontario':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/ontario.jpg'
          );
          break;
        case 'Providence':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/providence.jpg'
          );
          break;
        case 'Rochester':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/rochester.jpg'
          );
          break;
        case 'Rockford':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/rockford.jpg'
          );
          break;
        case 'San Diego':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/san_diego.jpg'
          );
          break;
        case 'San Jose':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/san_jose.jpg'
          );
          break;
        case 'Springfield':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/springfield.jpg'
          );
          break;
        case 'Stockton':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/stockton.jpg'
          );
          break;
        case 'Syracuse':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/syracuse.jpg'
          );
          break;
        case 'Texas':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/texas.jpg'
          );
          break;
        case 'Toronto':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/toronto.jpg'
          );
          break;
        case 'Tucson':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/tucson.jpg'
          );
          break;
        case 'Utica':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/utica.jpg'
          );
          break;
        case 'Wilkes-Barre/Scranton':
          this.awayTeamLogos.push(
            'http://cheese-industries.com/img/ahl/wilkes_barre_scranton.jpg'
          );
          break;
      }
      switch (this.data.events[i].homeEventResult.competitor.location) {
        case 'Abbotsford':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/abbotsford.jpg'
          );
          break;
        case 'Bakersfield':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/bakersfield.jpg'
          );
          break;
        case 'Belleville':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/belleville.jpg'
          );
          break;
        case 'Bridgeport':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/bridgeport.jpg'
          );
          break;
        case 'Charlotte':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/charlotte.jpg'
          );
          break;
        case 'Chicago':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/chicago.jpg'
          );
          break;
        case 'Cleveland':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/cleveland.jpg'
          );
          break;
        case 'Coachella Valley':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/coachella_valley.jpg'
          );
          break;
        case 'Colorado':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/colorado.jpg'
          );
          break;
        case 'Grand Rapids':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/grand_rapids.jpg'
          );
          break;
        case 'Hartford':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/hartford.jpg'
          );
          break;
        case 'Henderson':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/henderson.jpg'
          );
          break;
        case 'Hershey':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/hershey.jpg'
          );
          break;
        case 'Iowa':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/iowa.jpg'
          );
          break;
        case 'Laval':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/laval.jpg'
          );
          break;
        case 'Lehigh Valley':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/lehigh_valley.jpg'
          );
          break;
        case 'Manitoba':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/manitoba.jpg'
          );
          break;
        case 'Milwaukee':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/milwaukee.jpg'
          );
          break;
        case 'Ontario':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/ontario.jpg'
          );
          break;
        case 'Providence':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/providence.jpg'
          );
          break;
        case 'Rochester':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/rochester.jpg'
          );
          break;
        case 'Rockford':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/rockford.jpg'
          );
          break;
        case 'San Diego':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/san_diego.jpg'
          );
          break;
        case 'San Jose':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/san_jose.jpg'
          );
          break;
        case 'Springfield':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/springfield.jpg'
          );
          break;
        case 'Stockton':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/stockton.jpg'
          );
          break;
        case 'Syracuse':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/syracuse.jpg'
          );
          break;
        case 'Texas':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/texas.jpg'
          );
          break;
        case 'Toronto':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/toronto.jpg'
          );
          break;
        case 'Tucson':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/tucson.jpg'
          );
          break;
        case 'Utica':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/utica.jpg'
          );
          break;
        case 'Wilkes-Barre/Scranton':
          this.homeTeamLogos.push(
            'http://cheese-industries.com/img/ahl/wilkes_barre_scranton.jpg'
          );
          break;
      }

    }
  }
}
