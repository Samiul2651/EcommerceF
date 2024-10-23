import { Product } from './../product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private url = "https://localhost:7276/api/Product/";
  
  getProductsByPage(page : number){
    return this.http.get(this.url + 'getProducts/1');
  }

  getProductsBySearch(page : number, input : string){
    return this.http.get(`${this.url}getProductsBySearch/${input}/${page}`)
  }

  getProduct(productId : string){
    return this.http.get(this.url + productId);
  }

  deleteProduct(productId : string){
    return this.http.delete(`${this.url + productId}` );
  }

  addProduct(product : Product){
    return this.http.post(this.url, product);
  }
}
