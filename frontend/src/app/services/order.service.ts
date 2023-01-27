import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_URL } from '../shared/constants/url';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  order(order: Order):Observable<any>{
    return this.http.post<Order>(ORDER_URL, order);
  }
}
