/*
    wwwroot/js/blockdrawing/cli/ctl/drawingactions.js
    Version: 0.0.1
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Drawing Actions
    ===============
        The set of services that are enabled for the client to draw. These are the actions
    defined for the toolbar and the context menu.
*/
import { TaskQueue } from '../../ctl/taskqueue.js';
import { PointConstruction } from '../../ctl/geometricconstruction/pointconstruction.js';
import { PathConstruction } from '../../ctl/geometricconstruction/pathconstruction.js';
import { LineConstruction } from '../../ctl/geometricconstruction/lineconstruction.js';
import { CircleConstruction } from '../../ctl/geometricconstruction/circleconstruction.js';
import { RectangleConstruction } from '../../ctl/geometricconstruction/rectangleconstruction.js';
import { PlannerSpace } from '../mdl/plannerspace.js';

export const DrawingActions = {

    geometricConstructions: null,
    plannerSpace: null,

    init: function (config) {

        console.log("Initializing Drawing Actions");

        this.plannerSpace = config.plannerSpace;
        this.getGeometricConstructions();
        document.querySelectorAll(config.selectorString).forEach(button => {

            button.addEventListener('click', () => {

                console.log("Drawing button clicked");

                var shapeIdentifier = button.getAttribute('data-shape-class');

                var editingTask = this.getGeometricConstruction(shapeIdentifier);
                if (editingTask) {

                    TaskQueue.enqueueDrawingTask(editingTask);

                } else {
                    console.error("Cannot draw without editing task: " + button.text);
                }

            });
        })

    },
    getGeometricConstructions: function () {

        this.geometricConstructions = new Map([
            ["sp01_pt01_0001", PointConstruction],
            ["sp01_ln01_0001", LineConstruction],
            ["sp01_cc01_0001", CircleConstruction],
            ["sp01_rt01_0001", RectangleConstruction],
            ["cs01_pa01_0001", PathConstruction]
        ]);

    },
    getGeometricConstruction: function (shapeIdentifier) {

        var geometricConstruction = this.geometricConstructions.get(shapeIdentifier);

        if (geometricConstruction) {

            //  Instead of returning a new instance of the construction class,
            //  we now call plannerSpace.addShape to create the shape.
            //  The construction class is still used to handle user input.

            switch (shapeIdentifier) {
                case "sp01_pt01_0001":
                    //  Point construction doesn't really need a construction class,
                    //  but we keep it for consistency.
                    return new geometricConstruction({
                        plannerSpace: this.plannerSpace,
                        addShape: (attributes) => this.plannerSpace.addShape("0", "point", attributes)
                    });
                case "sp01_ln01_0001":
                    return new geometricConstruction({
                        plannerSpace: this.plannerSpace,
                        addShape: (attributes) => this.plannerSpace.addShape("0", "line", attributes)
                    });
                case "sp01_cc01_0001":
                    return new geometricConstruction({
                        plannerSpace: this.plannerSpace,
                        addShape: (attributes) => this.plannerSpace.addShape("0", "circle", attributes)
                    });
                case "sp01_rt01_0001":
                    return new geometricConstruction({
                        plannerSpace: this.plannerSpace,
                        addShape: (attributes) => this.plannerSpace.addShape("0", "rect", attributes)
                    });
                case "cs01_pa01_0001":
                    return new geometricConstruction({
                        plannerSpace: this.plannerSpace,
                        addShape: (attributes) => this.plannerSpace.addShape("0", "path", attributes)
                    });
                default:
                    console.log("Unknown shape identifier: " + shapeIdentifier);
                    throw new Error("Unknown shape type: " + shapeIdentifier);
            }

        } else {

            console.log("Unknown shape identifier: " + shapeIdentifier);
            throw new Error("Unknown shape type: " + shapeIdentifier);

        }

    }

}