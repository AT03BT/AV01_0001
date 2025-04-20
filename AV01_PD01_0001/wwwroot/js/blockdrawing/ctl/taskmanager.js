/*
    wwwroot/js/blockdrawing/ctl/taskmanager.js
    Version: 0.2.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    If you like my work, please consider supporting me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!

    Task Manager
    ============

     Here in Blocking Draw, the task manager is responsible for managing the task queue and dispatching events to the appropriate tasks.
    It is the central component that ties in the execution of tasks for the application. On the one side there is the client on
    the other is the base.

     On the client side there exists draw in the screen. On the other it is blocking in the base. Upload, download and quickly run over load.
    The task manager, make it check.


    Responsiblities:

        Checking the task queue.
        Provisioning the current task with its necessary dependencies.
        Dispatching mouse events to the appropriate task.

*/

import { TaskQueue } from './taskqueue.js';

export const TaskManager = {

    currentTask: null,
    plannerSpace: null,
    drawingPlane: null, // Store the drawing plane element

    init: function (config) {
        this.plannerSpace = config.plannerSpace;
        this.drawingPlane = config.plannerSpace.drawingPlane; // Get drawingPlane from config
        this.configureEventDelegation();
        TaskQueue.addListener(this);
    },

    configureEventDelegation: function () {
        if (!this.drawingPlane) {
            console.error("Drawing plane is not initialized. Event delegation cannot be configured.");
            return;
        }

        const events = ['mousedown', 'mouseup', 'mousemove', 'click', 'keydown', 'keyup', 'keypress', 'contextmenu'];
        events.forEach(eventType => {
            this.drawingPlane.addEventListener(eventType, this.dispatchInputEvent.bind(this));
        });
    },

    dispatchInputEvent: function (event) {
        try {
            if (event.type !== 'mousemove') {
                console.log('Event type:', event.type);
                console.log('Target element:', event.target);
                if (event instanceof MouseEvent) {
                    console.log('Mouse coordinates:', event.clientX, event.clientY);
                } else if (event instanceof KeyboardEvent) {
                    console.log('Key:', event.key); // Log the pressed key
                }
            }

            if (this.currentTask) {
                event.preventDefault(); // Prevent default behavior for all events

                let eventHandler;
                switch (event.type) {
                    case 'mousedown': eventHandler = this.currentTask.acceptMouseDown; break;
                    case 'mouseup': eventHandler = this.currentTask.acceptMouseUp; break;
                    case 'mousemove': eventHandler = this.currentTask.acceptMouseMove; break;
                    case 'click': eventHandler = this.currentTask.acceptMouseClick; break;
                    case 'keydown': eventHandler = this.currentTask.acceptKeyDown; break;
                    case 'keyup': eventHandler = this.currentTask.acceptKeyUp; break;
                    case 'keypress': eventHandler = this.currentTask.acceptKeyPress; break;
                    default:
                        console.warn("Unknown event type: " + event.type + ".  Event not dispatched to task.");
                        return; // Important: Exit, don't try to call undefined handler
                }

                if (typeof eventHandler === 'function') {
                    eventHandler.call(this.currentTask, event); // Call the handler
                }
                else {
                    console.warn(`Event handler for ${event.type} is not a function on the current task.`);
                }

                if (this.currentTask.isFinished()) {
                    this.currentTask = null;
                    this.startNextTask(); // Use the helper function
                }
            }
        } catch (error) {
            console.error("Error dispatching event:", error, event); // Log the error and the event
            // Consider if you need to do any cleanup or error recovery here.
        }
    },

    onTaskEnqueued: function (task) {
        if (!this.currentTask) {
            this.startNextTask(); // Use the helper function
        }
    },

    startNextTask: function () {
        if (TaskQueue.front()) {
            this.currentTask = TaskQueue.dequeue();
            if (this.currentTask) {
                //  Set any necessary dependencies, e.g., the drawing area.
                /*this.currentTask.setPlannerSpace(this.plannerSpace);*/
            }
        }
    }
};
