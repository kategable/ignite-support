import { Country } from './country.type';

  export interface Survey  {
    recordId: string;
    id: number;
    name: string;
    code: string;     
    displayOrder: boolean;
    countries: Country[]; 
    effectiveDate: string
}