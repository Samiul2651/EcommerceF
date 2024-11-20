import { CustomerService } from './../services/customer.service';
import { Order } from './../order';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(
    private formBuilder : FormBuilder,
    private productService : ProductService,
    private customerService : CustomerService,
    private router : Router
  ){}

  form = this.formBuilder.group({
    name : ['', [
      Validators.required
    ]],
    email : ['',[
      Validators.required, Validators.email
    ]],
    mobile : ['', [
      Validators.required
    ]],
    address : ['', [
      Validators.required
    ]]
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
    let orderAddress = '';
    if(this.address.value)orderAddress = this.address.value;
    let currentDate = new Date();
    let orderPhoneNumber = '';
    if(this.mobile.value)orderPhoneNumber = this.mobile.value;
    
    let order : Order = {
      id : '',
      customerId : localStorage.getItem('email') ?? "",
      email : this.email.value ?? '',
      products : [],
      price : 0,
      address : orderAddress,
      phoneNumber : orderPhoneNumber,
      orderTime : currentDate
    };
    let keys : string[] = Object.keys(sessionStorage);
    console.log(keys);
    this.productService.getProductsByIds(keys)
      .subscribe((response : any) => {
        order.products = response.products;
        let products : Product[] = order.products;
        products.forEach(product => {
          if(sessionStorage.getItem(product.id)){
              product.quantity = Number(sessionStorage.getItem(product.id));
          }
          order.price += product.price * product.quantity;
        });
        
        this.customerService.takeOrder(order)
          .subscribe({
            next: () => {
              alert("Payment Successful");
              this.router.navigateByUrl('product-list');
            },
            error: (e) => {
              console.error(e);
              alert("Payment Unsuccessful");
              this.router.navigateByUrl('order');
            }
          });
      })
  }
  
  
}
