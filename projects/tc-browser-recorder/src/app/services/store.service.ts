import { Injectable } from '@angular/core';
import { ProjectViewModel } from '../../../../shared/src/lib/models/project/projectViewModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { OperatorModel } from '../../../../shared/src/lib/models/operatorModel';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  state$: BehaviorSubject<ProjectViewModel>;
  stateOperatorsData$: BehaviorSubject<OperatorModel[]>;
  selectedBrowserEngine$: BehaviorSubject<SzwagierModel>;

  constructor() {
    this.state$ = new BehaviorSubject<ProjectViewModel>(null);
    this.stateOperatorsData$ = new BehaviorSubject<OperatorModel[]>(null);
    this.selectedBrowserEngine$ = new BehaviorSubject<SzwagierModel>(null);
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
