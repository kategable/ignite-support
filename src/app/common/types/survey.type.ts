import { Country } from './country.type';

  export interface Survey  {  
    id: string;
    name: string;
    code: string; 
    managerID: number;
    managerName: string;
    managerEmail: string;
    managerContact: string;
    displayPD: boolean;
    countries: Country[];
    showHeatmapOnDashboard: boolean;
    effectiveDate: string
}