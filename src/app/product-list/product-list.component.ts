import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService
  ){}
  products: Product[] = [];
  showOrder: boolean = false;
  categories : any[] = [];
  input:string = '';

  ngOnInit(): void {
    this.productService.getProductsByPage(1)
      .subscribe((response : any) =>{
        this.products = response.products;
        this.products.forEach(product => {
          let quantity = sessionStorage.getItem(product.id);
          if(quantity)product.quantity = Number(quantity);
          else product.quantity = 0;
        })
      })
      
    this.productService.getRootCategories()
      .subscribe((response : any) => {
        console.log(response);
        this.categories = response;
      });
  }

  ViewProductList(){
    if(this.input == '' || this.input == null ){
      this.productService.getProductsByPage(1)
      .subscribe((response : any) =>{
        this.products = response.products;
      })
      return;
    }
    this.products = [];
    this.productService.getProductsBySearch(1, this.input)
      .subscribe((response : any) => {
        this.products = response.products;
      });
  }

  addOrders(){
    this.products.forEach(product => {
      let currentQuantity = sessionStorage.getItem(product.id);
      if(currentQuantity){
        product.quantity = Number(currentQuantity);
      }
      else{
        product.quantity = 0;
      }
    });
  }

  addProductToCart(productID : any){
    let product= this.products.find(obj => obj.id === productID);
    let pastQuantity = sessionStorage.getItem(productID);
    let currentQuantity = 1;
    if(pastQuantity != null){
      currentQuantity = 1 + Number(pastQuantity);
    }
    sessionStorage.setItem(productID, currentQuantity.toString());
    if(product) product.quantity = currentQuantity;
    // console.log(product?.order + " " + product?.price);
    alert(product?.name + " Added to Cart");
  }

  showProductsByCategory(categoryId : string){
    console.log(categoryId);
    this.productService.getProductsByCategory(categoryId, 1)
      .subscribe((response : any) => {
        this.products = response;
        this.showCategoryByParent(categoryId);
      });
  }

  showCategoryByParent(categoryId : string){
    this.categories = [];
    this.productService.getCategoryByParent(categoryId)
      .subscribe((response : any) =>{
        this.categories = response;
      });
  }
}


