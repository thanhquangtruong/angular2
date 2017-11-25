import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {SERVER_ADDRESS} from '../clientDetail';
import {HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable()
export class AppService {

    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private _auth: AuthService,
                private _http: Http) {
    }

    getResource(apiEndPoint): Observable<any> {
        console.log('GET: ' + SERVER_ADDRESS + apiEndPoint);
        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer ' + Cookie.get('access_token')
        });
        const options = new RequestOptions({headers: headers});
        return this._http.get(SERVER_ADDRESS + apiEndPoint, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postResource(apiEndPoint, bodyData): Observable<any> {
        console.log('POST: ' + SERVER_ADDRESS + apiEndPoint);
        const headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this._auth.getToken()
        });
        const options = new RequestOptions({headers: headers});
        return this._http.post(SERVER_ADDRESS + apiEndPoint, bodyData, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    putResource(apiEndPoint, bodyData): Observable<any> {
        console.log('PUT: ' + SERVER_ADDRESS + apiEndPoint);
        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer ' + this._auth.getToken()
        });
        const options = new RequestOptions({headers: headers});
        return this._http.put(SERVER_ADDRESS + apiEndPoint, bodyData, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteResource(apiEndPoint): Observable<any> {
        console.log('DELETE: ' + SERVER_ADDRESS + apiEndPoint);
        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer ' + this._auth.getToken()
        });
        const options = new RequestOptions({headers: headers});
        return this._http.delete(SERVER_ADDRESS + apiEndPoint, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }
}
