/*
    wwwroot/js/ctl/plannardrawing.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Observable Queue
    ================

*/



export class ObservableQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.listenerHead = null;
        this.listenerTail = null;
    }

    enqueue(task) {
        const newNode = new Node(task);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.notifyListeners(task);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null; // Or throw an error
        }
        const value = this.head.value;
        this.head = this.head.next;
        if (this.isEmpty()) {
            this.tail = null;
        }
        return value;
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.value;
    }

    isEmpty() {
        return this.head === null;
    }

    addListener(listener) {
        const newListenerNode = new Node(listener);
        if (this.isListenerEmpty()) {
            this.listenerHead = newListenerNode;
            this.listenerTail = newListenerNode;
        } else {
            this.listenerTail.next = newListenerNode;
            this.listenerTail = newListenerNode;
        }
    }

    removeListener(listener) {
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
    }

    notifyListeners(task) {
        let current = this.listenerHead;
        while (current) {
            current.value.onTaskEnqueued(task);
            current = current.next;
        }
    }

    isListenerEmpty() {
        return this.listenerHead === null;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}