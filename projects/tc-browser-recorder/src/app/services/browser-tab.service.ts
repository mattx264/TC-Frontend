import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BrowserTabService {


  constructor(private ngZone: NgZone, private router: Router) { }
  setTabIdFromUrl(url): string {
    const id = url.substr(url.indexOf("?") + 4);
    if (id == null || isNaN(+id)) {
      if (this.getTabId() != null) {
        return this.getTabId().toString();
      }
      this.ngZone.run(() =>
        this.router.navigate(['/information-page', 'refreshPage'])
      );
    }
    localStorage.setItem('tabId', id);

    return id;
  }
  setTabId(id: string) {
    localStorage.setItem('tabId', id);
  }
  getTabId(): number {
    const tabId = localStorage.getItem('tabId');
    return +tabId;
  }
  getTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve, reject) => {
      const tabId = localStorage.getItem('tabId');
      if (tabId == null) {
        reject(null);
      }
      chrome.tabs.get(+tabId, (tab: chrome.tabs.Tab) => {
        resolve(tab);
      });
    });
  }
  createNewTabAndNavigate(url: string, callback: (t: chrome.tabs.Tab) => void) {
    chrome.tabs.create({ 'url': url }, tab => {
      localStorage.setItem('tabId', tab.id.toString());
      callback(tab);
    });
  }
}
