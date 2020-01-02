import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SzwagierDashboardComponent } from './szwagier-dashboard/szwagier-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SzwagierRCComponent } from './szwagier-rc/szwagier-rc.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarEmptyComponent } from './layout/sidebar/sidebar-empty/sidebar-empty.component';
import { LayoutService } from './layout/layout.service';
import { environment } from '../environments/environment';
import { SharedModule } from '../../projects/shared/src/lib/shared.module';
import { GroupLayoutComponent } from './group-layout/group-layout.component';
import { CreateNewGroupDialogComponent } from './group-layout/create-new-group-dialog/create-new-group-dialog.component';
import { AddUserToGroupComponent } from './group-layout/add-user-to-group/add-user-to-group.component';
import { GroupEditComponent } from './group-layout/group-edit/group-edit.component';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectEditComponent } from './project-layout/project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-layout/project-create/project-create.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TestLayoutComponent } from './test-layout/test-layout.component';
import { SendTestComponent } from './test-layout/send-test/send-test.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectSzwagierDialogComponent } from './test-layout/send-test/select-szwagier-dialog/select-szwagier-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { TestFlowLayoutComponent } from './test-flow-layout/test-flow-layout.component';
import { TestFlowCreateComponent } from './test-flow-layout/test-flow-create/test-flow-create.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { MatMenuModule } from '@angular/material/menu'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SzwagierDashboardComponent,
    SzwagierRCComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SidebarEmptyComponent,
    GroupLayoutComponent,
    CreateNewGroupDialogComponent,
    AddUserToGroupComponent,
    GroupEditComponent,
    ProjectLayoutComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    TestLayoutComponent,
    SendTestComponent,
    SelectSzwagierDialogComponent,
    TestFlowLayoutComponent,
    TestFlowCreateComponent,
    PrivacyPolicyComponent,
    CompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule.forRoot(environment),
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
    MatChipsModule
  ],
  providers: [
    LayoutService
  ],
  entryComponents: [
    CreateNewGroupDialogComponent,
    AddUserToGroupComponent,
    SelectSzwagierDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
