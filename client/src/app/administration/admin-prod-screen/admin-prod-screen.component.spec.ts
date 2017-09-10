import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdScreenComponent } from './admin-prod-screen.component';

describe('AdminProdScreenComponent', () => {
  let component: AdminProdScreenComponent;
  let fixture: ComponentFixture<AdminProdScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
