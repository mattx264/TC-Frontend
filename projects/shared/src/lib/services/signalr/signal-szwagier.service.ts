import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth/auth.service';
import { SzwagierModel } from '../../models/szwagierModel';
import { SzwagierType } from '../../models/SzwagierType';


@Injectable({
  providedIn: 'root'
})
export class SignalSzwagierService {
  private hubConnection: signalR.HubConnection;

  szwagiers: SzwagierModel[];
  constructor(private authService: AuthService) {

  }
  start(szwagierType: SzwagierType): signalR.HubConnection {
    if (this.hubConnection != null) {
      return this.hubConnection;
    }
    let type = '';
    if (szwagierType == SzwagierType.SzwagierDashboard) {
      type = "d";
    } else if (szwagierType == SzwagierType.SzwagierBrowserExtension) {
      type = "e";
    }

    // tslint:disable-next-line:max-line-length
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44384/hubs/szwagier?t=' + type, {
        accessTokenFactory: () => this.authService.getToken()
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.hubConnection.invoke('GetSzwagierList');
      })
      .catch(err => {
        if (err.statusCode === 401) {
          this.authService.unauthorize();
          return;
        }
        alert('Error while starting connection: ' + err)
        console.log('Error while starting connection: ' + err)
      });
    this.hubConnection.on('ReceiveMessage', (name, data) => {
      // this.data = data;
      console.log(name, data);
    });
    this.hubConnection.on('UpdateSzwagierList', (data: SzwagierModel[]) => {
      this.szwagiers = data;
    });
    return this.hubConnection;
  }
  getSzwagierBrowserEngine(): SzwagierModel[] {
    if (this.szwagiers == null) {
      return [];
    }
    return this.szwagiers.filter(x => x.szwagierType == SzwagierType.SzwagierConsole)
  }
}
