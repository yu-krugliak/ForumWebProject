import { Observable, tap } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

    // Also handle errors globally
    return next.handle(req).pipe(
      tap({
        next: x => x,
        error: err => {
          // Handle this err
          console.error(`Error performing request, status code = ${err.status}`);
        }
      })
    );
  }
}
