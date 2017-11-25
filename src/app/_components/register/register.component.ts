import {Component} from '@angular/core';
import {User} from '../../_models/user';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    username: string;
    email: string;
    name: string;
    password: string;

    constructor(private _auth: AuthService) {
    }

    register() {
        // const user = new User(this.username, this.email, this.password, this.password);

        const user = new User();
        user.username = this.username;
        user.email = this.email;
        user.name = this.name;
        user.password = this.password;

        this._auth.register(user).subscribe(
            rUser => {
                console.log('New user added !');
                console.log(rUser);
                // login luon
                this._auth.login(this.username, this.password, true,
                    function () {
                    },
                    function () {
                    });
            },
            err => console.log(err)
        );
    }
}
