import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebar = true;
  private sidebarName: string;
  private header = true;
  onUpdate: EventEmitter<any> = new EventEmitter();
  metadata: any;

  constructor() { }
  showSidebar(name: string, data: any) {
    this.sidebarName = name;
    this.metadata = data;
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
      sidebarName: this.sidebarName,
      header: this.header,
      metadata: this.metadata
    }
  }

}

