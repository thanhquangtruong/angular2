import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {NavigationEnd, Router} from '@angular/router';
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
                private _userService: UserService) {
        _router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                this.reCheckAuthorizationStatus();
            });
    }

    ngOnInit(): void {
        this.reCheckAuthorizationStatus();
    }

    reCheckAuthorizationStatus() {
        this.isAuthenticated = this._auth.isAuthenticated();
        if(this.isAuthenticated)
            this._userService.getCurrentUser().subscribe(user => this.currentUser = user);
    }

    logout() {
        this._auth.logout();
        console.log('current route: ' + this._router.url);
        if (this._router.url === '/')
            this.reCheckAuthorizationStatus();
        else
            this._router.navigate(['']);
    }

}
