$(function(){
	var MainView = Backbone.View.extend({
		events:{
			"click #b_new": "handleNew"
		},
		initialize: function(){
			var _this = this;

			Omni.ready(function() {
				Omni.Collections.rooms.each(function(room) {
                    _this.addRoomToList(room);
                });

                Omni.Collections.rooms.on("add", function(room) {
                    _this.addRoomToList(room);
                });

                Omni.Collections.rooms.on("remove", function(room) {
                    _this.removeRoomFromList(room);
                });

                _this.initAfterOmniReady();
			});
		},
        removeRoomFromList: function(room){
            var uid = room.get("uid");
            $('#' + uid).remove();
        },
        addRoomToList: function(room){
            var uid = room.get("uid");
            var name = room.get("name");
            $(".room-list").append("<li id="+ uid +" data-uid="+uid+">"+
                name + " (" + uid + ")" +
                "</li>");
            $("ul > #"+uid).on("click", function(){
                window.location.href = '/' + $(this).data('uid');
            });
        },
        handleNew: function(){
            var isPublic = $("#b_public").prop('checked');
            var roomname = $("input[name=roomname]").val();
            Omni.trigger('newRoom',{isPublic: isPublic, roomname:roomname}, function(data){
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

    $("#b_private").prop('checked',true);
    $("label[for=b_public]").css('background', '#A2BCDC');
    $("label[for=b_private]").css('background', '#4479BA');
    $("input[type=radio][name=privacy]", "#p_toggle_form").hide();

	$("#b_private").change(function() {
        if($(this).prop('checked')){
            $("label[for=b_public]").css('background', '#A2BCDC');
            $("label[for=b_private]").css('background', '#4479BA');
        }else{
            $("label[for=b_private]").css('background', '#A2BCDC');
            $("label[for=b_public]").css('background', '#4479BA');
        }
	});

	$("#b_public").change(function() {
        if($(this).prop('checked')){
            $("label[for=b_private]").css('background', '#A2BCDC');
            $("label[for=b_public]").css('background', '#4479BA');
        }else{
            $("label[for=b_public]").css('background', '#A2BCDC');
            $("label[for=b_private]").css('background', '#4479BA');
        }
	});

	new MainView({el: $(".room-container")});

	$(".full-screen").on("click", function() {
		if (document.webkitFullscreenEnabled)
			$(".sketch-container")[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	});
});
