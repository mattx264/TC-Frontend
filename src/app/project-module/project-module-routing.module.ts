import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';


const routes: Routes = [
  {
    path: '', component: ProjectComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProjectListComponent },
      { path: 'create', component: ProjectCreateComponent },
      {
        path: ':id', component: ProjectDashboardComponent, children: [
          { path: 'edit', component: ProjectEditComponent }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectModuleRoutingModule { }
