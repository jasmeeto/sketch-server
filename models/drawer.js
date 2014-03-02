var Omni = require("omni");

module.exports = Omni.Model.extend({
	defaults: {
		x:0,
		y:0,
		prevX:0,
		prevY:0,
		clicked: false,
		moving: false,
		color: "#FFF",
		strokeSize: 3.0
	},
	readPermission: function(connection, property){
		return true;
	},
	writePermission: function(connection, property){
		return true;
	}
});
