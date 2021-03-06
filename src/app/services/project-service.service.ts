import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/tc-browser-recorder/src/environments/environment';
import { SnackbarService } from '../../../projects/shared/src/lib/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private credentialValue: boolean = false;
  private saveProjectUrl = '/api/project';

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {
    if (!environment.production) {
      this.credentialValue = true;
      this.saveProjectUrl = 'https://localhost:44384/api/'
    }
  }

  public SaveProject(data: any): void {
    this.http.post(this.saveProjectUrl, data).subscribe(response => {
      this.snackbarService.showSaveSuccessful();
    },
      error => {
        console.log(error);
        alert(error.message);
      });
  }

}
