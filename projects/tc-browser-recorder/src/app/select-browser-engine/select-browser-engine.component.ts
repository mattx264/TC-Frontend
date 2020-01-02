import { Component, OnInit } from '@angular/core';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { StoreService } from '../services/store.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';

@Component({
  selector: 'app-select-browser-engine',
  templateUrl: './select-browser-engine.component.html',
  styleUrls: ['./select-browser-engine.component.scss']
})
export class SelectBrowserEngineComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  szwagiersConsoles: SzwagierModel[];
  selectedSzwagierConsole: SzwagierModel;
  constructor(signalSzwagierService: SignalSzwagierService, private storeService: StoreService, private router: Router
    , private route: ActivatedRoute) {
    this.hubConnection = signalSzwagierService.start();
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams.returnUrl)
    this.hubConnection.on('UpdateSzwagierList', (data: SzwagierModel[]) => {
      if (data == null) {
        return;
      }
      this.szwagiersConsoles = data.filter(x => x.szwagierType === SzwagierType.SzwagierConsole);
    });
  }
  saveTestClick() {

  }
  backClick() {
    this.router.navigate(['**']);
  }
  selectClick(index: number) {

    // opend modal
    this.storeService.setSelectedBrowserEngine(this.szwagiersConsoles[index]);
    this.router.navigate(['/run-test']);
  }
}
