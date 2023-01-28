import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ALL_0RDER_URL, ORDER_URL } from '../shared/constants/url';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  order(order: Order){
    return this.http.post<Order>(ORDER_URL, order);
  }

  getNewOrderFromCurrentUser(data:any):Observable<any>{
    return this.http.post(ALL_0RDER_URL, data);
  }
}
