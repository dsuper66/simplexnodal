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
  selectedShape: Shape;
  lastPoint: Point;

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
      if (x >= thisShape.xOuter 
      && x <= thisShape.xOuter + thisShape.wOuter
      && y >= thisShape.yOuter
      && y <= thisShape.yOuter + thisShape.hOuter) {
        //set a non-null createdShape to indicate we are adjusting

        this.selectedShape = thisShape;
        this.lastPoint = {x: x, y: y};
        console.log("inside");
        break;
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
    if (this.lastPoint){
      let deltaX = point.x - this.lastPoint.x;
      let deltaY = point.y - this.lastPoint.y;
      this.selectedShape.xInner += deltaX;
      this.selectedShape.yInner += deltaY;
      this.selectedShape.xOuter += deltaX;
      this.selectedShape.yOuter += deltaY;      
      this.lastPoint = point;
    }
  }
  keepDrawingMouse(evt: MouseEvent) {
    this.keepDrawing({x: evt.x, y: evt.y});
  }
  keepDrawingTouch(evt: TouchEvent) {
    console.log("keep drawing touch");
    this.keepDrawing({x: evt.touches[0].pageX, y: evt.touches[0].pageY});
    //this.checkIfPointIsInAnyShape(evt.touches[0].pageX, evt.touches[0].pageY)
  }  

  stopDrawing(){
    console.log("stop drawing");
    //this.selectedShape = null;
    this.lastPoint = null;
  }
  stopDrawingMouse() {
    this.stopDrawing();
  }
  stopDrawingTouch() {
    this.stopDrawing();
  }  
  
}
