import { Flat } from '../../flats/shared/flat.model';
export class House {
    /**
     * Creats a new house
     */
    id: number;
    street: string;
    city: string;
    country: string;
    postindex: string;
    flats: Flat[];
}
