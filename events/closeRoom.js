var SketchServer = require("../sketchserver");
var app = require("../app");

function unmount(expressApp, route){
    for (var i = 0, len = expressApp.stack.length; i < len; ++i) {
        if (expressApp.stack[i].route == route) {
            expressApp.stack.splice(i, 1);
            return true;
        };
    }
    return false;
}

module.exports = {
	run: function(connection, collections, data){
        if(data.room == undefined) return {error: "Need to specify roomID!"};
        var roomID = data.room;
        var room = collections.rooms.findWhere({uid: roomID});
        if(room == undefined) return {error: "Need to specify valid roomID!"};

        var server = app.server;
        var drawers = collections.drawers.where({room: roomID});
        SketchServer.stopSketch(roomID);
        unmount(server.express, '/' + roomID);
        collections.rooms.remove(room);
        collections.drawers.remove(drawers);

        connection.recheckAllPermissions();

        return {};
	}
}
