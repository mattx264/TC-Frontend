import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSzwagierDialogComponent } from './select-szwagier-dialog.component';

describe('SelectSzwagierDialogComponent', () => {
  let component: SelectSzwagierDialogComponent;
  let fixture: ComponentFixture<SelectSzwagierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSzwagierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSzwagierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
