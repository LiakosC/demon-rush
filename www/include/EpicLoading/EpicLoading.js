/*
var loading = new EpicLoading($("#window")[0]);
loading.setProgress(0.5);
loading.setProgress(loading.progress + 0.1);
if (loading.progress == 1) {
	
}
*/



var EpicLoading = function(parentNode) {
	var THIS = this;
	
	var TITLE = "Application";
	var SUBTITLE = "LiakosC";
	var OVERBAR = "Loading...";
	var UNDERBAR = "The nightmare begins...";
	
	this.domElement = null;
	
	this._dom = function() { // virtual
		this.domElement = $("<div>").addClass("EpicLoading").html('\
			<div class="title">' + TITLE + '</div>\
			<div class="subtitle">' + SUBTITLE + '</div>\
			<div class="overbar">' + OVERBAR + '</div>\
			<div class="bar">\
				<div style="width:0%;"></div>\
			</div>\
			<div class="underbar">' + UNDERBAR + '</div>\
		')[0];
	}
	
	this._dom();
	
	this._finish = function() {
		this.overbar.innerHTML = "Press any key to continue..";
		this.overbar.classList.add("animate");
		this.underbar.innerHTML = "Loading Complete!";
	}
	
	this.title = this.domElement.querySelector(".title");
	this.subtitle = this.domElement.querySelector(".subtitle");
	this.overbar = this.domElement.querySelector(".overbar");
	this.bar = this.domElement.querySelector(".bar");
	this.progressBar = this.domElement.querySelector(".bar > div");
	this.underbar = this.domElement.querySelector(".underbar");
	
	this.progress = 0;
	this.setProgress = function(coef /*0-1*/) {
		if (coef < 0) {coef = 0;} else if (coef > 1) {coef = 1;}
		this.progress = coef;
		this.progressBar.style.width = (coef * 100) + "%";
		if (coef == 1) {
			this.domElement.classList.add("finished");
			this._finish();
		}
	};
	
	parentNode.appendChild(this.domElement);
	
	this.destroy = function() {
		this.domElement.parentNode.removeChild(this.domElement);
	}
};

if (typeof module != 'undefined') module.exports = EpicLoading;
