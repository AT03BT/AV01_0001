﻿/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/lineconstruction.js
    Version: 0.1.1
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Line Construction
    =================

    Features:
        - Two point line construction.
        - Starting point indicator circle.
        - Temporary line that follows the cursor.
        - Finalization of the line construction on mouse up.
        - Grid lock option.

*/
import { GeometricConstruction, ConstructionState } from '../geometricconstruction.js';
export class LineConstruction extends GeometricConstruction {

    pointA = null;
    pointB = null;

    constructionLine = null;

    constructor(config) {
        super(config);
        this.currentState = new WaitingForPoint_A(this);
    }

    setPointA(x, y) {
        this.pointA = {
            x: this.plannerSpace.snapToGrid(x),
            y: this.plannerSpace.snapToGrid(y)
        };
    }

    setPointB(x, y) {
        this.pointB = {
            x: this.plannerSpace.snapToGrid(x),
            y: this.plannerSpace.snapToGrid(y)
        };
    }

    setConstructionLine(x, y) {
        this.constructionLine = this.plannerSpace.constructionLayer.addConstructionLine(this.pointA);
    }

    updateConstructionLine(point) {
        this.constructionLine.setPointTo({
            x: this.plannerSpace.snapToGrid(point.x),
            y: this.plannerSpace.snapToGrid(point.y)
        });
    }

    finalise() {
        this.plannerSpace.addLine(this.pointA, this.pointB);
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
        this.geometricConstruction.updateConstructionLine({
            x: event.offsetX,
            y: event.offsetY
        });
    }

    acceptMouseUp(event) {
        this.geometricConstruction.finalise();
    }
}