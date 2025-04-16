﻿/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction/pointconstruction.js
    Version: 0.1.0
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

    constructor(config) {
        super(config);
        this.currentState = new PlacingPoint(this);
    }

    placePoint(x, y) {
        this.plannerSpace.addPoint({ x: x, y: y });
        this.finished = true; // Point construction is immediate
        this.currentState = null;
    }

    reset() {
        this.currentState = new PlacingPoint(this);
        this.finished = false;
    }
}

class PlacingPoint extends ConstructionState {
    constructor(geometricConstruction) {
        super();
        this.geometricConstruction = geometricConstruction;
    }

    acceptMouseUp(event) {
        this.geometricConstruction.placePoint(event.offsetX, event.offsetY);
    }
}