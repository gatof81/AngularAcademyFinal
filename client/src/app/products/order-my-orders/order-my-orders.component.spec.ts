import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMyOrdersComponent } from './order-my-orders.component';

describe('OrderMyOrdersComponent', () => {
  let component: OrderMyOrdersComponent;
  let fixture: ComponentFixture<OrderMyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
