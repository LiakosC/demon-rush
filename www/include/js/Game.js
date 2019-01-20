var Game = function(app) { //phaser_game, htmlbox_div) {
	var THIS = this;
	
	this.app = app;
	this.ph = app.ph;
	this.box = app.win.element.querySelector("#htmlBox");
	
	this.world_width = function() {return this.ph.world.width;}
	this.world_height = function() {return this.ph.world.height;}
	
	
	this.upLimit = null;
	this.downLimit = null;
	this.createLimits = function() {
		var group = this.layer_limits;
		this.upLimit = new Wall(this);
		this.upLimit.set(0, 0, this.world_width(), 20);
		group.add(this.upLimit.tileSprite);
		this.downLimit = new Wall(this);
		this.downLimit.set(0, this.world_height()-20, this.world_width(), 20);
		group.add(this.downLimit.tileSprite);
	}
	this.destroyLimits = function() {
		if (this.upLimit) {this.upLimit.destroy(); this.upLimit = null;}
		if (this.downLimit) {this.downLimit.destroy(); this.downLimit = null;}
	}
	
	this.removeFirstOutBarricade = function() {
		//game.barricades[0].tile.destroy(); // this crashes the game. dont know why
		this.walls[0].destroy();
		this.walls.splice(0, 1);
	}
	
	this.generateWall = function() {
		var y;
		var width = 50;
		var kg = this.ph.rnd.integerInRange(1, 2);
		var h = this.ph.rnd.integerInRange(210, 360);
		if (kg == 1) {y = 0;} else {y = this.world_height() - h;}
		if (this.walls.length == 0) {
			var x = g2.rndInt(180, 240); //this.ph.rnd.integerInRange(200, 250);
		} else {
			var x = this.walls[this.walls.length-1].x;	
		}
		x = x + g2.rndInt(260, 300); //this.ph.rnd.integerInRange(260, 300);
		
		var wall = new Wall(this);
		wall.set(x, y, width, h);
		this.layer_walls.add(wall.tileSprite);
		this.walls.push(wall);
		wall.velocityX = -VELOCITY;
	}
	
	this.init = function() {
		this.input = new GameInputer(this);
		this.input.init();
		
		this.units = new ArrayGroup();
		this.walls = []; //new ArrayGroup();
		this.me = null;
		
		// phaser groups are used as layers
		this.layer_walls = this.ph.add.group();
		this.layer_limits = this.ph.add.group();
		this.layer_hero = this.ph.add.group();
		
		// ------------------------------------------------------------ //
		
		
		this.createLimits();
		this.me = new UnitHero(this);
		this.layer_hero.add(this.me.model.getSprite());
		this.me.moveToXY(100, 250);
		
		this.gui = new GUI(this);
		this.gui.distance_set(100);
	}
	
	this.cast_fullscreen = function() {
		this.app.win.fullscreen();
	}
	
	this.shutdown = function() {
		for (var i=0; i<this.walls.length; i++) {
			this.walls[i].destroy();
		} this.walls = [];
		this.gui.shutdown(); this.gui = null;
		if (this.me) this.me.remove(); this.me = null;
		this.layer_walls.destroy();
		this.layer_limits.destroy();
		this.layer_hero.destroy();
		this.destroyLimits();
		this.input.shutdown();
		this.input = null;
		var unit;
		while (unit = this.units.forEach()) {
			this.unit.destroy();
		} this.units = null;
	}
	
	this.hero_on_wall = function() {
		this.defeat();
	}
	
	this.update = function(ms) {
		$(this.ph.canvas).css({width:"100%", height:"100%"});
		var s = ms / 1000;
		this.me.update(ms);
		var d = VELOCITY * s;
		this.gui.distance_set(this.gui.distance + d);
		
		for (var i=0; i<this.walls.length; i++) {
			this.walls[i].update(ms);
		}
		
		if (g2.rectOverRect(this.me.g2Rect(), this.upLimit.g2Rect())) {
			this.hero_on_wall();
		}
		if (g2.rectOverRect(this.me.g2Rect(), this.downLimit.g2Rect())) {
			this.hero_on_wall();
		}
		if (this.walls.length < 4) {
			this.generateWall();
		}
		if (this.walls[0].x < -100) {
			this.removeFirstOutBarricade();
		}
		
		for (var i=0; i<this.walls.length; i++) {
			if (g2.rectOverRect(this.me.g2Rect(), this.walls[i].g2Rect())) {
				this.hero_on_wall();
			}
		}
		//console.log(this.walls.length);
	}
	this.defeat = function() {
		//console.log("defeat");
		this.shutdown();
		this.init();
	}
}