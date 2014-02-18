module.exports = {
	run: function(connection, collections){
		if(connection.drawer){
			collections.drawers.remove(connection.drawer);
		}
		connection.recheckAllPermissions();
	}
}
