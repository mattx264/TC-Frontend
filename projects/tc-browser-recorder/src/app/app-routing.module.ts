import { SelectBrowserEngineComponent } from './select-browser-engine/select-browser-engine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProjectResolver } from './services/resolvers/project-resolver';
import { ServerNotAvaiableComponent } from '../../../shared/src/lib/components/server-not-avaiable/server-not-avaiable.component';
import { RunTestComponent } from './run-test/run-test.component';
import { SaveTestComponent } from './save-test/save-test.component';
import { SimpleErrorPageComponent } from '../../../shared/src/lib/components/simple-error-page/simple-error-page.component';
import { InformationPageComponent } from './information-page/information-page.component';



const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }, {
    path: 'run-test', component: RunTestComponent
  }, {
    path: 'select-browser-engine', component: SelectBrowserEngineComponent
  }, {
    path: 'save-test', component: SaveTestComponent
  }, {
    path: 'error-page', component: SimpleErrorPageComponent
  }, {
    path: 'server-not-avaiable', component: ServerNotAvaiableComponent
  }, {
    path: 'information-page/:type', component: InformationPageComponent
  }, {
    path: 'landing-page', component: LandingPageComponent
    , canActivate: [AuthGuard]
    , resolve: {
      project: ProjectResolver
    }
  }, {
    path: '**', component: LandingPageComponent
    , canActivate: [AuthGuard]
    , resolve: {
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
