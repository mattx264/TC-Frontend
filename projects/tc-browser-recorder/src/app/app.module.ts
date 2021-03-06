import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from '../../../../projects/shared/src/lib/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/guard/auth.guard';
import { environment } from '../environments/environment';
import { OperatorItemComponent } from './operator-item/operator-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatCardModule } from '@angular/material/card';
import { RunTestComponent } from './run-test/run-test.component';
import {  HeaderRecorderComponent } from './header/header.component';
import { SelectBrowserEngineComponent } from './select-browser-engine/select-browser-engine.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SaveTestComponent } from './save-test/save-test.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip'
import { InformationPageComponent } from './information-page/information-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { RecordTestComponent } from './record-test/record-test.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    OperatorItemComponent,
    RunTestComponent,
    HeaderRecorderComponent,
    SelectBrowserEngineComponent,
    SaveTestComponent,
    InformationPageComponent,
    ProjectsComponent,
    RecordTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(environment),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard
   
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
