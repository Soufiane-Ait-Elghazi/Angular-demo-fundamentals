import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/products.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event.driver.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(
        private productsService : ProductsService,
        private router : Router,
        private  eventDriverService :EventDriverService
             ) { }
  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
  }

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any) {
    this.products$= this.productsService.SearchProducts(dataForm.keyword).pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p:Product) {
  this.productsService.Select(p).subscribe(data=>{
    //this.onGetAllProducts()
    p.selected = data.selected
  },error => {
    console.log(error.errorMessage)
  });
  }

  onDeleteProduct(p:Product) {
    let v = confirm("Etes vous sur ?");
    if(v==true) {
      this.productsService.Delete(p).subscribe(data => {
        this.onGetAllProducts()
      }, error => {
        console.log(error.errorMessage)
      }); //this.onGetAllProducts()
    }
  }

  onNewProduct() {
     this.router.navigateByUrl("newProduct")
  }

  onEditProduct(p:Product) {
    this.router.navigateByUrl("editProduct/"+p.id);
  }

  onActionEvent($event:ActionEvent) {
  // alert($event)
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductActionsTypes.EDIT_PRODUCT:this.onEditProduct($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.onDeleteProduct($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
    }
  }
}
