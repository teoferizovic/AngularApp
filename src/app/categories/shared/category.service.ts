import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import {Category} from'./category.model'
import {ErrorHandling} from'./error-handling'

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json; charset=UTF-8','Authorization':'Bearer '+localStorage.getItem('userToken') })
};*/
/*var headers_object = new HttpHeaders();

headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Bearer G7cEkvKCnYKKJOBiK6qT37Qu4qaSOcKw03r8QDAfdaaOg6xwBVxkhGJ7BJgY");

const httpOptions = {
  headers: headers_object
};*/

@Injectable({
  providedIn: 'root'
})

export class CategoryService implements ErrorHandling {

  categoryList : Category[];

  constructor(private http : HttpClient) { }

  public handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
        const msg = `${error.status} ${error.statusText}`;
        return throwError(msg);
    };

  }

  private catchHttpError = <T>() =>
   catchError<T, T>((error: HttpErrorResponse) => {
     const msg = `${error.status} ${error.statusText} -  ${error.url}`;
     console.log(msg);
     return throwError(new Error(msg));
   });


   getCats (): Observable<Category[]> {
      return this.http.get<Category[]>('http://127.0.0.1:8000/categories/index/')
        .pipe(
          tap(heroes => console.log('fetched products')),
          catchError(this.handleError('getProducts', []))
        );
   }

    getCategory (id): Observable<Category[]> {
      return this.http.get<Category[]>('http://127.0.0.1:8000/categories/index/'+id,{headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
        .pipe(
          tap(heroes => console.log('fetched products')),
          catchError(this.handleError('getProducts', []))
        );
    }

    deleteCategory(id): Observable<Category> {

      const url = 'http://127.0.0.1:8000/categories/delete/'+id;

      return this.http.delete<Category>(url,{headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).pipe(
          tap(_ => console.log(`deleted category_id id=${id}`)),
          catchError(this.handleError<Category>('deleteProduct'))
      );

     }


    addCategory(category : Category): Observable<Category> {

      const url = 'http://127.0.0.1:8000/categories/create';
      var body = JSON.parse(JSON.stringify(category));

      return this.http.post<Category>(url, body,{headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).pipe(
            tap((category: Category) => console.log(`added category ${category.Name}`)),
          catchError(this.handleError<Category>('addCategory'))
      );

    }

    updateCategory (id : number, category : Category): Observable<Category> {

        const url = 'http://127.0.0.1:8000/categories/update/'+id;
        var body = JSON.parse(JSON.stringify(category));

        return this.http.put<Category>(url, body, {headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})}).pipe(
              tap(_ => console.log(`updated product id=${id}`)),
            catchError(this.handleError<Category>('updateCategory'))
        );

    }


}
