import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HeroService} from '../../service/hero.service';
import {Hero} from '../../type/hero';


@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
    heroes: Hero[] = [];
    selectedHero: Hero;

    ngOnInit(): void {
        this.getHeroes();
    }

    constructor(
        private heroService: HeroService,
        private router: Router) {
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = this.heroes.concat(heroes));
        this.heroService.getVillains().then(villains => this.heroes.push.apply(this.heroes, villains));
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    togoDetail() {
        this.router.navigate(['detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}

