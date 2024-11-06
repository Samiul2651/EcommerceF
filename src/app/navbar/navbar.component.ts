import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Product } from './../product';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router : Router,
    private productService : ProductService,
    private categoryService : CategoryService
  ){}

  products : Product[] = [];
  categories : Category[] = [];
  home(){
    this.router.navigateByUrl('/product-list');
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  order(){
    this.router.navigateByUrl('/order');
  }

  input = "";

  showSearchDropDown(){
    this.products = [];
    this.categories = [];
    if(this._showProducts)this.showProducts();
    else this.showCategories();
  }

  showProduct(product : Product){
    this.products = [];
    this.input = "";
    this.router.navigate(['/product/', {id : product.id}]);
  }

  showCategory(category : Category){
    this.categories = [];
    this.input = "";
    this.router.navigate(['/category/', {id : category.id}]);
  }
  _showProducts : boolean = true;
  _showCategories : boolean = false;

  showProducts(){
    this._showProducts = true;
    this._showCategories = false;
    this.productService.getProductsBySearch(1, this.input)
      .subscribe((response : any) => {
        this.products = response.products;
      })
  }

  showCategories(){
    this._showProducts = false;
    this._showCategories = true;
    this.categoryService.getCategoryBySearch(this.input)
      .subscribe((response : any) => {
        this.categories = response.categories;
      })
  }
}
