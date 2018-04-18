import { Injectable } from '@angular/core';
import {House} from './house.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HouseService {
  selectedHouse: House;
  houseList: House[];
  constructor(private http: Http) { }
  postHouse(hos: House) {
    const body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({'Convert-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
   return this.http.post('http://localhost:51060/api/house', body, requestOptions).map(x => x.json());
  }
  putHouse(id, hos) {
    const body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({'Convert-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions});
   return this.http.post('http://localhost:51060/api/house' + id, body, requestOptions).map(x => x.json());
  }
    getHouseList() {
      this.http.get('http://localhost:51060/api/house')
      .map((data: Response) => {
        return data.json() as House[];
      }).toPromise().then(x => {
        this.houseList = x;
      });
    }
    deleteHouse(id: number) {
      return this.http.delete('http://localhost:51060/api/house/' + id).map(res => res.json());
    }
}
