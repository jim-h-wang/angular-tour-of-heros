import {Component, OnInit} from '@angular/core';

import {HeroService} from '../../service/hero.service';
import {Hero} from '../../type/hero';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    constructor(private heroService: HeroService) {}
}
