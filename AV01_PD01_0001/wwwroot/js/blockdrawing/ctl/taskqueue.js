/*
    wwwroot/js/blockdrawing/ctl/taskqueue.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Editing Queue
    =============

    
    Example usage
    -------------

        TaskQueue.init();

        TaskQueue.enqueue({ type: 'addShape', shape: 'circle' });
        TaskQueue.enqueue({ type: 'modifyShape', id: '123', color: 'red' });
        TaskQueue.enqueue({ type: 'deleteShape', id: '456' });

        console.log("Front task:", TaskQueue.front());
        console.log("Dequeueing:", TaskQueue.dequeue());
        console.log("Queue size:", TaskQueue.size());

        while (!TaskQueue.isEmpty()) {
            console.log("Processing task:", TaskQueue.dequeue());
        }

        console.log("Queue empty:", TaskQueue.isEmpty());

*/

export const TaskQueue = {
    Node: class {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    },

    head: null,
    tail: null,
    listenerHead: null,
    listenerTail: null,

    enqueue: function (task) {
        const newNode = new this.Node(task);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.notifyListeners(task);
    },

    enqueueDrawingTask: function (task) {
        console.log("Enqueueing task:", task);
        this.enqueue(task);
    },

    dequeue: function () {
        if (this.isEmpty()) {
            return "Underflow"; // Or throw an error
        }

        const removedValue = this.head.value;
        this.head = this.head.next;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return removedValue;
    },

    front: function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.value;
    },

    isEmpty: function () {
        return this.head === null;
    },

    clear: function () {
        this.head = null;
        this.tail = null;
    },

    addListener: function (listener) {
        const newListenerNode = new this.Node(listener);
        if (this.isListenerEmpty()) {
            this.listenerHead = newListenerNode;
            this.listenerTail = newListenerNode;
        } else {
            this.listenerTail.next = newListenerNode;
            this.listenerTail = newListenerNode;
        }
    },

    removeListener: function (listener) {
        if (this.isListenerEmpty()) {
            return;
        }
        if (this.listenerHead.value === listener) {
            this.listenerHead = this.listenerHead.next;
            if (this.isListenerEmpty()) {
                this.listenerTail = null;
            }
            return;
        }
        let current = this.listenerHead;
        while (current.next) {
            if (current.next.value === listener) {
                current.next = current.next.next;
                if (!current.next) {
                    this.listenerTail = current;
                }
                return;
            }
            current = current.next;
        }
    },

    notifyListeners: function (task) {
        let current = this.listenerHead;
        while (current) {
            current.value.onTaskEnqueued(task);
            current = current.next;
        }
    },

    isListenerEmpty: function () {
        return this.listenerHead === null;
    }
};

