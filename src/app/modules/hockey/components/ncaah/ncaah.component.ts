import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameDetailsComponent } from 'src/app/game-details/game-details.component';
import { GameData } from 'src/app/models/game-data';
import { NcaaGameData } from 'src/app/models/ncaa-game-data';
import { NcaahService } from './ncaah.service';

@Component({
  selector: 'app-ncaah',
  templateUrl: './ncaah.component.html',
  styleUrls: ['./ncaah.component.css'],
})
export class NcaahComponent implements OnInit {
  data!: NcaaGameData;
  events = this.data?.games;
  form: FormGroup;
  leagueToFetch: string = '';
  pipe = new DatePipe('en-us');
  totalLength: any;
  page: number = 1;
  view: string = 'main';
  urlSuffix: string = '';
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private service: NcaahService,
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
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(this.getDateToCall()), 30000);
  }

  getTheScores(dateToFetch: string) {
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        this.setNicknamesAndLogos();
        subscription.unsubscribe();
      });
  }

  getTodaysDate(): Date {
    return new Date();
  }

  getDateToCall(): string {
    let dateForTransform =
      (this.form.get('dateToCall')?.value as Date) ?? new Date();
    return formatDate(dateForTransform, 'yyyy/MM/dd', 'en-US');
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
    let dateString: string = year + '/' + month + '/' + day;
    //   let dateString: string = '2022/01/11';
    return dateString;
  }

  handleDateChange() {
    this.getTheScores(this.getDateToCall());
  }

  setNicknamesAndLogos() {
    for (var i = 0; i < this.data.games.length; i++) {
      switch (this.data.games[i].game.away.names.short) {
        case 'Air Force':
          this.data.games[i].game.away.names.nickname = 'Falcons';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/air_force.png';
          break;
        case 'Alas. Fairbanks':
          this.data.games[i].game.away.names.short = 'Alaska';
          this.data.games[i].game.away.names.nickname = 'Nanooks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/alaska.png';
          break;
        case "American Int'l":
          this.data.games[i].game.away.names.short = 'American International';
          this.data.games[i].game.away.names.nickname = 'Yellow Jackets';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/american_international.png';
          break;

        case 'Arizona St.':
          this.data.games[i].game.away.names.short = 'Arizona State';
          this.data.games[i].game.away.names.nickname = 'Sun Devils';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/arizona_state.png';
          break;
        case 'Army West Point':
          this.data.games[i].game.away.names.nickname = 'Black Knights';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/army.png';
          break;
        case 'Bemidji St.':
          this.data.games[i].game.away.names.short = 'Bemidji State';
          this.data.games[i].game.away.names.nickname = 'Beavers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/bemidji_state.png';
          break;
        case 'Bentley':
          this.data.games[i].game.away.names.nickname = 'Falcons';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/bentley.png';
          break;
        case 'Boston College':
          this.data.games[i].game.away.names.nickname = 'Eagles';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/boston_college.png';
          break;
        case 'Boston U.':
          this.data.games[i].game.away.names.short = 'Boston University';
          this.data.games[i].game.away.names.nickname = 'Terriers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/boston_university.png';
          break;
        case 'Bowling Green':
          this.data.games[i].game.away.names.nickname = 'Falcons';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/bowling_green.png';
          break;
        case 'Brown':
          this.data.games[i].game.away.names.nickname = 'Bears';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/brown.png';
          break;
        case 'Canisius':
          this.data.games[i].game.away.names.nickname = 'Golden Griffins';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/canisius.png';
          break;
        case 'Clarkson':
          this.data.games[i].game.away.names.nickname = 'Golden Knights';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/clarkson.png';
          break;
        case 'Colgate':
          this.data.games[i].game.away.names.nickname = 'Raiders';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/colgate.png';
          break;
        case 'Colorado Col.':
          this.data.games[i].game.away.names.short = 'Colorado College';
          this.data.games[i].game.away.names.nickname = 'Tigers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/colorado_college.png';
          break;
        case 'Cornell':
          this.data.games[i].game.away.names.nickname = 'Big Red';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/cornell.png';
          break;
        case 'Dartmouth':
          this.data.games[i].game.away.names.nickname = 'Big Green';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/dartmouth.png';
          break;
        case 'Denver':
          this.data.games[i].game.away.names.nickname = 'Pioneers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/denver.png';
          break;
        case 'Ferris St.':
          this.data.games[i].game.away.names.short = 'Ferris State';
          this.data.games[i].game.away.names.nickname = 'Bulldogs';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/ferris_state.png';
          break;
        case 'Harvard':
          this.data.games[i].game.away.names.nickname = 'Crimson';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/harvard.png';
          break;
        case 'Holy Cross':
          this.data.games[i].game.away.names.nickname = 'Crusaders';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/holy_cross.png';
          break;
        case 'Lake Superior St.':
          this.data.games[i].game.away.names.short = 'Lake Superior State';
          this.data.games[i].game.away.names.nickname = 'Lakers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/lake_superior_state.png';
          break;
        case 'LIU':
          this.data.games[i].game.away.names.short = 'Long Island';
          this.data.games[i].game.away.names.nickname = 'Sharks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/long_island.png';
          break;
        case 'Maine':
          this.data.games[i].game.away.names.nickname = 'Black Bears';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/maine.png';
          break;
        case 'Mercyhurst':
          this.data.games[i].game.away.names.nickname = 'Lakers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/mercyhurst.png';
          break;
        case 'Merrimack':
          this.data.games[i].game.away.names.nickname = 'Warriors';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/merrimack.png';
          break;
        case 'Miami (OH)':
          this.data.games[i].game.away.names.short = 'Miami';
          this.data.games[i].game.away.names.nickname = 'Redhawks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/miami.png';
          break;
        case 'Michigan':
          this.data.games[i].game.away.names.nickname = 'Wolverines';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/michigan.png';
          break;
        case 'Michigan St.':
          this.data.games[i].game.away.names.short = 'Michigan State';
          this.data.games[i].game.away.names.nickname = 'Spartans';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/michigan_state.png';
          break;
        case 'Michigan Tech':
          this.data.games[i].game.away.names.nickname = 'Huskies';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/michigan_tech.png';
          break;
        case 'Minnesota':
          this.data.games[i].game.away.names.nickname = 'Golden Gophers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/minnesota.png';
          break;
        case 'Minn. Duluth':
          this.data.games[i].game.away.names.short = 'Minnesota Duluth';
          this.data.games[i].game.away.names.nickname = 'Bulldogs';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/minnesota_duluth.png';
          break;
        case 'Minnesota St.':
          this.data.games[i].game.away.names.short = 'Minnesota State';
          this.data.games[i].game.away.names.nickname = 'Mavericks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/minnesota_state.png';
          break;
        case 'New Hampshire':
          this.data.games[i].game.away.names.nickname = 'Wildcats';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/new_hampshire.png';
          break;
        case 'Niagara':
          this.data.games[i].game.away.names.nickname = 'Purple Eagles';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/niagara.png';
          break;
        case 'North Dakota':
          this.data.games[i].game.away.names.nickname = 'Fighting Hawks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/north_dakota.png';
          break;
        case 'Northeastern':
          this.data.games[i].game.away.names.nickname = 'Huskies';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/northeastern.png';
          break;
        case 'Northern Mich.':
          this.data.games[i].game.away.names.short = 'Northern Michigan';
          this.data.games[i].game.away.names.nickname = 'Wildcats';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/northern_michigan.png';
          break;
        case 'Notre Dame':
          this.data.games[i].game.away.names.nickname = 'Fighting Irish';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/notre_dame.png';
          break;
        case 'Ohio St.':
          this.data.games[i].game.away.names.short = 'Ohio State';
          this.data.games[i].game.away.names.nickname = 'Buckeyes';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/ohio_state.png';
          break;
        case 'Omaha':
          this.data.games[i].game.away.names.nickname = 'Mavericks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/omaha.png';
          break;
        case 'Penn St.':
          this.data.games[i].game.away.names.short = 'Penn State';
          this.data.games[i].game.away.names.nickname = 'Nittany Lions';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/penn_state.png';
          break;
        case 'Princeton':
          this.data.games[i].game.away.names.nickname = 'Tigers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/princeton.png';
          break;
        case 'Providence':
          this.data.games[i].game.away.names.nickname = 'Friars';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/providence.png';
          break;
        case 'Quinnipiac':
          this.data.games[i].game.away.names.nickname = 'Bobcats';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/quinnipiac.png';
          break;
        case 'RIT':
          this.data.games[i].game.away.names.nickname = 'Tigers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/rit.png';
          break;
        case 'Rensselaer':
          this.data.games[i].game.away.names.nickname = 'Engineers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/rensselaer.png';
          break;
        case 'Sacred Heart':
          this.data.games[i].game.away.names.nickname = 'Pioneers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/sacred_heart.png';
          break;
        case 'St. Cloud St.':
          this.data.games[i].game.away.names.short = 'St. Cloud State';
          this.data.games[i].game.away.names.nickname = 'Huskies';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/st_cloud_state.png';
          break;
        case 'St. Lawrence':
          this.data.games[i].game.away.names.nickname = 'Saints';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/st_lawrence.png';
          break;
        case 'St. Thomas (MN)':
          this.data.games[i].game.away.names.short = 'St. Thomas';
          this.data.games[i].game.away.names.nickname = 'Tommies';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/st_thomas.png';
          break;
        case 'UConn':
          this.data.games[i].game.away.names.nickname = 'Huskies';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/uconn.png';
          break;
        case 'Massachusetts':
          this.data.games[i].game.away.names.short = 'UMass';
          this.data.games[i].game.away.names.nickname = 'Minutemen';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/umass.png';
          break;
        case 'UMass Lowell':
          this.data.games[i].game.away.names.short = 'UMass Lowell';
          this.data.games[i].game.away.names.nickname = 'Riverhawks';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/umass_lowell.png';
          break;
        case 'Union (NY)':
          this.data.games[i].game.away.names.short = 'Union';
          this.data.games[i].game.away.names.nickname = 'Dutchmen';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/union.png';
          break;
        case 'Vermont':
          this.data.games[i].game.away.names.nickname = 'Catamounts';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/vermont.png';
          break;
        case 'Western Mich.':
          this.data.games[i].game.away.names.short = 'Western Michigan';
          this.data.games[i].game.away.names.nickname = 'Broncos';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/western_michigan.png';
          break;
        case 'Wisconsin':
          this.data.games[i].game.away.names.nickname = 'Badgers';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/wisconsin.png';
          break;
        case 'Yale':
          this.data.games[i].game.away.names.nickname = 'Bulldogs';
          this.data.games[i].game.away.logo =
            'http://cheese-industries.com/img/ncaah/yale.png';
          break;
      }

      switch (this.data.games[i].game.home.names.short) {
        case 'Air Force':
          this.data.games[i].game.home.names.nickname = 'Falcons';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/air_force.png';
          break;
        case 'Alas. Fairbanks':
          this.data.games[i].game.home.names.short = 'Alaska';
          this.data.games[i].game.home.names.nickname = 'Nanooks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/alaska.png';
          break;
        case "American Int'l":
          this.data.games[i].game.home.names.short = 'American International';
          this.data.games[i].game.home.names.nickname = 'Yellow Jackets';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/american_international.png';
          break;

        case 'Arizona St.':
          this.data.games[i].game.home.names.short = 'Arizona State';
          this.data.games[i].game.home.names.nickname = 'Sun Devils';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/arizona_state.png';
          break;
        case 'Army West Point':
          this.data.games[i].game.home.names.nickname = 'Black Knights';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/army.png';
          break;
        case 'Bemidji St.':
          this.data.games[i].game.home.names.short = 'Bemidji State';
          this.data.games[i].game.home.names.nickname = 'Beavers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/bemidji_state.png';
          break;
        case 'Bentley':
          this.data.games[i].game.home.names.nickname = 'Falcons';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/bentley.png';
          break;
        case 'Boston College':
          this.data.games[i].game.home.names.nickname = 'Eagles';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/boston_college.png';
          break;
        case 'Boston U.':
          this.data.games[i].game.home.names.short = 'Boston University';
          this.data.games[i].game.home.names.nickname = 'Terriers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/boston_university.png';
          break;
        case 'Bowling Green':
          this.data.games[i].game.home.names.nickname = 'Falcons';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/bowling_green.png';
          break;
        case 'Brown':
          this.data.games[i].game.home.names.nickname = 'Bears';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/brown.png';
          break;
        case 'Canisius':
          this.data.games[i].game.home.names.nickname = 'Golden Griffins';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/canisius.png';
          break;
        case 'Clarkson':
          this.data.games[i].game.home.names.nickname = 'Golden Knights';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/clarkson.png';
          break;
        case 'Colgate':
          this.data.games[i].game.home.names.nickname = 'Raiders';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/colgate.png';
          break;
        case 'Colorado Col.':
          this.data.games[i].game.home.names.short = 'Colorado College';
          this.data.games[i].game.home.names.nickname = 'Tigers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/colorado_college.png';
          break;
        case 'Cornell':
          this.data.games[i].game.home.names.nickname = 'Big Red';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/cornell.png';
          break;
        case 'Dartmouth':
          this.data.games[i].game.home.names.nickname = 'Big Green';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/dartmouth.png';
          break;
        case 'Denver':
          this.data.games[i].game.home.names.nickname = 'Pioneers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/denver.png';
          break;
        case 'Ferris St.':
          this.data.games[i].game.home.names.short = 'Ferris State';
          this.data.games[i].game.home.names.nickname = 'Bulldogs';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/ferris_state.png';
          break;
        case 'Harvard':
          this.data.games[i].game.home.names.nickname = 'Crimson';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/harvard.png';
          break;
        case 'Holy Cross':
          this.data.games[i].game.home.names.nickname = 'Crusaders';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/holy_cross.png';
          break;
        case 'Lake Superior St.':
          this.data.games[i].game.home.names.short = 'Lake Superior State';
          this.data.games[i].game.home.names.nickname = 'Lakers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/lake_superior_state.png';
          break;
        case 'LIU':
          this.data.games[i].game.home.names.short = 'Long Island';
          this.data.games[i].game.home.names.nickname = 'Sharks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/long_island.png';
          break;
        case 'Maine':
          this.data.games[i].game.home.names.nickname = 'Black Bears';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/maine.png';
          break;
        case 'Mercyhurst':
          this.data.games[i].game.home.names.nickname = 'Lakers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/mercyhurst.png';
          break;
        case 'Merrimack':
          this.data.games[i].game.home.names.nickname = 'Warriors';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/merrimack.png';
          break;
        case 'Miami (OH)':
          this.data.games[i].game.home.names.short = 'Miami';
          this.data.games[i].game.home.names.nickname = 'Redhawks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/miami.png';
          break;
        case 'Michigan':
          this.data.games[i].game.home.names.nickname = 'Wolverines';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/michigan.png';
          break;
        case 'Michigan St.':
          this.data.games[i].game.home.names.short = 'Michigan State';
          this.data.games[i].game.home.names.nickname = 'Spartans';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/michigan_state.png';
          break;
        case 'Michigan Tech':
          this.data.games[i].game.home.names.nickname = 'Huskies';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/michigan_tech.png';
          break;
        case 'Minnesota':
          this.data.games[i].game.home.names.nickname = 'Golden Gophers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/minnesota.png';
          break;
        case 'Minn. Duluth':
          this.data.games[i].game.home.names.short = 'Minnesota Duluth';
          this.data.games[i].game.home.names.nickname = 'Bulldogs';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/minnesota_duluth.png';
          break;
        case 'Minnesota St.':
          this.data.games[i].game.home.names.short = 'Minnesota State';
          this.data.games[i].game.home.names.nickname = 'Mavericks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/minnesota_state.png';
          break;
        case 'New Hampshire':
          this.data.games[i].game.home.names.nickname = 'Wildcats';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/new_hampshire.png';
          break;
        case 'Niagara':
          this.data.games[i].game.home.names.nickname = 'Purple Eagles';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/niagara.png';
          break;
        case 'North Dakota':
          this.data.games[i].game.home.names.nickname = 'Fighting Hawks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/north_dakota.png';
          break;
        case 'Northeastern':
          this.data.games[i].game.home.names.nickname = 'Huskies';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/northeastern.png';
          break;
        case 'Northern Mich.':
          this.data.games[i].game.home.names.short = 'Northern Michigan';
          this.data.games[i].game.home.names.nickname = 'Wildcats';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/northern_michigan.png';
          break;
        case 'Notre Dame':
          this.data.games[i].game.home.names.nickname = 'Fighting Irish';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/notre_dame.png';
          break;
        case 'Ohio St.':
          this.data.games[i].game.home.names.short = 'Ohio State';
          this.data.games[i].game.home.names.nickname = 'Buckeyes';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/ohio_state.png';
          break;
        case 'Omaha':
          this.data.games[i].game.home.names.nickname = 'Mavericks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/omaha.png';
          break;
        case 'Penn St.':
          this.data.games[i].game.home.names.short = 'Penn State';
          this.data.games[i].game.home.names.nickname = 'Nittany Lions';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/penn_state.png';
          break;
        case 'Princeton':
          this.data.games[i].game.home.names.nickname = 'Tigers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/princeton.png';
          break;
        case 'Providence':
          this.data.games[i].game.home.names.nickname = 'Friars';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/providence.png';
          break;
        case 'Quinnipiac':
          this.data.games[i].game.home.names.nickname = 'Bobcats';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/quinnipiac.png';
          break;
        case 'RIT':
          this.data.games[i].game.home.names.nickname = 'Tigers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/rit.png';
          break;
        case 'Rensselaer':
          this.data.games[i].game.home.names.nickname = 'Engineers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/rensselaer.png';
          break;
        case 'Sacred Heart':
          this.data.games[i].game.home.names.nickname = 'Pioneers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/sacred_heart.png';
          break;
        case 'St. Cloud St.':
          this.data.games[i].game.home.names.short = 'St. Cloud State';
          this.data.games[i].game.home.names.nickname = 'Huskies';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/st_cloud_state.png';
          break;
        case 'St. Lawrence':
          this.data.games[i].game.home.names.nickname = 'Saints';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/st_lawrence.png';
          break;
        case 'St. Thomas (MN)':
          this.data.games[i].game.home.names.short = 'St. Thomas';
          this.data.games[i].game.home.names.nickname = 'Tommies';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/st_thomas.png';
          break;
        case 'UConn':
          this.data.games[i].game.home.names.nickname = 'Huskies';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/uconn.png';
          break;
        case 'Massachusetts':
          this.data.games[i].game.home.names.short = 'UMass';
          this.data.games[i].game.home.names.nickname = 'Minutemen';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/umass.png';
          break;
        case 'UMass Lowell':
          this.data.games[i].game.home.names.short = 'UMass Lowell';
          this.data.games[i].game.home.names.nickname = 'Riverhawks';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/umass_lowell.png';
          break;
        case 'Union (NY)':
          this.data.games[i].game.home.names.short = 'Union';
          this.data.games[i].game.home.names.nickname = 'Dutchmen';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/union.png';
          break;
        case 'Vermont':
          this.data.games[i].game.home.names.nickname = 'Catamounts';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/vermont.png';
          break;
        case 'Western Mich.':
          this.data.games[i].game.home.names.short = 'Western Michigan';
          this.data.games[i].game.home.names.nickname = 'Broncos';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/western_michigan.png';
          break;
        case 'Wisconsin':
          this.data.games[i].game.home.names.nickname = 'Badgers';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/wisconsin.png';
          break;
        case 'Yale':
          this.data.games[i].game.home.names.nickname = 'Bulldogs';
          this.data.games[i].game.home.logo =
            'http://cheese-industries.com/img/ncaah/yale.png';
          break;
      }
    }
  }
}
