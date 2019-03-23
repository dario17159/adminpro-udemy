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


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ComponentsModule,
    CommonModule,
    PipesModule
  ]
})
export class PagesModule {}