import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_URL } from '../shared/constants/url';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(FOODS_URL);
  }

  getFoodsBySearchTerm(SearchTerm:string){
    // return this.getAll().filter(food => food.name.toLowerCase().includes(SearchTerm.toLowerCase()));
    return this.http.get(FOODS_BY_SEARCH_URL + SearchTerm);
  }

  getFoodById(foodId:string){
    // return this.getAll().find(food => food.id == foodId) ?? new Food()
    return this.http.get(FOODS_BY_ID_URL + foodId);
  }
}
