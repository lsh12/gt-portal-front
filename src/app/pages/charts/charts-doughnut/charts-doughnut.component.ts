import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts-doughnut',
  templateUrl: './charts-doughnut.component.html',
  styleUrls: ['./charts-doughnut.component.css']
})
export class ChartsDoughnutComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  
  constructor() { }

  ngOnInit() {
  }

}
