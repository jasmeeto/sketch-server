var Omni = require("omni");
var Drawers = require("./collections/drawers");

var drawers = new Drawers();

var collections = {
	drawers: drawers
}

var events = {
	enter: require("./events/enter"),
	draw: require("./events/draw")
}

Omni.listen(3000, collections, events);