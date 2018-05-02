import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:import-spacing
import {FormsModule} from'@angular/forms';
import {HttpModule} from '@angular/http';
import { TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { HouseComponent } from './houses/house/house.component';
import { HouseListComponent } from './houses/house-list/house-list.component';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    HouseComponent,
    HouseListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
