import { ErrorHandler, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ToastService } from './toaster.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly logger: NGXLogger,private readonly toastService: ToastService) { }

    handleError(error: Error) {
        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };

        this.logger.error(err);
        this.toastService.propogate(true, err.message);
    }
}