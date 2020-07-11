import { Component, OnInit } from '@angular/core';
import { Shape } from '../shape';

@Component({
  selector: 'app-network-builder-view',
  templateUrl: './network-builder-view.component.html',
  styleUrls: ['./network-builder-view.component.css']
})
export class NetworkBuilderViewComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  shapesToDraw: Shape[] = [];

  //Add ElementShapes
  addBus() {
    console.log("Add bus"); 
    let newBus = {
      type: 'bus',
      x: 50,
      y: 100,
      w: 120,
      h: 20
    };
    this.shapesToDraw.push(newBus);
  }
  addBranch() {
    console.log("Add branch"); 
  }  
}
