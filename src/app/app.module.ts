import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HouseComponent } from './house/house.component';
import { HouseLisComponent } from './houses/house-lis/house-lis.component';
import { HouseListComponent } from './houses/house-list/house-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HouseComponent,
    HouseLisComponent,
    HouseListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
