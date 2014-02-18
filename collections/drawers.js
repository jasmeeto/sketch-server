var Omni = require("omni");
var Drawer = require("../models/drawer");

module.exports = Omni.Collection.extend({
	model: Drawer,
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
		return true;
	}
});
