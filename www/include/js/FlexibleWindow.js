/*

1/12/17

var win = new FlexibleWindow(element-or-null, width, height);
all elements inside win.element should have % size / coords if you want them to be scaled up
put phaser canvas inside win.element or another child, and it will be automatically scaled/modified by phaser engine

win.element : the div element

win.fullscreen(); //toggle
win.fullscreen(true); // on
win.fullscreen(false); // off

win.mouseX, win.mouseY | read only. It's the same whatever the scale.

win.xtocX() // px to % on x axis
win.xtocY() // px to % on y axis
win.ctoxY() // % to px on x axis
win.ctoxY() // % to px on y axis


EXAMPLE

var nwgui = (typeof require !== 'undefined') ? require("nw.gui") : null;

if (nwgui != null) { // html nwgui
	document.body.style.margin = "0px";
	document.body.style.backgroundColor = "black";
	win.resizeNWWindow(win.width, win.height);
} else { // html browser
	document.body.style.backgroundColor = "white";
}

var win = new FlexibleWindow(null, 700, 300);
win.element.style.backgroundColor = "grey";
win.element.style.userSelect = "none";

window.addEventListener("keydown", function(e) {
	console.log(e);
	if (e.key == "F10") {
		win.fullscreen();
	}
});
*/
var FlexibleWindow = function(divElement, width, height) {
	var THIS = this;
	
	
	
	this.width = width;
	this.height = height;
	this.ratio = width / height;
	this.scale = 1; // read only. .setScale(num) changes this
	
	if (divElement != null) {
		this.element = divElement;
	} else {
		this.element = document.createElement("div");
		document.body.appendChild(this.element);
	}
	this.element.style.position = "absolute";
	this.element.style.overflow = "hidden";
	this.element.style.left = "0px";
	this.element.style.top = "0px";
	this.element.style.right = "0px";
	this.element.style.bottom = "0px";
	this.element.style.margin = "auto";
	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
	this.getCurrentWidth = function() {return Number(this.element.style.width.split("px")[0]);}
	this.getCurrentHeight = function() {return Number(this.element.style.height.split("px")[0]);}
	
	
	
	this.mouseX = 0;
	this.mouseY = 0;
	window.addEventListener("mousemove", function(e) {
		THIS.mouseX = (e.clientX - THIS.element.offsetLeft) / THIS.scale;
		if (THIS.mouseX < 0) THIS.mouseX = 0; else if (THIS.mouseX > THIS.width) THIS.mouseX = THIS.width;
		THIS.mouseY = (e.clientY - THIS.element.offsetTop) / THIS.scale;
		if (THIS.mouseY < 0) THIS.mouseY = 0; else if (THIS.mouseY > THIS.height) THIS.mouseY = THIS.height;
		//console.log(THIS.mouseX, THIS.mouseY);
	});
	
	
	
	this.setScale = function(scale) {
		//console.log("setting scale", scale);
		this.element.style.width =  this.width * scale + "px";
		this.element.style.height = this.height * scale + "px";
		this.element.style.fontSize = scale * 100 + "%";
		this.scale = scale;
	}
	//this.center = function() { no need. margin auto will do the work
	//	this.element.style.left = (window.innerWidth - this.getCurrentWidth())/2 + "px";
	//	this.element.style.top = (window.innerHeight - this.getCurrentHeight())/2 + "px";
	//}
	this.getMinScale = function() {
		//var windowRatio = window.innerWidth / window.innerHeight;
		var windowRatio = screen.width / screen.height;
		if (windowRatio > this.ratio) { // screen too much width
			return screen.height / this.height;
		} else { // screen too much height
			return screen.width / this.width;
		}
	}
	
	
	
	var FULLSCREEN_INTERVAL = 80;
	var fullscreenTarget = document.body;
	if (fullscreenTarget.webkitRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.webkitRequestFullScreen();}
		this.cancelFullScreen = function() {document.webkitCancelFullScreen();}
	} else if (fullscreenTarget.mozRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.mozRequestFullScreen();}
		this.cancelFullScreen = function() {document.mozCancelFullScreen();}
	} else {
		this.requestFullScreen = fullscreenTarget.requestFullScreen;
		this.cancelFullScreen = fullscreenTarget.cancelFullScreen;
	}
	this.isFullscreen = false;
	this.fullscreen = function(toggle) {
		if (toggle != undefined) {
			if (toggle) {
				this.requestFullScreen();
				this.isFullscreen = true;
			} else {
				this.cancelFullScreen();
				this.isFullscreen = false;
			}
			setTimeout(function() {
				if (THIS.isFullscreen) {
					THIS.setScale(THIS.getMinScale());
				} else {
					THIS.setScale(1);
				}
			}, FULLSCREEN_INTERVAL);
		} else { // toggle not set
			this.fullscreen(!this.isFullscreen);
		}
	}
	
	
	
	this.resizeNWWindow = function(width, height) {
		var nwgui = (typeof require !== 'undefined') ? require("nw.gui") : null;
		nwgui.Window.get().width = width;
		nwgui.Window.get().height = height;
		if (true) { // fix an error to nwgui until it's patched
			var error_dx = window.innerWidth - nwgui.Window.get().width;
			var error_dy = window.innerHeight - nwgui.Window.get().height;
		}
		nwgui.Window.get().width = width - parseInt(error_dx);
		nwgui.Window.get().height = height - parseInt(error_dy);
	}
	
	
	
	this.xtocX = function(px) {return px * 100 / THIS.width;};
	this.xtocY = function(px) {return px * 100 / THIS.height;};
	this.ctoxX = function(percent) {return parseInt(percent / 100 * THIS.width);};
	this.ctoxY = function(percent) {return parseInt(percent / 100 * THIS.height);};
}





