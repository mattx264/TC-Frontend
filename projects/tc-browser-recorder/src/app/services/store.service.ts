import { Injectable } from '@angular/core';
import { ProjectViewModel } from '../../../../shared/src/lib/models/project/projectViewModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { OperatorModel } from '../../../../shared/src/lib/models/operatorModel';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { HubConnection } from '@microsoft/signalr';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  state$: BehaviorSubject<ProjectViewModel>;
  stateOperatorsData$: BehaviorSubject<OperatorModel[]>;
  selectedBrowserEngine$: BehaviorSubject<SzwagierModel>;
  hubConnection: HubConnection;

  constructor(signalSzwagierService: SignalSzwagierService) {
    this.state$ = new BehaviorSubject<ProjectViewModel>(null);
    this.stateOperatorsData$ = new BehaviorSubject<OperatorModel[]>(null);
    this.selectedBrowserEngine$ = new BehaviorSubject<SzwagierModel>(null);
    this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierBrowserExtension);
    this.hubConnection.on('UpdateSzwagierList', (data: SzwagierModel[]) => {
      if (this.getSelectedBrowserEngine() == null) {
        return;
      }
      const selectedBroserEngine = data.find(x => x.userId === this.getSelectedBrowserEngine().userId && x.szwagierType ===SzwagierType.SzwagierConsole);
      if (selectedBroserEngine === null) {
        //TODO DISPLAY THAT browser engine is not avaiable
      } else {
        this.setSelectedBrowserEngine(selectedBroserEngine);
      }
    });
  }

  private _project: ProjectViewModel;
  getProject(): ProjectViewModel {
    return this.state$.getValue();
  }
  setProject(nextState: ProjectViewModel): void {
    this.state$.next(nextState);
  }
  setOperatorsData(operatorsData: OperatorModel[]) {
    this.stateOperatorsData$.next(operatorsData);
  }
  getOperatorsData(): OperatorModel[] {
    return this.stateOperatorsData$.getValue();
  }
  setSelectedBrowserEngine(szwagierModel: SzwagierModel) {
    this.selectedBrowserEngine$.next(szwagierModel);
  }
  getSelectedBrowserEngine(): SzwagierModel {
    return this.selectedBrowserEngine$.getValue();
  }

}
