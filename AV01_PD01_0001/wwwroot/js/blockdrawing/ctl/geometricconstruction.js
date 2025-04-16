/*
    wwwroot/js/blockdrawing/ctl/geometricconstruction.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Geometric Construction
    ======================

    
*/


export class GeometricConstruction {

    plannerSpace = null;
    started = false;
    finished = false;

    currentState = null;

    constructor(config) {
        this.plannerSpace = config.plannerSpace;
    }


    start() {

    }

    stop() {
        this.currentState = null;
    }

    acceptMouseDown(event) {
        this.currentState.acceptMouseDown(event);
    }
    acceptMouseUp(event) {
        this.currentState.acceptMouseUp(event);
    }
    acceptMouseMove(event) {
        this.currentState.acceptMouseMove(event);
    }
    acceptMouseClick(event) {
        this.currentState.acceptMouseClick(event);
    }
    acceptKeyDown(event) {
        this.currentState.acceptKeyDown(event);
    }
    acceptKeyUp(event) {
        this.currentState.acceptKeyUp(event);
    }
    acceptKeyPress(event) {
        this.currentState.acceptKeyPress(event);
    }

    isFinished() {
        return this.finished;
    }
}

export class ConstructionState {

    geometricConstruction = null;
    nextState = null;

    acceptMouseDown(svg, event) { }
    acceptMouseUp(svg, event) { }
    acceptMouseMove(svg, event) { }
    acceptMouseClick(svg, event) { }
    acceptKeyDown(svg, event) { }
    acceptKeyUp(svg, event) { }
    acceptKeyPress(svg, event) { }
    

 }