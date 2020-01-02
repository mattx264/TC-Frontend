import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEmptyComponent } from './sidebar-empty.component';

describe('SidebarEmptyComponent', () => {
  let component: SidebarEmptyComponent;
  let fixture: ComponentFixture<SidebarEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
