import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes,DataStateEnum} from "../../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({type :ProductActionsTypes.GET_ALL_PRODUCTS,payload:null});
  }

  onGetSelectedProducts() {
    this.productEventEmitter.emit({type :ProductActionsTypes.GET_SELECTED_PRODUCTS,payload:null});
  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({type :ProductActionsTypes.GET_AVAILABLE_PRODUCTS,payload:null});
  }

  onNewProduct() {
    this.productEventEmitter.emit({type :ProductActionsTypes.NEW_PRODUCT,payload:null});
  }

  onSearch(value: any) {
    this.productEventEmitter.emit({type :ProductActionsTypes.SEARCH_PRODUCTS,payload:value});
  }
}
