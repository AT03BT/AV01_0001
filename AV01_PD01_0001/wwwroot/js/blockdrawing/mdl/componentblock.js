/*
    wwwroot/js/blockdrawing/mdl/componentblock.js
    Version: 0.0.1
    (c) 2024, 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
    
   Please support me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!


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

import { Observable } from '../itf/observable.js';
export const ComponentBlock = {

}