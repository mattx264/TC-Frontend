import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  setObject(key: string, value: object): void {
   
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string): any {
    return localStorage.getItem(key);
  }
  getObject(key: string): any {
   return JSON.parse(localStorage.getItem(key));
  }
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
