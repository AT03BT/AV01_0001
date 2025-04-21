/*
    blockdrawing/cli/mdl/plannerspace.js
    Version: 0.1.2
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
    
    I need your help, support me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!


    Planner Space
    =============
        The planner space is the main drawing area where all the geometric constructions take place.
*/
import { ComponentBlock, Shape } from '../../mdl/componentblock.js'; 
export class PlannerSpace {

    componentBlock = null;
    constructionLayer = null;
    gridSpacing = 10;
    gridLockEnabled = false;

    constructor(config) {
        this.config = config;
        this.drawingPlane = config.drawingPlane;
        this.foregroundLayer = config.foregroundLayer;
        this.backgroundLayer = config.backgroundLayer;
        this.nthLayer = config.nthLayer;

        this.constructionLayer = new ConstructionLayer(config);
        this.componentBlock = new ComponentBlock();
        this.componentBlock.subscribe(this);
    }

    init() {
        // Initialize the planner space
    }

    setGridSpacing(spacing) {
        this.gridSpacing = Math.max(1, spacing);
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

    // --- Shape Management ---
    // These methods now interact with the ComponentBlock

    addShape(layerId, type, attributes) {
        const shapeId = this.generateShapeId();
        const shape = new Shape(shapeId, type, attributes);
        this.componentBlock.addShape(layerId, shape);
    }

    removeShape(layerId, shapeId) {
        this.componentBlock.removeShape(layerId, shapeId);
    }

    updateShape(layerId, shapeId, newAttributes) {
        this.componentBlock.updateShape(layerId, shapeId, newAttributes);
    }

    // --- Layer Management ---

    addLayer(layerId) {
        this.componentBlock.addLayer(layerId);
    }

    removeLayer(layerId) {
        this.componentBlock.removeLayer(layerId);
    }

    // --- Observer Pattern ---
    // PlannerSpace implements the update() method to react to changes in ComponentBlock

    update(componentBlock) {
        // This method is called when the ComponentBlock changes
        // Update the SVG canvas here based on the new state of the componentBlock
        this.render(componentBlock);
    }

    render(componentBlock) {
        // Clear the SVG canvas
        this.clearCanvas();

        // Iterate through the layers and shapes in the ComponentBlock
        componentBlock.layers.forEach((shapes, layerId) => {
            shapes.forEach(shape => {
                this.renderShape(layerId, shape);
            });
        });
    }

    clearCanvas() {
        // Clear the foreground layer (or all layers if needed)
        this.foregroundLayer.innerHTML = '';
    }

    renderShape(layerId, shape) {
        let svgElement = null;
        switch (shape.type) {
            case 'line':
                svgElement = this.createLine(shape.attributes);
                break;
            case 'circle':
                svgElement = this.createCircle(shape.attributes);
                break;
            case 'rect':
                svgElement = this.createRect(shape.attributes);
                break;
            case 'path':
                svgElement = this.createPath(shape.attributes);
                break;
            case 'point':
                svgElement = this.createPoint(shape.attributes);
                break;
            // ... other shape types
        }

        if (svgElement) {
            // Set the id attribute on the SVG element
            svgElement.setAttribute('id', shape.id);

            const targetLayer = this.getLayer(layerId);
            if (targetLayer) {
                targetLayer.appendChild(svgElement);
            }
        }
    }

    createLine(attributes) {
        return createLine(attributes); // Assuming createLine is imported from svgutils.js
    }

    createCircle(attributes) {
        return createCircle(attributes);
    }

    createRect(attributes) {
        return createRect(attributes);
    }

    createPath(attributes) {
        return createPath(attributes);
    }

    createPoint(attributes) {
        return createCircle(attributes); // Reusing circle for points
    }

    getLayer(layerId) {
        return this.nthLayer.get(layerId);
    }

    // --- Utility Methods ---

    generateShapeId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // ... other PlannerSpace methods ...
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