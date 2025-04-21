/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/pathconstruction.js
    Version: 0.1.4
    (c) 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Path Construction
    =====================

    Multi-point path construction. Points are added with each click. The path can be finalized by either a right-click or pressing the Escape key.

    Features:

        - Multi-point path construction.
        - Starting point indicator circle.
        - Temporary line that follows the cursor.
        - Finalization of the path construction on right click.
        - Finalization of the path construction by pressing the Escape key.
        - Grid lock option.

*/

import { GeometricConstruction, ConstructionState } from '../geometricconstruction.js';

export class PathConstruction extends GeometricConstruction {
    points = [];
    constructionLine = null;
    currentPath = null;
    addShapeCallback = null;

    constructor(config) {
        super(config);
        this.plannerSpace = config.plannerSpace;
        this.addShapeCallback = config.addShape;
        this.currentState = new WaitingForFirstPoint(this);
    }

    addPoint(x, y) {
        this.points.push({
            x: this.plannerSpace.snapToGrid(x),
            y: this.plannerSpace.snapToGrid(y)
        });
    }

    setConstructionLine(point) {
        if (this.points.length > 0) {
            this.constructionLine = this.plannerSpace.constructionLayer.addConstructionLine(this.points[this.points.length - 1]);
        }
    }

    updateConstructionLine(point) {
        if (this.constructionLine) {
            this.constructionLine.setPointTo({
                x: this.plannerSpace.snapToGrid(point.x),
                y: this.plannerSpace.snapToGrid(point.y)
            });
        }
    }

    drawPath() {
        if (this.points.length >= 2) {
            let pathData = `M ${this.points[0].x} ${this.points[0].y}`;
            for (let i = 1; i < this.points.length; i++) {
                pathData += ` L ${this.points[i].x} ${this.points[i].y}`;
            }
            //  this.currentPath = this.plannerSpace.addPath(pathData);
            return pathData;
        }
        return null;
    }

    finalise() {
        const pathData = this.drawPath();
        if (pathData) {
            this.addShapeCallback({
                d: pathData,
                stroke: 'black',
                fill: 'none'
            });
        }
        this.finished = true;
        this.currentState = null;
        this.plannerSpace.constructionLayer.clear();
        this.points = [];
        this.constructionLine = null;
        this.currentPath = null;
    }

    reset() {
        this.points = [];
        this.constructionLine = null;
        this.currentPath = null;
        this.plannerSpace.constructionLayer.clear();
        this.currentState = null;
        this.finished = true;
    }

    isPath() {
        return this.points.length >= 2;
    }
}

class WaitingForFirstPoint extends ConstructionState {
    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }

    acceptMouseUp(event) {
        this.geometricConstruction.addPoint(event.offsetX, event.offsetY);
        this.geometricConstruction.setConstructionLine({
            x: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetX),
            y: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetY)
        });
        this.geometricConstruction.currentState = new AddingPoints(this.geometricConstruction);
    }
}

class AddingPoints extends ConstructionState {
    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }

    acceptMouseUp(event) {
        this.geometricConstruction.addPoint(event.offsetX, event.offsetY);
        this.geometricConstruction.setConstructionLine({
            x: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetX),
            y: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetY)
        });

        if (event.button === 2) {
            var isPath = this.geometricConstruction.isPath();
            if (isPath) {
                this.geometricConstruction.finalise();
            } else {
                this.geometricConstruction.reset(); //  Optionally clear if not enough points
            }
        }
    }

    acceptMouseMove(event) {
        this.geometricConstruction.updateConstructionLine({
            x: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetX),
            y: this.geometricConstruction.plannerSpace.snapToGrid(event.offsetY)
        });
    }

    acceptKeyDown(event) {
        if (event.key === 'Escape') {
            var isPath = this.geometricConstruction.isPath();
            if (isPath) {
                this.geometricConstruction.finalise();
            } else {
                this.geometricConstruction.reset(); //  Optionally clear if not enough points
            }
        }
    }
}