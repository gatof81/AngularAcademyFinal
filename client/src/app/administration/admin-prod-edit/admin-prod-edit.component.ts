import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-prod-edit',
  template: `
    <div *ngIf="visible">
      <div class="backdrop" (click)="cancel()"></div>
      <div class="modal-visible">
        <div class="form-group">
          <div class="form-control input-space">
            <input placeholder="Product name" class="form-control" name="name" [formControl]="productEditForm.controls['name']">
          </div>
          <div class="form-control input-space">
            <input placeholder="Product description" class="form-control" name="desc" [formControl]="productEditForm.controls['desc']">
          </div>
          <div class="form-control input-space">
            <input type="number" placeholder="Product price" class="form-control" name="price" [formControl]="productEditForm.controls['price']">
          </div>
          <button [disabled]="!isValid()" (click)="editProduct()">Update</button>
          <button (click)="cancel()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminProdEditComponent implements OnInit, OnChanges {
  @Input() visible:boolean;
  @Input() editingProduct:Product;
  @Output() onCancel = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  productEditForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.productEditForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'desc': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'price': [null, Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.editingProduct.currentValue){
      this.productEditForm.controls['name'].setValue(changes.editingProduct.currentValue.prod_name);
      this.productEditForm.controls['desc'].setValue(changes.editingProduct.currentValue.description);
      this.productEditForm.controls['price'].setValue(changes.editingProduct.currentValue.price);
    }
  }

  isValid(){
    let edited = this.productEditForm.controls['name'].value != this.editingProduct.prod_name
      || this.productEditForm.controls['price'].value != this.editingProduct.price
      || this.productEditForm.controls['desc'].value != this.editingProduct.description
    return this.productEditForm.valid && edited;
  }

  cancel(){
    this.onCancel.emit('cancel');
  }

  editProduct(){
    this.onUpdate.emit({
      prod_name: this.productEditForm.controls['name'].value,
      description: this.productEditForm.controls['desc'].value,
      price: this.productEditForm.controls['price'].value,
      _id: this.editingProduct._id
    });
  }

}
