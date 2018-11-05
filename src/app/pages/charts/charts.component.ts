import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels = ['2018','2017','2016','2015','2014','2013','2012','2011'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40, 31], label: 'A'},
    {data: [18, 38, 19, 99, 17, 90, 30, 11], label: 'B'}
  ]

  constructor() { }
 
  ngOnInit() {
  }

}
