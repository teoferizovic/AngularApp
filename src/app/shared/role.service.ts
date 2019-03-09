import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import {Role} from'./role.model';
import {ErrorHandling} from'../categories/shared/error-handling';

@Injectable({
  providedIn: 'root'
})

export class RoleService implements ErrorHandling {

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

  getRoles (): Observable<Role[]> {

    return this.http.get<Role[]>('http://127.0.0.1:8000/roles/index/',{headers:this.reqHeader})
      .pipe(
        tap(users => console.log('fetched roles')),
          catchError(this.handleError('getRole', []))
      );

  }

}
