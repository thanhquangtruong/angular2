import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
@Component({
    selector: 'app-login-form',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string;
    password: string;

    constructor(private _auth: AuthService) {
    }

    login() {
        this._auth.login(
            this.username,
            this.password,
            true,
            function () {
                console.log('Login success !');
            },
            function (err) {
                console.log(err);
            });
    }
}
