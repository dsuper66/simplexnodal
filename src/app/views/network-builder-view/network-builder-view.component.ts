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
  lastDrawingPoint: Point; //For calculating delta as move progresses  
  //For checks at start of move
  firstPoint: Point;
  directionDone = false;

  //Add Element
  addElement(type: string) {
    console.log("add element:" + type);
    this.shapeService.addShape(type);
    this.shapesToDraw = this.shapeService.getShapes();
  }

  //Adjust
  //Check if inside a shape then this is adjusting
  checkIfPointIsInAnyShape(x: number, y: number) {
    var foundShape = false;
    for (let thisShape of this.shapesToDraw) {
      //console.log (thisShape.x);
      if (x >= thisShape.xOuter
        && x <= thisShape.xOuter + thisShape.wOuter
        && y >= thisShape.yOuter
        && y <= thisShape.yOuter + thisShape.hOuter) {
        //set a non-null createdShape to indicate we are adjusting

        this.selectedShape = thisShape;
        this.firstPoint = { x: x, y: y };
        this.lastDrawingPoint = this.firstPoint;
        console.log("inside");
        foundShape = true;
        this.directionDone = false;
        break;
      }
    }
    //Not in any shape, reset select
    if (!foundShape) {
      this.lastDrawingPoint = null;
      this.selectedShape = null;
      this.shapesToDraw = this.shapeService.getShapes();
    }
  }
  startDrawingMouse(evt: MouseEvent) {
    this.checkIfPointIsInAnyShape(evt.offsetX, evt.offsetY)
  }
  startDrawingTouch(evt: TouchEvent) {
    console.log("start touch");
    this.checkIfPointIsInAnyShape(evt.touches[0].pageX, evt.touches[0].pageY)
  }

  keepDrawing(mousePoint: Point) {
    //If we have a last drawing point...
    if (this.lastDrawingPoint) {

      //Start direction for bus or branch determines if resize or move
      if (this.selectedShape.type == 'bus' || this.selectedShape.type == 'branch') {
        if (!this.directionDone) {
          let xThreshold = 5;
          let yThreshold = 5;
          let deltaFromStartX = Math.abs(mousePoint.x - this.firstPoint.x);
          let deltaFromStartY = Math.abs(mousePoint.y - this.firstPoint.y);
          //Branch is resize if movement is up-down, bus is resize if movement is left-right
          if (deltaFromStartX > xThreshold || deltaFromStartY > yThreshold) {
            this.selectedShape.doResize = false;
            if (deltaFromStartY > yThreshold && this.selectedShape.type == 'branch') {
              console.log("Up Down");
              this.selectedShape.doResize = true;
            }
            else if (deltaFromStartX > xThreshold && this.selectedShape.type == 'bus') {
              console.log("Left Right");
              this.selectedShape.doResize = true;
            }
            this.directionDone = true;
          }
          else { //don't move or resize until we know which
            return
          }
        }
      }

      //Adjust... resize or move
      let deltaX = mousePoint.x - this.lastDrawingPoint.x;
      let deltaY = mousePoint.y - this.lastDrawingPoint.y;

      //Resize (bus or branch)
      if (this.selectedShape.doResize) {
        if (this.selectedShape.type == 'bus') {
          let atRHS = (mousePoint.x > this.selectedShape.xInner + this.selectedShape.wInner / 2);
          if (atRHS) {
            this.shapeService.applyDeltaW(deltaX, this.selectedShape);
          }
          else {
            this.shapeService.applyDeltaX(deltaX, this.selectedShape);
            this.shapeService.applyDeltaW(-deltaX, this.selectedShape);
          }
        }
        else if (this.selectedShape.type == 'branch') {
          let atBottom = (mousePoint.y > this.selectedShape.yInner + this.selectedShape.hInner / 2);
          if (atBottom) {
            this.shapeService.applyDeltaH(deltaY, this.selectedShape);
          }
          else {
            this.shapeService.applyDeltaY(deltaY, this.selectedShape);
            this.shapeService.applyDeltaH(-deltaY, this.selectedShape);
          }
        }        
      }
      //Move
      else {
        this.selectedShape.xInner += deltaX;
        this.selectedShape.yInner += deltaY;
        this.selectedShape.xOuter += deltaX;
        this.selectedShape.yOuter += deltaY;
      }

      this.lastDrawingPoint = mousePoint;
    }
  }
  keepDrawingMouse(evt: MouseEvent) {
    this.keepDrawing({ x: evt.offsetX, y: evt.offsetY });
  }
  keepDrawingTouch(evt: TouchEvent) {
    console.log("keep drawing touch");
    this.keepDrawing({ x: evt.touches[0].pageX, y: evt.touches[0].pageY });
    //this.checkIfPointIsInAnyShape(evt.touches[0].pageX, evt.touches[0].pageY)
  }

  stopDrawing() {
    console.log("stop drawing");
    //this.selectedShape = null;
    this.lastDrawingPoint = null;
    this.directionDone = false;
  }
  stopDrawingMouse() {
    this.stopDrawing();
  }
  stopDrawingTouch() {
    this.stopDrawing();
  }

}
