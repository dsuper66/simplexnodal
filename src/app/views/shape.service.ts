import { Injectable } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  private shapes:Shape[]=[];

  branchLength = 100;
  branchWidth = 5;

  busInitX = 50;
  busInitY = 100;
  busLength = 120;
  busWidth = 14;

  genLength = 50;
  genWidth = 30;

  selectWidth = 40;

  addShape(type: string) {
    let count = this.shapes.filter(shape => shape.type == type).length;
    console.log (type + ":" + (this.getCount(type) + 1));

    if (type == 'bus') {
      let y = this.busInitY * (1 + this.getCount('bus'));
      this.shapes.push({
        type: type,
        xInner: this.busInitX,
        yInner: y,
        wInner: this.busLength,
        hInner: this.busWidth,
        xOuter: this.busInitX,
        yOuter: y - (this.selectWidth - this.busWidth)/2,
        wOuter: this.busLength,
        hOuter: this.selectWidth
       })
    }
    else if (type == 'branch') {
      var x = this.busInitX + 0.2*this.busLength; 
      if (this.getCount('branch') == 1) {
        x = this.busInitX + 0.8*this.busLength - this.branchWidth
      };
      let y = this.busInitY + this.busWidth/2;
      this.shapes.push({
        type: type,
        xInner: x,
        yInner: y,
        wInner: this.branchWidth,
        hInner: this.branchLength,
        xOuter: x - (this.selectWidth - this.branchWidth)/2,
        yOuter: y,
        wOuter: this.selectWidth,
        hOuter: this.branchLength
      })
    }
    else if (type == 'gen') {      
      let h = this.genLength;
      let w = this.genWidth;
      let x = this.busInitX + this.busLength/2 - w/2;
      let y = this.busInitY - h;
  
      let sineStartX = 6;
      let sineStartY = w/2;
      let sineW = w - 2*sineStartX;

      let path1 = `M ${sineStartX} ${sineStartY}           q ${sineW/4} ${-sineW/2} ${sineW/2} 0` 
      let path2 = `M ${sineStartX + sineW/2} ${sineStartY} q ${sineW/4} ${sineW/2}  ${sineW/2} 0` 
      console.log("path1: " + path1 + " path2: " + path2);
      this.shapes.push({
        type: type,
        xInner: x,
        yInner: y,
        wInner: w,
        hInner: h,
        xOuter: x - (this.selectWidth - w)/2,
        yOuter: y,
        wOuter: this.selectWidth,
        hOuter: h,
        path1,
        path2
      })
    }
  }

  getCount(type: String) {
    return this.shapes.filter(shape => shape.type == type).length;
  }
  getShapes() {
    console.log("get shapes");
    return this.shapes;
  }
}

