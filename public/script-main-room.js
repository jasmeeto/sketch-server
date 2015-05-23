$(function(){
	var MainView = Backbone.View.extend({
		events:{
			"click #b_new": "handleNew"
		},
		initialize: function(){
			var _this = this;

			Omni.ready(function() {
				Omni.Collections.rooms.each(function(room) {
                    _this.addRoomToList.bind(_this, room);
                });

                _this.initAfterOmniReady();
               // Omni.trigger('newRoom', null, function(data){
               //     console.log(data);
               // });
			});
		},
        addRoomToList: function(room){
            // TODO
        },
        handleNew: function(){
            Omni.trigger('newRoom',{}, function(data){
                if(data.error != undefined) alert(data.error);
                if(data.success != undefined && data.uid != undefined){
                    window.location.href = '/' + data.uid;
                }
            });
        },
		initAfterOmniReady: function(){
			$(".overlay").remove();
        }
	});

	new MainView({el: $(".room-container")});

	$(".full-screen").on("click", function() {
		if (document.webkitFullscreenEnabled)
			$(".sketch-container")[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	});
});
