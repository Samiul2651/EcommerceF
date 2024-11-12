import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css'
})
export class TopProductsComponent implements OnInit {

  constructor(
    private productService : ProductService,
    private router : Router
  ){}

  trendingProducts : Product[] = [];
  ngOnInit(): void {
    this.productService.getProductsByPage(1)
      .subscribe((response : any) => {
        this.trendingProducts = response.products;
        console.log(this.trendingProducts);
      })
  }

  showProduct(product : Product){
    this.router.navigate(['/product/', {id : product.id}]);
  }
}
