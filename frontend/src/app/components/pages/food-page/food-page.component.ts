import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food:any;

  constructor(private foodServices:FoodService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.foodServices.getFoodById(params.id)
        .subscribe(food => {
          this.food = food
        });
      }
    });
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
