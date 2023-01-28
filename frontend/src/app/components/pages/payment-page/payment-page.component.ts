import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  order:any;
  gettingUserId: any;
  constructor(private orderService:OrderService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.gettingUserId = this.userService.getUserFromLocalStorage();
    const data = {
      currentUserID:this.gettingUserId.user.id
    }
    //console.log(data)
    this.orderService.getNewOrderFromCurrentUser(data)
    .subscribe({
      next: (order:any) => {
        this.order = order;
        //console.log(this.order);
      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      }
    })
  }

}
