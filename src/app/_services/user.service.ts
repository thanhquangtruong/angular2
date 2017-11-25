import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {User} from '../_models/user';

@Injectable()
export class UserService {

    apiEndPoint = '/api/users';

    constructor(private _appService: AppService) {
    }

    getCurrentUser(): Observable<User> {
        return this._appService.getResource(this.apiEndPoint);
    }

    register(user: User) {
        return this._appService.postResource(this.apiEndPoint, user);
    }

    updateUser(user: User) {
        return this._appService.putResource(this.apiEndPoint, user);
    }

    deleteUser() {
        return this._appService.deleteResource(this.apiEndPoint);
    }

    getUserById(userId: string) {
        return this._appService.getResource(this.apiEndPoint + '/' + userId);
    }
}
