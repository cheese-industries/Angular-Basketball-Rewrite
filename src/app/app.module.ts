import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GameDetailsComponent } from './game-details/game-details.component';
import { SoccerComponent } from './modules/soccer/components/soccer/soccer.component';
import { AhlComponent } from './modules/hockey/components/ahl/ahl.component';
import { NhlComponent } from './modules/hockey/components/nhl/nhl.component';
import { NcaahComponent } from './modules/hockey/components/ncaah/ncaah.component';
import { EchlComponent } from './modules/hockey/components/echl/echl.component';
import { CricketComponent } from './modules/cricket/cricket.component';
import { NflComponent } from './modules/football/components/nfl/nfl.component';
import { NcaafComponent } from './modules/football/components/ncaaf/ncaaf.component';
import { FcsComponent } from './modules/football/components/fcs/fcs.component';
import { D23Component } from './modules/football/components/d23/d23.component';
import { PgaComponent } from './modules/golf/components/pga/pga.component';
import { LpgaComponent } from './modules/golf/components/lpga/lpga.component';
import { KornFerryTourComponent } from './modules/golf/components/korn-ferry-tour/korn-ferry-tour.component';
import { EuropeanTourComponent } from './modules/golf/components/european-tour/european-tour.component';
import { ChampionsTourComponent } from './modules/golf/components/champions-tour/champions-tour.component';
import { RugbyunionComponent } from './modules/rugbyunion/rugbyunion/rugbyunion.component';
import { NorthAmericaComponent } from './modules/baseball/components/north-america/north-america.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailsComponent,
    SoccerComponent,
    AhlComponent,
    NhlComponent,
    NcaahComponent,
    EchlComponent,
    CricketComponent,
    NflComponent,
    NcaafComponent,
    FcsComponent,
    D23Component,
    PgaComponent,
    LpgaComponent,
    KornFerryTourComponent,
    EuropeanTourComponent,
    ChampionsTourComponent,
    RugbyunionComponent, NorthAmericaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxPaginationModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
