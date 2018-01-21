import { Component, OnInit } from '@angular/core';
import '../../assets/js/videocall.js';
import '../../assets/js/jquery.min.js';
import '../../assets/js/sinch.min.js';

@Component({
  selector: 'app-video',
  templateUrl: '../videocall.html',
  styleUrls: ['../../assets/js/videocall.js', '../../assets/js/sinch.min.js', '../../assets/js/jquery.min.js']
})

export class VideoComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

}
