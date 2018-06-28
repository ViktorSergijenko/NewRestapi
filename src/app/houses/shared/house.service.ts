import { Injectable } from '@angular/core';
import { House } from './house.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../../flats/shared/flat.model';
import { Resident } from '../../residents/shared/resident.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
// class that contains all values to work with all http request functions(so ye,its also inlude all needed functions to do crud actions)
export class HouseService {
  selectedHouse: House; // variable that is House type to contain one Object type of House
  houseList: House[]; // array that will contain all needed House Objects
  selectedFlat: Flat = new Flat(); // variable that is Flat type to contain one Object type of Flat
  flatList: Flat[] = []; // array that will contain all needed Flat Objects
  EmptyflatList: Flat[] = []; // array that will contain an empty array(to clear list)
  SourtedFlats: Flat[] = [];  // array that will contain all needed Flat Objects
  residentList: Resident[] = []; // array that will contain all needed Resident Objects
  SourtedResidents: Resident[] = []; // array that will contain all needed Resident Objects
  constructor(private http: Http) { }
  /**
   * Function that sends a post http request to our backend
   * where our database is located,function sends an object that has a House type
   * to backend to save it in a database.
   * @param {House} hos hos-obejct that has a House type
   * @returns returns a House object to backend database
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  postHouse(hos: House) {
    const body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52414/api/House', body, requestOptions).map(x => x.json());
  }
  /**
   * Function that sends a put http request to our backend
   * where our database is located,function sends an object that has a House type,
   * we are sending already existing object that was modified to our database on backend so it could
   * change all modefied values in our object and saved them
   * @param {*} id id-id of an object that we want to change(modefy)
   * @param {*} hos hos-obejct that has a House type
   * @returns returns a House object to backend database that needs to be modefied
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  putHouse(id, hos) {
    const body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:52414/api/House/' + id, body, requestOptions).map(x => x.json());
  }
  /**
   * Function that sends a get http request to our backend
   * gets all existing House from our database and
   * puts them in a array houseList that can contain only objects that have type Resident
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  getHouseList() {
    this.http.get('http://localhost:52414/api/House')
      .map((data: Response) => {
        return data.json() as House[];
      }).toPromise().then(x => {
        this.houseList = x;
      });
  }
  /**
   * Function that sends a delete http request to our backend
   * where our database is located to delete a specific object that client wants to be deleted
   * @param {number} id id-id of a House that we want to delete
   * @returns returns an id of our object that we want to be deleted from our database
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  deleteHouse(id: number) {
    return this.http.delete('http://localhost:52414/api/House/' + id).map(res => res.json());
  }
  /**
   * Function sends a get request to get all existing flats and put them in a flatList array,
   * then fucntion will find all flats that are located in a certain house and put then to SourtedFlats array
   * @param {number} id id-of a house
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  getFlatListAsAdditionalInformationAboutHouse(id: number) {
    this.http.get('http://localhost:52414/api/Flat')
      .map((data: Response) => {
        return data.json() as Flat[];
      }).toPromise().then(currentFlats => {
        this.flatList = currentFlats;
      });
    for (let index = 0; index < this.flatList.length; index++) {
      if (id === this.flatList[index].houseid) {
        this.SourtedFlats.push(this.flatList[index]);
      }
    }
  }

  /**
   * Function sends a get request to get all existing Residents and put them in a residentList array,
   * then fucntion will find all residents that are located in a certain flat and put then to SourtedResidents array
   * @param {number} id Id of flat
   * @memberof HouseService HouseService-Service that contains all restfull Functions for house page
   */
  getResidentListAsAdditionalInformationAboutFlat(id: number) {
    this.SourtedResidents = [];
    this.http.get('http://localhost:52414/api/Resident')
      .map((data: Response) => {
        return data.json() as Resident[];
      }).toPromise().then(currentResident => {
        this.residentList = currentResident;
      });
    for (let index = 0; index < this.residentList.length; index++) {
      if (id === this.residentList[index].flatid) {

        this.SourtedResidents.push(this.residentList[index]);
      }
    }
  }
}
