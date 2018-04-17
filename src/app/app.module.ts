import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HouseComponent } from './houses/houses.component';
import { HouseListComponent } from './houses/house-list/house-list.component';


@NgModule({
  declarations: [
    AppComponent,
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
