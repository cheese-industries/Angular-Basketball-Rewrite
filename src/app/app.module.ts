import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NbaComponent } from './modules/basketball/components/nba/nba.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NcaamenComponent } from './modules/basketball/components/ncaamen/ncaamen.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NcaawomenComponent } from './modules/basketball/components/ncaawomen/ncaawomen.component';
import { GLeagueComponent } from './modules/basketball/components/g-league/g-league.component';
import { WnbaComponent } from './modules/basketball/components/wnba/wnba.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { BasketballModule } from './modules/basketball/basketball.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GameDetailsComponent } from './game-details/game-details.component';
import { BasketballComponent } from './modules/basketball/components/basketball/basketball.component';




@NgModule({
  declarations: [
    AppComponent,
    NbaComponent,
    NcaamenComponent,
    NcaawomenComponent,
    GLeagueComponent,
    WnbaComponent,
    GameDetailsComponent,
    BasketballComponent
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
    BasketballModule,
    MatAutocompleteModule
    ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
