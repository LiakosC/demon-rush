var Model = function(phaser) {
	var ph = phaser;
	var sprite = ph.add.sprite(null, 0, 0);
	sprite.anchor.setTo(0.5, 0.5);
	this.loadTexture = function(path) {
		sprite.loadTexture(path);
	}
	this.getSprite = function() {
		return sprite;
	}
	this.xy = function(x, y) {
		sprite.x = x;
		sprite.y = y;
	}
	
	this.destroy = function() {
		sprite.destroy();
	}
}