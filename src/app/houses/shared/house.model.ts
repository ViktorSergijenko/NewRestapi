export class House {
    /**
     * Creats a new house
     */
      id: number;
      street: string;
      city: string;
      country: string;
      postindex: string;
      flats:Flat;
  }

  export class Flat {
    id: number;
    floor: number;
    number: number;
    totalarea: number;
    livingspace: number;
    houseid: number;
  }