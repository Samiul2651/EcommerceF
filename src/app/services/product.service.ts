import { Product } from './../product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient,
    private auth : AuthService
  ){}

  private url = "https://localhost:7276/api/Product/";
  

  getProductsByPage(page : number){
    return this.http.get(this.url + 'getProducts/' + page);
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

  // getCategories(){
  //   return this.http.get(this.url+"categories")
  // }

  // getRootCategories(){
  //   return this.http.get(this.url+"rootCategories")
  // }

  editProduct(product : Product){
    return this.http.put(this.url, product);
  }

  getProductsByCategory(categoryId : any, page : number){
    return this.http.get(this.url+"productsByCategory/"+categoryId+"/"+page);
  }

  // getCategoryByParent(categoryId : string){
  //   return this.http.get(this.url+"getCategoryByParent/" + categoryId);
  // }

  getProductsBySearchAndId(input : string){
    return  this.http.get(this.url + 'getProductsBySearchWithId/' + input + '/1');
  }

  getProductsByIds(ids : string[]){
    return this.http.post(this.url + 'getProductsByIds', ids);
  } 
}
