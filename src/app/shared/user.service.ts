import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import {User} from'./user.model';
import {ErrorHandling} from'../categories/shared/error-handling';


/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json; charset=UTF-8'})
};*/


//var reqHeader = new HttpHeaders({'No-Auth':'true'});

@Injectable({
  providedIn: 'root'
})
export class UserService implements ErrorHandling {

  reqHeader : any;

  constructor(private http : HttpClient) {
    this.reqHeader = new HttpHeaders({'No-Auth':'true'});
  }

  public handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
        const msg = `${error.status} ${error.statusText}`;
        return throwError(msg);
    };

  }

  public addUser(user : User): Observable<User> {

    const url = 'http://127.0.0.1:8000/users/register';
    var body = JSON.parse(JSON.stringify(user));

    return this.http.post<User>(url, body, {headers:this.reqHeader}).pipe(
          tap((user: User) => console.log(`added user ${user}`)),
        catchError(this.handleError<User>('addUser'))
    );

  }

  public login(user : User): Observable<User> {

    const url = 'http://127.0.0.1:8000/users/login';
    var body = JSON.parse(JSON.stringify(user));
    return this.http.post<User>(url, body,{headers:new HttpHeaders({'No-Auth':'true'})}).pipe(
          tap((user: User) => console.log(`added user ${user}`)),
        catchError(this.handleError<User>('addUser'))
    );

  }

  public logout(token : string): Observable<User> {

    const url = 'http://127.0.0.1:8000/users/logout/'+token;

    return this.http.put<User>(url,{headers:this.reqHeader}).pipe(
          tap((user: User) => console.log(`added user ${user}`)),
        catchError(this.handleError<User>('addUser'))
    );

  }

  getUser (id): Observable<User[]> {
    return this.http.get<User[]>('http://127.0.0.1:8000/users/index/'+id)
      .pipe(
        tap(users => console.log('fetched user')),
        catchError(this.handleError('getUser', []))
      );
  }

}
