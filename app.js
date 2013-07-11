var Omni = require("omni");
var Drawers = require("./collections/drawers");

var drawers = new Drawers();

var collections = {
	drawers: drawers
}

var events = {
	enter: require("./events/enter"),
	draw: require("./events/draw"),
	disconnect: require("./events/disconnect")
}

Omni.listen(3001, collections, events);