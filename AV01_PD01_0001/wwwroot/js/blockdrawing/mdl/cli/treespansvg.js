/*
    wwwroot/js/componenteditor/core/svgrenderer.js
    Version: 0.2.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Treespan SVG Markup Renderer
    ============================
        The svg crawlers mainly responsible for translating the model tree into SVG markup
    that can be rendered in the browser.

    Input / Output
    ==============
        Input: Model object
        Output: SVG markup

*/
import * as svgutils from './svgutils.js';

export { TreespanSvg }; 
const TreespanSvg = {
    svgElement: null,

    init: function (svgElement) {
        this.svgElement = svgElement;
    },

    printMarkup: function (model) {

        this.clear();
        model.shapes.forEach(shape => {
            let svgElement;
            switch (shape.type) {
                case 'line':
                    svgElement = this.createLineElement(shape);
                    break;
                case 'circle':
                    svgElement = this.createCircleElement(shape);
                    break;
                case 'rect':
                    svgElement = this.createRectElement(shape);
                    break;
                case 'square':
                    svgElement = this.createRectElement(shape);
                    break;
                case 'path':
                    svgElement = this.createPathElement(shape);
                    break;
                case 'rect':
                    svgElement = this.createRectElement(shape);
                    break;
                default:
                    
                // ... other shapes
            }
            this.svgElement.appendChild(svgElement);
        });
    },

    clear: function () {
        this.svgElement.innerHTML = '';
    },

    createLineElement: function (shape) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        this.setAttributes(line, shape);
        return line;
    },

    createCircleElement: function (shape) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        this.setAttributes(circle, shape);
        return circle;
    },

    createRectElement: function (shape) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.setAttributes(rect, shape);
        return rect;
    },

    createPathElement: function (shape) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.setAttributes(path, shape);
        return path;
    },

    setAttributes: function (element, shape) {
        for (const key in shape) {
            if (key !== 'type' && key !== 'id') {
                element.setAttribute(key, shape[key]);
            }
        }
        element.setAttribute('id', shape.id);
    }
};

export { SvgTreeSpan };