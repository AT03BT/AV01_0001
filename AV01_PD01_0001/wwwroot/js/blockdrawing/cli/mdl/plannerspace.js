/*
    blockdrawing/cli/mdl/plannerspace.js
    Version: 0.1.2
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Planner Space
    =============
        The planner space is the main drawing area where all the geometric constructions take place.
*/
export class PlannerSpace {

    constructionLayer = null;
    gridSpacing = 10; // Default grid spacing
    gridLockEnabled = false;

    constructor(config) {
        this.config = config;
        this.drawingPlane = config.drawingPlane;
        this.foregroundLayer = config.foregroundLayer;
        this.backgroundLayer = config.backgroundLayer;
        this.nthLayer = config.nthLayer;

        this.constructionLayer = new ConstructionLayer(config);
    }

    init() {
        // Initialize the planner space
    }

    setGridSpacing(spacing) {
        this.gridSpacing = Math.max(1, spacing); // Ensure spacing is at least 1
    }

    enableGridLock() {
        this.gridLockEnabled = true;
    }

    disableGridLock() {
        this.gridLockEnabled = false;
    }

    snapToGrid(value) {
        if (!this.gridLockEnabled) {
            return value;
        }
        return Math.round(value / this.gridSpacing) * this.gridSpacing;
    }

    addLine(pointA, pointB) {
        var line = createLine({
            type: 'line',
            x1: pointA.x,
            y1: pointA.y,
            x2: pointB.x,
            y2: pointB.y,
            stroke: 'black'
        });
        this.foregroundLayer.appendChild(line);
        return line;
    }

    addCircle(pointA, pointB) {
        var radius = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
        var circle = createCircle({
            type: 'circle',
            cx: pointA.x,
            cy: pointA.y,
            r: radius,
            stroke: 'black',
            fill: 'none'
        });
        this.foregroundLayer.appendChild(circle);
        return circle;
    }

    addRectangle(pointA, pointB) {
        var rect = createRect({
            type: 'rect',
            x: Math.min(pointA.x, pointB.x), // Use pointB.x to find the smaller x
            y: Math.min(pointA.y, pointB.y),
            width: Math.abs(pointB.x - pointA.x),
            height: Math.abs(pointB.y - pointA.y),
            stroke: 'black',
            fill: 'none'
        });
        this.foregroundLayer.appendChild(rect);
        return rect;
    }

    addPath(pathData) {
        var path = createPath({
            type: 'path',
            d: pathData,
            stroke: 'black',
            fill: 'none'
        });
        this.foregroundLayer.appendChild(path);
        return path;
    }

    addPoint(point) {
        var circle = createCircle({
            type: 'circle',
            cx: point.x,
            cy: point.y,
            r: 3,
            fill: 'black',
            class: 'block-point' // For potential styling
        });

        circle.addEventListener('mouseover', () => {
            circle.setAttribute('fill', 'red');
        });

        circle.addEventListener('mouseout', () => {
            circle.setAttribute('fill', 'black');
        });

        this.foregroundLayer.appendChild(circle);
        return circle;
    }
}

class ConstructionLayer {

    svg = null;

    constructor(config) {
        this.svg = config.constructionLayer;
    }

    addConstructionLine(point) {
        var constructionLine = new ConstructionLine({ point });
        this.svg.appendChild(constructionLine.svg);

        var markerCircle = createCircle({
            cx: point.x,
            cy: point.y,
            r: 3,
            fill: 'black',
            id: 'line-start-marker'
        });

        this.svg.appendChild(markerCircle);

        return constructionLine;
    }

    addCircularConstructionLine(point) {
        var circle = new ConstructionCircle({ point });
        this.svg.appendChild(circle.svg);
        return circle;
    }

    addRectangularConstructionLine(point) {
        var rectangle = new ConstructionRectangle({ point });
        this.svg.appendChild(rectangle.svg);
        return rectangle;
    }

    clear() {
        this.svg.innerHTML = '';
    }
}

class ConstructionLine {
    svg = null;
    pointA = null;
    pointB = null;
    animate = null;

    constructor(config) {
        this.pointA = config.point;
        this.pointB = config.point;

        this.svg = createLine({
            type: 'line',
            x1: config.point.x,
            y1: config.point.y,
            x2: config.point.x,
            y2: config.point.y,
            stroke: 'black',
            'stroke-width': 1,
        });
    }

    addDashAnimation(svg) {

        svg.setAttribute('stroke-dasharray', '5, 5');
        this.animate = createAnimate({
            attributeName: "stroke-dashoffset",
            from: this.pointA.x,
            to: this.pointB.x,
            dur: '3s',
            repeatCount: 'indefinite'
        });
        this.svg.appendChild(this.animate);
    }

    setPointTo(point) {
        this.pointB = point;
        this.svg.setAttribute('x2', point.x);
        this.svg.setAttribute('y2', point.y);
        /* this.animate.setAttribute('to', point); */
    }
}

class ConstructionCircle {
    svg = null;
    pointA = null;
    pointB = null;
    radius = null;
    animate = null;
    radiusLine = null;
    circleOutline = null;
    centerMarker = null;

    constructor(config) {
        this.pointA = config.point;
        this.pointB = config.point;
        this.radius = this.calculateRadius(config.point);

        this.svg = createGroup({});

        this.centreMarker = createCircle({
            cx: config.point.x,
            cy: config.point.y,
            r: 3,
            fill: 'black',
            id: 'line-start-marker'
        });

        this.radiusLine = createLine({
            type: 'line',
            x1: config.point.x,
            y1: config.point.y,
            x2: config.point.x,
            y2: config.point.y,
            stroke: 'black',
            'stroke-width': 1
        });

        this.circleOutline = createCircle({
            type: 'circle',
            cx: this.pointA.x,
            cy: this.pointA.y,
            r: this.radius,
            stroke: 'black',
            fill: 'none'
        });

        this.svg.appendChild(this.centreMarker);
        this.svg.appendChild(this.radiusLine);
        this.svg.appendChild(this.circleOutline);
    }

    calculateRadius(point) {
        return Math.sqrt(Math.pow(point.x - this.pointA.x, 2) + Math.pow(point.y - this.pointA.y, 2));
    }

    setPointTo(point) {
        this.pointB = point;
        this.radius = this.calculateRadius(point);
        this.radiusLine.setAttribute('x2', point.x);
        this.radiusLine.setAttribute('y2', point.y);
        this.circleOutline.setAttribute('r', this.radius);
    }
}

class ConstructionRectangle {
    svg = null;
    pointA = null;
    pointB = null;
    dimensions = null;
    animate = null;
    centerMarker = null;
    diagnolLine = null;
    rectangleOutline = null;

    constructor(config) {
        this.pointA = config.point;
        this.pointB = config.point;
        this.updateDimensions(config.point);

        this.svg = createGroup({});

        this.centreMarker = createCircle({
            cx: config.point.x,
            cy: config.point.y,
            r: 3,
            fill: 'black',
            id: 'line-start-marker'
        });

        this.diagnolLine = createLine({
            type: 'line',
            x1: this.pointA.x,
            y1: this.pointA.y,
            x2: this.pointB.x,
            y2: this.pointB.y,
            stroke: 'black',
            'stroke-width': 1
        });

        this.rectangleOutline = createRect({
            x: this.pointA.x,
            y: this.pointA.y,
            width: this.dimensions.width,
            height: this.dimensions.height,
            stroke: 'black',
            fill: 'none'
        });

        this.svg.appendChild(this.centreMarker);
        this.svg.appendChild(this.diagnolLine);
        this.svg.appendChild(this.rectangleOutline);
    }

    updateDimensions(point) {
        this.dimensions = {
            width: Math.abs(point.x - this.pointA.x),
            height: Math.abs(point.y - this.pointA.y)
        };
    }

    setPointTo(point) {
        this.pointB = point;
        this.updateDimensions(point);

        this.diagnolLine.setAttribute('x2', point.x);
        this.diagnolLine.setAttribute('y2', point.y);

        // Update the x and y coordinates of the rectangle outline
        this.rectangleOutline.setAttribute('x', Math.min(this.pointA.x, this.pointB.x));
        this.rectangleOutline.setAttribute('y', Math.min(this.pointA.y, this.pointB.y));

        this.rectangleOutline.setAttribute('width', this.dimensions.width);
        this.rectangleOutline.setAttribute('height', this.dimensions.height);
    }
}

function createSvgElement(type, data) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const key in data) {
        element.setAttribute(key, data[key]);
    }
    return element;
}

function createRect(data) {
    return createSvgElement('rect', data);
}

function createCircle(data) {
    return createSvgElement('circle', data);
}

function createLine(data) {
    return createSvgElement('line', data);
}

function createPath(data) {
    return createSvgElement('path', data);
}

function createAnimate(data) {
    return createSvgElement('animate', data);
}

function applyStyles(element, style) {
    for (const prop in style) {
        element.style[prop] = style[prop];
    }
}

function createGroup(data) {
    return createSvgElement('g', data);
}