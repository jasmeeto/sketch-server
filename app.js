var Omni = require("omni");
var express = require('express');
var path = require("path");
var CronJob = require("cron").CronJob;
var _ = require("underscore");

var SketchServer = require("./sketchserver");
var Rooms = require("./collections/rooms");
var Drawers = require("./collections/drawers");
var ClearToggle = require("./models/clearToggle");

var rooms = new Rooms();
var drawers = new Drawers();
var clearToggle = new Omni.Collection([], {model:ClearToggle});

collections = {
    rooms: rooms,
    drawers: drawers,
    clearToggle: clearToggle
}

events = {
    clear: require("./events/clear"),
    enter: require("./events/enter")(),
    disconnect: require("./events/disconnect"),
    closeRoom: require("./events/closeRoom"),
    newRoom: require("./events/newRoom")(),
}

var server =  Omni.listen(process.env.PORT || 5000, collections, events);
exports.server = server;

server.express.use(express.static(path.resolve(path.dirname(require.main.filename), 'public')));
server.express.use('/static', express.static(path.resolve(path.dirname(require.main.filename), 'sketch_public')));

new CronJob('0 0 */2 * * *', function() {
    /* 
     * clean up inactive private rooms every 2 hours 
     * */
    var privRooms = collections.rooms.where({isPublic:false});
    _.each(privRooms, function(room){
        var roomuid = room.get("uid");
        var roomDrawers = collections.drawers.where({room: roomuid});
        if (roomDrawers.length == 0){
            console.log(roomuid);
            events.closeRoom.close(collections, {room:roomuid});
        }
    });

    console.log('Clean up job complete');
}, null, true, 'America/Toronto');
