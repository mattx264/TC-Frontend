import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFlowCreateComponent } from './test-flow-create.component';

describe('TestFlowCreateComponent', () => {
  let component: TestFlowCreateComponent;
  let fixture: ComponentFixture<TestFlowCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFlowCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
