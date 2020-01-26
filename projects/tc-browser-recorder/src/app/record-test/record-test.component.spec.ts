import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTestComponent } from './record-test.component';

describe('RecordTestComponent', () => {
  let component: RecordTestComponent;
  let fixture: ComponentFixture<RecordTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
