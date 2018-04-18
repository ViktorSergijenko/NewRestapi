import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { HouseComponent } from './houses/house/house.component';
import { HouseListComponent } from './houses/house-list/house-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    HouseComponent,
    HouseListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
