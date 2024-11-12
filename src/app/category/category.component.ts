import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { Category } from '../../category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService : CategoryService,
    private productService : ProductService,
    private route : ActivatedRoute
  ){}

  products : Product[] = [];

  categories : Category[] = [];
  ngOnInit(): void {
    let id : string | null= this.route.snapshot.paramMap.get('id');
    this.productService.getProductsByCategory(id, 1)
      .subscribe((response : any) => {
        this.products = response.products;
        console.log(this.products);
      })
    
    this.categoryService.getCategoryByParent(id ?? "")
      .subscribe((response : any) => {
        this.categories = response.categories;
        console.log(this.categories);
      })

  }
}
