import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleErrorPageComponent } from './simple-error-page.component';

describe('SimpleErrorPageComponent', () => {
  let component: SimpleErrorPageComponent;
  let fixture: ComponentFixture<SimpleErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
