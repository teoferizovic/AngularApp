import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import {Order} from'./order.model'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  public handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
        const msg = `${error.status} ${error.statusText}`;
        return throwError(msg);
    };

  }

  getOrders (id : string): Observable<Order[]> {
     return this.http.get<Order[]>('http://127.0.0.1:8000/orders/users/'+id)
       .pipe(
         tap(orders => console.log('fetched orders')),
         catchError(this.handleError('getOrders', []))
       );
  }

  addOrder(userId:string): Observable<Order> {

    let order = new Order();
    order.user_id =Number(userId);

    const url = 'http://127.0.0.1:8000/orders/create';
    var body = JSON.parse(JSON.stringify(order));

    return this.http.post<Order>(url, body).pipe(
          tap((order: Order) => console.log(`added order ${order.id}`)),
        catchError(this.handleError<Order>('addOrder'))
    );

  }

}
