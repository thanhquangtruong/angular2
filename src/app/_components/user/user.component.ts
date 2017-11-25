import {Component, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'foo-details',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    private user: User;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService) {
    }

    ngOnInit(): void {
        // redirect ve trang login neu
        if (!this._auth.isAuthenticated()) {
            console.log('Redirecting user to login page..');
            this._router.navigate(['/login']);
        }
        else this.getCurrentUser();
    }

    getCurrentUser() {
        this._userService.getCurrentUser()
            .subscribe(
                data => this.user = data,
                error => this.user.name = 'Error');
    }
}
