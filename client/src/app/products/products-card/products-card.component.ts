import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-products-card',
  template: `
      <div class="card" style="width: 15rem; float: left; margin: 1rem;">
        <img class="card-img-top" src="./assets/images/prodcuct_placeholder.jpeg" alt="Card image cap">
        <div class="card-block">
          <h4 class="card-title">{{ product.prod_name }}</h4>
          <p class="card-text">{{ product.description }}</p>
          <p> {{ product.price | currency }}</p>
          <button (click)="sendToBasquet()" [disabled]="!isValid()" class="btn btn-primary">Buy</button>
        </div>
      </div>
  `,
  styles: []
})
export class ProductsCardComponent implements OnInit {

  @Input() product
  @Output() onBuy = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isValid(){
    return !this.product.inCart;
  }

  sendToBasquet() {
    this.onBuy.emit(this.product);
  }

}
