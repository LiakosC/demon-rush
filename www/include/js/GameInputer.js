var GameInputer = function(game) {
	var THIS = this;
	this.game = game;
	
	//keys.space = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	//keys.space.onDown.add(function() {game.jump();});
	//ph.input.onTap.add(function() {game.jump();});
	this.cast_jump = function() {
		game.me.cast_jump();
	}
	
	this.keybind = {
		// "jump" : "Space"
	}
	this.bindkey = {
		"jump": "Space"
	};
	this.keybind = {
		"Space": function() {THIS.cast_jump();}
	};
	var keydown = function(e) {
		//console.log(e);
		if (e.code == THIS.bindkey["jump"]) {
			game.me.cast_jump();
		}
	}
	var keyup = function(e) {
		if (e.code == THIS.bindkey["jump"]) {
			game.me.cast_nojump();
		}
	}
	this.load = function(map_data) {
		
	}
	this.init = function() {
		window.addEventListener("keydown", keydown);
		window.addEventListener("keyup", keyup);
	}
	this.shutdown = function() {
		window.removeEventListener("keydown", keydown);
		window.removeEventListener("keyup", keyup);
	}
}