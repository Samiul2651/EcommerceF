import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../product';
import { Category } from '../../category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private categoryService : CategoryService,
    private router : Router
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  product : Product = {
    id : "",
    name : "",
    price : 0,
    type : "",
    imageLink : "",
    trendingScore : 0,
    category : "",
    quantity : 0
  };

  category : Category = {
    id : "",
    name : "",
    parentCategoryId : "",
    trendingScore : 0
  };

  upvote : string = "Upvote";
  downVote : string = "Downvote";
  upvoteClass : string = "vote-btn";
  downvoteClass : string = "vote-btn";

  trendingProducts : Product[] = [];
  trendingCategories : Category[] = [];
  ngOnInit(): void {
    let id : string | null= this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id ?? "")
      .subscribe((response : any) => {
        this.product = response.product;
        console.log(this.product);
        this.getCategory();
      })
    
    this.productService.getProductsByPage(1)
      .subscribe((response : any) => {
        this.trendingProducts = response.products;
        console.log(this.trendingProducts);
      })
    
    this.categoryService.getTopCategories()
      .subscribe((response : any) => {
        this.trendingCategories = response.categories;
        console.log(this.trendingCategories);
      })
  }

  getCategory(){
    this.categoryService.getCategory(this.product.category ?? "")
      .subscribe((response : any) => {
        this.category = response;
        console.log(this.category);
      })
  }

  addProductToCart(quantity : number){
    let pastQuantity = sessionStorage.getItem(this.product.id);
    let currentQuantity = quantity;
    if(pastQuantity != null){
      currentQuantity = quantity + Number(pastQuantity);
    }
    sessionStorage.setItem(this.product.id, currentQuantity.toString());
    if(this.product) this.product.quantity = currentQuantity;
    alert(this.product?.name + " Added to Cart");
    console.log(sessionStorage.getItem(this.product.id));
  }

  upvoteProduct(){
    let user = localStorage.getItem('email');
    if(user == null || user == ""){
      alert("Please Login to vote");
      return;
    }
    this.upvoteClass = "vote-btn-active";
    this.downvoteClass = "vote-btn";
    this.upvote = "Upvoted";
    this.downVote = "Downvote";
    console.log(this.upvote);
    let vote = {
      productId : this.product.id,
      userId : user
    };
    this.productService.upvoteProduct(vote.productId, vote.userId).subscribe();
  }

  downvoteProduct(){
    let user = localStorage.getItem('email');
    if(user == null || user == ""){
      alert("Please Login to vote");
      return;
    }
    this.upvoteClass = "vote-btn";
    this.downvoteClass = "vote-btn-active";
    this.upvote = "Upvote";
    this.downVote = "Downvoted";
    console.log(this.upvote);
    let vote = {
      productId : "",
      userId : ""
    };
    vote.productId = this.product.id;
    vote.userId = user;
    this.productService.downvoteProduct(vote.productId, vote.userId).subscribe();
  }
}
