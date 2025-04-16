/*
    wwwroot/js/blockdrawing/svgutils.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    SVG Utility Functions
    =====================
        This was a refactoring. It appears as though the idea of srp was a little excessive.
*/

function createSvgElement(type, data) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const key in data) {
        element.setAttribute(key, data[key]);
    }
    return element;
}

export function createRect(data) {
    return createSvgElement('rect', data);
}

export function createCircle(data) {
    return createSvgElement('circle', data);
}

export function createLine(data) {
    return createSvgElement('line', data);
}

export function createPath(data) {
    return createSvgElement('path', data);
}

export function applyStyles(element, style) {
    for (const prop in style) {
        element.style[prop] = style[prop];
    }
}

export function createGroup(data) {
    return createSvgElement('g', data);
}