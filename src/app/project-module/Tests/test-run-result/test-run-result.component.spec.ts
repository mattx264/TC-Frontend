import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunResultComponent } from './test-run-result.component';

describe('TestRunResultComponent', () => {
  let component: TestRunResultComponent;
  let fixture: ComponentFixture<TestRunResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRunResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRunResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
