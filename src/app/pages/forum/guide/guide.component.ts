import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  show = true;

  p: number = 1;
  size: number = 5;
  total:number = 0;
  collection: any[] = []; 
  current_user:any={};
  current_user_role:any={};
  constructor(private _forumService:ForumService, private userService:UserService) { 
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
    this.getGuideList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getGuideList();
  }

  pageChanged(event:any){
    this.p = event;
    this.getGuideList();
  }

  getGuideList(){
    
    this._forumService.getGuideList(this.p-1, this.size).subscribe(data => {
      this.collection = data['content'];
      //this.size= data['size'];
      this.total= data['totalElements'];
      this.show = false; 
    }
    ,
    (err)=>{
        this.show = false; 
      }
    );
  }


}
