import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';

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
  
  constructor(private _forumService:ForumService) { 
    
  }

  ngOnInit() {
    console.log('QnaList');
    this.getQnaList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getQnaList();
  }

  pageChanged(event:any){
    console.log('event',event);
    this.p = event;
    this.getQnaList();
  }

  getQnaList(){
    
    this._forumService.getQnaList(this.p-1, this.size).subscribe(data => {
      console.log(data);
      
      this.collection = data['content'];
      this.total= data['totalElements'];
      
      console.log('this.total',this.total);
      this.show = false; 
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
