/*
    wwwroot/js/componenteditor/componentLibrary.js
    Version: 0.0.1
    (c) 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Block Libarary
    ==============
     An example of what blocking data might look like. This is a circuit breaker.
    The highlighting features about the format is the use of groups to form its 
    tree like data structure aand aria-labels for blind readers. 

     The tree like data structure offers the ability to transpant the model
    so that it may be rooted into a larger drawing plane.
    
     The aria-labels in turn also serve as a way to identify the elements in the tree.
    Providing greater accessibility and a more intuitive way to identify elements in the tree.

    Assert model root into larger plane.

*/

export const circuitBreakerData = [
    {
        "type": "group",
        "transform": "translate(380,60)",
        "children": [
            {
                "type": "group",
                "id": "breakerHousing",
                "transform": "translate(0,0)",
                "style": { "cursor": "grab" },
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 220,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Main Body"
                    },
                    {
                        "type": "group",
                        "id": "switchOpening",
                        "transform": "translate(0,80)",
                        "style": { "cursor": "pointer" },
                        "children": [
                            {
                                "type": "rect",
                                "x": 0,
                                "y": 0,
                                "width": 40,
                                "height": 60,
                                "stroke": "black",
                                "fill": "white",
                                "aria-label": "Switch Body"
                            },
                            {
                                "type": "rect",
                                "x": 10,
                                "y": 10,
                                "width": 20,
                                "height": 40,
                                "stroke": "#C8C8C8",
                                "fill": "#C8C8C8",
                                "strokeWidth": 1,
                                "aria-label": "Switch Lever"
                            },
                            {
                                "type": "rect",
                                "id": "leverDown",
                                "x": 5,
                                "y": 45,
                                "width": 30,
                                "height": 5,
                                "fill": "#6E6E6E",
                                "aria-label": "Lever Down"
                            },
                            {
                                "type": "rect",
                                "id": "leverUp",
                                "x": 5,
                                "y": 10,
                                "width": 30,
                                "height": 5,
                                "fill": "#6E6E6E",
                                "style": { "display": "none" },
                                "aria-label": "Lever Up"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "group",
                "id": "Top Lug",
                "transform": "translate(0, 0)",
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 40,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Lug Body"
                    },
                    {
                        "type": "group",
                        "id": "electricalPort",
                        "transform": "translate(20, 20)",
                        "children": [
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 10,
                                "fill": "black",
                                "aria-label": "Electrical Port"
                            },
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 5,
                                "fill": "white",
                                "aria-label": "Electrical Port Inner"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "group",
                "id": "Bottom Lug",
                "transform": "translate(0, 180)",
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 40,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Lug Body"
                    },
                    {
                        "type": "group",
                        "id": "electricalPort",
                        "transform": "translate(20, 20)",
                        "children": [
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 10,
                                "fill": "black",
                                "aria-label": "Electrical Port"
                            },
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 5,
                                "fill": "white",
                                "aria-label": "Electrical Port Inner"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];