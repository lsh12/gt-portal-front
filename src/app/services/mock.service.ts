import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private userSession = {
    user: { 
            id: '03b7292e-f236-4f1a-8661-5fc943e68ec4', 
            email: 'herotic@genesis.co.kr',
            firstname: 'Administrator',
            lastName: 'Portal',
            organizationUuid: null,
            status: "ENABLED",
            tenantId: "apipt",
            username: "admin"
    },
    organization: null,
    role: 'portaladministrators'
  };

  constructor() { }

  getUserSession(): Observable<any> {
    return observableOf(this.userSession);
  }

  

  private lineChartData:Array<any> = [
   
    {data: [50, 60, 80, 90, 20, 10, 30], label: 'App1'},
    {data: [70, 80, 60, 30, 51, 25, 60], label: 'App2'},
    {data: [55, 77, 58, 98, 55, 44, 31], label: 'App3'}
  
];

  getchartdata(): Observable<any> {
    return observableOf(this.lineChartData);
  }

}