import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MockService } from 'src/app/services/mock.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  
  current_user: any = {};
  current_user_role: any = {};

  constructor(private userService: UserService,
              private mockService: MockService,
              private translate: TranslateService
  ) {}

  ngOnInit() {
    // this.userService.getUserSession().subscribe(data => {
    //   this.current_user = data['user'];
    //   this.current_user_role = data['role'];
    // }
    //   ,
    //   (err) => {
    //     console.log(err, err.message);
    //   }
    // );
    this.mockService.getUserSession().subscribe(data => {
      this.current_user = data['user'];
      this.current_user_role = data['role'];

      console.log(data);

    }
      ,
      (err) => {
        console.log(err, err.message);
      }
    );
    
  }

}
