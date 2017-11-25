import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';
import 'rxjs/add/operator/do';


export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AppService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // luu request de thuc hien lai sau khi dang nhap
                    this.auth.collectFailedRequest(request);
                    // redirect to the login route
                    // or show a modal
                    console.log('Err 401, login again');
                }
            }
        });
    }
}
