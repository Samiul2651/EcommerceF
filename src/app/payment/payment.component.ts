import { CustomerService } from './../services/customer.service';
import { Order } from './../order';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(
    private formBuilder : FormBuilder,
    private productService : ProductService,
    private customerService : CustomerService
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
      customerId : '',
      products : [],
      price : 0,
      address : orderAddress,
      phoneNumber : orderPhoneNumber,
      orderTime : currentDate
    };
    let len = sessionStorage.length;
    
    // This needs to be fixed
    // Object.keys(sessionStorage).forEach((key) =>{
    //   this.productService.getProduct(key)
    //   .subscribe((response : any)=>{
    //     response.product.category = '';
    //     order.products.push(response.product);
        
    //     if(sessionStorage.getItem(response.product.id)){
    //       response.product.quantity = Number(sessionStorage.getItem(response.product.id));
    //     }
    //     order.price += response.product.price * response.product.quantity;
    //     if(order.products.length == len){
    //       // console.log(order);
    //       this.customerService.takeOrder(order)
    //         .subscribe(response => {
    //           alert("Payment Successful");
    //         },error =>{
    //           alert("Payment Error");
    //         }
    //       );
    //     }
    //   })
      
    // });

    let keys : string[] = Object.keys(sessionStorage);
    console.log(keys);
    this.productService.getProductsByIds(keys)
      .subscribe((response : any) => {
        order.products = response.products;
        order.products.forEach(product => {
          if(sessionStorage.getItem(product.id)){
              product.quantity = Number(sessionStorage.getItem(product.id));
          }
          order.price += product.price * product.quantity;
        });
        console.log(order);
        this.customerService.takeOrder(order)
          .subscribe(response => {
            console.log(order);
            alert("Payment Successful");
          }, error => {
            alert("Payment Error");
          }
        )

      })
  }
  
  
}
