import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxDropDownModule, IgxButtonModule, IgxToggleModule, IgxDialogModule, IgxSelectModule, IgxComboModule, IgxDatePickerModule, IgxIconModule, IgxInputGroupModule, IgxTimePickerModule, IgxToastModule, IgxCheckboxModule, IgxTreeGridModule, IgxExpansionPanelModule } from '@infragistics/igniteui-angular';
import { CompanyFiltersComponent, CompanyListComponent, CreateComponent, HeaderComponent, ListComponent, ReviewListComponent, MarketFilterComponent, NavigationComponent, SearchInputComponent, SelectedCompanyListComponent, SelectItemDropdownComponent, SplashComponent, ToastComponent, TreeGridComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusyComponent } from './components';
import { LoggingHttpInterceptor, BusyHttpInterceptor } from './common';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandler } from './common/services/global-error.handler';
import { AppStartComponent } from './auth/app-start/app-start.component';
import { AuthModule } from './auth/auth.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssetUrlPipe,NewLinePipe } from './common/pipes';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ReviewListComponent,
    BusyComponent,
    ToastComponent,
    SplashComponent,
    CreateComponent,
    SelectItemDropdownComponent,    
    AppStartComponent,
    AssetUrlPipe,
    NavigationComponent,
    MarketFilterComponent,
    CompanyFiltersComponent,
    CompanyListComponent,
    SelectedCompanyListComponent,
    SearchInputComponent,
     NewLinePipe,
    TreeGridComponent
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
    AuthModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.apiUrl}api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    }),
    IgxToastModule,
    IgxCheckboxModule,
    IgxTreeGridModule,
    ReactiveFormsModule,
    IgxExpansionPanelModule,
    ScrollingModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoggingHttpInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: BusyHttpInterceptor, multi: true
  },
    AssetUrlPipe,NewLinePipe,
  {
    provide: ErrorHandler, useClass: environment.production ? GlobalErrorHandler : null
  }
  ],
  bootstrap: [AppStartComponent]
})
export class AppModule {
}
