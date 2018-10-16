import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  current_user:any={};

  constructor(private userService:UserService) { }

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
    
  
  
  }





}
