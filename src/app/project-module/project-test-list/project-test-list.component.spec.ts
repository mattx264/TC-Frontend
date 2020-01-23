import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestListComponent } from './project-test-list.component';

describe('ProjectTestListComponent', () => {
  let component: ProjectTestListComponent;
  let fixture: ComponentFixture<ProjectTestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
