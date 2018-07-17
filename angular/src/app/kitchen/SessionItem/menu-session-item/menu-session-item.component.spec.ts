import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSessionItemComponent } from './menu-session-item.component';

describe('MenuSessionItemComponent', () => {
  let component: MenuSessionItemComponent;
  let fixture: ComponentFixture<MenuSessionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSessionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
