var preload = {
	
	state: {
		preload: function() {
			
		},
		create: function() {
			//epicLoading.destroy();
			
			game.ph.stage.disableVisibilityChange = true;
			//game.ph.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			//game.ph.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
			game.ph.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			//game.ph.scale.fullScreenTarget = game.ph.canvas.parentNode; // no need
			
			game.ph.time.desiredFps = 40;
			game.ph.canvas.addEventListener("contextmenu", function(ev) {ev.preventDefault();return false;}, false);
			game.ph.stage.backgroundColor = "#2A0047";
			game.ph.world.setBounds(0, 0, win.width, win.height);
			
			//epicLoading.overbar.innerHTML = "Loading Completed.";
			//epicLoading.element.style.cursor = "pointer";
			//epicLoading.element.addEventListener("mousedown", function() {
			//	epicLoading.destroy();
			//});
			//game.ph.state.start("game");
		}
	}
}

var preloadState = {
	
}