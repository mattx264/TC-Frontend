import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzwagierDashboardComponent } from './szwagier-dashboard.component';

describe('SzwagierDashboardComponent', () => {
  let component: SzwagierDashboardComponent;
  let fixture: ComponentFixture<SzwagierDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzwagierDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzwagierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
