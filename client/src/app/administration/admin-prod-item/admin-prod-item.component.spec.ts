import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdItemComponent } from './admin-prod-item.component';

describe('AdminProdItemComponent', () => {
  let component: AdminProdItemComponent;
  let fixture: ComponentFixture<AdminProdItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
