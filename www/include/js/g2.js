/*
25/2/2018

b
*/

var g2 = {};

g2.NONE 	= 0;
g2.POINT 	= 1;
g2.CIRCLE 	= 2;
g2.RECT 	= 3;
g2.LINE 	= 4;
g2.SEMILINE	= 5;
g2.VLINE	= 6;
g2.HLINE 	= 7;
g2.VECTOR 	= 8;

g2.Geometry = function() {
	return {type: g2.NONE};
}

g2.SQR2 = 1.41;

g2.Point = function(x, y) {
	var point = g2.Geometry();
	point.type = g2.POINT;
	point.x = x;
	point.y = y;
	return point;
}
g2.P = function(x, y) {return g2.Point(x, y);}
g2.Circle = function(p, r) {
	var circle = g2.Geometry();
	circle.type = g2.CIRLCE;
	circle.x = p.x;
	circle.y = p.y;
	circle.r = r;
	circle.d = 2 * r;
	circle.c = function() {return g2.P(circle.x, circle.y);}
	circle.outsideRect = function() {return g2.Rect_CS(circle.c(), circle.d, circle.d);}
	return circle;
}
g2.Rect = function(x, y, width, height) {
	var rect = g2.Geometry();
	rect.type = g2.RECT;
	rect.x = x;
	rect.y = y;
	rect.w = width;
	rect.h = height;
	rect.left = rect.x;
	rect.top = rect.y;
	rect.right = rect.x + rect.w;
	rect.bot = rect.y + rect.h;
	return rect;
}
g2.Rect_CS = function(center, w, h) {
	var rect = g2.Geometry();
	rect.type = g2.RECT;
	rect.x = center.x - w/2;
	rect.y = center.y - h/2;
	rect.w = w;
	rect.h = h;
	rect.left = rect.x;
	rect.top = rect.y;
	rect.right = rect.x + rect.w;
	rect.bot = rect.y + rect.h;
	return rect;
}
g2.Line = function(p, angle) {return {x: p.x, y: p.y, angle: angle};}
g2.Semiline = function(p, angle) {return {x: p.x, y: p.y, angle: angle};}


g2.pointsAngle = function(p1, p2) {return Math.atan2(p2.y - p1.y, p2.x - p1.x);}
g2.angle_02PI = function(angle) {
	var angle = angle % 2*Math.PI;
	if (angle < 0) angle += 2*Math.PI;
	return angle;
};
g2.pointsDistance = function(p1, p2) {return Math.sqrt((p2.y-p1.y)*(p2.y-p1.y) + (p2.x-p1.x)*(p2.x-p1.x));}
g2.angleBetweenAngles = function(angle1, angle2) {
	//var angle1 = g2.angle_02PI(angle1);
	//var angle2 = g2.angle_02PI(angle2);
	var dAngle = angle2 - angle1;
	var absDAngle = Math.abs(angle2 - angle1);
	
	
	return dAngle;
};






g2.Vector = function(dx, dy) {
	var vector = {x1: 0, y1: 0, x2: dx, y2: dy};
	vector.p1 = function() {return g2.P(vector.x1, vector.y1);}
	vector.p2 = function() {return g2.P(vector.x2, vector.y2);}
	vector.dx = function() {return vector.p2().x - vector.p1().x;}
	vector.dy = function() {return vector.p2().y - vector.p1().y;}
	vector.angle = g2.pointsAngle(vector.p1(), vector.p2());
	vector.size = g2.pointsDistance(vector.p1(), vector.p2());
	return vector;
}
g2.Vector_PP = function(p1, p2) {
	var vector = g2.Vector();
	vector.x1 = p1.x;
	vector.y1 = p1.y;
	vector.x2 = p2.x;
	vector.y2 = p2.y;
	vector.angle = g2.pointsAngle(vector.p1(), vector.p2());
	vector.size = g2.pointsDistance(vector.p1(), vector.p2());
	return vector;
}
g2.Vector_AS = function(angle, size) {
	var vector = g2.Vector();
	vector.x1 = 0;
	vector.y1 = 0;
	vector.x2 = size * Math.cos(angle);
	vector.y2 = size * Math.sin(angle);
	vector.angle = angle;
	vector.size = size;
	return vector;
}
g2.Vector_PAS = function(point, angle, size) {
	var vector = g2.Vector();
	vector.x1 = point.x;
	vector.y1 = point.y;
	vector.x2 = point.x + size * Math.cos(angle);
	vector.y2 = point.y + size * Math.sin(angle);
	vector.angle = angle;
	vector.size = size;
	return vector;
}









g2.accuracy = 6;
g2.equality = function(a, b) {
	var result = a - b;
	var small = 1 / g2.accuracy * 10;
	if (result < 0) {result = -result;}
	if (result < small) {return true;} else {return false;}
}
g2.pointsEquality = function(p1, p2) {
	if (g2.equality(p1.x, p2.x) && g2.equality(p1.y, p2.y)) {return true;} else {return false;}
}









g2.lineBetweenPoints = function(line, p1, p2) {
	var angle1 = g2.pointsAngle(g2.P(line.x, line.y), p1);
	var angle2 = g2.pointsAngle(g2.P(line.x, line.y), p2);
	if (
		(angle1 < line.angle && angle2 > line.angle)
		||
		(angle1 > line.angle && angle2 < line.angle)
	) {return true;} else {return false;}
}
g2.lineOverRect = function(line, rect) {
	var point1 = g2.P(rect.x, rect.y);
	var point2 = g2.P(rect.x + rect.w, rect.y);
	if (g2.lineBetweenPoints(line, point1, point2)) {return true;}
	point1 = point2;
	point2 = g2.P(rect.x + rect.w, rect.y + rect.h);
	if (g2.lineBetweenPoints(line, point1, point2)) {return true;}
	point1 = point2;
	point2 = g2.P(rect.x, rect.y + rect.h);
	if (g2.lineBetweenPoints(line, point1, point2)) {return true;}
	point1 = point2;
	point2 = g2.P(rect.x, rect.y);
	if (g2.lineBetweenPoints(line, point1, point2)) {return true;}
	return false;
}

g2.pointOverPoint = function(p1, p2) {return g2.pointsEquality(p1, p2);}
g2.pointOverCircle = function(p, circle) {
	if (Math.abs(p.x - circle.x) < circle.r && Math.abs(p.y - circle.y) < circle.r) {
		if (g2.pointsDistance(p, circle.c()) < circle.r) {
			return true;
		} else {return false;}
	} else {return false;}
}
g2.pointOverRect = function(p, rect) {
	if (rect.left < p.x && rect.right > p.x && rect.top < p.y && rect.bot > p.y) {return true;} else {return false;}
}

g2.circleOverCircle = function(c1, c2) {
	var R = c1.r + c2.r;
	if (Math.abs(c1.x-c2.x) < R && Math.abs(c1.y-c2.y) < R) {
		if (g2.pointsDistance(c1.c(), c2.c()) < R) {
			return true;
		} else {return false;}
	} else {return false;}
}
g2.circleOverRect = function(circle, rect) {
	var closestRectX = (circle.x < rect.left ? rect.left : (circle.x > rect.right ? rect.right : circle.x));
	var closestRectY = (circle.y < rect.top ? rect.top : (circle.y > rect.bot ? rect.bot : circle.y));
	return (g2.pointsDistance(g2.P(closestRectX, closestRectY), circle.c()) < circle.r);
}
g2.rectOverRect = function(r1, r2) {
  return !(r2.x > r1.right || r2.right < r1.x || r2.y > r1.bot ||r2.bot < r1.y);
}
g2.rectOverHline = function(rect, linePoint) {
	if (rect.top < linePoint.y && rect.bot > linePoint.y) {return true;} else {return false;}
}
g2.rectOverVline = function(rect, linePoint) {
	if (rect.left < linePoint.x && rect.right > linePoint.x) {return true;} else {return false;}
}









g2.copy = function(obj) {
	var new_obj = {}; 
	for (var key in obj) {
		new_obj[key] = obj[key];
	} return new_obj;
}
g2.movePoint = function(point, vector) {
	var dx = vector.p2().x - vector.p1().x;
	var dy = vector.p2().y - vector.p1().y;
	point.x += dx;
	point.y += dy;
}
g2.moveRect = function(rect, vector) {
	var dx = vector.dx();
	var dy = vector.dy();
	rect.x += dx;
	rect.y += dy;
	rect.top += dy;
	rect.right += dx;
	rect. bot += dy;
	rect. left += dx;
}









g2.rndInt = function(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
g2.rndReal = function(min, max) {return Math.random() * (max - min) + min;}
g2.rndCirclePoint = function(circle) {
	var rndAngle = g2.rndReal(0, 2*Math.PI);
	var rndR = g2.rndReal(0, circle.r);
	var vector = g2.Vector_AS(rndAngle, rndR);
	return g2.Point(circle.x + vector.dx(), circle.y + vector.dy());
};



if (typeof module != 'undefined') {
	module.exports = g2;
}