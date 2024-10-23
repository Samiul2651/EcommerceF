import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
// import { Order } from '../order';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  
  orders : Product[] = [];
 
  private _sum: number = 0;
  constructor(
    private productService: ProductService
  ){}
  ngOnInit(): void {
    Object.keys(sessionStorage).forEach((key) => {
      let productToOrder : Product;
      this.productService.getProduct(key)
        .subscribe((response : any) =>{
          productToOrder = response.product;
          productToOrder.quantity = Number(sessionStorage.getItem(key));
          this.orders.push(productToOrder);
        })
    })
  }

  RemoveProductFromCart(product : Product){
    // console.log(product);
    sessionStorage.removeItem(product.id);
    this.orders = this.orders.filter(obj => obj != product);
  }


  get sum(){
    this._sum = 0;
    this.orders.forEach(product => {
      this._sum += product.quantity * product.price;
    });
    return this._sum;
  }

  DecreaseQuantity(product: Product){
    product.quantity -= 1;
    if(product.quantity < 0)product.quantity = 0;
    sessionStorage.setItem(product.id, product.quantity.toString());
    console.log(product);
  }
  
  IncreaseQuantity(product: Product){
    product.quantity += 1;
    sessionStorage.setItem(product.id, product.quantity.toString());
    console.log(product);
  }
}
