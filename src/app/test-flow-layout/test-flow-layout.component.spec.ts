import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFlowLayoutComponent } from './test-flow-layout.component';

describe('TestFlowLayoutComponent', () => {
  let component: TestFlowLayoutComponent;
  let fixture: ComponentFixture<TestFlowLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFlowLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
