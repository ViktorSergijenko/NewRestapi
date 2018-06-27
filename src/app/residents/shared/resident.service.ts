import { Injectable } from '@angular/core';
import {Resident} from './resident.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../../flats/shared/flat.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ResidentService {
  selectedResident : Resident;
  residentList: Resident[];
  selectedFlat: Flat;
  flatList:Flat[];
  constructor(private http: Http) { }
  postResident(resi: Resident) {
    var body = JSON.stringify(resi);
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
   return this.http.post('http://localhost:52414/api/Resident', body, requestOptions).map(x => x.json());
  }
  putResident(id, resi) {
    var body = JSON.stringify(resi); // why i cant use var and let instead of const here?
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions});
   return this.http.put('http://localhost:52414/api/Resident/' + id, body, requestOptions).map(x => x.json());
  }
    getResidentList() {
      this.http.get('http://localhost:52414/api/Resident')
      .map((data: Response) => {
        return data.json() as Resident[];
      }).toPromise().then(x => {
        this.residentList = x;
      });
    }
    getFlatListToDropDown() {
      console.log('hi');
      this.http.get('http://localhost:52414/api/Flat')
        .map((data: Response) => {
          return data.json() as Flat[];
        }).toPromise().then(x => {
          this.flatList = x;
        });
    }
    getFlatList(flatid: number) {
      this.http.get('http://localhost:52414/api/Flat/'+ flatid)
      .map((data: Response) => {
       
          return data.json() as Flat;
        }).toPromise().then(x => {
        this.selectedFlat = x;
      });
    }
    deleteResident(id: number) {
      return this.http.delete('http://localhost:52414/api/Resident/' + id).map(res => res.json());
    }
}
