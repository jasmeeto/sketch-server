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
			"mouseup #sketchcan": "onMouseUp"
		},
		initialize: function(){
			can = this.$el.find("#sketchcan")[0]
			this.context = can.getContext("2d");

            $(window).on("resize", this.render.bind(this));

			this.render();
		},
		render: function(){
			this.context.canvas.width  = window.innerWidth *2/3;
  			this.context.canvas.height = window.innerHeight*3/4;
  			this.context.fillStyle = "#F1F1F1";
			this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
		},
		onMouseUp: function(event){

		},
		onMouseDown: function(event){
			
		}	
	});

	new PadView({el: $(".sketch-container")});

});