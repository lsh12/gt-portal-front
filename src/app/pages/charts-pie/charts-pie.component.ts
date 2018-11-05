import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts-pie',
  templateUrl: './charts-pie.component.html',
  styleUrls: ['./charts-pie.component.css']
})
export class ChartsPieComponent implements OnInit {
   // Pie
   public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
   public pieChartData:number[] = [300, 500, 100];
   public pieChartType:string = 'pie';
   
  constructor() { }

  ngOnInit() {
  }

}
