import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserScreenComponent } from './admin-user-screen.component';

describe('AdminUserScreenComponent', () => {
  let component: AdminUserScreenComponent;
  let fixture: ComponentFixture<AdminUserScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
