import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basketball';
  league: any = 'nba';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "usa",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/us.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "eng",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/gb-eng.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ger",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/de.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "fra",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/fr.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ita",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/it.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "eu",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/eu.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "rus",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ru.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "jpn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/jp.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "kor",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/kr.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "can",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ca.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "esp",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/es.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "twn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/tw.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "dom",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/do.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "aus",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/au.svg")
    );
  }

setLeague(league: string) {
  this.league = league;
  // console.log(this.league);
}
}
