import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  private url = "https://localhost:7276/api/Category/";

  getCategories(){
    return this.http.get(this.url+"categories")
  }

  getRootCategories(){
    return this.http.get(this.url+"rootCategories")
  }

  getCategoryByParent(categoryId : string){
    return this.http.get(this.url+"getCategoryByParent/" + categoryId);
  }

  getCategoryBySearch(input : string){
    return this.http.get(this.url+"searchCategory/"+input);
  }

  getCategory(id : string){
    return this.http.get(this.url+"getCategory/"+id);
  }

  getTopCategories(){
    return this.http.get(this.url+"getTopCategories");
  }
}
