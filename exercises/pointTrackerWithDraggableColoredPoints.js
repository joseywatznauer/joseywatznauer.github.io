/*******************************************************
* pointTrackerWithColoredPoints.js
*
* Displays colored points where the user clicks,
* allows dragging of points, and updates coordinates.
*******************************************************/

class Point {
  static #count = 0;
  static #colorIndex = 0;

  #x;
  #y;
  #color;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;

    const colors = ["red", "green", "blue"];
    this.#color = colors[Point.#colorIndex];
    Point.#colorIndex = (Point.#colorIndex + 1) % 3;

    if (Point.#count < 2) {
      Point.#count++;
    }
  } // end constructor

  value() {
    return "(" + this.#x + ", " + this.#y + ")";
  } // end value

  getX() { return this.#x; } // end getX
  getY() { return this.#y; } //end getY
  getColor() { return this.#color; } //end getColor

  setLocation(x, y) {
    this.#x = x;
    this.#y = y;
  } //end setLocation

  static getCount() {
    return Point.#count;
  } //end getCount

  static distance(pt1, pt2) {
    if (Point.#count < 2) return null;

    const xDist = pt1.#x - pt2.#x;
    const yDist = pt1.#y - pt2.#y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  } //end distance
} //end class Point

//***************************************************

let point1 = null;
let point2 = null;

//***************************************************

function drawPoint(point, elementId) {
  const el = document.getElementById(elementId);

  el.style.left = point.getX() + "px";
  el.style.top = point.getY() + "px";
  el.style.backgroundColor = point.getColor();
  el.style.border = "1px solid black";
  el.style.borderRadius = "50%";
  el.style.position = "absolute";
} //end drawPoint

//***************************************************

function captureClick(e) {
  // Prevent clicks on points from creating new points
  if (e.target.id === "pt1Graphic" || e.target.id === "pt2Graphic") {
    return;
  }

  if (Point.getCount() === 0) {
    point1 = new Point(e.clientX, e.clientY);
    document.getElementById("pt1Location").innerHTML = point1.value();
    drawPoint(point1, "pt1Graphic");
  }
  else if (Point.getCount() === 1) {
    point2 = new Point(e.clientX, e.clientY);
    document.getElementById("pt2Location").innerHTML = point2.value();
    drawPoint(point2, "pt2Graphic");
  }
  else {
    point1 = point2;
    point2 = new Point(e.clientX, e.clientY);

    document.getElementById("pt1Location").innerHTML = point1.value();
    document.getElementById("pt2Location").innerHTML = point2.value();

    drawPoint(point1, "pt1Graphic");
    drawPoint(point2, "pt2Graphic");
  }
} //end captureClick

//***************************************************

function dragPoint(e) {
  e.preventDefault();
  e.stopPropagation();

  if (e.clientX === 0 && e.clientY === 0) {
    return;
  }

  const id = e.target.id;
  const x = e.clientX;
  const y = e.clientY;

  if (id === "pt1Graphic" && point1) {
    point1.setLocation(x, y);
    document.getElementById("pt1Location").innerHTML = point1.value();
    drawPoint(point1, "pt1Graphic");
  }
  else if (id === "pt2Graphic" && point2) {
    point2.setLocation(x, y);
    document.getElementById("pt2Location").innerHTML = point2.value();
    drawPoint(point2, "pt2Graphic");
  }
} //end dragPoint

//***************************************************

function displayDistance(e) {
  e.stopPropagation();

  const distance = Point.distance(point1, point2);
  let message;

  if (distance === null) {
    message = "To calculate a distance, you must first create two points!";
  } else {
    message = "The two points are " + distance.toFixed(1) + " pixels apart.";
  }

  document.getElementById("message").innerHTML = message;
} //end displayDistance