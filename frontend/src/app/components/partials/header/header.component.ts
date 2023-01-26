import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user:any;
  //testings:any;

  constructor(private cartService:CartService,
    private userService:UserService) {
     }

  ngOnInit(): void {
    this.cartService.getCartObservable()
    .subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    this.userService.userObservable
    .subscribe((newUser) => {
      this.user = newUser;
      //console.log(this.user);
    });

    // this.testings = this.userService.getUserFromLocalStorage();
    // console.log(this.testings);
  }

  logout(){
    this.userService.logOut();
    //window.location.reload();
  }

  get isAuth(){
    return this.user.token
  }
}
