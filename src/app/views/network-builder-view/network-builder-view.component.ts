import { Component, OnInit } from '@angular/core';
import { Shape } from '../shape';
import { Point } from '../point';
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
  //Check if inside a shape then this is adjusting
  checkIfPointIsInAnyShape(x: number, y: number){
    for (let thisShape of this.shapesToDraw) {
      //console.log (thisShape.x);
      if (x > thisShape.x 
      && x < thisShape.x + thisShape.w
      && y > thisShape.y
      && y < thisShape.y + thisShape.h) {
        //set a non-null createdShape to indicate we are adjusting
        this.selectedShape = thisShape;
        console.log("inside");
      }
    }    
  }
  startDrawingMouse(evt: MouseEvent) { 
    this.checkIfPointIsInAnyShape(evt.offsetX, evt.offsetY)
  }
  startDrawingTouch(evt: TouchEvent) { 
    console.log("start touch");
    this.checkIfPointIsInAnyShape(evt.touches[0].pageX, evt.touches[0].pageY)
  }

  keepDrawing(point: Point) {
    if (this.selectedShape){
      this.selectedShape.x += (point.x - this.startX);
      this.selectedShape.y += (point.y - this.startY);
    }
    this.startX = point.x;
    this.startY = point.y;    
  }
  keepDrawingMouse(evt: MouseEvent) {
    this.keepDrawing({x: evt.x, y: evt.y});
  }
  keepDrawingTouch(evt: TouchEvent) {
    console.log("keep drawing touch");
    this.keepDrawing({x: evt.touches[0].pageX, y: evt.touches[0].pageY});
    this.checkIfPointIsInAnyShape(evt.touches[0].pageX, evt.touches[0].pageY)
  }  

  stopDrawing(){
    console.log("stop drawing");
    this.selectedShape = null;
    this.startX = 0;
    this.startY = 0;
  }
  stopDrawingMouse() {
    this.stopDrawing();
  }
  stopDrawingTouch() {
    this.stopDrawing();
  }  
  
}
