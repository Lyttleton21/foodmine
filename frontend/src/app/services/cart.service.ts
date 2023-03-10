import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/cartItem';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food:Food):void {
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id)
    if(cartItem){
      return;
    }else{
      this.cart.items.push(new CartItem(food));
    }
    this.setCartToLocalStorage()
  }

  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items
    .filter( (item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number):void{
    let cartItem = this.cart.items
    .find( item => item.food.id === foodId);
    if(!cartItem){
      return;
    }else{
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
    }
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(){
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(){
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  public getCartFromLocalStorage(){
    const cartJson = JSON.parse(localStorage.getItem('Cart') || `{}`);
    return cartJson
  }

}
