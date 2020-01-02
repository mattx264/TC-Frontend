import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrowserEngineComponent } from './select-browser-engine.component';

describe('SelectBrowserEngineComponent', () => {
  let component: SelectBrowserEngineComponent;
  let fixture: ComponentFixture<SelectBrowserEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBrowserEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBrowserEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
