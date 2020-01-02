import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTestComponent } from './send-test.component';

describe('SendTestComponent', () => {
  let component: SendTestComponent;
  let fixture: ComponentFixture<SendTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
