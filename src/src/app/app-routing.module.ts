import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninCallbackComponent, LogoutComponent, LoginComponent, SilentrenewCallbackComponent, UnauthorizedComponent } from './auth';
import { AppComponent } from './app.component';
import { AuthRouteGuard } from './auth/auth-route.guard';
import { ApiTestComponent } from './auth/api-test/api-test.component';
import { APP_BASE_HREF } from '@angular/common';
import { CreateComponent } from './components';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthRouteGuard] }, 
  { path: 'create', component: CreateComponent, canActivate: [AuthRouteGuard] },
  { path: 'api', component: ApiTestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'silentrenew-callback', component: SilentrenewCallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppRoutingModule {
}
