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

}
