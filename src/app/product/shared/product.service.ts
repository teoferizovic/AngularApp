import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import {Product} from'./product.model'
//import {ErrorHandling} from'../../categories/shared/error-handling'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  public handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
        const msg = `${error.status} ${error.statusText}`;
        return throwError(msg);
    };

  }

  getProducts (pageNum : number): Observable<Product[]> {
     return this.http.get<Product[]>('http://127.0.0.1:8000/products/index/?page='+pageNum)
       .pipe(
         tap(products => console.log('fetched products')),
         catchError(this.handleError('getProducts', []))
       );
  }

  getProductsByName (name : string): Observable<Product[]> {
     return this.http.get<Product[]>('http://127.0.0.1:8000/products/index/?name='+name)
       .pipe(
         tap(products => console.log('fetched products')),
         catchError(this.handleError('getProducts', []))
       );
  }
}
