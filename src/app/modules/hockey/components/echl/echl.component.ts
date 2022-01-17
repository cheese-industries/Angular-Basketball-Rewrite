import { Component, OnInit } from '@angular/core';
import { EchlData } from 'src/app/models/hockey/ahl/echl-data';
import { EchlService } from './echl.service';

@Component({
  selector: 'app-echl',
  templateUrl: './echl.component.html',
  styleUrls: ['./echl.component.css'],
})
export class EchlComponent implements OnInit {
  data!: EchlData;
  events = this.data?.data;
  constructor(private service: EchlService) {}

  ngOnInit(): void {
    this.getTheScores();
    this.setIntrvl();
  }

  setIntrvl() {
    setInterval(() => this.getTheScores(), 30000);
  }

  getTheScores() {
    const subscription = this.service.getGameData().subscribe((response) => {
      this.data = response;
      this.events = this.data.data;
      this.splitTeamNames();
      this.convertDateFormat();
      subscription.unsubscribe();
    });
  }

  convertDateFormat() {
    for (var i = 0; i < this.events.length; i++) {
      let date = JSON.stringify(this.events[i].startDate);
      date = date.substring(1);
      date = date.slice(0, -1);
      let isoDate = new Date(date);
      let isoHour = isoDate.getHours();
      let isoHourForDisplay = JSON.stringify(isoDate.getHours());
      let amPm = 'PM';
      if (isoHour < 12) {
        amPm = 'AM';
      } else {
        isoHour = isoHour - 12;
      }
      if (isoHour < 10) {
        isoHour = +('0' + isoHour);
      }
      let isoMinute = isoDate.getMinutes();
      let isoMinuteForDisplay = JSON.stringify(isoMinute);
      if (isoMinute < 10) {
        isoMinuteForDisplay = '0' + isoMinute;
      }
      let DateString =
        isoDate.getMonth() +
        1 +
        '/' +
        isoDate.getDate() +
        '/' +
        isoDate.getFullYear() +
        ', ' +
        isoHour +
        ':' +
        isoMinuteForDisplay +
        ' ' +
        amPm;
        this.events[i].startDate = DateString;
    }
  }

  splitTeamNames() {
    for (var i = 0; i < this.events.length; i++) {
      switch (this.events[i].teams.away.name) {
        case 'Adirondack Thunder':
          this.events[i].teams.away.city = 'Adirondack';
          this.events[i].teams.away.nickname = 'Thunder';
          break;
        case 'Maine Mariners':
          this.events[i].teams.away.city = 'Maine';
          this.events[i].teams.away.nickname = 'Mariners';
          break;
        case 'Newfoundland Growlers':
          this.events[i].teams.away.city = 'Newfoundland';
          this.events[i].teams.away.nickname = 'Growlers';
          break;
        case 'Reading Royals':
          this.events[i].teams.away.city = 'Reading';
          this.events[i].teams.away.nickname = 'Royals';
          break;
        case 'Trois-Rivières Lions':
          this.events[i].teams.away.city = 'Trois-Rivières';
          this.events[i].teams.away.nickname = 'Lions';
          break;
        case 'Worcester Railers':
          this.events[i].teams.away.city = 'Worcester';
          this.events[i].teams.away.nickname = 'Railers';
          break;

        case 'Atlanta Gladiators':
          this.events[i].teams.away.city = 'Atlanta';
          this.events[i].teams.away.nickname = 'Gladiators';
          break;
        case 'Florida Everblades':
          this.events[i].teams.away.city = 'Florida';
          this.events[i].teams.away.nickname = 'Everblades';
          break;
        case 'Greenville Swamp Rabbits':
          this.events[i].teams.away.city = 'Greenville';
          this.events[i].teams.away.nickname = 'Swamp Rabbits';
          break;
        case 'Jacksonville Icemen':
          this.events[i].teams.away.city = 'Jacksonville';
          this.events[i].teams.away.nickname = 'Icemen';
          break;
        case 'Norfolk Admirals':
          this.events[i].teams.away.city = 'Norfolk';
          this.events[i].teams.away.nickname = 'Admirals';
          break;
        case 'Orlando Solar Bears':
          this.events[i].teams.away.city = 'Orlando';
          this.events[i].teams.away.nickname = 'Solar Bears';
          break;
        case 'South Carolina Stingrays':
          this.events[i].teams.away.city = 'South Carolina';
          this.events[i].teams.away.nickname = 'Stingrays';
          break;

        case 'Cincinnati Cyclones':
          this.events[i].teams.away.city = 'Cincinnati';
          this.events[i].teams.away.nickname = 'Cyclones';
          break;
        case 'Fort Wayne Komets':
          this.events[i].teams.away.city = 'Fort Wayne';
          this.events[i].teams.away.nickname = 'Komets';
          break;
        case 'Indy Fuel':
          this.events[i].teams.away.city = 'Indy';
          this.events[i].teams.away.nickname = 'Fuel';
          break;
        case 'Iowa Heartlanders':
          this.events[i].teams.away.city = 'Iowa';
          this.events[i].teams.away.nickname = 'Heartlanders';
          break;
        case 'Kalamazoo Wings':
          this.events[i].teams.away.city = 'Kalamazoo';
          this.events[i].teams.away.nickname = 'Wings';
          break;
        case 'Toledo Walleye':
          this.events[i].teams.away.city = 'Toledo';
          this.events[i].teams.away.nickname = 'Walleye';
          break;
        case 'Wheeling Nailers':
          this.events[i].teams.away.city = 'Wheeling';
          this.events[i].teams.away.nickname = 'Nailers';
          break;

        case 'Allen Americans':
          this.events[i].teams.away.city = 'Allen';
          this.events[i].teams.away.nickname = 'Americans';
          break;
        case 'Idaho Steelheads':
          this.events[i].teams.away.city = 'Idaho';
          this.events[i].teams.away.nickname = 'Steelheads';
          break;
        case 'Kansas City Mavericks':
          this.events[i].teams.away.city = 'Kansas City';
          this.events[i].teams.away.nickname = 'Mavericks';
          break;
        case 'Rapid City Rush':
          this.events[i].teams.away.city = 'Rapid City';
          this.events[i].teams.away.nickname = 'Rush';
          break;
        case 'Tulsa Oilers':
          this.events[i].teams.away.city = 'Tulsa';
          this.events[i].teams.away.nickname = 'Oilers';
          break;
        case 'Utah Grizzlies':
          this.events[i].teams.away.city = 'Utah';
          this.events[i].teams.away.nickname = 'Grizzlies';
          break;
        case 'Wichita Thunder':
          this.events[i].teams.away.city = 'Wichita';
          this.events[i].teams.away.nickname = 'Thunder';
          break;
        case 'Savannah Ghost Pirates':
          this.events[i].teams.away.city = 'Savannah';
          this.events[i].teams.away.nickname = 'Ghost Pirates';
          break;
      }
      switch (this.events[i].teams.home.name) {
        case 'Adirondack Thunder':
          this.events[i].teams.home.city = 'Adirondack';
          this.events[i].teams.home.nickname = 'Thunder';
          break;
        case 'Maine Mariners':
          this.events[i].teams.home.city = 'Maine';
          this.events[i].teams.home.nickname = 'Mariners';
          break;
        case 'Newfoundland Growlers':
          this.events[i].teams.home.city = 'Newfoundland';
          this.events[i].teams.home.nickname = 'Growlers';
          break;
        case 'Reading Royals':
          this.events[i].teams.home.city = 'Reading';
          this.events[i].teams.home.nickname = 'Royals';
          break;
        case 'Trois-Rivières Lions':
          this.events[i].teams.home.city = 'Trois-Rivières';
          this.events[i].teams.home.nickname = 'Lions';
          break;
        case 'Worcester Railers':
          this.events[i].teams.home.city = 'Worcester';
          this.events[i].teams.home.nickname = 'Railers';
          break;

        case 'Atlanta Gladiators':
          this.events[i].teams.home.city = 'Atlanta';
          this.events[i].teams.home.nickname = 'Gladiators';
          break;
        case 'Florida Everblades':
          this.events[i].teams.home.city = 'Florida';
          this.events[i].teams.home.nickname = 'Everblades';
          break;
        case 'Greenville Swamp Rabbits':
          this.events[i].teams.home.city = 'Greenville';
          this.events[i].teams.home.nickname = 'Swamp Rabbits';
          break;
        case 'Jacksonville Icemen':
          this.events[i].teams.home.city = 'Jacksonville';
          this.events[i].teams.home.nickname = 'Icemen';
          break;
        case 'Norfolk Admirals':
          this.events[i].teams.home.city = 'Norfolk';
          this.events[i].teams.home.nickname = 'Admirals';
          break;
        case 'Orlando Solar Bears':
          this.events[i].teams.home.city = 'Orlando';
          this.events[i].teams.home.nickname = 'Solar Bears';
          break;
        case 'South Carolina Stingrays':
          this.events[i].teams.home.city = 'South Carolina';
          this.events[i].teams.home.nickname = 'Stingrays';
          break;

        case 'Cincinnati Cyclones':
          this.events[i].teams.home.city = 'Cincinnati';
          this.events[i].teams.home.nickname = 'Cyclones';
          break;
        case 'Fort Wayne Komets':
          this.events[i].teams.home.city = 'Fort Wayne';
          this.events[i].teams.home.nickname = 'Komets';
          break;
        case 'Indy Fuel':
          this.events[i].teams.home.city = 'Indy';
          this.events[i].teams.home.nickname = 'Fuel';
          break;
        case 'Iowa Heartlanders':
          this.events[i].teams.home.city = 'Iowa';
          this.events[i].teams.home.nickname = 'Heartlanders';
          break;
        case 'Kalamazoo Wings':
          this.events[i].teams.home.city = 'Kalamazoo';
          this.events[i].teams.home.nickname = 'Wings';
          break;
        case 'Toledo Walleye':
          this.events[i].teams.home.city = 'Toledo';
          this.events[i].teams.home.nickname = 'Walleye';
          break;
        case 'Wheeling Nailers':
          this.events[i].teams.home.city = 'Wheeling';
          this.events[i].teams.home.nickname = 'Nailers';
          break;

        case 'Allen Americans':
          this.events[i].teams.home.city = 'Allen';
          this.events[i].teams.home.nickname = 'Americans';
          break;
        case 'Idaho Steelheads':
          this.events[i].teams.home.city = 'Idaho';
          this.events[i].teams.home.nickname = 'Steelheads';
          break;
        case 'Kansas City Mavericks':
          this.events[i].teams.home.city = 'Kansas City';
          this.events[i].teams.home.nickname = 'Mavericks';
          break;
        case 'Rapid City Rush':
          this.events[i].teams.home.city = 'Rapid City';
          this.events[i].teams.home.nickname = 'Rush';
          break;
        case 'Tulsa Oilers':
          this.events[i].teams.home.city = 'Tulsa';
          this.events[i].teams.home.nickname = 'Oilers';
          break;
        case 'Utah Grizzlies':
          this.events[i].teams.home.city = 'Utah';
          this.events[i].teams.home.nickname = 'Grizzlies';
          break;
        case 'Wichita Thunder':
          this.events[i].teams.home.city = 'Wichita';
          this.events[i].teams.home.nickname = 'Thunder';
          break;
        case 'Savannah Ghost Pirates':
          this.events[i].teams.home.city = 'Savannah';
          this.events[i].teams.home.nickname = 'Ghost Pirates';
          break;
      }
    }
  }
}
