import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../../category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrl: './top-categories.component.css'
})
export class TopCategoriesComponent implements OnInit{
  constructor(
    private categoryService: CategoryService,
    private router : Router
  ){}

  trendingCategories : Category[] = [];
  ngOnInit(): void {
    this.categoryService.getTopCategories()
      .subscribe((response : any) => {
        this.trendingCategories = response.categories;
        console.log(this.trendingCategories);
      })
  }

  showCategory(category : Category){
    this.router.navigate(['/category/', {id : category.id}]);
  }
}
