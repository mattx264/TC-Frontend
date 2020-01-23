import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestComponent } from './project-test.component';

describe('ProjectTestComponent', () => {
  let component: ProjectTestComponent;
  let fixture: ComponentFixture<ProjectTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
