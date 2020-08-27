import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/common/services/toaster.service';
import { IgxToastComponent } from 'igniteui-angular';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  @ViewChild("toast", { static: true }) public toast: IgxToastComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  message: string;
  isError: boolean;

  constructor(private readonly toastService: ToastService) {
}
  ngOnInit(): void {
    this.toastService.toastState$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      if (state?.message?.length > 0) {
        this.message = state.message;
        this.isError = state.isError;
        this.toast.show();
      }
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
