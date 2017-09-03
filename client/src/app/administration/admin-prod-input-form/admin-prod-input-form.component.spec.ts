import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdInputFormComponent } from './admin-prod-input-form.component';

describe('AdminProdInputFormComponent', () => {
  let component: AdminProdInputFormComponent;
  let fixture: ComponentFixture<AdminProdInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
