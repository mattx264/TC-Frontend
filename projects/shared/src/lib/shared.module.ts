import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedComponent } from './shared.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ScrollService } from './services/scroll.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoadingService } from './services/loading/loading.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientService } from './services/http-client.service';
import { AuthService } from './services/auth/auth.service';
import { SignalSzwagierService } from './services/signalr/signal-szwagier.service';
import { TextFieldComponent } from './field/text-field/text-field.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerNotAvaiableComponent } from './components/server-not-avaiable/server-not-avaiable.component';
import { SimpleErrorPageComponent } from './components/simple-error-page/simple-error-page.component';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectConfigService } from './services/project-config.service';


@NgModule({
  declarations:
    [SharedComponent, TextFieldComponent, ServerNotAvaiableComponent, SimpleErrorPageComponent],
  exports:
    [SharedComponent, TextFieldComponent, ServerNotAvaiableComponent, SimpleErrorPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    HttpClientService,
    ScrollService,
    LocalStorageService,
    LoadingService,
    SignalSzwagierService,
    SnackbarService,
    ProjectConfigService
  ]

})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [

        { provide: 'environment', useValue: environment },
      ]
    };
  }
}
