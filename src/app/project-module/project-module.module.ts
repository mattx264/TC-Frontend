import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatChipsModule } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'projects/shared/src/public-api';
import { environment } from 'projects/tc-browser-recorder/src/environments/environment';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectTestListComponent } from './project-test-list/project-test-list.component';
import { ProjectTestRunComponent } from './project-test-run/project-test-run.component';
import { ProjectTestCommandsComponent } from './project-test-commands/project-test-commands.component';
import { ProjectTestEditComponent } from './project-test-edit/project-test-edit.component';
import { DialogSelectBrowserEngine } from './project-test-run/dialog-select-browser-engine';
import { LightboxModule } from 'ngx-lightbox';
import { ProjectWrapperComponent } from './project-wrapper/project-wrapper.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { TestRunHistoryListComponent } from './Tests/test-run-history-list/test-run-history-list.component';
import { TestRunResultComponent } from './Tests/test-run-result/test-run-result.component';
import { ProjectComponent } from './project.component';


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
    ProjectWrapperComponent,
    ProjectConfigComponent,
    TestRunHistoryListComponent,
    TestRunResultComponent
],
  imports: [
    CommonModule,
    MatChipsModule,
    ProjectModuleRoutingModule,
    // HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
