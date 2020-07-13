import { Injectable } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  private shapes:Shape[]=[];

  branchLength = 100;
  branchThick = 5;

  busInitX = 50;
  busInitY = 100;
  busLength = 120;
  busThick = 14;

  genLength = 60;

  addShape(type: string) {
    let count = this.shapes.filter(shape => shape.type == type).length;
    console.log (type + ":" + (this.getCount(type) + 1));

    if (type == 'bus') {
      this.shapes.push({
        type: type,
        x: this.busInitX,
        y: this.busInitY * (1 + this.getCount('bus')),
        w: this.busLength,
        h: this.busThick
      })
    }
    else if (type == 'branch') {
      var x = this.busInitX + 0.2*this.busLength; 
      if (this.getCount('branch') == 1) {
        x = this.busInitX + 0.8*this.busLength - this.branchThick
      };
      this.shapes.push({
        type: type,
        x: x,
        y: this.busInitY + this.busThick/2,
        w: this.branchThick,
        h: this.branchLength
      })
    }
    else if (type == 'gen') {      
      let h = this.genLength;
      let w = h/2;
      let x = this.busInitX + this.busLength/2;
      let y = this.busInitY;

    /*
      d="M 10 30 q 10 -20 20 0"/>
      <path class="path"
      d="M 30 30 q 10 20 20 0"/>  */
      let path1 = `M ${x} ${y} q ${w/4} ${-w/2} ${w/2} 0` 
      let path2 = `M ${x + w/2} ${y} q ${w/4} ${w/2} ${w/2} 0` 
      console.log("path1: " + path1 + " path2: " + path2);
      this.shapes.push({
        type: type,
        x: x,
        y: y,
        w: w,
        h: h,
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

