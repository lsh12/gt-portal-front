import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  }; 
  public lineChartColors:Array<any> = [
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(230,90,90,1)',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(245,175,175,1)',
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(245,175,175,1)'
    },
    { // blue
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(77,157,238,1)',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(164,205,247,1)',
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(164,205,247,1)'
    },
    { // grin
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(84,252,105,1)',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(186,254,194,1)',
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(186,254,194,1)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // lineChart
  private lineChartData:Array<any> = [];

  constructor(private mockService:MockService) { }

  ngOnInit() {
    this.mockService.getchartdata().subscribe(data =>{
      this.lineChartData=data;
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
