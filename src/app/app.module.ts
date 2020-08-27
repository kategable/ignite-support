import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxDropDownModule, IgxButtonModule, IgxToggleModule, IgxDialogModule, IgxSelectModule, IgxComboModule, IgxDatePickerModule, IgxIconModule, IgxInputGroupModule, IgxTimePickerModule, IgxToastModule, IgxCheckboxModule, IgxTreeGridModule } from '@infragistics/igniteui-angular';
import { DialogComponent, SelectComponent, InputComponent, DropDownComponent, TreeSelectComponent } from './components';
import { HeaderComponent } from "./components/header/header.component";
import { ListComponent } from "./components/list/list.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BusyComponent } from './components';
import { LoggingHttpInterceptor, BusyHttpInterceptor } from './common';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandler } from './common/services/global-error.handler';
import { ToastComponent } from './components/toast/toast.component';
import { SplashComponent } from './components/splash/splash.component';
import { NewGroupComponent } from './containers/new-group/new-group.component';
import { SelectItemDropdownComponent } from './components/select-item-dropdown/select-item-dropdown.component';
 
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SelectComponent,
    InputComponent,
    DropDownComponent,
    HeaderComponent,
    ListComponent,
    BusyComponent,
    ToastComponent,
    SplashComponent,
    NewGroupComponent,
    SelectItemDropdownComponent,
    TreeSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxDropDownModule,
    IgxButtonModule,
    IgxToggleModule,
    IgxDialogModule,
    IgxSelectModule,
    IgxComboModule,
    IgxDatePickerModule,
    IgxIconModule,
    IgxInputGroupModule,    
    IgxTimePickerModule,
    FormsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.apiUrl}api/logs`,
      level:environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    }),
    IgxToastModule ,
    IgxCheckboxModule ,
    IgxTreeGridModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoggingHttpInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: BusyHttpInterceptor, multi: true
  },
  // {
  //   provide: ErrorHandler,    useClass: GlobalErrorHandler
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
