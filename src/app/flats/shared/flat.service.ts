import { Injectable } from '@angular/core';
import { Flat } from './flat.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { House } from '../../houses/shared/house.model';
import { Resident } from '../../residents/shared/resident.model';
@Injectable()

export class FlatService {
  selectedFlat: Flat = new Flat();
  flatList: Flat[] = [];
  selectedResident: Resident = new Resident();
  residentList: Resident[] = [];
  selectedHouse: House;
  houseList1: House[] = [];
  constructor(private http: Http) { }
  postFlat(flat: Flat) {
    const body = JSON.stringify(flat);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52414/api/Flat', body, requestOptions).map(x => x.json());
  }
  putFlat(id, fla) {
    const body = JSON.stringify(fla); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:52414/api/Flat/' + id, body, requestOptions).map(x => x.json());
  }

  getFlatList() {
    console.log('hi');
    this.http.get('http://localhost:52414/api/Flat')
      .map((data: Response) => {
        return data.json() as Flat[];
      }).toPromise().then(x => {
        this.flatList = x;
      });
  }
  // pri etoj on piwit eto: Uncaught (in promise): TypeError: Cannot read property 'id' of undefined
  // TypeError: Cannot read property 'id' of undefined

  // pri ispolnenii etoj funkcii v konsoli vivodit owibku "cannot find a differ supporting object '[object Object]' of type 'object'.
  // NgFor only supports binding to Iterables such as Arrays.''
  getHouseListForDropDown() {
    this.http.get('http://localhost:52414/api/House')
      .map((data: Response) => {
        return data.json() as House[];
      }).toPromise().then(x => {
        this.houseList1 = x;
      });
  }
  getHouseList2(houseId: number) {
    this.http.get('http://localhost:52414/api/House/' + houseId).subscribe(house => {
      // Ja delaju to-to i to-to
      // potomu-4to
      this.selectedHouse = house.json();
    });


    // .map((data: Response) => {

    //   return data.json() as House;
    // }).toPromise().then(x => {
    //   this.selectedHouse = x;
    // });
  }

  GetResidentListThatLivesInAdditionalFlat(flatid: number) {
    this.http.get('http://localhost:52414/api/Resident/')
      .map((data: Response) => {
        // if(cur.. == )
        return data.json() as Resident[];
      }).toPromise().then(currentResident => {
        this.residentList = currentResident;
      });
  }
  deleteFlat(id: number) {
    return this.http.delete('http://localhost:52414/api/Flat/' + id).map(res => res.json());
  }
}
