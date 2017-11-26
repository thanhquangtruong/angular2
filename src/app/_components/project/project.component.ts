import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../_services/project.service';
import {Project} from '../../_models/project';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: []
})
export class ProjectComponent implements OnInit {

    @Input() projectId: string;

    private project: Project;

    constructor(private _route: ActivatedRoute,
                private _projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.getProject();
    }

    getProject(): void {
        const id = +this._route.snapshot.paramMap.get('id');
        this._projectService.getProjectById(String(id))
            .subscribe(project => this.project = project);
    }

}
