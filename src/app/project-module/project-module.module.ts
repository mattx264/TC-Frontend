import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatListModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatSliderModule, MatDialogModule, MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatCheckboxModule, MatChipsModule } from '@angular/material';
import { SharedModule } from 'projects/shared/src/public-api';
import { environment } from 'projects/tc-browser-recorder/src/environments/environment';
import { ProjectComponent } from './project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectTestComponent } from './project-test/project-test.component';
import { ProjectTestListComponent } from './project-test-list/project-test-list.component';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    ProjectDashboardComponent,
    ProjectTestComponent,
    ProjectTestListComponent
],
  imports: [
    CommonModule,

    ProjectModuleRoutingModule,
    // HttpClientModule,
    ReactiveFormsModule,
    //FormsModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSliderModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatChipsModule,
    SharedModule.forRoot(environment)
  ]
})
export class ProjectModuleModule { }
