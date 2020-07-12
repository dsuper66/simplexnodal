import { Injectable } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  private shapes:Shape[]=[];

  addShape(elementType: String) {
    let count = this.shapes.filter(shape => shape.type == elementType).length;
    console.log (elementType + ":" + count + 1);
    if (elementType == 'bus') {
      var y = 100;
      if (count == 1) {y = 200}
      this.shapes.push({
        type: 'bus',
        x: 50,
        y: y,
        w: 120,
        h: 20
      })
    }
  }

  getShapes() {
      return this.shapes;
  }
}

