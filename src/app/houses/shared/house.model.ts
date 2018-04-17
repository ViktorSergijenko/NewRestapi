
    export class House {
        /**
         * Creats a new house
         */
        constructor() {
          this.Flats = [];
        }
         public Id: number;
         public  Street: string;
         public  City: string;
         public  Countr: string;
         public  Postindex: string;
         public Created: Date;
         public Modified: Date;
         public Flats: Array<any>;
}
