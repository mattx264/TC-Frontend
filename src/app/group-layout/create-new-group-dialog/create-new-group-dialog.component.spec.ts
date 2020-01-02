import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewGroupDialogComponent } from './create-new-group-dialog.component';

describe('CreateNewGroupDialogComponent', () => {
  let component: CreateNewGroupDialogComponent;
  let fixture: ComponentFixture<CreateNewGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
