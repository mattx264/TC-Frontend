import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzwagierRCComponent } from './szwagier-rc.component';

describe('SzwagierRCComponent', () => {
  let component: SzwagierRCComponent;
  let fixture: ComponentFixture<SzwagierRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzwagierRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzwagierRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
