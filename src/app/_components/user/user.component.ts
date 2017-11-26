import {Component, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {ProjectWithRole} from '../../_models/projectWithRole';
import {Team} from '../../_models/team';
import {ProjectService} from '../../_services/project.service';
import {isNullOrUndefined} from 'util';
import {Project} from '../../_models/project';

@Component({
    selector: 'foo-details',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    private user: User;
    private projects: ProjectWithRole[];
    private teams: Team;

    private newProjectName: string;
    private newProjectDescription: string;
    private newProjectPublic: boolean;
    private hasError: boolean;
    private errorMessage: string;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService,
                private _projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.hasError = false;
        this.errorMessage = null;
        this.newProjectPublic = false;


        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['/login']);
        } else {
            this._userService.getCurrentUser()
                .subscribe(
                    data => this.user = data,
                    error => console.log(error)
                );
            this._projectService.getProjectsOfCurrentUser()
                .subscribe(
                    data => {
                        this.projects = data;
                    },
                    error => {
                        console.log(error);
                        // TODO: display error
                    }
                );
        }
    }

    createNewProject() {
        // clear alert
        this.hasError = false;
        this.errorMessage = null;

        if (isNullOrUndefined(this.newProjectName) || this.newProjectName === '') {
            this.hasError = true;
            this.errorMessage = 'ten project ko dc de trong';
        }
        else {
            let newProject = new Project();
            newProject.name = this.newProjectName;
            newProject.description = this.newProjectDescription;
            newProject.isPublic = this.newProjectPublic;
            this._projectService.createProject(newProject).subscribe(
                (data: Project) => this.openProject(data.id),
                err => {
                    this.hasError = true;
                    this.errorMessage = err.error.message;
                }
            );
        }
    }

    openProject(id: string) {
        this._router.navigate(['/project/' + id]);
    }
}
