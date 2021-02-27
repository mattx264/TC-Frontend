import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth/auth.service';
import { SzwagierModel } from '../../models/szwagierModel';
import { SzwagierType } from '../../models/SzwagierType';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SignalSzwagierService {
  private hubConnection: signalR.HubConnection;

  szwagiers: SzwagierModel[];
  baseUrl: string;
  constructor(private authService: AuthService, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = "http://localhost/TC.WebService";

  }
  
  private _selectedBrowserEngine : SzwagierModel;
  public get selectedBrowserEngine() : SzwagierModel {
    return this._selectedBrowserEngine;
  }
  public set selectedBrowserEngine(v : SzwagierModel) {
    this._selectedBrowserEngine = v;
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
    console.log(this.baseUrl);
    // tslint:disable-next-line:max-line-length
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/hubs/szwagier?t=` + type, {
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
