var Omni = require("omni");
var Drawers = require("./collections/drawers");
var Canvas = require("canvas"),
	canvas = new Canvas(2000,2000),
	ctx = canvas.getContext("2d");

var drawers = new Drawers();

var collections = {
    drawers: drawers,
    clearToggle: new Omni.Collection({clear:false})
}

var events = {
    clear: require("./events/clear"),
	enter: require("./events/enter"),
	disconnect: require("./events/disconnect")
}

drawers.on("add", function(curDrawer) {
	curDrawer.on("change", function(drawer){
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
});

collections.clearToggle.on("change", function(clear) {
	canvas.width = canvas.width;
});

events.enter.setCanvas(canvas);

var server = Omni.listen(process.env.PORT || 5000, collections, events);

