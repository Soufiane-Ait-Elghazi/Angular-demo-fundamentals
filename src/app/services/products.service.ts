import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public host:String = "http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products");
  }
  getSelectedProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products?selected=true");
  }
  getAvailableProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products?available=true");
  }


  SearchProducts(keyword: String): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+"products?name_like="+keyword);
  }
  Select(p :Product):Observable<Product>{
    p.selected = !p.selected ;
    return this.http.put<Product>(this.host+"products/"+p.id,p);
  }

  Delete(p:Product):Observable<void> {
    return this.http.delete<void>(this.host+"products/"+p.id);
  }

  Save(p:Product):Observable<Product> {
    return this.http.post<Product>(this.host+"products/",p);
  }
  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(this.host+"products/"+id);
  }

  updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(this.host+"products/"+product.id,product);
  }
}
