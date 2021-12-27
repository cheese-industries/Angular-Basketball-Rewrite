import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
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
import { GameDetailsComponent } from './game-details/game-details.component';
import { AppRoutingModule } from './app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NflComponent } from './nfl/nfl.component';
import { MlbComponent } from './mlb/mlb.component';
import { NhlComponent } from './nhl/nhl.component';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    GameDetailsComponent,
    NflComponent,
    MlbComponent,
    NhlComponent
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
  MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
