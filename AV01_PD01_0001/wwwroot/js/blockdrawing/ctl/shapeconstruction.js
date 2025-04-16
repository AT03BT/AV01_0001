
class ShapeConstruction {

    constructor(svg) {
        this.svg = svg;
    }

    reset() {
        this.currentState = null;
        this.id = null;
        this.destroy();
    }

    destroy() {

        // Implement cleanup logic here (e.g., remove temporary elements)

    }

    acceptMouseDown(event) { }
    acceptMouseMove(event) { }
    handleMouseDown(event) { }
    handleMouseMove(event) { }
    handleMouseUp(event) { }
    finish(event) { }

}
class CircleConstruction extends ShapeConstruction {

    constructor(svg) {
        super(svg);
        this.currentState = 'waitingForCenter';
        this.center = null;
        this.radius = 0;
        this.tempCircle = null;
    }

    reset() {
        super.reset();
        this.currentState = 'waitingForCenter';
        this.center = null;
        this.radius = 0;
        this.tempCircle = null;
    }

    destroy() {
        super.destroy();
        if (this.tempCircle) {
            this.tempCircle.remove();
            this.tempCircle = null;
        }
    }

    handleMouseDown(event) {
        if (this.currentState === 'waitingForCenter') {
            this.center = { x: event.offsetX, y: event.offsetY };
            this.tempCircle = createCircle({
                cx: this.center.x,
                cy: this.center.y,
                r: 0,
                stroke: 'black',
                fill: 'none'
            });
            this.svg.appendChild(this.tempCircle);
            this.currentState = 'drawingCircle';
        }
    }

    handleMouseMove(event) {
        if (this.currentState === 'drawingCircle') {
            this.radius = Math.sqrt(Math.pow(event.offsetX - this.center.x, 2) + Math.pow(event.offsetY - this.center.y, 2));
            this.tempCircle.setAttribute('r', this.radius);
        }
    }

    handleMouseUp(event) {
        if (this.currentState === 'drawingCircle') {
            this.radius = Math.sqrt(Math.pow(event.offsetX - this.center.x, 2) + Math.pow(event.offsetY - this.center.y, 2));
            this.tempCircle.setAttribute('r', this.radius);
            this.currentState = 'finished';
            this.finish(event);
        }
    }

    finish(event) {
        ComponentFigureModel.addShape(ComponentFigureModel, {
            type: 'circle',
            cx: this.center.x,
            cy: this.center.y,
            r: this.radius,
            stroke: 'black',
            fill: 'none'
        });
        SvgRenderer.draw(ComponentFigureModel);
        GeometricConstruction.clear();
        this.reset();
    }
}
class LineConstruction extends ShapeConstruction {
    constructor(svg) {
        super(svg);
        this.currentState = 'waitingForFirstPoint';
        this.firstPoint = null;
        this.secondPoint = null;
        this.tempLine = null;
        this.markerCircle = null;
    }

    reset() {
        super.reset();
        this.currentState = 'waitingForFirstPoint';
        this.firstPoint = null;
        this.secondPoint = null;
        this.tempLine = null;
        this.markerCircle = null;
    }

    destroy() {
        super.destroy();
        if (this.tempLine) {
            this.tempLine.remove();
            this.tempLine = null;
        }
        if (this.markerCircle) {
            this.markerCircle.remove();
            this.markerCircle = null;
        }
    }

    acceptMouseDown(event) {
        console.log("Current State: ", this);
        console.log("Accepting Mouse Down Event: ", event);
        if (this.currentState === 'waitingForFirstPoint') {
            this.firstPoint = { x: event.offsetX, y: event.offsetY };
            this.tempLine = createLine({
                x1: this.firstPoint.x,
                y1: this.firstPoint.y,
                x2: this.firstPoint.x,
                y2: this.firstPoint.y,
                stroke: 'black',
                'stroke-dasharray': '5,5'
            });
            this.svg.appendChild(this.tempLine);

            // Create and append the marker circle
            this.markerCircle = createCircle({
                cx: this.firstPoint.x,
                cy: this.firstPoint.y,
                r: 3,
                fill: 'black',
                id: 'line-start-marker'
            });
            this.svg.appendChild(this.markerCircle);

            this.currentState = 'drawingLine';
        }
    }

    acceptMouseMove(event) {
        console.log("Current State: ", this);
        console.log("Accepting Mouse Move Event: ", event);
    }

    handleMouseDown(event) {
        if (this.currentState === 'waitingForFirstPoint') {
            this.firstPoint = { x: event.offsetX, y: event.offsetY };
            this.tempLine = createLine({
                x1: this.firstPoint.x,
                y1: this.firstPoint.y,
                x2: this.firstPoint.x,
                y2: this.firstPoint.y,
                stroke: 'black',
                'stroke-dasharray': '5,5'
            });
            this.svg.appendChild(this.tempLine);

            // Create and append the marker circle
            this.markerCircle = createCircle({
                cx: this.firstPoint.x,
                cy: this.firstPoint.y,
                r: 3,
                fill: 'black',
                id: 'line-start-marker'
            });
            this.svg.appendChild(this.markerCircle);

            this.currentState = 'drawingLine';
        }
    }

    handleMouseMove(event) {
        if (this.currentState === 'drawingLine') {
            this.secondPoint = { x: event.offsetX, y: event.offsetY };
            this.tempLine.setAttribute('x2', event.offsetX);
            this.tempLine.setAttribute('y2', event.offsetY);
        }
    }


    handleMouseUp(event) {
        if (this.currentState === 'drawingLine' && (this.secondPoint != null)) {
            this.tempLine.setAttribute('x2', event.offsetX);
            this.tempLine.setAttribute('y2', event.offsetY);
            this.tempLine.removeAttribute('stroke-dasharray');
            this.currentState = 'finished';
            this.finish(event);
        }
    }

    finish(event) {
        // Create the line data for the model
        ComponentFigureModel.addShape(ComponentFigureModel, {
            type: 'line',
            x1: this.firstPoint.x,
            y1: this.firstPoint.y,
            x2: event.offsetX,
            y2: event.offsetY,
            stroke: 'black'
        });

        // Trigger rendering
        SvgRenderer.draw(ComponentFigureModel);

        // Clean up
        GeometricConstruction.clear();
        this.reset();
    }
}
class PathConstruction extends ShapeConstruction {
    constructor(svg) {
        super(svg);
        this.currentState = 'waitingForFirstPoint';
        this.pathData = '';
        this.tempPath = null;
    }

    reset() {
        super.reset();
        this.currentState = 'waitingForFirstPoint';
        this.pathData = '';
        this.tempPath = null;
    }

    destroy() {
        super.destroy();
        if (this.tempPath) {
            this.tempPath.remove();
            this.tempPath = null;
        }
    }

    handleMouseDown(event) {
        if (this.currentState === 'waitingForFirstPoint') {
            this.pathData = `M ${event.offsetX} ${event.offsetY}`;
            this.tempPath = createPath({
                d: this.pathData,
                stroke: 'black',
                fill: 'none'
            });
            this.svg.appendChild(this.tempPath);
            this.currentState = 'drawingPath';
        } else if (this.currentState === 'drawingPath') {
            this.pathData += ` L ${event.offsetX} ${event.offsetY}`;
            this.tempPath.setAttribute('d', this.pathData);
        }
    }

    handleMouseMove(event) {
        if (this.currentState === 'drawingPath') {
            this.pathData += ` L ${event.offsetX} ${event.offsetY}`;
            this.tempPath.setAttribute('d', this.pathData);
        }
    }

    handleMouseUp(event) {
        if (this.currentState === 'drawingPath') {
            this.pathData += ` L ${event.offsetX} ${event.offsetY}`;
            this.tempPath.setAttribute('d', this.pathData);
            this.currentState = 'finished';
            this.finish(event);
        }
    }

    finish(event) {
        ComponentFigureModel.addShape(ComponentFigureModel, {
            type: 'path',
            d: this.pathData,
            stroke: 'black',
            fill: 'none'
        });
        SvgRenderer.draw(ComponentFigureModel);
        GeometricConstruction.clear();
        this.reset();
    }
}
class RectangleConstruction extends ShapeConstruction {
    constructor(svg) {
        super(svg);
        this.currentState = 'waitingForFirstCorner';
        this.firstCorner = null;
        this.secondCorner = null;
        this.tempRect = null;
    }

    reset() {
        super.reset();
        this.currentState = 'waitingForFirstCorner';
        this.firstCorner = null;
        this.secondCorner = null;
        this.tempRect = null;
    }

    destroy() {
        super.destroy();
        if (this.tempRect) {
            this.tempRect.remove();
            this.tempRect = null;
        }
    }

    handleMouseDown(event) {
        if (this.currentState === 'waitingForFirstCorner') {
            this.firstCorner = { x: event.offsetX, y: event.offsetY };
            this.tempRect = createRect({
                x: this.firstCorner.x,
                y: this.firstCorner.y,
                width: 0,
                height: 0,
                stroke: 'black',
                fill: 'none'
            });
            this.svg.appendChild(this.tempRect);
            this.currentState = 'drawingRectangle';
        }
    }

    handleMouseMove(event) {
        if (this.currentState === 'drawingRectangle') {
            this.secondCorner = { x: event.offsetX, y: event.offsetY };
            const width = event.offsetX - this.firstCorner.x;
            const height = event.offsetY - this.firstCorner.y;
            this.tempRect.setAttribute('width', Math.abs(width));
            this.tempRect.setAttribute('height', Math.abs(height));
            this.tempRect.setAttribute('x', width > 0 ? this.firstCorner.x : event.offsetX);
            this.tempRect.setAttribute('y', height > 0 ? this.firstCorner.y : event.offsetY);
        }
    }

    handleMouseUp(event) {
        if (this.currentState === 'drawingRectangle') {
            this.secondCorner = { x: event.offsetX, y: event.offsetY };
            const width = event.offsetX - this.firstCorner.x;
            const height = event.offsetY - this.firstCorner.y;
            this.tempRect.setAttribute('width', Math.abs(width));
            this.tempRect.setAttribute('height', Math.abs(height));
            this.tempRect.setAttribute('x', width > 0 ? this.firstCorner.x : event.offsetX);
            this.tempRect.setAttribute('y', height > 0 ? this.firstCorner.y : event.offsetY);
            this.currentState = 'finished';
            this.finish(event);
        }
    }

    finish(event) {
        ComponentFigureModel.addShape(ComponentFigureModel, {
            type: 'rect',
            x: Math.min(this.firstCorner.x, event.offsetX),
            y: Math.min(this.firstCorner.y, event.offsetY),
            width: Math.abs(event.offsetX - this.firstCorner.x),
            height: Math.abs(event.offsetY - this.firstCorner.y),
            stroke: 'black',
            fill: 'none'
        });
        SvgRenderer.draw(ComponentFigureModel);
        GeometricConstruction.clear();
        this.reset();
    }
}
class SquareConstruction extends ShapeConstruction {
    constructor(svg) {
        super(svg);
        this.currentState = 'waitingForFirstCorner';
        this.firstCorner = null;
        this.side = 0;
        this.tempRect = null;
    }

    reset() {
        super.reset();
        this.currentState = 'waitingForFirstCorner';
        this.firstCorner = null;
        this.side = 0;
        this.tempRect = null;
    }

    destroy() {
        super.destroy();
        if (this.tempRect) {
            this.tempRect.remove();
            this.tempRect = null;
        }
    }

    handleMouseDown(event) {
        if (this.currentState === 'waitingForFirstCorner') {
            this.firstCorner = { x: event.offsetX, y: event.offsetY };
            this.tempRect = createRect({
                x: this.firstCorner.x,
                y: this.firstCorner.y,
                width: 0,
                height: 0,
                stroke: 'black',
                fill: 'none'
            });
            this.svg.appendChild(this.tempRect);
            this.currentState = 'drawingSquare';
        }
    }

    handleMouseMove(event) {
        if (this.currentState === 'drawingSquare') {
            this.side = Math.min(Math.abs(event.offsetX - this.firstCorner.x), Math.abs(event.offsetY - this.firstCorner.y));
            this.tempRect.setAttribute('width', this.side);
            this.tempRect.setAttribute('height', this.side);
            this.tempRect.setAttribute('x', event.offsetX > this.firstCorner.x ? this.firstCorner.x : this.firstCorner.x - this.side);
            this.tempRect.setAttribute('y', event.offsetY > this.firstCorner.y ? this.firstCorner.y : this.firstCorner.y - this.side);
        }
    }

    handleMouseUp(event) {
        if (this.currentState === 'drawingSquare') {
            this.side = Math.min(Math.abs(event.offsetX - this.firstCorner.x), Math.abs(event.offsetY - this.firstCorner.y));
            this.tempRect.setAttribute('width', this.side);
            this.tempRect.setAttribute('height', this.side);
            this.tempRect.setAttribute('x', event.offsetX > this.firstCorner.x ? this.firstCorner.x : this.firstCorner.x - this.side);
            this.tempRect.setAttribute('y', event.offsetY > this.firstCorner.y ? this.firstCorner.y : this.firstCorner.y - this.side);
            this.currentState = 'finished';
            this.finish(event);
        }
    }

    finish(event) {
        ComponentFigureModel.addShape(ComponentFigureModel, {
            type: 'rect',
            x: Math.min(this.firstCorner.x, event.offsetX),
            y: Math.min(this.firstCorner.y, event.offsetY),
            width: this.side,
            height: this.side,
            stroke: 'black',
            fill: 'none'
        });
        SvgRenderer.draw(ComponentFigureModel);
        GeometricConstruction.clear();
        this.reset();
    }
}
