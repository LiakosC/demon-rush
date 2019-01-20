/*
the app navigator
*/

var App = function() {
	var THIS = this;
		
	this.win = null;
	this.ph = null;
	this.game = null;
	var epicLoading = null;
	var epicLoading_finishes = function() {
		if (THIS.fastLoading == false) { // official
			epicLoading.domElement.addEventListener("click", function() {epicLoading_goto_game();});
			window.addEventListener("keydown", epicLoading_goto_game);
		} else {
			epicLoading_goto_game();
		}
	}
	var epicLoading_goto_game = function() {
		window.removeEventListener("keydown", epicLoading_goto_game);
		epicLoading.destroy();
		THIS.ph.state.start("game");
	}
	
	
	this.fastLoading = false;
	
	this.init = function() {
	
		this.win = new FlexibleWindow($("#window")[0], 800, 600);
		//this.win.element.style.background = "red";
		this.win.element.innerHTML = '\
			<div id="canvasBox" class="full noselect"></div>\
			<div id="htmlBox" class="full nomouse noselect"></div>\
		';
		window.addEventListener('contextmenu', function(ev) {ev.preventDefault();return false;}, false);
		window.addEventListener("keydown", function(e) {
			if (e.key == "F10") {
				THIS.win.fullscreen();
			}
		});
		
		epicLoading = new EpicLoading(this.win.element.querySelector("#htmlBox"));
		epicLoading.title.innerHTML = "Demon Rush";
		
		this.ph = new Phaser.Game(this.win.width, this.win.height, Phaser.CANVAS, this.win.element.querySelectorAll("#canvasBox")[0]);
		this.ph.state.add("loading", {
			preload: function() {
				var GRAPHICS_ROOT 	= "include/graphics";
				var AUDIO_ROOT 		= "include/audio";
				
				
				THIS.ph.load.image("demonhunter", GRAPHICS_ROOT + "/demonhunter/texture.png");
				THIS.ph.load.image("barricade", GRAPHICS_ROOT + "/barricade.png");
				
				THIS.ph.load.onFileComplete.add(function() {
					var progress = THIS.ph.load.progress / 100;
					epicLoading.setProgress(progress);
					if (epicLoading.progress == 1) {
						epicLoading_finishes();
					}
				});
			}
		});
		THIS.ph.state.add("game", {
			create: function() {
				THIS.ph.stage.disableVisibilityChange = true;
				THIS.ph.time.desiredFps = 60;
				THIS.game = new Game(THIS);
				var game = THIS.game;
				game.init();
			},
			update: function() {
				THIS.game.update(THIS.ph.time.physicsElapsedMS);
			},
			shutdown: function() {
				
			}
		});

		THIS.ph.state.start("loading");
	}
}