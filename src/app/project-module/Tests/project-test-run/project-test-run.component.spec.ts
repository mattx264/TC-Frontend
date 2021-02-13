import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestRunComponent } from './project-test-run.component';

describe('ProjectTestRunComponent', () => {
  let component: ProjectTestRunComponent;
  let fixture: ComponentFixture<ProjectTestRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
