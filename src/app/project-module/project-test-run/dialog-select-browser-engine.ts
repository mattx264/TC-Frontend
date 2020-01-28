import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';

@Component({
    selector: 'app-dialog-select-browser-engine',
    templateUrl: './dialog-select-browser-engine.html',
})
export class DialogSelectBrowserEngine implements OnInit {
    hubConnection: signalR.HubConnection;
    browserEngines: SzwagierModel[];
    constructor(
        signalSzwagierService: SignalSzwagierService,
        public dialogRef: MatDialogRef<DialogSelectBrowserEngine>,
        @Inject(MAT_DIALOG_DATA) public data: SzwagierModel) {
        this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierDashboard);
        this.browserEngines = signalSzwagierService.getSzwagierBrowserEngine();
        this.hubConnection.on('UpdateSzwagierList', () => {
            this.browserEngines = signalSzwagierService.getSzwagierBrowserEngine();
        });
    }
    ngOnInit(): void {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    selectClick(index: number) {
        this.dialogRef.close(this.browserEngines[index]);
    }

}