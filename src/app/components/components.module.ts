import { NgModule } from "@angular/core";
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraficoDonaComponent],
  exports: [GraficoDonaComponent],
  imports: [ChartsModule]
})
export class ComponentsModule {}