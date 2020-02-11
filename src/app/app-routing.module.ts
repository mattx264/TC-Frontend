import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, UrlTree, DefaultUrlSerializer, UrlSerializer } from '@angular/router';
import { SzwagierDashboardComponent } from './szwagier-dashboard/szwagier-dashboard.component';
import { SzwagierRCComponent } from './szwagier-rc/szwagier-rc.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { GroupLayoutComponent } from './group-layout/group-layout.component';
import { GroupEditComponent } from './group-layout/group-edit/group-edit.component';
import { SendTestComponent } from './test-layout/send-test/send-test.component';
import { ServerNotAvaiableComponent } from '../../projects/shared/src/lib/components/server-not-avaiable/server-not-avaiable.component';
import { SimpleErrorPageComponent } from '../../projects/shared/src/lib/components/simple-error-page/simple-error-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'szwagier-dashboard', component: SzwagierDashboardComponent, canActivate: [AuthGuard] },
  { path: 'szwagier-rc/:id', component: SzwagierRCComponent, canActivate: [AuthGuard] },
  { path: 'group', component: GroupLayoutComponent, canActivate: [AuthGuard] },
  { path: 'group/:id', component: GroupEditComponent, canActivate: [AuthGuard] },
  { path: 'project', loadChildren: () => import(`./project-module/project-module.module`).then(m => m.ProjectModuleModule), canActivate: [AuthGuard] },
  { path: 'send-test/:projectId', component: SendTestComponent, canActivate: [AuthGuard] },
  { path: 'send-test', component: SendTestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'project', pathMatch: 'full' },
  { path: 'szwagierdashboard', redirectTo: 'szwagier-Dashboard', pathMatch: 'full' },
  { path: 'server-not-avaiable', component: ServerNotAvaiableComponent },
  { path: 'error-page', component: SimpleErrorPageComponent },
  { path: '**', redirectTo: 'szwagierDashboard', pathMatch: 'full' }
];

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toLocaleLowerCase());
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
  ]
})
export class AppRoutingModule { }
