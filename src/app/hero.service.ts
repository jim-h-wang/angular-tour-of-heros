import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Hero} from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private villainsUrl = 'api/villains';
    private headers = new Headers({'Content-Type': 'application/json'});

    private static handleError (error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(HeroService.handleError);
    }

    getVillains(): Promise<Hero[]> {
        return this.http.get(this.villainsUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(HeroService.handleError);
    }

    getHero(id: number): Promise<Hero> {
        const url = this.heroesUrl + '/' + id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(HeroService.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(HeroService.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(HeroService.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .catch(HeroService.handleError);
    }
}
