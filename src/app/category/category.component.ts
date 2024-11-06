import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

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

  ngOnInit(): void {
    let id : string | null= this.route.snapshot.paramMap.get('id');
    this.productService.getProductsByCategory(id, 1)
      .subscribe((response : any) => {
        this.products = response.products;
        console.log(this.products);
      })

  }
}
