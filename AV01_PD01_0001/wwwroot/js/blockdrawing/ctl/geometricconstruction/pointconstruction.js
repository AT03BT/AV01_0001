/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/pointconstruction.js
    Version: 0.0.1
    (c) 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Point Construction
    =====================

    Marks a point indicated by a small circle with a radius of 3 pixels.

    Features:

        - Creates a point on mouse click.
        - Change in point color when the mouse is over the point.

*/

import { GeometricConstruction, ConstructionState } from '../geometricconstruction.js';

export class PointConstruction extends GeometricConstruction {
    addShapeCallback = null;

    constructor(config) {
        super(config);
        this.plannerSpace = config.plannerSpace;
        this.addShapeCallback = config.addShape;
        this.currentState = new WaitingForPoint(this);
    }

    finalise(x, y) {
        this.addShapeCallback({
            cx: this.plannerSpace.snapToGrid(x),
            cy: this.plannerSpace.snapToGrid(y),
            r: 3,
            fill: 'black',
            class: 'block-point'
        });
        this.finished = true;
        this.currentState = null;
        this.plannerSpace.constructionLayer.clear();
    }
}

class WaitingForPoint extends ConstructionState {
    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }

    acceptMouseUp(event) {
        this.geometricConstruction.finalise(event.offsetX, event.offsetY);
    }
}