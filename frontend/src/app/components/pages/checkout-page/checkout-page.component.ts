import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order:Order = new Order();
  checkOutForm!: FormGroup;
  currentUser:any;

  constructor(private cartService:CartService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;


    // CheckOut Form
    //let {name, address} = this.userService.currentUser;
    this.userService.userObservable
    .subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    this.checkOutForm = this.formBuilder.group({
      name: [this.currentUser.user.name, Validators.required],
      address: [this.currentUser.user.address, [Validators.required]]
    });
  }


  get fc(){
    return this.checkOutForm.controls;
  }

  createOrder(){
    if(this.checkOutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }else{
      this.order.name = this.fc.name.value;
      this.order.address = this.fc.address.value;
      console.log(this.order)
    }
  }
}
