import { TestBed } from '@angular/core/testing';

import { OperatorService } from './operator.service';
import { ProjectConfigService } from '../../../../shared/src/lib/services/project-config.service';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';

describe('OperatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProjectConfigService]
  }));

  it('should be created', () => {
    const service: OperatorService = TestBed.get(OperatorService);
    expect(service).toBeTruthy();
  });
  it('should package Operators', () => {
    const service: OperatorService = TestBed.get(OperatorService);
    var list: OperatorModel[] = [{
      action:'goToUrl',
      value:'test.com',
      path:null,
      guid:'sdfs234234'
    }];
    let output = service.packageOperators(list);
    
    // it is 2 because close action is added
    expect(output.length).toEqual(2);
  });
  it('should package Operators -2', () => {
    const service: OperatorService = TestBed.get(OperatorService);
    var list: OperatorModel[] = [{
      action:'goToUrl',
      value:'test.com',
      path:null,
      guid:'sdfs234234'
    },{
      action:'click',
      value:null,
      path:'//path/to/button',
      guid:'dfh433'
    },{
      action:'takeScreenshot',
      value:null,
      path:null,
      guid:'d22fh433'
    }];
    let output = service.packageOperators(list);
    
    // it is 2 because close action is added
    expect(output.length).toEqual(4);
  });
});
