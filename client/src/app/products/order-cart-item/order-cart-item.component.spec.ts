import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCartItemComponent } from './order-cart-item.component';

describe('OrderCartItemComponent', () => {
  let component: OrderCartItemComponent;
  let fixture: ComponentFixture<OrderCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
