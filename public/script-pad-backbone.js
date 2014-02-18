Omni.ready(function(){
	var Pad = {
		drawer: null,
		events: {},
		on: function(event, callback){
			if (this.events[event] == null){
				this.events[event] = [];
			}
			this.events[event].push(callback);
		},
		trigger: function(event){
			if (this.events[event] != null){
				for (var x in this.events[event]){
					this.events[event].x();
				}
			}
		}

	};

	var PadView = Backbone.View.extend({
		events:{
			"mousedown #sketchcan": "onMouseDown",
			"mouseup #sketchcan": "onMouseUp",
			"mousemove #sketchcan": "onMouseMove",
			"click #b_clear": "drawCanvas"
		},
		initialize: function(){
			Omni.trigger("enter",{},
				function(data){
					if(data.error != undefined) alert(data.error);
					if(data.success != undefined && data.id != undefined){
						Pad.drawer = Omni.Collections.drawers.findWhere({id: data.id});
					}
				}
			);

			this.setRequestAnimFrame();

			can = $("#sketchcan")[0]
			this.context = can.getContext("2d");

            $(window).on("resize", this.render.bind(this));

			this.drawCanvas();

			this.lastTime = 0;
			this.pos = {};

			this.gameLoop();
		},
		drawCanvas: function(){
			this.context.canvas.width  = window.innerWidth *2/3;
  			this.context.canvas.height = window.innerHeight*3/4;
  			this.context.fillStyle = "#F1F1F1";
			this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
		},
		onMouseUp: function(event){
			this.pos.clicked = false;
			this.pos.moving = false;
		},
		onMouseDown: function(event){
			this.pos.clicked = true;
			this.pos.x = event.offsetX ? event.offsetX : (event.clientX - event.target.offsetLeft);
			this.pos.y = event.offsetY ? event.offsetY : (event.clientY - event.target.offsetTop);
		},
		onMouseMove: function(event){
			this.pos.moving = true;
			this.pos.x = event.offsetX ? event.offsetX : (event.clientX - event.target.offsetLeft);
			this.pos.y = event.offsetY ? event.offsetY : (event.clientY - event.target.offsetTop);
		},
		gameLoop: function(){
			var dt = Date.now() - this.lastTime;

			if(Pad.drawer != undefined){
				var newAttr = {
					x: Pad.drawer.get('x'),
					y: Pad.drawer.get('y'),
					clicked: this.pos.clicked,
					moving: this.pos.moving
				}
				newAttr.prevX = newAttr.x;
				newAttr.prevY = newAttr.y;

				if(newAttr.x != this.pos.x || newAttr.y != this.pos.y){
					newAttr.prevX = newAttr.x;
					newAttr.prevY = newAttr.y;
					newAttr.x = this.pos.x;
					newAttr.y = this.pos.y;
				}

				Pad.drawer.set(newAttr);
			}

			this.render();

			this.lastTime = Date.now();
			requestAnimationFrame(this.gameLoop.bind(this));
		},
		render: function(){
			// this.drawCanvas();
			Omni.collections.drawers.each(this.renderDrawer, this);
		},
		renderDrawer: function(drawer){
			var x = drawer.get('x');
			var y = drawer.get('y');
			var prevX = drawer.get('prevX');
			var prevY = drawer.get('prevY');
			var clicked = drawer.get('clicked');
			var moving = drawer.get('moving');

			if (clicked && !moving){
				this.context.fillRect(x, y, 5, 5);
			}else if(clicked && moving){
				this.context.beginPath();
				this.context.strokeStyle = drawer.get('color');
				this.context.lineWidth = 5.0;
				this.context.lineCap = "round";
				this.context.lineJoin = "round";

				this.context.moveTo(prevX,prevY);
				this.context.lineTo(x,y);
				this.context.stroke();
			}
		},
		setRequestAnimFrame: function(){
			window.requestAnimationFrame = window.requestAnimationFrame ||
										   window.mozRequestAnimationFrame ||
										   window.webkitRequestAnimationFrame ||
										   window.msRequestAnimationFrame ||
										   function (callback) {
										   	  setTimeout(callback, 1000 / 60);
										   }
		}
	});

	new PadView({el: $(".sketch-container")});
});
