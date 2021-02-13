import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestCommandsComponent } from './project-test-commands.component';

describe('ProjectTestCommandsComponent', () => {
  let component: ProjectTestCommandsComponent;
  let fixture: ComponentFixture<ProjectTestCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestCommandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
