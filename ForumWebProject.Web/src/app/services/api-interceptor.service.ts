import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from './route-constants';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router){ }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    console.info('from interceptor');
    var token = localStorage.getItem('token');

    if(token !== null){
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    // else{
    //   this.router.navigate(['about']);
    // }

    console.info(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
              console.log('This is client side error');
              errorMsg = `Error: ${error.error.message}`;
          } else {
              console.log('This is server side error');
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

              if(error.status == 401){
                var href = this.router.url;
                this.router.navigate([RoutesConstants.Login], {queryParams: {redirect: href}});
              }
          }
          console.log(errorMsg);
          return throwError(() => error.error.messages);
      })
  )
    // Also handle errors globally
    // return next.handle(req).pipe(
    //   tap({
    //     next: x => x
    //     // error: err => {
    //     //   // Handle this err
    //     //   if()
    //     //   console.error(`Error performing request, status code = ${err.status}`);
    //     // }
    //   })
    // );
  }
}
