import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  show = true;

  p: number = 1;
  size: number = 5;
  total:number = 0;
  collection: any[] = [];

  current_user:any={};
  current_user_role:any={};
  
  constructor(private _forumService:ForumService, 
              private userService:UserService
             ) { 
    
    this.userService.getUserSession().subscribe(data =>{
      this.current_user=data['user'];
      this.current_user_role=data['role'];
    }
    ,
    (err)=>{
        window.location.href='/admin/login';
      }
    );  

  }

  ngOnInit() {
    this.getQnaList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getQnaList();
  }

  pageChanged(event:any){
    this.p = event;
    this.getQnaList();
  }

  getQnaList(){
    
    this._forumService.getQnaList(this.p-1, this.size).subscribe(data => {
      
      this.collection = data['content'];
      this.total= data['totalElements'];
      this.show = false; 
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
