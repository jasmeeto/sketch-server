var Omni = require("omni");
var SketchServer = require("./sketchserver");
var Rooms = require("./collections/rooms");
var Drawers = require("./collections/drawers");
var ClearToggle = require("./models/clearToggle");
var express = require('express');
var path = require("path");

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

var server =  Omni.listen(process.env.port || 5000, collections, events);
exports.server = server;

server.express.use(express.static(path.resolve(path.dirname(require.main.filename), 'public')));
server.express.use('/static', express.static(path.resolve(path.dirname(require.main.filename), 'sketch_public')));
