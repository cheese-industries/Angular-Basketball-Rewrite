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
    const subscription = this.service
      .getGameData(dateToFetch)
      .subscribe((response) => {
        this.data = response;
        this.sbData = this.data.content.sbData;
        this.scores = this.sbData.scores;
        this.addMissingLogos();
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
            case 'Aberystwyth':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.aberystwyth.png';
              break;
            case 'Accra Lions':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.accralions.png';
              break;
            case 'AFC Leopards':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.leopards.png';
              break;
            case 'Ashanti Gold':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.ashantigold.png';
              break;
            case 'Atlético Baleares':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/es.atleticobaleares.png';
              break;
            case 'Balzan FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.balzan.jpg';
              break;
            case 'Bandari Mtwara':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.bandari.png';
              break;
            case 'Bhayangkara Surabaya':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.bhayangkara.png';
              break;
            case 'Bibiani Gold Stars':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.bibianigoldstars.png';
              break;
            case 'Bidco United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.bidcounited.png';
              break;
            case 'Caernarfon':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.caernarfon.png';
              break;
            case 'Cefn Druids':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.cefndruids.png';
              break;
            case 'Chiangmai United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.chiangmaiunited.png';
              break;
            case "Connah's Quay":
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.connahsquay.png';
              break;
            case 'Cove Rangers':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.coverangers.png';
              break;
            case 'Dakkada FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ng.dakkada.png';
              break;
            case "DVS'33":
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/nl.dvs.png';
              break;
            case 'FC Arges':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.arges.png';
              break;
            case 'FC Liefering':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/at.liefering.png';
              break;
            case 'Feyenoord Rotterdam':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/nl.feyenoord.png';
              break;
            case 'Floriana FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.floriana.png';
              break;
            case 'Gor Mahia':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.gormahia.png';
              break;
            case 'Great Olympics':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.greatolympics.jpg';
              break;
            case 'Green Buffaloes':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.greenbuffaloes.jpg';
              break;
            case 'Green Eagles':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.greeneagles.png';
              break;
            case 'Gudja United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.gudjaunited.jpg';
              break;
            case 'Gzira United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.gziraunited.jpg';
              break;
            case 'Hamrun Spartans':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.hamrunspartans.png';
              break;
            case 'Hapoel Hadera':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoelhadera.png';
              break;
            case 'Hapoel Kiryat Shmona':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoelkiryatshmona.png';
              break;
            case 'Kabwe Warriors':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.kabwewarriors.png';
              break;
            case 'Kakamega Homeboys':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.kakamega.jpg';
              break;
            case 'Katsina United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ng.katsinaunited.png';
              break;
            case 'KCB':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.kcb.jpg';
              break;
            case 'Larne':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.larne.png';
              break;
            case 'Maccabi Netanya':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.maccabinetanya.png';
              break;
            case 'Madura United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.maduraunited.png';
              break;
            case 'Mathare United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.mathareunited.png';
              break;
            case 'Moadon Sport Ashdod':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.ashdod.png';
              break;
            case 'Mosta FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.mosta.png';
              break;
            case 'Nairobi City Stars':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.nairobicitystars.png';
              break;
            case 'Nkwazi':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.nkwazi.png';
              break;
            case 'Nzoia United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.nzolaunited.png';
              break;
            case 'Penybont FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.penybont.png';
              break;
            case 'Persik Kediri':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/id.persikkediri.png';
              break;
            case 'Power Dynamos':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.powerdynamos.png';
              break;
            case 'Prison Leopards':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.prisonleopards.png';
              break;
            case 'Pumas Tabasco':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mx.pumastabasco.png';
              break;
            case 'Rajasthan United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.rajasthanunited.jpg';
              break;
            case 'Remo Stars':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ng.remostars.png';
              break;
            case 'Rivers United FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ng.riversunited.png';
              break;
            case 'RTU':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.rtu.jpg';
              break;
            case 'Salzburger AK 1914':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/at.salzburgerak.png';
              break;
            case 'Samut Prakan City':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.samutprakan.png';
              break;
            case 'Santa Lucia':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.santalucia.png';
              break;
            case 'Sirens FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.sirens.png';
              break;
            case 'Sliema Wanderers':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/mt.sliemawanderers.png';
              break;
            case 'Sofapaka':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.sofapaka.png';
              break;
            case 'Sreenidi Deccan':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.sreenidideccan.jpg';
              break;
            case 'Stirling Albion':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.stirlingalbion.png';
              break;
            case 'Sudeva':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/in.sudeva.png';
              break;
            case 'Talanta':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.talanta.jpg';
              break;
            case 'Tusker':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.tusker.png';
              break;
            case 'Vihiga Bullets':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.vihigabullets.png';
              break;
            case 'Wazito':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.wazito.png';
              break;
            case 'Wikki Tourists':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ng.wikkitourists.png';
              break;
            case 'Zanaco':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.zanaco.png';
              break;
            case 'Zesco United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.zescounited.png';
              break;
            case 'SKU Ertl Glas Amstetten':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/at.amstetten.png';
              break;
            case 'Kariobangi Sharks':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.kariobangisharks.png';
              break;
            case 'Police United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.police.jpg';
              break;
            case 'Posta Rangers':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.postarangers.jpeg';
              break;
            case 'Ulinzi Stars':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ke.ulinzistars.png';
              break;
            case 'Airdrieonians':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.airdrieonians.png';
              break;
            case 'Annan Athletic':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.annanathletic.png';
              break;
            case 'Clyde':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.clyde.png';
              break;
            case 'Cowdenbeath':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.cowdenbeath.png';
              break;
            case 'Edinburgh City':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.edinburghcity.png';
              break;
            case 'Elgin City':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.elgincity.png';
              break;
            case 'Kelty Hearts':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.keltyhearts.png';
              break;
            case 'Montrose':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.montrose.png';
              break;
            case "Queen's Park":
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.queenspark.jpg';
              break;
            case 'First Vienna FC 1894':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/at.firstvienna.png';
              break;
            case 'Hapoel Haifa':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoelhaifa.png';
              break;
            case 'Hapoel Nof HaGalil':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoelnofhagalil.jpg';
              break;
            case 'Chindia Targoviste':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.chindia.jpg';
              break;
            case 'Voluntari':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.voluntari.png';
              break;
            case 'Chiangrai United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.chiangraiunited.png';
              break;
            case 'Nong Bua Pitchaya':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.nongbua.png';
              break;
            case 'PT Prachuap':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.ptprachuap.png';
              break;
            case 'Auchinleck Talbot':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.auchinlecktalbot.png';
              break;
            case "Banks O'Dee":
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.banksodee.png';
              break;
            case 'Clydebank':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.clydebank.jpg';
              break;
            case 'Darvel':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.darvel.jpg';
              break;
            case 'East Kilbride':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.eastkilbride.png';
              break;
            case 'Flint Town United FC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.flinttown.gif';
              break;
            case 'Glenavon':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.glenavon.png';
              break;
            case 'Haverfordwest':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.haverfordwest.png';
              break;
            case 'Newtown':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.newtown.png';
              break;
            case 'Portadown':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.portadown.png';
              break;
            case 'Buildcon':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.buildcon.jpg';
              break;
            case 'Chambishi':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.chambishi.png';
              break;
            case 'Forest Rangers':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.forestrangers.png';
              break;
            case 'Indeni':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.indeni.jfif';
              break;
            case 'Kafue Celtic':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.kafueceltic.jfif';
              break;
            case 'Nkana':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.nkana.png';
              break;
            case 'Red Arrows':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.redarrows.jpeg';
              break;
            case 'Carrick':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/uk.carrick.png';
              break;
            case 'Kansanshi Dynamos':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.kansanshi.png';
              break;
            case 'Atlético Alagoinhas':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/br.alagoinhas.gif';
              break;
            case 'Altos':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/br.altos.png';
              break;
            case 'Sousa EC':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/br.sousa.png';
              break;
            case 'Asante Kotoko':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.asantekotoko.png';
              break;
            case 'King Faisal Babes':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/gh.kingfaisal.png';
              break;
            case 'Maccabi Petah-Tikva':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.maccabipetachtikva.png';
              break;
            case 'Academica Clinceni':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.academica.png';
              break;
            case 'CS Mioveni':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.mioveni.png';
              break;
            case 'UTA Arad':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.uta.png';
              break;
            case 'Khon Kaen United':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.khonkaen.png';
              break;
            case 'Suphanburi':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/th.suphanburi.png';
              break;
            case 'Konkola Blades':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.konkola.jpg';
              break;
            case 'Lusaka Dynamos':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/zm.lusakadynamos.png';
              break;
            case 'FC Botosani':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.botosani.png';
              break;
            case 'Sepsi Sfantu Gheorghe':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.sepsi.jpg';
              break;
            case 'FC Farul Constanta':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.farul.png';
              break;
            case 'U Craiova 1948':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/ro.craiova.png';
              break;
            case 'Hapoel Tel Aviv':
              this.scores[i].events[j].competitions[0].competitors[
                k
              ].team.logo =
                'http://cheese-industries.com/img/soccer/il.hapoeltelaviv.jpg';
              break;
          }
        }
      }
    }
  }
}
