/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/circleconstruction.js
    Version: 0.1.4
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Circle Construction
    ===================

        Two point centre radius line to circumference construction. The points a and b are the
        endpoints of the radius line.

    Features:
        - Two point line construction.
        - Starting point indicator circle.
        - Temporary line that follows the cursor.
        - Finalization of the line construction on mouse up.
        - Grid lock option.

*/
import { GeometricConstruction, ConstructionState } from '../geometricconstruction.js';

export class CircleConstruction extends GeometricConstruction {

    pointA = null;
    pointB = null;
    constructionLine = null;
    addShapeCallback = null; // Store the addShape callback

    constructor(config) {
        super(config);
        this.plannerSpace = config.plannerSpace;
        this.addShapeCallback = config.addShape; // Get the callback
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
        this.constructionLine = this.plannerSpace.constructionLayer.addCircularConstructionLine(this.pointA);
    }

    updateConstructionLine(point) {
        this.constructionLine.setPointTo({
            x: this.plannerSpace.snapToGrid(point.x),
            y: this.plannerSpace.snapToGrid(point.y)
        });
    }

    finalise() {
        // Instead of calling plannerSpace.addCircle directly,
        // use the addShapeCallback to add the shape to the ComponentBlock
        this.addShapeCallback({
            cx: this.pointA.x,
            cy: this.pointA.y,
            r: Math.sqrt(Math.pow(this.pointA.x - this.pointB.x, 2) + Math.pow(this.pointA.y - this.pointB.y, 2)),
            stroke: 'black',
            fill: 'none'
        });
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