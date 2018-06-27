import { Injectable } from '@angular/core';
import { Resident } from './resident.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../../flats/shared/flat.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
// class that contains all values to work with all http request functions(so ye,its also inlude all needed functions to do crud actions)
export class ResidentService {
  selectedResident: Resident; // variable that is Resident type to contain one Object type of Resident
  residentList: Resident[]; // array that will contain all needed Resident Objects
  selectedFlat: Flat; // variable that is Flat type to contain one Object type of Flat
  flatList: Flat[]; // array that will contain all needed Flat Objects
  constructor(private http: Http) { }
  /**
   * Function that sends a post http request to our backend
   * where our database is located,function sends an object that has a Resident type
   * to backend to save it in a database.
   * @param {Resident} resi resi-obejct that has a resident type
   * @returns returns a resident object to backend database
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  postResident(resi: Resident) {
    const body = JSON.stringify(resi);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52414/api/Resident', body, requestOptions).map(x => x.json());
  }
  /**
   * Function that sends a put http request to our backend
   * where our database is located,function sends an object that has a Resident type,
   * we are sending already existing object that was modified to our database on backend so it could
   * change all modefied values in our object and saved them
   * @param {*} id id-id of an object that we want to change(modefy)
   * @param {*} resi resi-obejct that has a resident type
   * @returns returns a resident object to backend database that needs to be modefied
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  putResident(id, resi) {
    const body = JSON.stringify(resi); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:52414/api/Resident/' + id, body, requestOptions).map(x => x.json());
  }
  /**
   * Function that sends a get http request to our backend
   * gets all existing residents from our database and
   * puts them in a array residentList that can contain only objects that have type Resident
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  getResidentList() {
    this.http.get('http://localhost:52414/api/Resident')
      .map((data: Response) => {
        return data.json() as Resident[];
      }).toPromise().then(x => {
        this.residentList = x;
      });
  }
  /**
   * Function that sends a get http request to our backend
   * gets all existing Flats from our database and
   * puts them in a array flatList that can contain only objects that have type Flat
   * this variable is used in dropdown list in Resident register page
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  getFlatListToDropDown() {
    console.log('hi');
    this.http.get('http://localhost:52414/api/Flat')
      .map((data: Response) => {
        return data.json() as Flat[];
      }).toPromise().then(x => {
        this.flatList = x;
      });
  }
  /**
   * Function that sends a get http request to our backend
   * gets certain existing Flats from our database and
   * puts it in a variable selectedFlat that can contain only one objects that have type Flat
   * @param {number} flatid flatid- value in resident class that tell us in what flat does lives our resident
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  getFlatList(flatid: number) {
    this.http.get('http://localhost:52414/api/Flat/' + flatid)
      .map((data: Response) => {
        return data.json() as Flat;
      }).toPromise().then(x => {
        this.selectedFlat = x;
      });
  }
  /**
   * Function that sends a delete http request to our backend
   * where our database is located to delete a specific object that client wants to be deleted
   * @param {number} id id-id of a resident that we want to delete
   * @returns returns an id of our object that we want to be deleted from our database
   * @memberof ResidentService ResidentService-Service that contains all restfull Functions for resident page
   */
  deleteResident(id: number) {
    return this.http.delete('http://localhost:52414/api/Resident/' + id).map(res => res.json());
  }
}
