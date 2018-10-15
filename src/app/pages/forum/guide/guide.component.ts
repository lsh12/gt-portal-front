import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';

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
  
  constructor(private _forumService:ForumService) { 
    
  }

  ngOnInit() {
    console.log('GuideList');
    this.getGuideList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getGuideList();
  }

  pageChanged(event:any){
    console.log('event',event);
    this.p = event;
    this.getGuideList();
  }

  getGuideList(){
    
    this._forumService.getGuideList(this.p-1, this.size).subscribe(data => {
      console.log(data);
      
      this.collection = data['content'];
      //this.size= data['size'];
      this.total= data['totalElements'];
      
      console.log('this.total',this.total);
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
