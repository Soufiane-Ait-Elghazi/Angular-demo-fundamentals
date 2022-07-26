import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, ProductActionsTypes} from "../../../../state/product.state";
import {Product} from "../../../../model/products.model";
import {EventDriverService} from "../../../../services/event.driver.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product |null=null;
  //@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter<any>()
  constructor(private eventDriverService :EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(p: any) {
    //this.productEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT,payload:p});
  }

  onEditProduct(p: any) {
    //this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT,payload:p});
  }

  onDeleteProduct(p: any) {
    //this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT,payload:p});
  }
}
