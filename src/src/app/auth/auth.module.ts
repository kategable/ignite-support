import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { AuthRouteGuard } from './auth-route.guard';
import { SigninCallbackComponent } from './signin-callback.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SilentrenewCallbackComponent } from './silentrenew-callback.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { ApiTestComponent } from './api-test/api-test.component';

@NgModule({
    imports: [
		CommonModule
	],
    exports: [],
    declarations: [
		LoginComponent,
		LogoutComponent,
		SigninCallbackComponent,
		SilentrenewCallbackComponent,
		UnauthorizedComponent,
		ApiTestComponent
	],
    providers: [
		AuthService,
		AuthRouteGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    ],
})
export class AuthModule { }
