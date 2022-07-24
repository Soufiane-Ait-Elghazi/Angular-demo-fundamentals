import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../../state/product.state";
import {Product} from "../../../model/products.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$:Observable<AppDataState<Product[]>> |null=null;
  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter<any>()
  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
     this.productEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p})
  }

  onEditProduct(p: Product) {
    this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p})
  }

  onDeleteProduct(p: Product) {
    this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p})
  }

  onNewProduct() {
    this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT})
  }

  onActionEvent($event: ActionEvent) {
    this.productEventEmitter.emit($event)
  }
}
