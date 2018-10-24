import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videoSrc:string = "";

  constructor() {
    
  }

  ngOnInit() {
   
    $('#video-modal').on('shown.bs.modal', function (evt) {
      this.videoSrc = evt.relatedTarget.dataset.src
      $("#video-player").attr('src',this.videoSrc);
      $("#video-player")[0].play();
    })
    $('#video-modal').on('hidden.bs.modal', function (e) {
        $("#video-player")[0].load();
        return false;
    })
  }

}
