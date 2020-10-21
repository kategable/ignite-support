import { Tree } from './tree-interface';


export class Country implements Tree {
    id: number;
    recordId: string;
    name: string;
    countries: Country[]; 
    parentId: number;
}