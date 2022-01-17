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

@NgModule({
  declarations: [AppComponent, GameDetailsComponent, SoccerComponent, AhlComponent, NhlComponent, NcaahComponent, EchlComponent, CricketComponent],
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
