import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AppService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // request = request.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${this.auth.getToken()}`,
        //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        //   }
        // });

        return next.handle(request);
    }
}
