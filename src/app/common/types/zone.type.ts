import { Country } from './country.type';

  export interface Zone  {  
    id: string;
    countryZone: string;   
    countries: Country[];   
}