var SketchServer = require("../sketchserver");
var Drawers = require("../collections/drawers");

var shortid = require("shortid");

module.exports = function(){
	return {
		run: function(connection, collections, data){
			var newID = collections.rooms.nextID();
            var uid = shortid.generate();
            console.log(uid);

            var result = SketchServer.startSketch(newID, uid);

            if(result.error != undefined)
			    return result;

            collections.rooms.add(result.room);
            collections.clearToggle.add(result.clearToggle);

			connection.recheckAllPermissions();

            return {success: "New Room!", uid: uid};
		}
	};
}
