import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    fullImagePath: string;
    constructor() {
        this.fullImagePath ='/assets/image/guest/index.jpg';
    }

    ngOnInit() {}
}
