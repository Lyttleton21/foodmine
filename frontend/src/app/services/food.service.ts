import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_foods;
  }

  getFoodsBySearchTerm(SearchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(SearchTerm.toLowerCase()));
  }

  getFoodById(foodId:string){
    return this.getAll().find(food => food.id == foodId) ?? new Food()
  }
}
