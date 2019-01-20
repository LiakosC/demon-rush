var Unit = function(game) {
	this.game = game;
	this.model = new Model(game.ph);
	this.graphics = game.ph.add.graphics(0,0);
	
	this.x = 0;
	this.y = 0;
	this.g2Center = function() {return g2.P(this.x, this.y);}
	this.moveToXY = function(x, y) {
		this.x = x;
		this.y = y;
		this.model.xy(x, y);
	}
	this.jump = function() {
		this.velocityY = -HERO_JUMP_VELOCITY;
	}
	
	this.velocityY = -500;
	
	this.alive = true;
	this.die = function() {
		this.alive = false;
	}
	
	this.update = function(ms) {
		var s = ms / 1000;
		this.velocityY += GRAVITY * s;
		var dy = this.velocityY * s;
		this.moveToXY(this.x, this.y + dy);
		if (HIGHLIGHT)
			this.highlight();
	}
	this.remove = function() {
		this.graphics.destroy();
		this.model.destroy();
	}
}

var UnitHero = function(game) {
	Unit.call(this, game);
	this.model.loadTexture("demonhunter");
	this.w = HERO_WIDTH;
	this.h = HERO_HEIGHT;
	this.g2Rect = function() {
		return g2.Rect_CS(this.g2Center(), this.w, this.h);
	}
	this.die = function() {
		game.defeat();
	}
	
	var cast_jump_btnReleased = true;
	this.cast_jump = function() {
		if (cast_jump_btnReleased) {
			cast_jump_btnReleased = false;
			this.jump();
		}
	}
	this.cast_nojump = function() {
		cast_jump_btnReleased = true;
	}
	
	this.highlight = function() {
		this.graphics.clear();
		this.graphics.lineStyle(2, 0x0000FF, 1);
		var rect = this.g2Rect();
		this.graphics.drawRect(rect.left, rect.top, rect.w, rect.h);
	}
}
UnitHero.prototype = Object.create(Unit.prototype);
UnitHero.prototype.constructor = UnitHero;