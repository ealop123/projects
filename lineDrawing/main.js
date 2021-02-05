class Circle {
  constructor(x, y, radius = 2) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.persist = [];
    this.color = "lightblue";
  }
  draw() {
    this.persist.forEach(e => {
      c.beginPath();
      c.arc(e.x, e.y, e.radius, 0, Math.PI * 2, false);
      c.fillStyle = e.color;
      c.fill();
    });
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const colors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#ffc6ff",
  "#bdb2ff"
]

var c = null;
var canvas = null;
const main = function () {
  canvas = document.querySelector("canvas");
  c = canvas.getContext("2d");
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  window.addEventListener("mousemove", function(e){
    myCursor.x = event.x;
    myCursor.y = event.y;
    if (e.buttons == 1) {
      myCursor.persist.push({x: myCursor.x, y: myCursor.y, radius: myCursor.radius, color: myCursor.color});
    }
  });
  window.addEventListener("wheel", function(e){
    const amountToChange = -1 * e.deltaY / 25;
    if (myCursor.radius + amountToChange < 1 || myCursor.radius + amountToChange > 50) return;
    myCursor.radius += amountToChange;
  });
  window.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    myCursor.color = colors[Math.floor(Math.random()*colors.length)]
  });
  putCursorOnCanvas();
  // makeCanvasDrawable();
}

function sizeCanvas() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

const myCursor = new Circle(0, 0, 10);
function putCursorOnCanvas() {
  requestAnimationFrame(putCursorOnCanvas);
  c.clearRect(0, 0, innerWidth, innerHeight);
  myCursor.draw();
}

function makeCanvasDrawable() {

}


window.onload = main;
