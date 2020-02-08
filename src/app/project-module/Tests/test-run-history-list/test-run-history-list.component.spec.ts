import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunHistoryListComponent } from './test-run-history-list.component';

describe('TestRunHistoryListComponent', () => {
  let component: TestRunHistoryListComponent;
  let fixture: ComponentFixture<TestRunHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRunHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRunHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
