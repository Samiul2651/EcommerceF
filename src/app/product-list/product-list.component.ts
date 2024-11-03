import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  products: Product[] = [];
  showOrder: boolean = false;
  categories : any[] = [];
  input:string = '';
  categoryId : string = '';
  currentPage : number = 1;
  pageList : number[] = [];
  ngOnInit(): void {
    // console.log(localStorage.getItem("token"));

    let categoryId = this.route.snapshot.paramMap.get('id');
    let page : number | null = Number(this.route.snapshot.paramMap.get('page'));
    if(page)this.currentPage = page;
    if(categoryId)this.categoryId = categoryId;
    
    if(this.categoryId == ""){
      this.getProductsByPage(this.currentPage);
      this.getRootCatgories();
    }
    else{
      this.getProductsByPageAndCategory(this.currentPage);
    }

    for(let i = this.currentPage;i < this.currentPage + 10;i++){
      this.pageList.push(i);
    }
    
  }

  toPage(page : number){
    console.log("Page " + page);
    this.router.navigate(['/product-list/', {id : this.categoryId, page : page}]);
  }

  getProductsByPage(page : number){
    this.products = [];
    console.log("Page: " + page);
    this.productService.getProductsByPage(page)
      .subscribe((response : any) =>{
        console.log(response);
        this.products = response.products;
        this.products.forEach(product => {
          let quantity = sessionStorage.getItem(product.id);
          if(quantity)product.quantity = Number(quantity);
          else product.quantity = 0;
        })
      })
  }

  getProductsByPageAndCategory(page : number){
    this.productService.getProductsByCategory(this.categoryId, page)
      .subscribe((response : any) => {
        this.products = response.products;
        this.showCategoryByParent(this.categoryId);
      });
  }

  getRootCatgories(){
    this.productService.getRootCategories()
      .subscribe((response : any) => {
        // console.log(response);
        this.categories = response.categories;
      });
  }

  ViewProductList(page : number){
    if(this.input == '' || this.input == null ){
      this.productService.getProductsByPage(page)
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
    alert(product?.name + " Added to Cart");
  }

  showProductsByCategory(categoryId : string){
    this.router.navigate(['/product-list/', {id : categoryId}]);
  }

  showCategoryByParent(categoryId : string){
    this.categories = [];
    this.productService.getCategoryByParent(categoryId)
      .subscribe((response : any) =>{
        this.categories = response.categories;
      });
  }

}


