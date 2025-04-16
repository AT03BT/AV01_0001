﻿/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/rectangleconstruction.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Rectangle Construction
    ======================

      Two point diagnol constuction. The points a and b are the endpoints of the rectangls diagnol line.

    Features:
        - Two point line construction.
        - Starting point indicator circle.
        - Temporary line that follows the cursor.
        - Finalization of the line construction on mouse up.

*/
import { GeometricConstruction, ConstructionState } from '../geometricconstruction.js';
export class RectangleConstruction extends GeometricConstruction {

    pointA = null;
    pointB = null;

    constructionLine = null;

    constructor(config) {
        super(config);
        this.currentState = new WaitingForPoint_A(this);
    }

    setPointA(x, y) {
        this.pointA = { x: x, y: y };
    }

    setPointB(x, y) {
        this.pointB = { x: x, y: y };
    }

    setConstructionLine(x, y) {
        this.constructionLine = this.plannerSpace.constructionLayer.addRectangularConstructionLine(this.pointA);
    }

    updateConstructionLine(point) {
        this.constructionLine.setPointTo(point);
    }

    finalise() {

        this.plannerSpace.addRectangle(this.pointA, this.pointB);
        this.finished = true;
        this.curretntState = null;
        this.plannerSpace.constructionLayer.clear();
    }

}

class WaitingForPoint_A extends ConstructionState {


    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }

    acceptMouseUp(event) {

        this.geometricConstruction.setPointA(event.offsetX, event.offsetY);
        this.geometricConstruction.setConstructionLine(event.offsetX, event.offsetY);
        this.geometricConstruction.currentState = new WaitingForPoint_B(this.geometricConstruction);

    }

}


class WaitingForPoint_B extends ConstructionState {

    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }


    acceptMouseMove(event) {

        this.geometricConstruction.setPointB(event.offsetX, event.offsetY);
        this.geometricConstruction.updateConstructionLine({ x: event.offsetX, y: event.offsetY });

    }

    acceptMouseUp(event) {

        this.geometricConstruction.finalise();

    }
}



