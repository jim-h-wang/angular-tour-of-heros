import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';

import {AppComponent} from './app.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HeroesComponent} from './component/hero/heroes.component';
import {HeroDetailComponent} from './component/hero-detail/hero-detail.component';
import {HeroService} from './service/hero.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        DashboardComponent
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
