import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {AuthService} from '../_services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [
        './../../css/footer.css',
        './../../css/header.css',
        './../../css/style.css'
    ]
})

export class AppComponent implements OnInit {

    currentUser: User;
    isAuthenticated: boolean;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService,) {
    }

    ngOnInit(): void {
        this.isAuthenticated = false;
        this.currentUser = null;
        this._auth.loggedIn$.subscribe(
            loggedIn => {
                this.changeAuthorizationStatus(loggedIn);
                console.log('AppComponent > loggedIn$ changed ' + loggedIn);
            }
        );
    }

    changeAuthorizationStatus(loggedIn: boolean) {
        this.isAuthenticated = loggedIn;
        if (loggedIn) {
            this._userService.getCurrentUser().subscribe(user => this.currentUser = user);
        } else {
            this.currentUser = null;
        }
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['']);
    }

}
