window.addEventListener('load', bootSketchPad, false);

function bootSketchPad(){
	var myCanvas = document.getElementById("sketchcan");
	var context = null;
	var x,y = 0;

	if (myCanvas && myCanvas.getContext){
		context = myCanvas.getContext("2d");
		context.canvas.width  = window.innerWidth *2/3;
  		context.canvas.height = window.innerHeight*3/4;
		context.fillStyle = "#F1F1F1";
		context.fillRect(0,0,context.canvas.width, context.canvas.height);
	}else{
		return false;
	}

	context.strokeStyle = "red";
	context.lineWidth = 5.0;
	context.lineCap = "round";
	context.lineJoin = "round";
	
	function onMouseMove(event){
		if (context){
			context.beginPath();
			context.moveTo(x,y);
			x = event.offsetX ? event.offsetX : (event.pageX - event.target.offsetLeft);
			y = event.offsetY ? event.offsetY : (event.pageY - event.target.offsetTop);
			context.lineTo(x,y);
			context.stroke();
			context.closePath();

		}
	}

	function onMouseUp(event){
		myCanvas.removeEventListener("mousemove",onMouseMove,false);
	}

	myCanvas.onmousedown = function(event){
		event.preventDefault();
		if (event.which == 3) return;
		event.target.style.cursor = 'auto';
		x = event.offsetX ? event.offsetX : (event.pageX - event.target.offsetLeft);
		y = event.offsetY ? event.offsetY : (event.pageY - event.target.offsetTop);
		
		myCanvas.addEventListener("mousemove",onMouseMove,false);
		myCanvas.addEventListener("mouseup",onMouseUp ,false);
	}
	
	var btnClear = document.getElementById("b_clear");
	btnClear.onclick = function(event){
		bootSketchPad();
	}

	window.onresize = function(event) {
   		bootSketchPad();
	}
}