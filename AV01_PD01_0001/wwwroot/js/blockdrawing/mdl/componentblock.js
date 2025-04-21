/*
    wwwroot/js/blockdrawing/mdl/componentblock.js
    Version: 0.0.1
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/


    Component Block
    ===============

     The ComponentBlock is an abstraction that is used to describe geometrical figures suitable
    for sending data into the base or rendering object onto client DOM. Result: a sharable collection
    and a picture on the screen.

     Here a component block is a collection of geometric objects that are grouped together. Forming
    a figure that can be used in diagrams, illustrations, and other visual representations.

     The current data definition for geometrical objects within a Component Block is SVG markup. There
    can be but not necessarily be a one to one association between an svg group and a component block.
    ie. A component block can be a collection of SVG groups or a single SVG group.

    Responsibilities:
    
    + Provides a clear abstraction of what a componet block is. Independed of redering or data description.
    + Notifying Observers of changes to the component block.

    Features:

     - An Observable interface for save, load, delete component modification.
     - A containter for geometric objects.
     - A dictionary of seperate layers that are composed of geometric objects. For example, figure_body, on_state, off_state, etc.
     - User and author identification to Component Block association.

     Uses:
        - Observable pattern to notify observers of changes to the component block.

*/

/*import { Observable } from '../itf/observable.js';*/
export { ComponentBlock, Shape }
class ComponentBlock {
    constructor() {
        this.id = null; // Unique identifier for the block (e.g., for database)
        this.name = ""; // Name of the component block
        this.description = ""; // Description of the block
        this.layers = new Map(); // Map to store layers (key: layer ID, value: array of shapes)
        this.properties = {}; // General properties of the block
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.observers = []; // Array to store observers (e.g., PlannerSpace)
    }

    addShape(layerId, shape) {
        if (!this.layers.has(layerId)) {
            this.layers.set(layerId, []);
        }
        this.layers.get(layerId).push(shape);
        this.notifyObservers();
    }

    removeShape(layerId, shapeId) {
        if (this.layers.has(layerId)) {
            this.layers.set(layerId, this.layers.get(layerId).filter(shape => shape.id !== shapeId));
            this.notifyObservers();
        }
    }

    updateShape(layerId, shapeId, newAttributes) {
        if (this.layers.has(layerId)) {
            const shapeIndex = this.layers.get(layerId).findIndex(shape => shape.id === shapeId);
            if (shapeIndex > -1) {
                this.layers.get(layerId)[shapeIndex].attributes = {
                    ...this.layers.get(layerId)[shapeIndex].attributes,
                    ...newAttributes
                };
                this.notifyObservers();
            }
        }
    }

    addLayer(layerId) {
        if (!this.layers.has(layerId)) {
            this.layers.set(layerId, []);
            this.notifyObservers();
        }
    }

    removeLayer(layerId) {
        this.layers.delete(layerId);
        this.notifyObservers();
    }

    updateProperties(newProperties) {
        this.properties = {
            ...this.properties,
            ...newProperties
        };
        this.notifyObservers();
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    // Method to get a serializable representation of the ComponentBlock
    // This is important for saving to the database or transferring data
    // between client and server.
    toSerializable() {
        const serializableLayers = {};
        this.layers.forEach((shapes, layerId) => {
            serializableLayers[layerId] = shapes.map(shape => shape.toSerializable());
        });

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            layers: serializableLayers,
            properties: this.properties,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
        };
    }

    static fromSerializable(data) {
        const componentBlock = new ComponentBlock();
        componentBlock.id = data.id;
        componentBlock.name = data.name;
        componentBlock.description = data.description;
        componentBlock.properties = data.properties;
        componentBlock.createdAt = new Date(data.createdAt);
        componentBlock.modifiedAt = new Date(data.modifiedAt);

        for (const layerId in data.layers) {
            componentBlock.layers.set(layerId, data.layers[layerId].map(shapeData => Shape.fromSerializable(shapeData)));
        }

        return componentBlock;
    }
}

class Shape {
    constructor(id, type, attributes) {
        this.id = id; // Unique ID for the shape
        this.type = type; // 'line', 'circle', 'rect', 'path', etc.
        this.attributes = attributes; // { x1: 0, y1: 0, x2: 10, y2: 10 }
    }

    toSerializable() {
        return {
            id: this.id,
            type: this.type,
            attributes: this.attributes
        };
    }

    static fromSerializable(data) {
        return new Shape(data.id, data.type, data.attributes);
    }
}



/*

   Please support me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!

*/