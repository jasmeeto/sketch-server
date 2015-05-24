var Omni = require("omni");
var Drawer = require("../collections/drawers");

module.exports = Omni.Model.extend({
	defaults: {
        id: 0,
        uid: 0,
        name: "",
        isPublic: false
    },
	readPermission: function(connection, property){
        if (this.get("isPublic") === true) return true;
        if (connection.room === this){
		    return true;
        }
		return false;
	},
	writePermission: function(connection, property){
        return true;
	}
});
