var Drawer = require("../models/drawer");
var SketchServer = require("../sketchserver");
var Canvas = require("canvas");

function getRandomColor() {
    var letters = '0123456789ABC'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * (letters.length-1))];
    }
    return color;
}

module.exports = function(){
	return {
        roomToCanvas: SketchServer.roomToCanvas,
		run: function(connection, collections, data){
            if(data.room == undefined) return {error: "Need to specify roomID!"};
            var roomID = data.room;
            var room = collections.rooms.findWhere({uid: roomID});
            if(room == undefined) return {error: "Need to specify valid roomID!"};

            var newID = collections.drawers.nextID();

			var newDrawer = new Drawer({
					id: newID,
                    room: room.get("uid"),
					color: getRandomColor()
			});
			connection.room = room;
			connection.drawer = newDrawer;
            collections.drawers.add(newDrawer);
			connection.recheckAllPermissions();

            var canvas = this.roomToCanvas[roomID];
			if (canvas != undefined && data.width != undefined && data.height != undefined){
				var tempCanvas = new Canvas(data.width,data.height),
				tmpCtx = tempCanvas.getContext("2d");
				tmpCtx.drawImage(canvas, 0, 0),
                ctx = canvas.getContext("2d");

                newDrawer.on("change", function(drawer){
                    var x = drawer.get('x');
                    var y = drawer.get('y');
                    var prevX = drawer.get('prevX');
                    var prevY = drawer.get('prevY');
                    var clicked = drawer.get('clicked');
                    var moving = drawer.get('moving');
                    var strokeSize = drawer.get('strokeSize');
                    if (clicked && !moving){
                        ctx.beginPath();
                        ctx.arc(x, y, strokeSize/2, 0, 2*Math.PI);
                        ctx.fillStyle = drawer.get('color');
                        ctx.fill();
                    }else if(clicked && moving){
                        ctx.beginPath();
                        ctx.strokeStyle = drawer.get('color');
                        ctx.lineWidth = strokeSize;
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";

                        ctx.moveTo(prevX,prevY);
                        ctx.lineTo(x,y);
                        ctx.stroke();
                    }
                });

				return {success: "Logged in!", id: newID, dataURL: tempCanvas.toDataURL(), room: roomID};
			}

			return {success: "Logged in!", id: newID, room: roomID};
		}
	};
}
