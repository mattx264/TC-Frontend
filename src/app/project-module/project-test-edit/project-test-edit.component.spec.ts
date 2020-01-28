import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestEditComponent } from './project-test-edit.component';

describe('ProjectTestEditComponent', () => {
  let component: ProjectTestEditComponent;
  let fixture: ComponentFixture<ProjectTestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
