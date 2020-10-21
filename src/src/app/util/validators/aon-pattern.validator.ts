import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeerGroupFacadeService } from 'src/app/services/api/peer-group-facade.service';

export class AonValidators {
    static aonPatternError = 'No use of special characters such as !,$,_,:,<, =,>,(,&,...)';
    static aonPattern = new RegExp("^[a-zA-Z0-9 ]*$");
    static pattern(): ValidatorFn {
       
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value != null && !this.aonPattern.test(c.value)) {
                return { 'aonPattern': true }
            }
            return null;
        };
    }

    static duplicateNameCheck(existingNames: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if(!existingNames) return null;
            if(!control.value) return null;
            if (existingNames.some(x => x.toLocaleLowerCase() === control.value.trim().toLocaleLowerCase())) {
                return {
                    duplicate: {
                        valid: false
                    }
                }
            }
            else {
                return null;
            }
        };
    }

   
}

