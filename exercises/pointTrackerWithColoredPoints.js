/*******************************************************
* pointTrackerWithColoredPoints.js
*
* This code displays colored points where the user clicks and
* tracks the two most recent points.
*******************************************************/

class Point {
  static #count = 0;      // Initiated to zero, as seen in #3
  static #colorIndex = 0; // Will be used to cycle through colors

  #x;
  #y;
  #color;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;

    const colors = ["red", "green", "blue"];
    this.#color = colors[Point.#colorIndex];
    Point.#colorIndex = (Point.#colorIndex + 1) % 3; // Using mod keeps the index as 0,1, or 2

    // Update count (max 2 becasue of mod)
    if (Point.#count < 2) {
      Point.#count++;
    }
  }

  value() {
    return "(" + this.#x + ", " + this.#y + ")";
  }

  getX() { return this.#x; }
  getY() { return this.#y; }
  getColor() { return this.#color; }

  static getCount() {
    return Point.#count;
  }

  static distance(pt1, pt2) {
    if (Point.#count < 2) return null;

    const xDist = pt1.#x - pt2.#x;
    const yDist = pt1.#y - pt2.#y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
}

//***************************************************

let point1 = null;
let point2 = null;

//***************************************************

function drawPoint(point, elementId) {
  const whicheverPoint = document.getElementById(elementId);

  whicheverPoint.style.left = point.getX() + "px"; // Puts the point where the user selected
  whicheverPoint.style.top = point.getY() + "px";
  whicheverPoint.style.backgroundColor = point.getColor(); // Cycles through the colors
  whicheverPoint.style.border = "1px solid black";
  whicheverPoint.style.borderRadius = "50%"; // Makes it a circle
}

//***************************************************

function captureClick(e) {
  if (Point.getCount() === 0) {
    point1 = new Point(e.clientX, e.clientY);
    document.getElementById("pt1Location").innerHTML = point1.value();
    drawPoint(point1, "pt1Graphic"); //draws the point each time the user clicks
  }
  else if (Point.getCount() === 1) {
    point2 = new Point(e.clientX, e.clientY);
    document.getElementById("pt2Location").innerHTML = point2.value();
    drawPoint(point2, "pt2Graphic");
  }
  else {
    // Shift points
    point1 = point2;
    point2 = new Point(e.clientX, e.clientY);

    document.getElementById("pt1Location").innerHTML = point1.value();
    document.getElementById("pt2Location").innerHTML = point2.value();

    drawPoint(point1, "pt1Graphic");
    drawPoint(point2, "pt2Graphic");
  }
}

//***************************************************

function displayDistance(e) {
  e.stopPropagation(); // prevent click from creating a point

  const distance = Point.distance(point1, point2);
  let message;

  if (distance === null) {
    message = "To calculate a distance, you must first create two points!";
  } else {
    message = "The two points are " + distance.toFixed(1) + " pixels apart.";
  }

  document.getElementById("message").innerHTML = message;
}
