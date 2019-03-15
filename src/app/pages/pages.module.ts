import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//graficas
import { ChartsModule } from "ng2-charts";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ComponentsModule
    ]
})

export class PagesModule {

}