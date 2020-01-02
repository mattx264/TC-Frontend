import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerNotAvaiableComponent } from './server-not-avaiable.component';

describe('ServerNotAvaiableComponent', () => {
  let component: ServerNotAvaiableComponent;
  let fixture: ComponentFixture<ServerNotAvaiableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerNotAvaiableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerNotAvaiableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
