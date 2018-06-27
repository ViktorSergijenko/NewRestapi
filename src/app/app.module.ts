import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { HouseComponent } from './houses/house/house.component';
import { HouseListComponent } from './houses/house-list/house-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatsComponent } from './flats/flats.component';
import { FlatComponent } from './flats/flat/flat.component';
import { FlatsListComponent } from './flats/flats-list/flats-list.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentComponent } from './residents/resident/resident.component';
import { ResidentListComponent } from './residents/resident-list/resident-list.component';
import { RouterModule } from '@angular/router';

// all routes that i have in project,when project was opened for the first time,first page that will be loaded is HouseRegister
const routes = [
  { path: '', component: HousesComponent }, // main path-HouseRegister
  { path: 'flats', component: FlatsComponent }, // path to FlatRegister page
  { path: 'residents', component: ResidentsComponent } // path to ResidentRegister
];

@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    HouseComponent,
    HouseListComponent,
    FlatsComponent,
    FlatComponent,
    FlatsListComponent,
    ResidentsComponent,
    ResidentComponent,
    ResidentListComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
