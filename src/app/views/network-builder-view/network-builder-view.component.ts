import { Component, OnInit } from '@angular/core';
import { Shape } from '../shape';
import { ShapeService } from '../shape.service';

@Component({
  selector: 'app-network-builder-view',
  templateUrl: './network-builder-view.component.html',
  styleUrls: ['./network-builder-view.component.css']
})
export class NetworkBuilderViewComponent implements OnInit {

  constructor(private shapeService: ShapeService) { }
  ngOnInit(): void {
  }

  shapesToDraw: Shape[] = [];

  //Add ElementShapes
  addBus() {
    console.log("Add bus"); 
    this.shapeService.addShape('bus');
    this.shapesToDraw = this.shapeService.getShapes();
    //this.shapesToDraw.push(newBus);
  }
  addBranch() {
    console.log("Add branch"); 
  }  
}
