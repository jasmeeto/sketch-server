var Omni = require("omni");

module.exports = Omni.Model.extend({
	defaults: {
        clear: false,
		room:""
	},
	readPermission: function(connection, property){
        if (connection.room != undefined &&
            connection.room.get("uid") == this.get("room")){
		    return true;
        }
		return false;
	},
	writePermission: function(connection, property){
        return false;
	}
});
