import { Component, OnInit, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-grafico-dona",
  templateUrl: "./grafico-dona.component.html",
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() titulo:string;

  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartType') doughnutChartType: string = "";

  constructor() {}

  ngOnInit() {}

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
