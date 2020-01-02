import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/tc-browser-recorder/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private credentialValue: boolean = false;
  private saveProjectUrl = '/api/project';

  constructor(private http: HttpClient) { 
    if(!environment.production) {
      this.credentialValue = true;
      this.saveProjectUrl = 'https://localhost:44384/api/'
    }
  }

  public SaveProject(data: any): void {
    this.http.post(this.saveProjectUrl, data).subscribe(response => {
      alert("Save successful");
    }, 
    error => {
      console.log(error);
      alert(error.message);  
    });
  }

}
