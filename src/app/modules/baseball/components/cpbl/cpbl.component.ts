import { CpblService } from '../../cpbl.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cpbl',
  templateUrl: './cpbl.component.html',
  styleUrls: ['./cpbl.component.css'],
})
export class CpblComponent implements OnInit {
  cpblData!: any;
  defaultDate!: string;
  todaysDate!: Date;
  todaysDateArray!: any[];
  playersArray: string[] = [];
  todaysGamesArray: any[] = [];

  constructor(private dataService: CpblService) {}

  ngOnInit(): void {
    this.setTheDefaultDate();
    this.getTheCpblData(this.defaultDate);
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
      '-' +
      this.todaysDateArray[1] +
      '-' +
      this.todaysDateArray[2];
  }

  getTheCpblData(date: string) {
    const subscription = this.dataService
      .getCpblData(date)
      .subscribe((response) => {
        this.cpblData = response;
        console.log(this.cpblData.service.scoreboard);
        this.playersArray = this.cpblData.service.scoreboard.players;
        this.todaysGamesArray = Object.entries(
          this.cpblData.service.scoreboard.games
        );
        console.log(this.todaysGamesArray);
        for (var i = 0; i < this.todaysGamesArray.length; i++) {
          this.todaysGamesArray[i][1].start_time_local = new Date(this.todaysGamesArray[i][1].start_time)
          let gameID = this.todaysGamesArray[i][0];
          let pitcherNames =
            this.cpblData.service.scoreboard.gamebyline[gameID];
          if (pitcherNames.winning_pitcher) {
            let winObject =
              this.cpblData.service.scoreboard.players[
                pitcherNames.winning_pitcher.player_id
              ];
            this.todaysGamesArray[i][1].winning_pitcher =
              this.convertNamesToEnglish(winObject.display_name);
            this.todaysGamesArray[i][1].winning_pitcher =
              'W: ' +
              this.todaysGamesArray[i][1].winning_pitcher +
              ' (' +
              pitcherNames.winning_pitcher.stats[0].value +
              '-' +
              pitcherNames.winning_pitcher.stats[1].value +
              ')';
            let lossObject =
              this.cpblData.service.scoreboard.players[
                pitcherNames.losing_pitcher.player_id
              ];
            this.todaysGamesArray[i][1].losing_pitcher =
              this.convertNamesToEnglish(lossObject.display_name);
            this.todaysGamesArray[i][1].losing_pitcher =
              'L: ' +
              this.todaysGamesArray[i][1].losing_pitcher +
              ' (' +
              pitcherNames.losing_pitcher.stats[0].value +
              '-' +
              pitcherNames.losing_pitcher.stats[1].value +
              ')';
          }
          if (pitcherNames.saving_pitcher) {
            let saveObject =
              this.cpblData.service.scoreboard.players[
                pitcherNames.saving_pitcher.player_id
              ];
            this.todaysGamesArray[i][1].saving_pitcher =
              this.convertNamesToEnglish(saveObject.display_name);
            this.todaysGamesArray[i][1].saving_pitcher =
              'S: ' +
              this.todaysGamesArray[i][1].saving_pitcher +
              ' (' +
              pitcherNames.saving_pitcher.stats[2].value +
              ')';
          }
        }
        console.log(this.todaysGamesArray);
        this.insertTeamNames();
        this.getTeamRecords();
        subscription.unsubscribe;
      });
  }

  convertNamesToEnglish(name: string) {
    switch (name) {
      case '林吳晉瑋':
        return 'Lin Wu Chin-Wei';
      case '林詠翔':
        return 'Lin Yung-Hsiang';
      case '蘇俊璋':
        return 'Su Chun-Chang';
      case '陳禹勳':
        return 'Chen Yu-Hsun';
      case '游宗儒':
        return 'Yu Tsung-Ju';
      case '陳子豪':
        return 'Chen Tzu-Hao';
      case '林哲瑄':
        return 'Lin Che-Hsuan';
      case '林孝程':
        return 'Lin Hsiao-Cheng';
      case '李聖裕':
        return 'Li Sheng-Yu';
      case '林子豪':
        return 'Lin Tzu-Hao';
      case '郭天信':
        return 'Kuo Tien-Hsin';
      case '陳文杰':
        return 'Chen Wen-Chieh';
      case '王勝偉':
        return 'Wang Sheng-Wei';
      case '施冠宇':
        return 'Shih Kuan-Yu';
      case '歐晉':
        return 'Ou Chin';
      case '福來喜':
        return 'Francisco Peña';
      case '黃偉晟':
        return 'Huang Wei-Cheng';
      case '張翔':
        return 'Chang Hsiang';
      case '吉力吉撈．鞏冠':
        return 'Giljegiljaw Kungkuan';
      case '吳明鴻':
        return 'Wu Ming-Hung';
      case '范姜永頡':
        return 'Fang Chiang Yung-Hsieh';
      case '梁家榮':
        return 'Liang Chia-Jung';
      case '郭阜林':
        return 'Kuo Fu-Lin';
      case '林驛騰':
        return 'Lin Yi-Teng';
      case '莊韋恩':
        return 'Chuang Wei-En';
      case '林承飛':
        return 'Lin Cheng-Fei';
      case '唐肇廷':
        return 'Tang Chao-Ting';
      case '張皓緯':
        return 'Chang Hao-Wei';
      case '張志豪':
        return 'Chang Chih-Hao';
      case '蘇煒智':
        return 'Su Wei-Chih';
      case '陳真':
        return 'Chen Zhen';
      case '郭永維':
        return 'Kuo Yung-Wei';
      case '森榮鴻':
        return 'Sen Jung-Hung';
      case '詹智堯':
        return 'Chan Chih-Yao';
      case '羅國龍':
        return 'Luo Guo-Long';
      case '王威晨':
        return 'Wang Wei-Chen';
      case '林益全':
        return 'Lin Yi-Chuan';
      case '李丞齡':
        return 'Li Cheng-Ling';
      case '林辰勳':
        return 'Lin Chen-Hsun';
      case '姚冠瑋':
        return 'Yao Kuan-Wei';
      case '許哲晏':
        return 'Hsu Che-Yen';
      case '黃柏豪':
        return 'Huang Po-Hao';
      case '廖乙忠':
        return 'Liao Yi-Chung';
      case '蔣智賢':
        return 'Chiang Chih-Hsien';
      case '林泓育':
        return 'Lin Hung-Yu';
      case '廖任磊':
        return 'Liao Jen-Lei';
      case '林明杰':
        return 'Lin Ming-Chieh';
      case '江國豪':
        return 'Chiang Kuo-Hao';
      case '陳冠宇':
        return 'Chen Kuan-Yu';
      case '陳韻文':
        return 'Chen Yun-Wen';
      case '陳偉漢':
        return 'Chen Wei-Han';
      case '陳鴻文':
        return 'Chen Hung-Wen';
      case '楊家勝':
        return 'Yang Chia-Sheng';
      case '陳鏞基':
        return 'Chen Yung-Chi';
      case '吳睿勝':
        return 'Wu Jui-Sheng';
      case '魏碩成':
        return 'Wei Shou-Cheng';
      case '王苡丞':
        return 'Wang Yi-Cheng';
      case '蘇俊羽':
        return 'Su Chun-Yu';
      case '邱智呈':
        return 'Chiu Chih-Cheng';
      case '劉宇鈞':
        return 'Liu Yu-Chun';
      case '王凱程':
        return 'Wang Kai-Cheng';
      case '戴云真':
        return 'Tai Yun-Chen';
      case '郭峻偉':
        return 'Kuo Chun-Wei';
      case '劉昱言':
        return 'Liu Yu-Yen';
      case '周思齊':
        return 'Chou Szu-Chi';
      case '林逸翔':
        return 'Lin Yi-Hsiang';
      case '張喜凱':
        return 'Chang Hsi-Kai';
      case '江辰晏':
        return 'Chiang Chen-Yen';
      case '王維中':
        return 'Wang Wei-Chung';
      case '陳志杰':
        return 'Chen Chih-Chieh';
      case '張耿豪':
        return 'Chang Keng-Hao';
      case '游朝惟':
        return 'Yu Chao-Wei';
      case '林子崴':
        return 'Lin Tzu-Wei';
      case '郭郁政':
        return 'Kuo Yu-Cheng';
      case '官大元':
        return 'Kuan Ta-Yuan';
      case '郭俊麟':
        return 'Kuo Chun-Lin';
      case '潘威倫':
        return 'Pan Wei-Lun';
      case '徐若熙':
        return 'Hsu Jo-Hsi';
      case '鄭凱文':
        return 'Cheng Kai-Wen';
      case '陳克羿':
        return 'Chen Ke-Yi';
      case '古林睿煬':
        return 'Gu Lin Ruei-Yang';
      case '江忠城':
        return 'Chiang Chung-Cheng';
      case '林琨笙':
        return 'Lin Kun-Sheng';
      case '翁瑋均':
        return 'Weng Wei-Chun';
      case '吳丞哲':
        return 'Wu Cheng-Che';
      case '吳俊杰':
        return 'Wu Chun-Chieh';
      case '彭識穎':
        return 'Peng Shih-Ying';
      case '藍愷青':
        return 'Lan Kai-Ching';
      case '郭嚴文':
        return 'Kuo Yen-Wen';
      case '李慶隆':
        return 'Li Ching-Lung';
      case '李凱威':
        return 'Li Kai-Wei';
      case '李宗賢':
        return 'Lee Tsung-Hsien';
      case '朱俊祥':
        return 'Chu Chun-Hsiang';
      case '張肇元':
        return 'Chang Chao-Yuan';
      case '全浩瑋':
        return 'Chuan Hao-Wei';
      case '楊晉豪':
        return 'Yang Chin-Hao';
      case '曾琦':
        return 'Tseng Chi';
      case '劉軒荅':
        return 'Liu Hsuan-Ta';
      case '鈦龍':
        return 'Telvin Nash';
      case '許宸銘':
        return 'Hsu Chen-Ming';
      case '蔡鎮宇':
        return 'Tsai Chen-Yu';
      case '陳傑憲':
        return 'Chen Chieh-Hsien';
      case '泰迪':
        return 'Teddy Stankiewicz';
      case '羅薩':
        return 'Wilin Rosario';
      case '張政禹':
        return 'Chang Cheng-Yu';
      case '陽耀勳':
        return 'Yang Yao-Hsun';
      case '葉家淇':
        return 'Yeh Chia-Chi';
      case '劉予承':
        return 'Liu Yu-Cheng';
      case '蔡明憲':
        return 'Tsai Ming-Hsien';
      case '霸林爵':
        return 'Ryan Bollinger';
      case '江亮緯':
        return 'Chiang Liang-Wei';
      case '張仁瑋':
        return 'Chang Jen-Wei';
      case '高國輝':
        return 'Kao Kuo-Hui';
      case '張閔勛':
        return 'Chang Min-Hsun';
      case '鄭鎧文':
        return 'Cheng Kai-Wen';
      case '林旺衛':
        return 'Lin Wang-Wei';
      case '申皓瑋':
        return 'Shen Hao-Wei';
      case '陳俊秀':
        return 'Chen Chun-Hsiu';
      case '楊淳弼':
        return 'Yang Chun-Pi';
      case '莊玉彬':
        return 'Chuang Yu-Pin';
      case '李吳永勤':
        return 'Li Wu Yung-Chin';
      case '陳韋霖':
        return 'Chen Wei-Lin';
      case '林知譽':
        return 'Lin Chih-Yu';
      case '李其峰':
        return 'Lee Chi-Feng';
      case '黃兆維':
        return 'Huang Chao-Wei';
      case '林岱安':
        return 'Lin Dai-An';
      case '林智勝':
        return 'Lin Chih-Sheng';
      case '曾頌恩':
        return 'Tseng Sung-En';
      case '高孝儀':
        return 'Kao Hsiao-Yi';
      case '王溢正':
        return 'Wang I-Cheng';
      case '蘇智傑':
        return 'Su Chih-Chieh';
      case '陳良志':
        return 'Chen Liang-Chih';
      case '張冠廷':
        return 'Chang Kuan-Ting';
      case '狂威':
        return 'Dylan Covey';
      case '林焌翰':
        return 'Lin Chun-Han';
      case '曾傳昇':
        return 'Tseng Chuan-Sheng';
      case '李振昌':
        return 'C.C. Lee';
      case '王尉永':
        return 'Wang Wei-Yung';
      case '許峻暘':
        return 'Hsu Chun-Yang';
      case '張祐銘':
        return 'Chang Yu-Ming';
      case '王正棠':
        return 'Wang Cheng-Tang';
      case '成晉':
        return 'Cheng Chin';
      case '潘傑楷':
        return 'Pan Chieh-Kai';
      case '王順和':
        return 'Wang Shun-Ho';
      case '周奕丞':
        return 'Chou Yi-Cheng';
      case '余德龍':
        return 'Yu Te-Lung';
      case '柯育民':
        return 'Ko Yu-Min';
      case '李展毅':
        return 'Lee Chan-Yi';
      case '王梓安':
        return 'Wang Tzu-An';
      case '楊瑞承':
        return 'Yang Jui-Cheng';
      case '曾仁和':
        return 'Tseng Jen-Ho';
      case '邱浩鈞':
        return 'Chiu Hao-Chun';
      case '鋼龍':
        return 'Drew Gagnon';
      case '林丞軒':
        return 'Lin Cheng-Hsuan';
      case '蘇捷恩':
        return 'Su Chieh-En';
      case '蔡鉦宇':
        return 'Tsai Cheng-Yu';
      case '詹子賢':
        return 'Chan Tzu-Hsien';
      case '林立':
        return 'Lin Li';
      case '林祖傑':
        return 'Lin Tzu-Chieh';
      case '呂偉晟':
        return 'Lu Wei-Cheng';
      case '温展樂':
        return 'Wen Chan-Le';
      case '索沙':
        return 'Henry Sosa';
      case '黃竣彥':
        return 'Huang Chun-Yen';
      case '呂詠臻':
        return 'Lu Yung-Chen';
      case '鄭佳彥':
        return 'Cheng Chia-Yen';
      case '王躍霖':
        return 'Wang Yao-Lin';
      case '王鏡銘':
        return 'Wang Ching-Ming';
      case '廖文揚':
        return 'Liao Wen-Yang';
      case '陳家駒':
        return 'Chen Chia-Chu';
      case '傅于剛':
        return 'Fu Yu-Kang';
      case '趙璟榮':
        return 'Chao Ching-Jung';
      case '林書逸':
        return 'Lin Shu-Yi';
      case '胡冠俞':
        return 'Hu Kuan-Yu';
      case '林威志':
        return 'Lin Wei-Chih';
      case '布里悍':
        return 'Jake Brigham';
      case '霸帝士':
        return 'Xavier Batista';
      case '羅昂':
        return 'Logan Ondrusek';
      case '陳思仲':
        return 'Chen Ssu-Chung';
      case '葉竹軒':
        return 'Yeh Chu-Hsuan';
      case '馮健庭':
        return 'Feng Chien-Ting';
      case '施子謙':
        return 'Shih Tzu-Chien';
      case '楊鈺翔':
        return 'Yang Yu-Hsiang';
      case '德保拉':
        return 'José De Paula';
      case '范國宸':
        return 'Fan Kuo-Chen';
      case '邱駿威':
        return 'Chiu Chun-Wei';
      case '羅暐捷':
        return 'Lo Wei-Chieh';
      case '劉基鴻':
        return 'Liu Chi-Hung';
      case '林志綱':
        return 'Lin Chih-Kang';
      case '范玉禹':
        return 'Fan Yu-Yu';
      case '許禹壕':
        return 'Hsu Yu-Hao';
      case '陳統恩':
        return 'Chen Tung-En';
      case '岳少華':
        return 'Yueh Shao-Hua';
      case '賴鴻誠':
        return 'Lai Hung-Cheng';
      case '林航':
        return 'Lin Hang';
      case '林逸達':
        return 'Lin Yi-Ta';
      case '余謙':
        return 'Yu Chien';
      case '范米特':
        return 'Joe Van Meter';
      case '張明翔':
        return 'Chang Ming-Hsiang';
      case '蔡齊哲':
        return 'Tsai Chi-Che';
      case '吳世豪':
        return 'Wu Shih-Hao';
      case '布雷克':
        return 'Brock Dykxhoorn';
      case '邱辰':
        return 'Chiu Chen';
      case '于森旭':
        return 'Yu Sen-Hsu';
      case '賴知頎':
        return 'Lai Chih-Chi';
      case '胡金龍':
        return 'Hu Chin-Lung';
      case '張偉聖':
        return 'Chang Wei-Sheng';
      case '伍鐸':
        return 'Bryan Woodall';
      case '吳家洋':
        return 'Wu Chia-Yang';
      case '何恆佑':
        return 'Ho Heng-Yu';
      case '王奕凱':
        return 'Wang Yi-Kai';
      case '李建勲':
        return 'Lee Chien-Hsun';
      case '林子崴':
        return 'Lin Tzu-Wei';
      case '象魔力':
        return 'Shawn Morimando';
      case '王詩聰':
        return 'Wang Shih-Tsung';
      case '李承禎':
        return 'Li Cheng-Chen';
      case '潘武雄':
        return 'Pan Wu-Hsiung';
      case '高淮安':
        return 'Kao Huai-An';
      case '楊志龍':
        return 'Yang Chih-Lung';
      case '黃東淯':
        return 'Huang Tung-Yu';
      case '歐書誠':
        return 'Ou Shu-Chen';
      case '吳承諭':
        return 'Wu Cheng-Yu';
      case '拿莫．伊漾':
        return 'Namoh Iyang';
      case '呂彥青':
        return 'Lu Yen-Ching';
      case '廖健富':
        return 'Liao Chien-Fu';
      case '胡智為':
        return 'Hu Chih-Wei';
      case '曾陶鎔':
        return 'Tseng Tao-Jung';
      case '陳冠勳':
        return 'Chen Kuan-Hsun';
      case '林原裕':
        return 'Lin Yuan-Yu';
      case '陳冠偉':
        return 'Chen Kuan-Wei';
      case '黃鈞麟':
        return 'Huang Chun-Lin';
      case '曾峻岳':
        return 'Tseng Jyun-Yue';
      case '鄭鈞仁':
        return 'Cheng Chun-Jen';
      case '劉時豪':
        return 'Liu Shih-Hao';
      case '王政順':
        return 'Wang Cheng-Shun';
      case '蕭憶銘':
        return 'Hsiao Yi-Ming';
      case '豪勁':
        return 'Bradin Hagens';
      case '吳東融':
        return 'Wu Tung-Jung';
      case '陳琥':
        return 'Chen Hu';
      case '林奕豪':
        return 'Lin Yi-Hao';
      case '嚴宏鈞':
        return 'Yen Hung-Chun';
      case '吳桀睿':
        return 'Wu Chieh-Jui';
      case '潘志芳':
        return 'Pan Chih-Fang';
      case '謝修銓':
        return 'Hsieh Hsiu-Chuan';
      case '蔣少宏':
        return 'Chiang Shao-Hung';
      case '黃恩賜':
        return 'Huang En-Sih';
      case '王志煊':
        return 'Wang Chih-Hsuan';
      case '林靖凱':
        return 'Lin Ching-Kai';
      case '林威廷':
        return 'Lin Wei-Ting';
      case '高宇杰':
        return 'Kao Yu-Chieh';
      case '林政華':
        return 'Lin Cheng-Hua';
      case '陳重羽':
        return 'Chen Chung-Yu';
      case '吳秉恩':
        return 'Wu Ping-En';
      case '黃韋盛':
        return 'Huang Wei-Cheng';
      case '李子強':
        return 'Lee Tzu-Chiang';
      case '陳重廷':
        return 'Chen Chung-Ting';
      case '辛元旭':
        return 'Hsin Yuan-Hsu';
      case '姚雨翔':
        return 'Yao Yu-Hsiang';
      case '曹祐齊':
        return 'Tsao Yu-Chi';
      case '馬鋼':
        return 'Ma Kang';
      case '萬昭清':
        return 'Wan Chao-Ching';
      case '高國慶':
        return 'Kao Kuo-Ching';
      case '羅華韋':
        return 'Lo Hua-Wei';
      case '張志強':
        return 'Chang Chih-Chiang';
      case '張進德':
        return 'Jhang Jin-De';
      case '黃子鵬':
        return 'Huang Tzu-Peng';
      case '方建德':
        return 'Fang Chien-Te';
      case '董秉軒':
        return 'Tung Ping-Hsuan';
      case '朱益生':
        return 'Chu Yi-Sheng';
      case '杜家明':
        return 'Tu Chia-Ming';
      case '江少慶':
        return 'Chiang Shao-Ching';
      case '林子昱':
        return 'Lin Tzu-Yu';
      case '張聖豪':
        return 'Chang Sheng-Hao';
      case '張瑞麟':
        return 'Chang Jui-Lin';
      case '石翔宇':
        return 'Shih Hsiang-Yu';
      case '李家成':
        return 'Lee Chia-Cheng';
      case '許基宏':
        return 'Hsu Chi-Hung';
      case '楊彬':
        return 'Yang Bin';
      case '邱家慶':
        return 'Chiu Chia-Ching';
      case '柯瑞':
        return 'Keury Mella';
      case '張鈞守':
        return 'Chang Chun-Shou';
      case '林瑞鈞':
        return 'Lin Jui-Chun';
      case '張竣凱':
        return 'Chang Chun-Kai';
      case '陳明軒':
        return 'Chen Ming-Hsuan';
      case '劉崇聖':
        return 'Liu Chung-Sheng';
      case '莊昕諺':
        return 'Chuang Hsin-Yen';
      case '林安可':
        return 'Lin An-Ko';
      case '陳震洋':
        return 'Chen Jen-Yang';
      case '董子恩':
        return 'Tung Tzu-En';
      case '謝榮豪':
        return 'Hsieh Jung-Hao';
      case '洪聖欽':
        return 'Hung Sheng-Chin';
      case '林智平':
        return 'Lin Chih-Ping';
      case '姚杰宏':
        return 'Yao Chieh-Hung';
      case '游霆崴':
        return 'Yu Ting-Wei';
      case '陳仕朋':
        return 'Chen Shih-Peng';
      case '張祐嘉':
        return 'Chang Yu-Chia';
      case '黃鈞聲':
        return 'Huang Chun-Sheng';
      case '孔念恩':
        return 'Kung Nien-En';
      case '黃敬瑋':
        return 'Huang Ching-Wei';
      case '陳柏豪':
        return 'Chen Po-Hao';
      case '張宥鈞':
        return 'Chang Yu-Chun';
      case '黃弘毅':
        return 'Huang Hung-Yi';
      case '楊強森':
        return 'Yang Chiang-Sen';
      case '張梓軒':
        return 'Chang Tzu-Hsuan';
      case '劉貴元':
        return 'Liu Kuei-Yuan';
      case '劉俊豪':
        return 'Liu Chun-Hao';
      case '朱育賢':
        return 'Chu Yu-Hsien';
      case '邱丹':
        return 'Chiu Tan';
      case '李承鴻':
        return 'Lee Cheng-Hung';
      case '劉家愷':
        return 'Liu Chia-Kai';
      case '宋晟睿':
        return 'Sung Cheng-Jui';
      case '藍寅倫':
        return 'Lan Yin-Lun';
      case '洪瑋漢':
        return 'Hung Wei-Han';
      case '周委宏':
        return 'Chou Wei-Hung';
      case '毛英傑':
        return 'Mao Ying-Chieh';
      case '江坤宇':
        return 'Chiang Kun-Yu';
      case '楊孟沅':
        return 'Yang Meng-Yuan';
      case '王玉譜':
        return 'Wang Yu-Pu';
      case '岳政華':
        return 'Yueh Cheng-Hua';
      case '范柏絜':
        return 'Fan Po-Chieh';
      case '吳哲源':
        return 'Wu Che-Yuan';
      case '林楷錡':
        return 'Lin Kai-Chi';
      case '劉志宏':
        return 'Liu Chih-Hung';
      case '陳品捷':
        return 'Chen Pin-Chieh';
      case '吳俊偉':
        return 'Wu Chun-Wei';
      case '林柏佑':
        return 'Lin Po-Yu';
      case '馬傑森':
        return 'Ma Chieh-Sen';
      case '楊竣翔':
        return 'Yang Chun-Hsiang';
      case '戴培峰':
        return 'Dai Pei-Feng';
      case '江承峰':
        return 'Chiang Cheng-Feng';
      case '蘇緯達':
        return 'Su Wei-Ta';
      case '艾思凱':
        return 'Luis Escobar';
      case '何逸龍':
        return 'Ho I-Lung';
      case '鍾玉成':
        return 'Chung Yu-Cheng';
      case '岳東華':
        return 'Yueh Tung-Hua';
      case '高國麟':
        return 'Kao Kuo-Lin';
      case '陳晨威':
        return 'Chen Chen-Wei';
      case '江國謙':
        return 'Chiang Kuo-Chien';
      case '魏全':
        return 'Wei Chuan';
      case '周磊':
        return 'Chou Lei';
      case '林澤彬':
        return 'Lin Tse-Pin';
      case '李承風':
        return 'Lee Cheng-Feng';
      case '李榕津':
        return 'Li Jung-Chin';
      case '林瑞祥':
        return 'Lin Jui-Hsiang';
      case '劉家誠':
        return 'Liu Chia-Cheng';
      case '藍震威':
        return 'Lan Chen-Wei';
      default:
        return '';
    }
  }

  insertTeamNames() {
    for (var i = 0; i < this.todaysGamesArray.length; i++) {
      switch (this.todaysGamesArray[i][1].home_team_id) {
        case 'cpbl.t.1':
          this.todaysGamesArray[i][1].home_team_name = 'Chinatrust Brothers';
          break;
        case 'cpbl.t.2':
          this.todaysGamesArray[i][1].home_team_name =
            'Uni-President 7-Eleven Lions';
          break;
        case 'cpbl.t.5':
          this.todaysGamesArray[i][1].home_team_name = 'Fubon Guardians';
          break;
        case 'cpbl.t.6':
          this.todaysGamesArray[i][1].home_team_name = 'Rakuten Monkeys';
          break;
        case 'cpbl.t.7':
          this.todaysGamesArray[i][1].home_team_name = 'Wei Chuan Dragons';
          break;
      }
      switch (this.todaysGamesArray[i][1].away_team_id) {
        case 'cpbl.t.1':
          this.todaysGamesArray[i][1].away_team_name = 'Chinatrust Brothers';
          break;
        case 'cpbl.t.2':
          this.todaysGamesArray[i][1].away_team_name =
            'Uni-President 7-Eleven Lions';
          break;
        case 'cpbl.t.5':
          this.todaysGamesArray[i][1].away_team_name = 'Fubon Guardians';
          break;
        case 'cpbl.t.6':
          this.todaysGamesArray[i][1].away_team_name = 'Rakuten Monkeys';
          break;
        case 'cpbl.t.7':
          this.todaysGamesArray[i][1].away_team_name = 'Wei Chuan Dragons';
          break;
      }
    }
    console.log(this.todaysGamesArray);
  }

  getTeamRecords() {
    for (var i = 0; i < this.todaysGamesArray.length; i++) {
      console.log(this.todaysGamesArray[i][1].home_team_id)
      console.log()
      this.todaysGamesArray[i][1].home_team_record = this.cpblData.service.scoreboard.teamrecord[this.todaysGamesArray[i][1].home_team_id];
      this.todaysGamesArray[i][1].away_team_record = this.cpblData.service.scoreboard.teamrecord[this.todaysGamesArray[i][1].away_team_id];
    }

  }
}
