export class Shape {
    type: string;
    xInner:number;
    yInner:number;
    wInner:number;
    hInner:number;   
    xOuter?:number;
    yOuter?:number;
    wOuter?:number;
    hOuter?:number;
    path1?:string;
    path2?:string; 
    doMove? = false;
    doResize? = false;
  }