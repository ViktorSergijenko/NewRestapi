import { Flat } from '../../flats/shared/flat.model';
export class Resident {
    id:number;
    firstname:string;
    lastname:string;
    postcode:string;
    phone:string;
    email:string;
    flatid:number;
    flat:Flat[];
}
