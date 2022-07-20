import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import {NewProductComponent} from "./components/new-product/new-product.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";

const routes: Routes = [
  {
    path:"home",
    component : HomeComponent
  },
  {
    path :"products",
    component : ProductsComponent
  },
  {
    path:"",
    component : HomeComponent
  }
  ,
  {
    path:"newProduct",
    component : NewProductComponent
  } ,
  {
    path:"editProduct/:id",
    component : EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
