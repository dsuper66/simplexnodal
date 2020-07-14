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
  selectedShape : Shape;
  startX = 0;
  startY = 0;

  //Add Element
  addElement(type: string) {
    console.log("add element:" + type);
    this.shapeService.addShape(type);
    this.shapesToDraw = this.shapeService.getShapes(); 
  }     

  //Adjust
  startDrawing(evt: MouseEvent) { 
    //Check if inside a shape then this is adjusting
    this.checkIfPointIsInAnyShape(evt.offsetX, evt.offsetY)
  }

  keepDrawing(evt: MouseEvent) {
    let deltaX = evt.x - this.startX;
    let deltaY = evt.y - this.startY;
    if (this.selectedShape){
      this.selectedShape.x += deltaX;
      this.selectedShape.y += deltaY;
    }
    this.startX = evt.x;
    this.startY = evt.y;
  }

  stopDrawing(evt: MouseEvent) {
    this.selectedShape = null;
    this.startX = 0;
    this.startY = 0;
  }

  checkIfPointIsInAnyShape(x: number, y: number){
    for (let thisShape of this.shapesToDraw) {
      console.log (thisShape.x);
      if (x > thisShape.x 
      && x < thisShape.x + thisShape.w
      && y > thisShape.y
      && y < thisShape.y + thisShape.h) {
        //set a non-null createdShape to indicate we are adjusting
        this.selectedShape = thisShape;
        this.startX = x;
        this.startY = y;
      }
    }    
  }  
}
