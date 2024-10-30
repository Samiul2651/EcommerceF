import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user';
// import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  url = "https://localhost:7276/api/Customer";

  takeOrder(order : any){
    return this.http.post(this.url + "/order", order);
  }
}
