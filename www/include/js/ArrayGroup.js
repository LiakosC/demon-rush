/*
var ref = {};
while (unitsGroup.forEach(ref)) {
	var unit = ref.child;
}
*/

var ArrayGroup = function(/*Type T*/) {
	var children = [];
	
	this.clear = function() {
		while (children.length > 0) {
			children.pop();
		} // Fastest
	}
	this.count = function() {
		return children.length;
	};
	this.childExists = function(child) {
		for (var i=0; i<children.length; i++) {
			if (children[i] == child)
				return true;
		} return false;
	};
	this.addChild = function(child) {
		for (var i=0; i<children.length; i++) {
			if (child == children[i]) {
				children.splice(i, 1);
				break;
			}
		}
		children.push(child);
	};
	this.removeChild = function(child) {
		for (var i=0; i<children.length; i++) {
			if (child == children[i]) {
				children.splice(i, 1);
				break;
			}
		}
	};
	
	var forEach_i = 0;
	this.forEach = function(ref) {
		if (forEach_i == children.length) { // i  is too much
			forEach_i = 0;
			return null;
		} else {
			forEach_i++;
			return children[forEach_i];
		}
	};
};

