import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

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
    this.getDocumentList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getDocumentList();
  }

  pageChanged(event:any){
    this.p = event;
    this.getDocumentList();
  }

  getDocumentList(){
    
    this._forumService.getDocumentList(this.p-1, this.size).subscribe(data => {
      this.collection = data['content'];
      //this.size= data['size'];
      this.total= data['totalElements'];
      
      this.show = false; 
    }
    ,
    (err)=>{
        this.show = false; 
        console.log(err,err.message);
      }
    );
  }

}
