import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from '../../_models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username: string;
    email: string;
    name: string;
    password: string;

    errorMessage: string;
    hasError: boolean;

    constructor(private _auth: AuthService,
                private _route: Router) {
    }

    ngOnInit(): void {
        this.hasError = false;
        this.errorMessage = null;
        if (this._auth.isAuthenticated()) {
            this.navigateHome();
        }
    }

    register() {
        this.hasError = false;
        const user = new User();
        user.username = this.username;
        user.email = this.email;
        user.name = this.name;
        user.password = this.password;

        this._auth.register(user).subscribe(
            data => this.onLoginSuccess(),
            err => this.onLoginError(err)
        );
    }

    onLoginSuccess() {
        this._auth.login(this.username, this.password, true,
            this.navigateHome(),
            function () {
            });
    };

    onLoginError(err) {
        console.log('onLoginError');
        console.log(err);
        this.errorMessage = err.error.message;
        this.hasError = true;
    }

    navigateHome() {
        this._route.navigate(['/']);
    }


}
