/*
    wwwroot/js/blockdrawing/ctl/taskmanager.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

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

    init: function (config) {

        this.plannerSpace = config.plannerSpace;
        this.configureEventDelegation(this.drawingArea);
        TaskQueue.addListener(this);
    },

    configureEventDelegation: function (drawingPlane) {

        this.plannerSpace.drawingPlane.addEventListener('mousedown', this.dispatchInputEvent.bind(this));
        this.plannerSpace.drawingPlane.addEventListener('mouseup', this.dispatchInputEvent.bind(this));
        this.plannerSpace.drawingPlane.addEventListener('mousemove', this.dispatchInputEvent.bind(this));
        this.plannerSpace.drawingPlane.addEventListener('click', this.dispatchInputEvent.bind(this));

        this.plannerSpace.drawingPlane.addEventListener('keydown', this.dispatchInputEvent.bind(this));
        this.plannerSpace.drawingPlane.addEventListener('keyup', this.dispatchInputEvent.bind(this));
        this.plannerSpace.drawingPlane.addEventListener('keypress', this.dispatchInputEvent.bind(this));


        this.plannerSpace.drawingPlane.addEventListener('contextmenu', this.dispatchInputEvent.bind(this));
    },

    dispatchInputEvent: function (event) {
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

            this.plannerSpace.drawingPlane.focus();
            event.preventDefault(); // Prevent default behavior for all events

            this.plannerSpace.enableGridLock();

            switch (event.type) {
                case 'mousedown':
                    this.currentTask.acceptMouseDown(event);
                    break;
                case 'mouseup':
                    this.currentTask.acceptMouseUp(event);
                    break;
                case 'mousemove':
                    this.currentTask.acceptMouseMove(event);
                    break;
                case 'click':
                    this.currentTask.acceptMouseClick(event);
                    break;
                case 'keydown':
                    this.currentTask.acceptKeyDown(event);
                    break;
                case 'keyup':
                    this.currentTask.acceptKeyUp(event);
                    break;
                case 'keypress':
                    this.currentTask.acceptKeyPress(event);
                    break;
                default:
                    console.log("Unknown event type: " + event.type);
                    break;
            }

            if (this.currentTask.isFinished()) {
                this.currentTask = null;
                if (TaskQueue.front()) {
                    this.currentTask = TaskQueue.dequeue();
                }
            }
        }
    },

    onTaskEnqueued: function (task) {

        if (!this.currentTask) {
            this.currentTask = TaskQueue.dequeue();
        }

    },


    checkQueue: function (currentTask) {

        if (!TaskQueue.isEmpty()) {

            this.currentTask = EditingQeueue.dequeue();

            switch (currentTask.type) {

                case 'GeometricConstruction':
                    currentTask.setPlannerSpace(drawingArea);
                    this.svg.style.cursor = "crosshair";
                    break;

                case 'GroupingOperation':
                    currentTask.setPlannerSpace(drawingArea);
                    this.svg.style.cursor = "default";
                    break;

                default:
                    console.log("Unknown currentTask type: " + currentTask.type);
                    break;

            }


        }


    }

}
