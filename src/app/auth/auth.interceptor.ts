import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private router: Router) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());
 
        if (localStorage.getItem('userToken') != null) 
        {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq).pipe(
                tap((event: HttpEvent<any>) => { }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.router.navigateByUrl('/login');
                        return Observable.throw(err);
                    }
                })
            );
        }
        else
        {
            this.router.navigateByUrl('/login');
        }
    }
}