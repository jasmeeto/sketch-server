var SketchServer = require("../sketchserver");
var Drawers = require("../collections/drawers");

var shortid = require("shortid");

module.exports = function(){
	return {
		run: function(connection, collections, data){
            if(data.isPublic == undefined) return {error: "Need to specify privacy setting!"};
            if(data.roomname == undefined || data.roomname.length == 0) return {error: "Need to specify room name!"};
			var newID = collections.rooms.nextID();
            var uid = shortid.generate();

            var result = SketchServer.startSketch(newID, uid, data.isPublic, data.roomname);

            if(result.error != undefined)
			    return result;

            collections.rooms.add(result.room);
            collections.clearToggle.add(result.clearToggle);

			connection.recheckAllPermissions();

            return {success: "New Room!", uid: uid};
		}
	};
}
