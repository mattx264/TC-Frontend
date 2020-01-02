import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTestComponent } from './save-test.component';

describe('SaveTestComponent', () => {
  let component: SaveTestComponent;
  let fixture: ComponentFixture<SaveTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
