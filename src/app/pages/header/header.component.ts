import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  current_user:any={};

  constructor(private userService:UserService,
              private mockService:MockService
    ) { }

  ngOnInit() {
    this.userService.getUserSession().subscribe(data =>{
      console.log(data);
      this.current_user=data['user'];
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    /*
    this.mockService.getUserSession().subscribe((data: any) => {
      console.log(data);
      this.current_user=data['user'];
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    */
  }





}
