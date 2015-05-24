var Omni = require("omni");

module.exports = Omni.Model.extend({
	defaults: {
		x:0,
		room:"",
		y:0,
		prevX:0,
		prevY:0,
		clicked: false,
		moving: false,
		color: "#FFF",
		strokeSize: 8.0 
	},
	readPermission: function(connection, property){
        if (connection.room != undefined &&
            connection.room.get("uid") == this.get("room")){
		    return true;
        }
		return false;
	},
	writePermission: function(connection, property){
        if (connection.drawer === this){
		    return true;
        }
        return false;
	}
});
