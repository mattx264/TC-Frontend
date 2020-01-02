import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebar = true;
  private header = true;
  onUpdate: EventEmitter<any> = new EventEmitter();

  constructor() { }
  showSidebar() {
    this.sidebar = true;
    this.onUpdate.emit(this.createEmitDate());
  }
  hideSidebar() {
    this.sidebar = false;
    this.onUpdate.emit(this.createEmitDate());
  }
  showSidebarHeader() {
    this.sidebar = true;
    this.header = true;
    this.onUpdate.emit(this.createEmitDate());
  }
  hideSidebarHeader() {
    this.sidebar = false;
    this.header = false;
    this.onUpdate.emit(this.createEmitDate());
  }
  resetValues() {
    this.sidebar = true;
    this.header = true;
  }
  private createEmitDate(): any {
    return {
      sidebar: this.sidebar,
      header: this.header
    }
  }

}

