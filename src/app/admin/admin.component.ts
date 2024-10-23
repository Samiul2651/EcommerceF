import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    route: ActivatedRoute,
    private productService : ProductService 
  ){}
  url = "https://localhost:7276/api/Product/";
  products: Product[] = [];
  input: string = '';
  
  form = new FormGroup({
    productName: new FormControl('',[
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
    type: new FormControl('', [
      Validators.required,
    ]),
    imageLink: new FormControl('', [
      Validators.required,
    ])
  });

  items: Category[] = [];

  get productName(){
    return this.form.get("productName");
  }
  
  get price(){
    return this.form.get("price");
  }
  
  get type(){
    return this.form.get("type");
  }
  
  get imageLink(){
    return this.form.get("imageLink");
  }
  
  _showAddProduct : boolean = false;
  
  ngOnInit(): void {
    this.http.get(this.url + 'getProducts/1')
      .subscribe((response : any) => {
        // console.log(JSON.stringify(response));
        this.products = response.products;
        console.log(this.products);
      });
  }
  viewProductListByName(){
    console.log(this.input);
    if(this.input == '' || this.input == null ){
      this.http.get(this.url + 'getProducts/1')
      .subscribe((response : any) => {
        // console.log(JSON.stringify(response));
        this.products = response.products;
        // console.log(this.products);
      });
      return;
    }
    this.products = [];
    this.http.get(this.url + 'getProductsBySearch/' + this.input + '/1')
      .subscribe((response : any) => {
        // console.log(JSON.stringify(response));
        this.products = response.products;
        console.log(this.products);
      });
  }

  viewProductListByID(){
    console.log(this.input);
    if(this.input == '' || this.input == null ){
      this.http.get(this.url + 'getProducts/1')
      .subscribe((response : any) => {
        // console.log(JSON.stringify(response));
        this.products = response.products;
        // console.log(this.products);
      });
      return;
    }
    this.products = [];
    this.http.get(this.url + 'getProductsBySearchWithId/' + this.input + '/1')
      .subscribe((response : any) => {
        // console.log(JSON.stringify(response));
        this.products = response.products;
        console.log(this.products);
      });
  }

  deleteProduct(productId : string){
    this.productService.deleteProduct(productId)
      .subscribe( response => {
        this.viewProductListByName();
      });
      
  }

  // AddCategory(productId: string){
    
  // }

  showAddProduct(){
    this._showAddProduct = !this._showAddProduct;
  }

  addProduct(){
    let productName : string = '';
    let productPrice : number = 0;
    let productType : string = '';
    let productImageLink : string = '';
    if(this.productName?.value) productName = this.productName.value;
    if(this.price?.value)productPrice = Number(this.price.value);
    if(this.type?.value)productType = this.type.value;
    if(this.imageLink?.value)productImageLink = this.imageLink.value;
    let product : Product = {
      id : '',
      name : productName,
      price : productPrice,
      type : productType,
      imageLink : productImageLink,
      trendingScore : 0,
      category : '',
      quantity : 0
    }

    this.productService.addProduct(product)
      .subscribe(response => {
        console.log(response);
      })
  }


}
