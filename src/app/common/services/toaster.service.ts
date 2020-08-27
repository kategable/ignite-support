import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastState } from '../interfaces/busy-state.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly messageSubject = new BehaviorSubject<ToastState>({ isError: false, message: null });
  readonly toastState$ = this.messageSubject.asObservable();

  propogate(isError: boolean, message: string) {
    const state: ToastState = { isError: isError, message: message }
    this.messageSubject.next(state);
  }
}
