import { Category } from './../../category';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private productService : ProductService 
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  products: Product[] = [];
  input: string = '';
  
  form = this.formBuilder.group({
    productName: ['',[
      Validators.required,
    ]],
    price: ['', [
      Validators.required,
    ]],
    type: ['', [
      Validators.required,
    ]],
    imageLink: ['', [
      Validators.required,
    ]],
    categoryId: ['', [
      // Validators.required
    ]]
  });

  items: Category[] = [];
  editProductId : string = '';

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

  get categoryId(){
    return this.form.get("categoryId");
  }
  
  _showAddProduct : boolean = false;
  _showAllProduct : boolean = true;
  
  ngOnInit(): void {
    this.productService.getCategories()
      .subscribe((response : any) => {
        this.items = response.categories;
      })

    let productId = this.route.snapshot.paramMap.get('id');
    if(productId == null){
      this.productService.getProductsByPage(1)
        .subscribe((response : any) => {
          this.products = response.products;
        });
    }
    else{
      this.editProductId = productId;
      this._showAllProduct = false;
    }

    
    

  }
  viewProductListByName(){
    console.log(this.input);
    if(this.input == '' || this.input == null ){
      this.productService.getProductsByPage(1)
        .subscribe((response : any) => {
          this.products = response.products;
        });
      return;
    }
    this.products = [];
    this.productService.getProductsBySearch(1, this.input)  
      .subscribe((response : any) => {
        this.products = response.products;
        console.log(this.products);
      });
  }

  viewProductListByID(){
    console.log(this.input);
    if(this.input == '' || this.input == null ){
      this.productService.getProductsByPage(1)
        .subscribe((response : any) => {
          this.products = response.products;
        });
      return;
    }
    this.products = [];
    this.productService.getProductsBySearchAndId(this.input)
      .subscribe((response : any) => {
        this.products = response.products;
        console.log(this.products);
      });
  }

  deleteProduct(productId : string){
    this.productService.deleteProduct(productId)
      .subscribe( () => {
        this.viewProductListByName();
      });
      
  }

  showAddProduct(){
    this._showAddProduct = !this._showAddProduct;
  }

  showAllProduct(){
    this._showAllProduct = !this._showAllProduct;
  }

  addProduct(){
    // console.log("category: " + this.categoryId?.value);
    let productName : string = '';
    let productPrice : number = 0;
    let productType : string = '';
    let productImageLink : string = '';
    let categoryId : string = '';
    if(this.productName?.value) productName = this.productName.value;
    if(this.price?.value)productPrice = Number(this.price.value);
    if(this.type?.value)productType = this.type.value;
    if(this.imageLink?.value)productImageLink = this.imageLink.value;
    if(this.categoryId?.value)categoryId = this.categoryId.value;
    let product : Product = {
      id : '',
      name : productName,
      price : productPrice,
      type : productType,
      imageLink : productImageLink,
      trendingScore : 0,
      category : categoryId,
      quantity : 0
    }

    this.productService.addProduct(product)
      .subscribe(response => {
        console.log(response);
        this.showAddProduct();
        this.viewProductListByName();
      })
  }

  productToEdit : Product = {
    id : '',
    name : '',
    price : 0,
    type : '',
    imageLink : '',
    trendingScore : 0,
    category : '',
    quantity : 0
  };
  editProduct(){
    this.showAllProduct();
    this.productToEdit.category = '';
    let productName : string = this.productToEdit.name;
    let productPrice : number = this.productToEdit.price;
    let productType : string = this.productToEdit.type;
    let productImageLink : string = this.productToEdit.imageLink;
    let categoryId : string = '';
    if(this.productName?.value) productName = this.productName.value;
    if(this.price?.value)productPrice = Number(this.price.value);
    if(this.type?.value)productType = this.type.value;
    if(this.imageLink?.value)productImageLink = this.imageLink.value;
    if(this.categoryId?.value)categoryId = this.categoryId.value;
    this.productToEdit.name = productName;
    this.productToEdit.price = productPrice;
    this.productToEdit.type = productType;
    this.productToEdit.imageLink = productImageLink;
    this.productToEdit.id = this.editProductId;
    this.productToEdit.category = categoryId;
    console.log(this.productToEdit);
    this.productService.editProduct(this.productToEdit)
      .subscribe(response => {
        console.log(response);
        this.viewProductListByName();
      })
    
  }
  
  showEditProduct(product : Product){
    this.router.navigate(['/admin', {id : product.id}]);
  }

  // backToadmin

}
