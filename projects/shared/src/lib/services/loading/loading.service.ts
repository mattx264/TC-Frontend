import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router, ChildActivationStart, ChildActivationEnd } from '@angular/router';
@Injectable()
export class LoadingService {

  @Output() gLoading: EventEmitter<any> = new EventEmitter();
  @Output() showErrorEmiter: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router) {
    router.events.subscribe(e => {
      if (e instanceof ChildActivationStart) {
        this.setValue(true);
      } else if (e instanceof ChildActivationEnd) {
        this.setValue(false);
      }
    });
  }
  setValue(isLoading: boolean): void {
    this.gLoading.emit(isLoading);
  }
  getValue(): any {
    return this.gLoading;
  }
  showErrorGet(): any {
    return this.showErrorEmiter;
  }
  showErrorSet(errorMessage: string): any {
    this.showErrorEmiter.emit(errorMessage);
  }
}
