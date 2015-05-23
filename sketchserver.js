var Omni = require("omni");
var express = require('express');
var path = require("path");

var app = require("./app");
var Room = require("./models/room");
var ClearToggle = require("./models/clearToggle");

var roomToCanvas = {}
exports.roomToCanvas = roomToCanvas;

exports.startSketch = function(id, uid){
    var server = app.server;
    var drawers = app.drawers;
	var Canvas = require("canvas");
	var canvas = new Canvas(2000,2000);
	var ctx = canvas.getContext("2d");

    roomToCanvas[uid] = canvas;

    var room = new Room ({
        id: id,
        uid: uid
    });

    var clearToggle = new ClearToggle({clear:false, room:uid});
	clearToggle.on("change", function(clearToggle) {
        var clearCan = roomToCanvas[clearToggle.get("room")];
		clearCan.width = clearCan.width;
	});

    server.express.use('/' + uid.toString(), express.static(path.resolve(path.dirname(require.main.filename), 'sketch_html')));

	return {
        success: "Created sketchpad on uid " + uid,
        room: room, 
        clearToggle: clearToggle
    };
}

exports.stopSketch = function(uid){
    delete roomToCanvas.uid;
}
