var Omni = require("omni");
var Room = require("../models/room");

module.exports = Omni.Collection.extend({
	model: Room,
	nextID: function(){
		var highest = 0;
		this.each(function(model){
			if(model.id && model.id > highest){
				highest = model.id;
			}
		});
		return highest + 1;		
	},
	createPermission: function(connection){
		return false;
	}
});
