var GUI = function(game) {
	this.value = 0;
	this.distance = 0; // RO
	this.distance_div = $("<div>").addClass("distance").html("Distance: 0").appendTo(game.box)[0];
	this.fullscreen_btn = $("<button>").addClass("fullscreen_btn").on("click", function() {game.cast_fullscreen();}).html("Fullscreen").appendTo(game.box)[0];
	this.distance_set = function(number) {
		this.distance = number;
		this.distance_div.innerHTML = "Distance: " + parseInt(number);
	}
		
	
	this.shutdown = function() {
		this.distance_div.parentNode.removeChild(this.distance_div);
		this.fullscreen_btn.parentNode.removeChild(this.fullscreen_btn);
	}
}