import JSSoup from 'jssoup';
import { KboService } from './../../kbo.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-kbo',
  templateUrl: './kbo.component.html',
  styleUrls: ['./kbo.component.css'],
})
export class KboComponent implements OnInit {
  kboData!: any;
  defaultDate!: number;
  todaysDate!: Date;
  todaysDateArray!: any[];
  gameIdArray: any[] = [];
  gameData!: any;
  kboLinescoreData!: any[];
  seasonID: number = new Date().getFullYear();
  winningPitcherArray: any[] = [];
  losingPitcherArray: any[] = [];
  savingPitcherArray: any[] = [];

  constructor(private service: KboService) {}

  ngOnInit(): void {
    this.setTheDefaultDate();
    this.getTheKboData(this.defaultDate);
  }

  setTheDefaultDate() {
    this.todaysDate = new Date();
    this.todaysDateArray = [, ,];
    this.todaysDateArray[0] = this.todaysDate.getFullYear().toString();
    this.todaysDateArray[1] = this.todaysDate.getMonth() + 1;
    this.todaysDateArray[2] = this.todaysDate.getDate().toString();
    if (this.todaysDateArray[1] < 10) {
      this.todaysDateArray[1] = '0' + this.todaysDateArray[1];
    }
    if (this.todaysDateArray[2] < 10) {
      this.todaysDateArray[2] = '0' + this.todaysDateArray[2];
    }
    this.todaysDateArray[1] = this.todaysDateArray[1].toString();
    this.defaultDate =
      this.todaysDateArray[0] +
      this.todaysDateArray[1] +
      this.todaysDateArray[2];
  }

  getTheKboData(date: number) {
    const subscription = this.service
      .getKboData(this.defaultDate)
      .subscribe((response) => {
        this.kboData = response;
        this.makeArrayOfGameIDs();
        for (var i = 0; i < this.gameIdArray.length; i++) {
          this.getGameData(this.seasonID, this.gameIdArray[i]);
        }
        subscription.unsubscribe;
      });
  }

  makeArrayOfGameIDs() {
    this.gameIdArray = [];
    this.winningPitcherArray = [];
    this.losingPitcherArray = [];
    this.savingPitcherArray = [];
    for (var i = 0; i < this.kboData.game.length; i++) {
      this.gameIdArray.push(this.kboData.game[i].G_ID);
      this.seasonID = this.kboData.game[i].SEASON_ID;
      if (this.kboData.game[i].W_PIT_P_ID) {
        this.winningPitcherArray[i] = this.anglifyPitcherNames(
          this.kboData.game[i].W_PIT_P_ID
        );
      } else {
        this.winningPitcherArray[i] = '';
      }
      if (this.kboData.game[i].L_PIT_P_ID) {
        this.losingPitcherArray[i] = this.anglifyPitcherNames(
          this.kboData.game[i].L_PIT_P_ID
        );
      } else {
        this.losingPitcherArray[i] = '';
      }
      if (this.kboData.game[i].SV_PIT_P_ID) {
        this.savingPitcherArray[i] = this.anglifyPitcherNames(
          this.kboData.game[i].SV_PIT_P_ID
        );
      } else {
        this.savingPitcherArray[i] = '';
      }
    }
  }

  getGameData(seasonID: number, gameID: string) {
    this.kboLinescoreData = [];
    const subscription = this.service
      .getGameData(seasonID, gameID)
      .subscribe((response) => {
        this.gameData = response;
        this.gameData.awayScoresByInning = [];
        this.gameData.homeScoresByInning = [];
        this.gameData.awayRHE = [];
        this.gameData.homeRHE = [];
        let table2 = JSON.parse(this.gameData.table2);
        for (var j = 0; j < 12; j++) {
          this.gameData.awayScoresByInning[j] = table2.rows[0].row[j].Text;
        }
        for (var j = 0; j < 12; j++) {
          this.gameData.homeScoresByInning[j] = table2.rows[1].row[j].Text;
        }
        let table3 = JSON.parse(this.gameData.table3);
        this.gameData.awayRHE[0] = table3.rows[0].row[0].Text;
        this.gameData.awayRHE[1] = table3.rows[0].row[1].Text;
        this.gameData.awayRHE[2] = table3.rows[0].row[2].Text;
        this.gameData.homeRHE[0] = table3.rows[1].row[0].Text;
        this.gameData.homeRHE[1] = table3.rows[1].row[1].Text;
        this.gameData.homeRHE[2] = table3.rows[1].row[2].Text;
        this.anglifyTeamNames();
        this.kboLinescoreData.push(this.gameData);
        subscription.unsubscribe;
      });
  }

  anglifyTeamNames() {
    switch (this.gameData.AWAY_NM) {
      case '한화':
        this.gameData.AWAY_NM = 'Hanwha Eagles';
        break;
      case '두산':
        this.gameData.AWAY_NM = 'Doosan Bears';
        break;
      case 'SSG':
        this.gameData.AWAY_NM = 'SSG Landers';
        break;
      case 'NC':
        this.gameData.AWAY_NM = 'NC Dinos';
        break;
      case '삼성':
        this.gameData.AWAY_NM = 'Samsung Lions';
        break;
      case 'KT':
        this.gameData.AWAY_NM = 'KT Wiz';
        break;
      case 'LG':
        this.gameData.AWAY_NM = 'LG Twins';
        break;
      case 'KIA':
        this.gameData.AWAY_NM = 'KIA Tigers';
        break;
      case '롯데':
        this.gameData.AWAY_NM = 'Lotte Giants';
        break;
      case '키움':
        this.gameData.AWAY_NM = 'Kiwoom Heroes';
        break;
      default:
        this.gameData.AWAY_NM = this.gameData.AWAY_NM;
        break;
    }
    switch (this.gameData.HOME_NM) {
      case '한화':
        this.gameData.HOME_NM = 'Hanwha Eagles';
        break;
      case '두산':
        this.gameData.HOME_NM = 'Doosan Bears';
        break;
      case 'SSG':
        this.gameData.HOME_NM = 'SSG Landers';
        break;
      case 'NC':
        this.gameData.HOME_NM = 'NC Dinos';
        break;
      case '삼성':
        this.gameData.HOME_NM = 'Samsung Lions';
        break;
      case 'KT':
        this.gameData.HOME_NM = 'KT Wiz';
        break;
      case 'LG':
        this.gameData.HOME_NM = 'LG Twins';
        break;
      case 'KIA':
        this.gameData.HOME_NM = 'KIA Tigers';
        break;
      case '롯데':
        this.gameData.HOME_NM = 'Lotte Giants';
        break;
      case '키움':
        this.gameData.HOME_NM = 'Kiwoom Heroes';
        break;
      default:
        this.gameData.HOME_NM = this.gameData.HOME_NM;
        break;
    }
  }

  anglifyPitcherNames(pitcher_id_number: number) {
    switch (pitcher_id_number) {
      case 50040:
        return 'Odrisamer Despaigne';
      case 50404:
        return 'David Buchanan';
      case 50815:
        return 'Nicholas Kingham';
      case 51257:
        return 'Ariel Miranda';
      case 51722:
        return 'Ryan Carpenter';
      case 51863:
        return 'Wilmer Font';
      case 51967:
        return 'Wesley Parsons';
      case 52145:
        return 'Adam Plutko';
      case 52234:
        return 'Robert Stock';
      case 52308:
        return 'Tyler Eppler';
      case 52457:
        return 'Albert Suarez';
      case 52528:
        return 'Charlie Barnes';
      case 52557:
        return 'Glenn Sparkman';
      case 52637:
        return 'Sean Nolin';
      case 52645:
        return 'Ronnie Williams';
      case 52833:
        return 'Ivan Nova';
      case 69032:
        return 'William Cuevas';
      case 69103:
        return 'Casey Kelly';
      case 69343:
        return 'Eric Jokisch';
      case 69940:
        return 'Drew Rucinski';
      case 50030:
        return 'So Hyeong Jun';
      case 50036:
        return 'Lee Kang Jun';
      case 50126:
        return 'Lee Min Ho';
      case 50157:
        return 'Kim Yun Sik';
      case 50203:
        return 'Kwon Hwi';
      case 50296:
        return 'Cho Je Young';
      case 50354:
        return 'Lee Jong Min';
      case 50360:
        return 'Kim Dong Hyeok';
      case 50393:
        return 'Kim Dong Uk';
      case 50397:
        return 'Park Gwan Jin';
      case 50441:
        return 'Hwang Dong Jae';
      case 50449:
        return 'Heo Yun Dong';
      case 50464:
        return 'Lee Seung Min';
      case 50556:
        return 'Choi Jun Yong';
      case 50563:
        return 'Park Jae Min';
      case 50650:
        return 'Choi Yong Jun';
      case 50662:
        return 'Jung Hai Young';
      case 50705:
        return 'Kang Jae Min';
      case 50720:
        return 'Nam Ji Min';
      case 50726:
        return 'Han Seung Ju';
      case 50758:
        return 'Shin Jee Hoo';
      case 50859:
        return 'Oh Won Seok';
      case 50992:
        return 'Kim Tae Gyeong';
      case 50995:
        return 'Jung Ku Bum';
      case 51057:
        return 'Shin Bum Joon';
      case 51058:
        return 'Han Cha Hyeon';
      case 51060:
        return 'Ji Myeong Seong';
      case 51111:
        return 'Song Seung Ki';
      case 51143:
        return 'Kang Hyo Jong';
      case 51264:
        return 'Choi Seung Yong';
      case 51294:
        return 'Kim Do Yun';
      case 51301:
        return 'Kim Seong Jin';
      case 51359:
        return 'Jang Jae Young';
      case 51393:
        return 'Kim Joon Hyoung';
      case 51454:
        return 'Lee Seung Hyun';
      case 51460:
        return 'Lee Jae Hee';
      case 51462:
        return 'Hong Moo Won';
      case 51516:
        return 'Kim Jin Uk';
      case 51546:
        return 'Jeong Woo Jun';
      case 51586:
        return 'Kim Chang Hoon';
      case 51594:
        return 'Song Jae Young';
      case 51645:
        return 'Park Kun Woo';
      case 51648:
        return 'Lee Eui Lee';
      case 51665:
        return 'Jang Min Gi';
      case 51668:
        return 'Lee Seung Jae';
      case 51713:
        return 'Kim Kyu Yeon';
      case 51715:
        return 'Kim Ki Joong';
      case 51796:
        return 'Cho Eun';
      case 51809:
        return 'Cho Yo Han';
      case 51867:
        return 'Kim Keon Woo';
      case 51895:
        return 'Jang Ji Hun';
      case 51897:
        return 'Jo Byeong Hyeon';
      case 51901:
        return 'Kim Jin Woo';
      case 51948:
        return 'Lee Yong Jun';
      case 52060:
        return 'Park Yeong Hyun';
      case 52063:
        return 'Lee Sang Woo';
      case 52065:
        return 'Han Ji Woong';
      case 52140:
        return 'Kim Ju Wan';
      case 52149:
        return 'Cho Won Tae';
      case 52163:
        return 'Choi Yong Ha';
      case 52168:
        return 'Lee Ji Hoon';
      case 52202:
        return 'Yun Tae Ho';
      case 52203:
        return 'Jung Yoo Seok';
      case 52295:
        return 'Lee Won Jae';
      case 52330:
        return 'Ju Seung Woo';
      case 52391:
        return 'Song Jung In';
      case 52394:
        return 'Noh Un Hyun';
      case 52397:
        return 'Lee Myeong Jong';
      case 52440:
        return 'Shin Jeong Hwan';
      case 52460:
        return 'Kim Seo Jun';
      case 52530:
        return 'Lee Min Seok';
      case 52558:
        return 'Jin Seung Hyun';
      case 52639:
        return 'Choi Ji Min';
      case 52659:
        return 'Kang Byoung Woo';
      case 52661:
        return 'Kim Chan Min';
      case 52701:
        return 'Moon Dong Ju';
      case 52731:
        return 'Park Jun Yeong';
      case 52844:
        return 'Kim Do Hyun';
      case 52864:
        return 'Park Sang Hoo';
      case 52867:
        return 'Yun Tae Hyeon';
      case 52873:
        return 'Shin Heon Min';
      case 52901:
        return 'Lee Ju Hyung';
      case 52902:
        return 'Lim Ji Min';
      case 52903:
        return 'Cho Min Suk';
      case 52994:
        return 'Park Dong Soo';
      case 52995:
        return 'Kim Nok Won';
      case 60140:
        return 'Shin Jung Rak';
      case 60146:
        return 'Lee Seung Hyun';
      case 60181:
        return 'Kim Ji Yong';
      case 60263:
        return 'Lee Jae Hak';
      case 60336:
        return 'Moon Sung Hyun';
      case 60337:
        return 'Kim Dae Yu';
      case 60339:
        return 'Kim Geon Tae';
      case 60559:
        return 'Park Si Young';
      case 60768:
        return 'Lee Tae Yang';
      case 60841:
        return 'Park Jong Hun';
      case 61101:
        return 'Im Chan Kyu';
      case 61145:
        return 'Lee Woo Chan';
      case 61156:
        return 'Song Yun Jun';
      case 61268:
        return 'Yang Hyun';
      case 61295:
        return 'Kang Dong Yeon';
      case 61365:
        return 'Kim Dae Woo';
      case 61411:
        return 'Sim Chang Min';
      case 61643:
        return 'Hong Geon Hui';
      case 61666:
        return 'Han Seung Hyuk';
      case 61891:
        return 'Lim Jung Woo';
      case 61895:
        return 'Seo Jin Yong';
      case 62146:
        return 'Choi Sung Hoon';
      case 62242:
        return 'Yoon Myung June';
      case 62360:
        return 'Kim Tae Hoon';
      case 62363:
        return 'Han Hyun Hee';
      case 62528:
        return 'Kim Won Jung';
      case 62611:
        return 'Im Jun Seob';
      case 62655:
        return 'Hong Sung Min';
      case 62754:
        return 'Im Gi Yeong';
      case 62869:
        return 'Moon Seung Won';
      case 62920:
        return 'No Sung Ho';
      case 62929:
        return 'Lee Min Ho';
      case 62937:
        return 'Shin Jae Young';
      case 62951:
        return 'Lee Hyeong Beom';
      case 63103:
        return 'Ryu Won Suk';
      case 63145:
        return 'Bae Jae June';
      case 63248:
        return 'Ham Deok Ju';
      case 63292:
        return 'Park So Jun';
      case 63342:
        return 'Cho Sang Woo';
      case 63464:
        return 'Yun Dae Kyung';
      case 63492:
        return 'Lee Jae Ik';
      case 63512:
        return 'Park Jin Hyung';
      case 63543:
        return 'Koo Seung Min';
      case 63628:
        return 'Koh Young Chang';
      case 63638:
        return 'Park Jun Pyo';
      case 63749:
        return 'Lee Chung Ho';
      case 63765:
        return 'Kim Jong Soo';
      case 63894:
        return 'Kim Jeong Bin';
      case 63914:
        return 'Son Jung Wook';
      case 63950:
        return 'Jang Hyun Sik';
      case 63959:
        return 'Lim Jung Ho';
      case 63960:
        return 'Lee Sang Min';
      case 63961:
        return 'Yoon Ho Sol';
      case 64001:
        return 'Ko Young Pyo';
      case 64017:
        return 'Shim Jae Min';
      case 64021:
        return 'Park Se Woong';
      case 64029:
        return 'Ryu Hee Woon';
      case 64041:
        return 'An Hyeon Jun';
      case 64047:
        return 'Jo Hyun Woo';
      case 64051:
        return 'Lee Young Jun';
      case 64350:
        return 'Ha Yeong Min';
      case 64498:
        return 'Koo Jun Bum';
      case 64565:
        return 'Lee In Bok';
      case 64580:
        return 'Kim Jae Yeol';
      case 64596:
        return 'Kim Yu Yeong';
      case 64718:
        return 'Choi Yeong Hwan';
      case 64760:
        return 'Hwang Young Kuk';
      case 64768:
        return 'Jo Yi Hyeon';
      case 64805:
        return 'Lee Seung Jin';
      case 64861:
        return 'Lee Geun Wook';
      case 64893:
        return 'Park Min Ho';
      case 64896:
        return 'Seo Dong Min';
      case 65048:
        return 'Kim Min Su';
      case 65056:
        return 'Um Sang Back';
      case 65057:
        return 'Lee Chang Jae';
      case 65058:
        return 'Jung Sung Gon';
      case 65060:
        return 'Ju Kwon';
      case 65062:
        return 'Kim Jae Yoon';
      case 65067:
        return 'Cho Mu Geun';
      case 65109:
        return 'Baek Seung Hyeon';
      case 65117:
        return 'Lee Sang Kyu';
      case 65241:
        return 'Chae Ji Seon';
      case 65320:
        return 'Choi Won Tae';
      case 65343:
        return 'Kim Taek Hyeong';
      case 65348:
        return 'Park Ju Hyun';
      case 65392:
        return 'Kim Jeong In';
      case 65411:
        return 'Kim Joo On';
      case 65496:
        return 'Hong Joung Woo';
      case 65516:
        return 'Bae Je Seong';
      case 65522:
        return 'Kim Gang Hyun';
      case 65616:
        return 'Lee Min Woo';
      case 65639:
        return 'Park Jung Soo';
      case 65643:
        return 'Moon Kyeong Chan';
      case 65665:
        return 'Lee Jun Young';
      case 65707:
        return 'Joo Hyun Sang';
      case 65764:
        return 'Kim Min Woo';
      case 65769:
        return 'Kim Beom Su';
      case 65844:
        return 'Park Se Wong';
      case 65933:
        return 'Koo Chang Mo';
      case 65949:
        return 'Ryou Jin Oug';
      case 65964:
        return 'Lee Woo Seok';
      case 66018:
        return 'Kim Seon Gi';
      case 66064:
        return 'Kim Tae O';
      case 66160:
        return 'Yu Jae Yu';
      case 66291:
        return 'Lee Young Ha';
      case 66305:
        return 'Park Seung Joo';
      case 66451:
        return 'Choi Chung Yeon';
      case 66492:
        return 'Kim Seung Hyun';
      case 66493:
        return 'Lim Dae Han';
      case 66556:
        return 'Park Seon Woo';
      case 66609:
        return 'Jeon Sang Hyun';
      case 66630:
        return 'Kim Hyun Jun';
      case 66660:
        return 'Nam Ha Jun';
      case 66663:
        return 'Seo Duk Won';
      case 66741:
        return 'Kim Jae Young';
      case 66858:
        return 'Chung Dong Yoon';
      case 67045:
        return 'Jo Byeong Uk';
      case 67048:
        return 'Lee Jung Hyun';
      case 67116:
        return 'Oh Seok Joo';
      case 67119:
        return 'Go Woo Suk';
      case 67143:
        return 'Son Ju Young';
      case 67164:
        return 'Lee Chan Hyeok';
      case 67246:
        return 'Kim Myeong Sin';
      case 67259:
        return 'Moon Dae Won';
      case 67263:
        return 'Choi Won Joon';
      case 67266:
        return 'Park Chi Guk';
      case 67360:
        return 'Oh Yoon Sung';
      case 67365:
        return 'Yang Ki Hyun';
      case 67391:
        return 'Kim Jae Woong';
      case 67419:
        return 'Mon Yong Ik';
      case 67454:
        return 'Ra Won Tak';
      case 67539:
        return 'Na Gyun An';
      case 67603:
        return 'Lee Seung Ho';
      case 67604:
        return 'Kang Yi Jun';
      case 67640:
        return 'Yoo Seung Cheol';
      case 67646:
        return 'Park Jin Tae';
      case 67711:
        return 'Kim Gi Tak';
      case 67828:
        return 'Kim Seong Min';
      case 67954:
        return 'Kim Jin Ho';
      case 67956:
        return 'Kim Tae Hyun';
      case 68036:
        return 'Choi Keon';
      case 68067:
        return 'Shin Byung Ryul';
      case 68220:
        return 'Gwak Been';
      case 68249:
        return 'Park Shin Zi';
      case 68260:
        return 'Hyun Do Hoon';
      case 68341:
        return 'An Woo Jin';
      case 68403:
        return 'Kim Yun Su';
      case 68415:
        return 'Yang Chang Seop';
      case 68501:
        return 'Choi Ha Neul';
      case 68529:
        return 'Lee Seung Heon';
      case 68556:
        return 'Jung Sung Jong';
      case 68585:
        return 'Kim Do Gyu';
      case 68589:
        return 'Kim Dong Woo';
      case 68619:
        return 'Yoon Joong Hyun';
      case 68639:
        return 'Ha Jun Young';
      case 68659:
        return 'Kim Yu Sin';
      case 68797:
        return 'Lee Seung Gwan';
      case 68830:
        return 'Kim Jeong Woo';
      case 68848:
        return 'Cho Sung Hun';
      case 68856:
        return 'Choi Min Jun';
      case 68896:
        return 'Lee Chae Ho';
      case 68900:
        return 'Kim Young Kyu';
      case 68902:
        return 'Shin Min Hyeok';
      case 68928:
        return 'Kim Si Hoon';
      case 69104:
        return 'Nam Ho';
      case 69113:
        return 'Lim Jun Hyeung';
      case 69134:
        return 'Yi Jung Yong';
      case 69159:
        return 'Jung Woo Young';
      case 69213:
        return 'Yun San Heum';
      case 69328:
        return 'Park Ju Seong';
      case 69360:
        return 'Cho Young Gun';
      case 69367:
        return 'Kim In Beom';
      case 69399:
        return 'Yoon Jung Hyun';
      case 69446:
        return 'Won Tae In';
      case 69516:
        return 'Kim Hyeon Su';
      case 69539:
        return 'Seo Jun Won';
      case 69645:
        return 'Jang Ji Su';
      case 69745:
        return 'Kim Do Hyeon';
      case 69762:
        return 'Park Yoon Chul';
      case 69962:
        return 'Song Myung Gi';
      case 72523:
        return 'Ko Hyo Jun';
      case 73117:
        return 'Woo Kyu Min';
      case 73211:
        return 'Noh Kyung Eun';
      case 73738:
        return 'An Young Myung';
      case 73801:
        return 'Song Eun Beom';
      case 74513:
        return 'Jang Won Jun';
      case 74857:
        return 'Jung Woo Ram';
      case 75340:
        return 'Jun Yu Soo';
      case 75421:
        return 'Oh Seung Hwan';
      case 75867:
        return 'Kim Jin Sung';
      case 76118:
        return 'Won Jong Hyan';
      case 76329:
        return 'Lee Hyun Seung';
      case 76430:
        return 'Kim Sang Su';
      case 76455:
        return 'Cha Woo Chan';
      case 76650:
        return 'Jin Hae Soo';
      case 77211:
        return 'Lee Yong Chan';
      case 77263:
        return 'Kim Kang Ryul';
      case 77318:
        return 'Jang Si Hwan';
      case 77446:
        return 'Baek Jung Hyun';
      case 77637:
        return 'Yang Hyeon Jong';
      case 77829:
        return 'Kim Kwang Hyun';
      case 77927:
        return 'Jang Pill Joon';
      case 78148:
        return 'Jeong Chan Heon';
      case 78247:
        return 'Hong Sang Sam';
      case 78352:
        return 'Lim Chang Min';
      case 78517:
        return 'Ha Jun Ho';
      case 78536:
        return 'Kim Dae Woo';
      case 79140:
        return 'Choi Dong Hwan';
      case 79358:
        return 'Kang Yoon Goo';
      case 79545:
        return 'Jin Myung Ho';
      case 79764:
        return 'Jang Min Je';
      case 79847:
        return 'Kim Tae Hoon';
      default:
        return '';
    }
  }

  // soupifyRawKboData() {
  // const soup = new JSSoup(this.rawKboData);
  // let inner: any = soup.find('div.inner');
  // console.log(soup)
  // }
}
