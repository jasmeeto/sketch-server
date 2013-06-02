var Omni = require("omni");

module.exports = Omni.Model.extend({
	defaults: {
		x:0,
		y:0,
		clicked: false,
		name: "Drawer",
		color: "#FFF"
	},
	readPermission: function(connection, property){
		return true;
	},
	writePermisstion: function(connection, property){
		return true;
	}
});