import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { Observable } from 'rxjs';
import { ProjectTestListComponent } from './project-test-list/project-test-list.component';
import { ProjectTestEditComponent } from './project-test-edit/project-test-edit.component';
import { ProjectTestCommandsComponent } from './project-test-commands/project-test-commands.component';
import { ProjectTestRunComponent } from './project-test-run/project-test-run.component';
import { ProjectWrapperComponent } from './project-wrapper/project-wrapper.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { TestRunHistoryListComponent } from './Tests/test-run-history-list/test-run-history-list.component';
import { TestRunResultComponent } from './Tests/test-run-result/test-run-result.component';
import { ProjectCreateComponent } from './project-create-edit/project-create/project-create.component';
import { ProjectEditComponent } from './project-create-edit/project-edit/project-edit.component';

// User token and permissions classes can be utilized if further security is needed
@Injectable()
export class UserToken {}
@Injectable()
export class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}

@Injectable()
export class CanActivateProjectCreate implements CanActivate {
  constructor(private permissions: Permissions, private currentUser: UserToken) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.permissions.canActivate(this.currentUser, route.params.id);
  }
}

const routes: Routes = [
  {
    path: '', component: ProjectComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProjectListComponent },
      { path: 'create', component: ProjectCreateComponent },
      {
        path: ':id', component: ProjectWrapperComponent,
        canActivate: [CanActivateProjectCreate],
        children: [
          { path: '', component: ProjectDashboardComponent },
          { path: 'config', component: ProjectConfigComponent },
          { path: 'edit', component: ProjectEditComponent },
          { path: 'tests', component: ProjectTestListComponent },
          { path: 'test-history/:testid', component: TestRunHistoryListComponent },
          { path: 'test-run-result/:test-history-id', component: TestRunResultComponent },
          { path: 'test-edit/:testid', component: ProjectTestEditComponent },
          { path: 'run-test/:testid', component: ProjectTestRunComponent },
          { path: 'test-commands/:testid', component: ProjectTestCommandsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateProjectCreate, UserToken, Permissions]
})
export class ProjectModuleRoutingModule { }
