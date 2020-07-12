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

  addShape(elementType: string) {
    let count = this.shapes.filter(shape => shape.type == elementType).length;
    console.log (elementType + ":" + (this.getCount(elementType) + 1));

    if (elementType == 'bus') {
      this.shapes.push({
        type: elementType,
        x: this.busInitX,
        y: this.busInitY * (1 + this.getCount('bus')),
        w: this.busLength,
        h: this.busThick
      })
    }
    else if (elementType == 'branch') {
      var x = this.busInitX + 0.2*this.busLength; 
      if (this.getCount('branch') == 1) {
        x = this.busInitX + 0.8*this.busLength - this.branchThick
      };
      this.shapes.push({
        type: elementType,
        x: x,
        y: this.busInitY + this.busThick/2,
        w: this.branchThick,
        h: this.branchLength
      })
    }
  }

  getCount(elementType: String) {
    return this.shapes.filter(shape => shape.type == elementType).length;
  }
  getShapes() {
    console.log("get shapes");
    return this.shapes;
  }
}

