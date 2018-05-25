import { Injectable } from '@angular/core';
import { House } from './house.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../../flats/shared/flat.model';
import { Resident } from '../../residents/shared/resident.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HouseService {
  selectedHouse: House;
  houseList: House[];
  selectedFlat: Flat = new Flat();
  flatList: Flat[] = [];
  EmptyflatList: Flat[] = [];
  SourtedFlats: Flat[] = [];
  residentList: Resident[] = [];
  SourtedResidents: Resident[] = [];
  constructor(private http: Http) { }
  postHouse(hos: House) {
    var body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52414/api/House', body, requestOptions).map(x => x.json());
  }
  putHouse(id, hos) {
    var body = JSON.stringify(hos); // why i cant use var and let instead of const here?
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
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
  // eta funkcija zasovivaet vse flati v massiv "flatList",zatem..
  // sortiruet flati v etom massive i esli opredeljonnij flat prohodit..
  // if statemant to etot flat zasovivaetsja v massiv "SourtedFlats"
  // etu funkciju ja dalee ispolzuju dlja polucenija i vivoda na ekran..
  // nuznih flatov imennot togo doma kotorij vibral klient
  getFlatListAsAdditionalInformationAboutHouse(id: number) {
    // let incr = 0;
    this.http.get('http://localhost:52414/api/Flat')
      .map((data: Response) => {
        return data.json() as Flat[];
      }).toPromise().then(currentFlats => {
        this.flatList = currentFlats;
      });
    for (let index = 0; index < this.flatList.length; index++) {
      if (id === this.flatList[index].houseid) {
        this.SourtedFlats.push(this.flatList[index]);
        // this.SourtedFlats[incr] = this.flatList[index];
        // incr++;
      }
    }
  }

  /**
   * Bla bla bla
   *
   * @param {number} id Id of house
   * @memberof HouseService
   */
  getResidentListAsAdditionalInformationAboutFlat(id: number) {
    this.SourtedResidents = [];
    let incr = 0;
    this.http.get('http://localhost:52414/api/Resident')
      .map((data: Response) => {
        return data.json() as Resident[];
      }).toPromise().then(currentResident => {
        this.residentList = currentResident;
      });
    for (let index = 0; index < this.residentList.length; index++) {
      if (id === this.residentList[index].flatid) {

        this.SourtedResidents[incr] = this.residentList[index];
        incr++;
      }
    }
  }

}
