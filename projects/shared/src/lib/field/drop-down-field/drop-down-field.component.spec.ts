import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFieldComponent } from './drop-down-field.component';

describe('DropDownFieldComponent', () => {
  let component: DropDownFieldComponent;
  let fixture: ComponentFixture<DropDownFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
