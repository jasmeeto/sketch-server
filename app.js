var Omni = require("omni");
var Drawers = require("./collections/drawers");

var drawers = new Drawers();

var collections = {
	drawers: drawers
}

var events = {
	enter: require("./events/enter"),
	disconnect: require("./events/disconnect")
}

var server = Omni.listen(process.env.PORT || 5000, collections, events);
