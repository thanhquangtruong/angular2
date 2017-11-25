import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {isNullOrUndefined} from 'util';
import {CLIENT_ID, CLIENT_SECRET, SERVER_ADDRESS} from '../clientDetail';
import {User} from '../_models/user';

@Injectable()
export class AuthService {

    constructor(private _router: Router, private _http: Http) {
    }

    private obtainAccessToken(username, password, isRememberChecked, onSuccessCallback, onErrorCallback) {
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        });
        let options = new RequestOptions({headers: headers});
        console.log(params.toString());
        this._http.post(SERVER_ADDRESS + '/oauth/token', params.toString(), options)
            .map(res => res.json())
            .subscribe(
                data => {
                    this.saveToken(data, isRememberChecked);
                    onSuccessCallback();
                },
                err => {
                    alert('Invalid Credentials');
                    onErrorCallback(err);
                }
            );
    }

    private obtainAccessTokenByRefreshToken(refresh_token): Observable<Response> {
        console.log('Getting new access_token via refresh_token: ' + refresh_token);
        let params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', this.getRefreshToken());
        let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa('my-client-id:secret')
        });
        let options = new RequestOptions({headers: headers});
        console.log(params.toString());
        return this._http.post(SERVER_ADDRESS + '/oauth/token', params.toString(), options);
    }

    private refreshAccessToken(refreshToken: string) {
        this.obtainAccessTokenByRefreshToken(refreshToken)
            .map(res => res.json())
            .subscribe(
                data => this.saveToken(data, true),
                err => alert('Invalid Credentials')
            );
    }

    private saveToken(tokens, withRefreshToken) {
        Cookie.set('access_token', tokens.access_token, tokens.expires_in);
        if (withRefreshToken) {
            Cookie.set('refresh_token', tokens.refresh_token, 60 * 60 * 24 * 30);
        }   // TODO: kiem tra lai
        console.log('Obtained Access token');
        this._router.navigate(['/']);
    }

    private deleteAllTokens() {
        Cookie.delete('access_token');
        Cookie.delete('refresh_token');
    }

    private getRefreshToken(): string {
        return Cookie.get('refresh_token');
    }

    private isTokenNullOrExpired(): boolean {
        const token = Cookie.get('refresh_token');
        return (isNullOrUndefined(token) || token === '');
    }

    private isRefreshTokenNullOrExpired(): boolean {
        const token = this.getRefreshToken();
        return (isNullOrUndefined(token) || token === '');
    }

    getToken(): string {
        const token = Cookie.get('refresh_token');
        if (isNullOrUndefined(token) || token === '') {
            if (!this.isRefreshTokenNullOrExpired()) {
                this.obtainAccessTokenByRefreshToken(this.getRefreshToken())
                    .map(res => res.json())
                    .subscribe(
                        data => {
                            this.saveToken(data, true);
                            console.log('new token has been obtained');
                            return Cookie.get('access_token');
                        },
                        err => console.log(err)
                    );
            }
        }
        return null;
    }

    isAuthenticated(): boolean {
        console.log('Checking authorization status:');
        console.log('- access_token: ' + this.getToken());
        console.log('- refresh_token: ' + this.getRefreshToken());
        if (this.isTokenNullOrExpired()) {
            if (this.isRefreshTokenNullOrExpired()) {
                return false;
            } else {
                this.refreshAccessToken(this.getRefreshToken());
                return this.isAuthenticated();
            }
        } else {
            return true;
        }
    }

    register(user: User): Observable<Response> {

        const headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        });
        const options = new RequestOptions({headers: headers});
        return this._http.post(SERVER_ADDRESS + '/api/users', user, options);
    }

    login(username, password, isRememberChecked, onSuccessCallBack, onErrorCallback) {
        this.obtainAccessToken(username, password, isRememberChecked, onSuccessCallBack, onErrorCallback);
    }

    logout() {
        this.deleteAllTokens();
    }
}
