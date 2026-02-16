import { NpbService } from './../../npb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npb',
  templateUrl: './npb.component.html',
  styleUrls: ['./npb.component.css'],
})
export class NpbComponent implements OnInit {
  npbData!: any[];
  decisionArray?: any[];
  pitcherLine?: string;

  constructor(private service: NpbService) {}

  ngOnInit(): void {
    this.getTheNpbData();
  }

  getTheNpbData() {
    const subscription = this.service.getNpbData().subscribe((response) => {
      this.npbData = response;
      this.npbData[0].pop(); //REMOVES USELESS PROMOTIONAL ARRAY FROM STATS.COM

      this.boldPitcherHeaders();
      this.boldHomeRunHeaders();
      this.populateInfoLines();
      subscription.unsubscribe();
    });
  }

  boldPitcherHeaders() {
    for (var i = 0; i < this.npbData[0].length; i++) {
      for (var j = 3; j < this.npbData[0][i].length; j++) {
        if (typeof this.npbData[0][i][j][0] == 'string') {
          this.npbData[0][i][j][0] = this.npbData[0][i][j][0]
            .replace('W:', '<b>W:</b>')
            .replace('L:', '<b>L:</b>')
            .replace('S:', '<b>S:</b>');
        }
      }
    }
  }

  boldHomeRunHeaders() {
    for (var i = 0; i < this.npbData[0].length; i++) {
      for (var j = 3; j < this.npbData[0][i].length; j++) {
        if (
          typeof this.npbData[0][i][j][0] == 'string' &&
          this.npbData[0][i][j][0].includes(' HR: ')
        ) {
          let tempHrArray = '';
          tempHrArray = this.npbData[0][i][j][0] =
            this.npbData[0][i][j][0].split(' HR: ');
          this.npbData[0][i][j][0] =
            '<b>' + tempHrArray[0] + ' HR: </b>' + tempHrArray[1];
        }
      }
    }
  }

  populateInfoLines() {
    for (var i = 0; i < this.npbData[0].length; i++) {
      let thisGame = this.npbData[0][i];
      if (typeof thisGame[3] !== 'undefined') {
        if (thisGame[3][0].includes('1st:')) {
          let info1Stuff =
            '<div><span><b>Baserunners: </b>' +
            thisGame[3][0] +
            '</span></div><div><span>' +
            thisGame[3][1] +
            ' ' +
            thisGame[3][2] +
            '</span></div>';
          thisGame[3][0] = info1Stuff;
        }
        if (thisGame[3] !== '&nbsp;') {
          let info1Stuff = thisGame[3][0];
          thisGame[3][0] = info1Stuff;
        } else {
          let info1Stuff = '';
          thisGame[3][0] = info1Stuff;
        }
      }
      if (typeof thisGame[4] !== 'undefined') {
        if (thisGame[4][0].includes('At Bat')) {
          let info2Stuff =
            '<div><span><b>At Bat: </b>' + thisGame[4][1] + '</span></div>';
          thisGame[4][0] = info2Stuff;
        }

        if (thisGame[4] !== '&nbsp;') {
          let info2Stuff = thisGame[4][0];
          thisGame[4][0] = info2Stuff;
        } else {
          let info2Stuff = '';
          thisGame[4][0] = info2Stuff;
        }
      }
      if (typeof thisGame[5] !== 'undefined') {
        if (thisGame[5] !== '&nbsp;') {
          let info3Stuff = thisGame[5][0];
        } else {
          let info3Stuff = '';
        }
      }
    }
  }
}
