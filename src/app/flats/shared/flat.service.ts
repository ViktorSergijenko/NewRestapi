import { Injectable } from '@angular/core';
import {Flat} from './flat.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class FlatService {
  selectedFlat : Flat;
  flatList: Flat[];
  constructor(private http: Http) { }
  postFlat(fla: Flat) {
    var body = JSON.stringify(fla); 
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
   return this.http.post('http://localhost:52414/api/Flat', body, requestOptions).map(x => x.json());
  }
  putFlat(id, fla) {
    var body = JSON.stringify(fla); // why i cant use var and let instead of const here?
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions});
   return this.http.put('http://localhost:52414/api/Flat/' + id, body, requestOptions).map(x => x.json());
  }
    getFlatList() {
      this.http.get('http://localhost:52414/api/Flat')
      .map((data: Response) => {
        return data.json() as Flat[];
      }).toPromise().then(x => {
        this.flatList = x;
      });
    }
    deleteFlat(id: number) {
      return this.http.delete('http://localhost:52414/api/House/' + id).map(res => res.json());
    }
}
