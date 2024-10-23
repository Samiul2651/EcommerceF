import { Category } from './../../category';
import { CustomerService } from './../services/customer.service';
import { Product } from './../product';
import { Order } from './../order';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(
    private productService : ProductService,
    private customerService : CustomerService
  ){}

  form = new FormGroup({
    name : new FormControl('', [
      Validators.required
    ]),
    email : new FormControl('',[
      Validators.required, Validators.email
    ]),
    mobile : new FormControl('', [
      Validators.required
    ]),
    address : new FormControl('', [
      Validators.required
    ])

  });

  get email(){
    return this.form.get('email');
  }

  get name(){
    return this.form.get('name');
  }

  get mobile(){
    return this.form.get('mobile');
  }
  
  get address(){
    return this.form.get('address');
  }

  takeOrder(){
    if(this.email?.value == '' || this.name?.value == '' ||
        this.mobile?.value == '' || this.address?.value == ''
        || this.email == null || this.address == null ||
        this.mobile == null
      ){
          alert("Pease fill all fields");
          return;
    }
    let totalPrice = 0;
    let orderAddress = '';
    if(this.address.value)orderAddress = this.address.value;
    let currentDate = new Date();
    let orderPhoneNumber = '';
    if(this.mobile.value)orderPhoneNumber = this.mobile.value;
    
    let order : Order = {
      id : '',
      customerId : '',
      products : [],
      price : 0,
      address : orderAddress,
      phoneNumber : orderPhoneNumber,
      orderTime : currentDate
    };
    let len = sessionStorage.length;
    Object.keys(sessionStorage).forEach((key) =>{
      this.productService.getProduct(key)
      .subscribe((response : any)=>{
        response.product.category = '';
        order.products.push(response.product);
        
        if(sessionStorage.getItem(response.product.id)){
          response.product.quantity = Number(sessionStorage.getItem(response.product.id));
        }
        order.price += response.product.price * response.product.quantity;
        if(order.products.length == len){
          // console.log(order);
          this.customerService.takeOrder(order)
            .subscribe();
        }
      })
      
    });
    
  }
  
  
}
