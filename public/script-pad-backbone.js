$(function(){
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
			"touchstart #sketchcan": "onMouseDown",
			"touchend #sketchcan": "onMouseUp",
			"touchmove #sketchcan": "onMouseMove",
			"click #b_clear": "handleClear"
		},
		initialize: function(){
			var _this = this;
			Omni.ready(function() {
				Omni.trigger("enter",{},
					function(data){
						if(data.error != undefined) alert(data.error);
						if(data.success != undefined && data.id != undefined){
							Pad.drawer = Omni.Collections.drawers.findWhere({id: data.id});
							Omni.Collections.drawers.each(function(drawer) {
								drawer.on("change", _this.renderDrawer.bind(_this, drawer));
							});
							Omni.Collections.drawers.on("add", function(drawer) {
								drawer.on("change", _this.renderDrawer.bind(_this, drawer));
							});
                            Omni.Collections.clearToggle.on('change', function(){
                                _this.clearCanvas();
                            });
						}
					}
				);
			});

			can = $("#sketchcan")[0]
			this.context = can.getContext("2d");

            $(window).on("resize", this.resizeCanvas.bind(this));

			this.resizeCanvas();

			this.lastTime = 0;
			this.pos = {};
			this.throttleTime = 16;
			this.lastThrottle = 0;
			this.throttleTimer = null;
		},
        handleClear: function(){
            Omni.trigger('clear');
        },
        loadCanvas: function(dataURL) {
			// load image from data url
			var imageObj = new Image();
			var _this = this;
			imageObj.onload = function() {
				_this.context.drawImage(this, 0, 0);
			};

			imageObj.src = dataURL;
		},
		clearCanvas: function() {
			this.context.fillStyle = "#F1F1F1";
			this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
		},
		resizeCanvas: function() {
			var dataURL = this.context.canvas.toDataURL();
			this.context.canvas.width  = window.innerWidth;
			this.context.canvas.height = window.innerHeight;
			this.clearCanvas();
			this.loadCanvas(dataURL);
		},
		findCoords: function(event) {
			if (event.originalEvent.touches && event.originalEvent.touches.length > 0) {
				event.offsetX = event.originalEvent.touches[0].clientX - event.target.offsetLeft;
				event.offsetY = event.originalEvent.touches[0].clientY - event.target.offsetTop;
			}
			return event;
		},
		onMouseUp: function(event){
			event = this.findCoords(event);
			this.pos.clicked = false;
			this.pos.moving = false;
			this.updateMousePosOnModel();
		},
		onMouseDown: function(event){
			event = this.findCoords(event);
			this.pos.clicked = true;
			this.pos.x = event.offsetX ? event.offsetX : (event.clientX - event.target.offsetLeft);
			this.pos.y = event.offsetY ? event.offsetY : (event.clientY - event.target.offsetTop);
			this.updateMousePosOnModel();
		},
		onMouseMove: function(event, alwaysDraw){
			if (Date.now() - this.lastThrottle < this.throttleTime) {
				return;
			}
			this.lastThrottle = Date.now();
			event = this.findCoords(event);
			this.pos.moving = true;
			this.pos.x = event.offsetX ? event.offsetX : (event.clientX - event.target.offsetLeft);
			this.pos.y = event.offsetY ? event.offsetY : (event.clientY - event.target.offsetTop);
			this.updateMousePosOnModel(alwaysDraw);

			event.preventDefault();
		},
		updateMousePosOnModel: function() {
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
		},
		renderDrawer: function(drawer){
			var x = drawer.get('x');
			var y = drawer.get('y');
			var prevX = drawer.get('prevX');
			var prevY = drawer.get('prevY');
			var clicked = drawer.get('clicked');
			var moving = drawer.get('moving');
			var strokeSize = drawer.get('strokeSize');

			if (clicked && !moving){
				this.context.fillRect(x, y, 5, 5);
			}else if(clicked && moving){
				this.context.beginPath();
				this.context.strokeStyle = drawer.get('color');
				this.context.lineWidth = strokeSize;
				this.context.lineCap = "round";
				this.context.lineJoin = "round";

				this.context.moveTo(prevX,prevY);
				this.context.lineTo(x,y);
				this.context.stroke();
			}
		}
	});

	new PadView({el: $(".sketch-container")});

	// Color the color pickers
	$(".color-pick").each(function() {
		$(this).css({
			background: $(this).data("color")
		});
	});

	$(".color-pick").on("click", function() {
		if (Pad.drawer) {
			Pad.drawer.set('color', $(this).data('color'));
			Pad.drawer.set('strokeSize', $(this).data('strokeSize'));
		}
	});

	$(".full-screen").on("click", function() {
		if (document.webkitFullscreenEnabled)
			$(".sketch-container")[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	});
});
