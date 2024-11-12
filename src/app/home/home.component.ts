import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { Category } from '../../category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private productService : ProductService,
    private categoryService : CategoryService
  ){}

  products : Product[] = [];

  categories : Category[] = [];

  ngOnInit(): void {
    this.productService.getProductsByPage(1)
      .subscribe((response : any) => {
        this.products = response.products;
        console.log(this.products);
      })
    
    this.categoryService.getTopCategories()
      .subscribe((response : any) => {
        this.categories = response.categories;
        console.log(this.categories);
      })
    
  }
}
