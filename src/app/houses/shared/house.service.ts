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
    var body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
   return this.http.post('http://localhost:52414/api/House', body, requestOptions).map(x => x.json());
  }
  putHouse(id, hos) {
    var body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions});
   return this.http.put('http://localhost:52414/api/House/' + id, body, requestOptions).map(x => x.json());
  }
    getHouseList() {
      this.http.get('http://localhost:52414/api/House')
      .map((data: Response) => {
        return data.json() as House[];
      }).toPromise().then(x => {
        this.houseList = x;
      });
    }
    deleteHouse(id: number) {
      return this.http.delete('http://localhost:52414/api/House/' + id).map(res => res.json());
    }
}
