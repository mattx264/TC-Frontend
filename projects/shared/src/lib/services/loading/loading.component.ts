import { state, style, transition, trigger } from '@angular/animations';
import { LoadingService } from './loading.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('loadingState', [
      state('inactive', style({
        opacity: 0,
        display: 'none'
      })),
      state('active', style({
        opacity: 1,
      })),
      // it creating error when two tabs are open and refresh is in progress.
      // transition('active => inactive', animate('200ms ease-out')),
      // transition('inactive => active', animate('0ms ease-in'))
    ])
  ]
})
export class LoadingComponent implements OnInit {

  loadingState = 'inactive';
  errorMessage = '';
  constructor(private loadingSvc: LoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadingSvc.getValue().subscribe((status: boolean) => {
      this.loadingState = status ? 'active' : 'inactive';
      this.changeDetectorRef.detectChanges();
    });
    this.loadingSvc.showErrorGet().subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
      this.changeDetectorRef.markForCheck();
    });
  }

}
