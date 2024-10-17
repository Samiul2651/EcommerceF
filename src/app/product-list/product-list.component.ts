import { Component } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  url = "https://localhost:7276/api/Product/getProducts/1";

  constructor(private http: HttpClient){}
  products: Product[] = [];
  getProducts(){
    this.http.get(this.url)
      .subscribe((response : any) => {
        console.log(JSON.stringify(response));
        this.products = response.products;
        console.log(this.products);
      });

    
  }

}


