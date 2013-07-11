var Drawer = require("../models/drawer");

function getRandomColor() {
    var letters = '0123456789ABC'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * (letters.length-1))];
    }
    return color;
}

module.exports = {
	run: function(connection, collections, data){
		var newID = collections.drawers.nextID();

		var newDrawer = new Drawer({
			id: newID,
			color: getRandomColor()
		});	

		connection.drawer = newDrawer;
		collections.drawers.add(newDrawer);
		connection.sync();

		return {success: "Logged in!", id: newID};
	}
}