import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string;
    password: string;
    isRemember: boolean;

    errorMessage: string;
    hasError: boolean;

    constructor(private _auth: AuthService,
                private _route: Router) {
    }

    ngOnInit(): void {
        this.isRemember = false;
        this.hasError = false;
        this.errorMessage = null;
        if (this._auth.isAuthenticated()) {
            this.navigateHome();
        }
    }

    login() {
        this.hasError = false;
        this._auth.login(
            this.username,
            this.password,
            this.isRemember,
            data => this.onLoginSuccess(data),
            err => this.onLoginError(err));
    }

    navigateHome() {
        this._route.navigate(['/']);
    }

    onLoginSuccess(data) {
        // console.log('onLoginSuccess');
        // console.log(data);
        this.navigateHome();
    };

    onLoginError(err) {
        // console.log('onLoginError');
        this.errorMessage = err.error.error_description;
        this.hasError = true;
    }
}
