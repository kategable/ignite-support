import { Pipe, PipeTransform } from '@angular/core';
import {Location} from '@angular/common';

@Pipe({ name: 'assetUrl' })
export class AssetUrlPipe implements PipeTransform {
  constructor(private location:Location){}
  transform(value: string): string {

    let basehref = window["pg-base-href"] || location.origin ;
   console.log(basehref);
    return basehref + '/assets/' +value;
  }
}