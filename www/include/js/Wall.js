var Wall = function(game) {
	this.game = game;
	this.tileSprite = null;
	this.graphics = game.ph.add.graphics();
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.set = function(x, y, w, h) {
		this.x = x; this.y = y; this.w = w; this.h = h;
		this.tileSprite = game.ph.add.tileSprite(x, y, w, h, "barricade");
	}
	this.g2Rect = function() {
		return g2.Rect(this.x, this.y, this.w, this.h);
	}
	this.highlight = function() {
		this.graphics.clear();
		this.graphics.lineStyle(2, 0x0000FF, 1);
		var rect = this.g2Rect();
		this.graphics.drawRect(rect.left, rect.top, rect.w, rect.h);
	}
	this.destroy = function() {
		this.graphics.destroy();
		this.tileSprite.destroy();
	}
	
	this.velocityX = 0;
	
	this.update = function(ms) {
		var s = ms / 1000;
		this.x += this.velocityX * s;
		this.tileSprite.x = this.x;
		if (HIGHLIGHT)
			this.highlight();
	}
}