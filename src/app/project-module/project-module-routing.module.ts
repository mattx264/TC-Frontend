import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { Observable } from 'rxjs';
import { ProjectTestListComponent } from './project-test-list/project-test-list.component';

// User token and permissions classes can be utilized if further security is needed
class UserToken {}
class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}

@Injectable()
class CanActivateProjectCreate implements CanActivate {
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
        path: ':id', component: ProjectDashboardComponent,
        canActivate: [CanActivateProjectCreate],
        children: [
          { path: 'edit', component: ProjectEditComponent },
          { path: 'tests', component: ProjectTestListComponent }
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
