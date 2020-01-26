import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatListModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatSliderModule, MatDialogModule, MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatCheckboxModule, MatChipsModule, MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from 'projects/shared/src/public-api';
import { environment } from 'projects/tc-browser-recorder/src/environments/environment';
import { ProjectComponent } from './project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectTestListComponent } from './project-test-list/project-test-list.component';
import { ProjectTestRunComponent } from './project-test-run/project-test-run.component';
import { ProjectTestCommandsComponent } from './project-test-commands/project-test-commands.component';
import { ProjectTestEditComponent } from './project-test-edit/project-test-edit.component';
import { DialogSelectBrowserEngine } from './project-test-run/dialog-select-browser-engine';
import { LightboxModule } from 'ngx-lightbox';
import { ProjectWrapperComponent } from './project-wrapper/project-wrapper.component';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    ProjectDashboardComponent,
    ProjectTestListComponent,
    ProjectTestRunComponent,
    ProjectTestCommandsComponent,
    ProjectTestEditComponent,
    DialogSelectBrowserEngine,
    ProjectWrapperComponent
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
    MatProgressSpinnerModule,
    LightboxModule  ,
    SharedModule.forRoot(environment)
  ],
  entryComponents:[
    DialogSelectBrowserEngine
  ]
})
export class ProjectModuleModule { }
