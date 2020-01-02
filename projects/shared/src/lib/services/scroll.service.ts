import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }
  scrollTo(left: number = 0, top: number = 0) {
    window.scrollTo({
      left: left,
      top: top,
      behavior: 'smooth'
    });
  }
}
