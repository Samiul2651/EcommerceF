import { Category } from "../category";

export interface Product{
    id : string,
    name : string,
    price : number,
    type : string,
    imageLink : string,
    trendingScore : number,
    category : string,
    quantity : number
  }