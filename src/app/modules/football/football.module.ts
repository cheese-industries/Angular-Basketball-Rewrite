import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NflComponent } from './components/nfl/nfl.component';
import { NcaafComponent } from './components/ncaaf/ncaaf.component';
import { CflComponent } from './components/cfl/cfl.component';
import { FcsComponent } from './components/fcs/fcs.component';
import { D23Component } from './components/d23/d23.component';

@NgModule({
  declarations: [
    NflComponent,
    NcaafComponent,
    CflComponent,
    FcsComponent,
    D23Component
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule
  ],
})
export class FootballModule {}
