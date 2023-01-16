import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods!:Food[];
  constructor(private foodService:FoodService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //! to make params.searchterm works
      //? go to tsconfig.json
      //* and change
      //TODO "noPropertyAccessFromIndexSignature" to false
      if(params.searchTerm){
       this.foods = this.foodService.getFoodsBySearchTerm(params.searchTerm);
      }else{
        this.foods = this.foodService.getAll();
      }
    });
    //todo console.log(this.foods);
  }

}
