var Drawer = require("../models/drawer");
var Canvas = require("canvas");

function getRandomColor() {
    var letters = '0123456789ABC'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * (letters.length-1))];
    }
    return color;
}

module.exports = {
	setCanvas: function(canvas){
		this.canvas = canvas;
	},
	run: function(connection, collections, data){
		var newID = collections.drawers.nextID();

		var newDrawer = new Drawer({
			id: newID,
			color: getRandomColor()
		});	

		connection.drawer = newDrawer;
		collections.drawers.add(newDrawer);
		connection.recheckAllPermissions();

		if (this.canvas != undefined && data.width != undefined && data.height != undefined){
			var tempCanvas = new Canvas(data.width,data.height),
			tmpCtx = tempCanvas.getContext("2d");

			tmpCtx.drawImage(this.canvas, 0, 0);

			return {success: "Logged in!", id: newID, dataURL: tempCanvas.toDataURL()};
		}

		return {success: "Logged in!", id: newID};
	}
}
