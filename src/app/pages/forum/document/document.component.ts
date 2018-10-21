import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';

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
  
  constructor(private _forumService:ForumService) { 
    
  }

  ngOnInit() {
    console.log('DocumentList');
    this.getDocumentList();
  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getDocumentList();
  }

  pageChanged(event:any){
    console.log('event',event);
    this.p = event;
    this.getDocumentList();
  }

  getDocumentList(){
    
    this._forumService.getDocumentList(this.p-1, this.size).subscribe(data => {
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
