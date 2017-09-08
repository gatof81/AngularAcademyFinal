import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdEditComponent } from './admin-prod-edit.component';

describe('AdminProdEditComponent', () => {
  let component: AdminProdEditComponent;
  let fixture: ComponentFixture<AdminProdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
