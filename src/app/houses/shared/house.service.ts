import { Injectable } from '@angular/core';
import {House} from './house.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HouseService {
  selectedHouse: House;
  constructor(private http: Http) { }
  postHouse(hos: House) {
    const body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({'Convert-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
   return this.http.post('http://localhost:51060/api/house', body, requestOptions).map(x => x.json());
  }

}
