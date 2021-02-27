import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }


  showSnackbar(textContent: string, hideDelay: number = 88000, actionString: string = null): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(textContent, actionString, {
      duration: hideDelay,
      panelClass: ['action-snack-bar']
    });
  }

  showError(textContent: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(textContent, 'Dismiss', {
      duration: 180 * 1000,
      panelClass: ['action-snack-bar']
    });
  }

  showSaveSuccessful(textContent: string="Save Successful", hideDelay: number = 88000, actionString: string = "X"): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(textContent, actionString, {
      duration: hideDelay,
      panelClass: ['action-snack-bar']
    });
  }
}
