let total = 50;
let multiplier = 0;
let rate = 0.0025;
let radius;
let isPaused = false;

function setup() {
  let canvasHeight = windowHeight * 0.75;
  canvas = createCanvas(canvasHeight * 0.66 + 75, canvasHeight + 75);
  frameRate(30);
  background(0);
  radius = min(width, height) / 2 - 20;

  canvas.mousePressed(toggle);
}

function draw() {
  if (!isPaused) {
    translate(width / 2, height / 2);
    background(0);
    noFill();
    stroke(255);
    strokeWeight(0.75);
    for (let i = 0; i <= total; i++) {
      beginShape();
      connectTo(i);
      connectTo(i * multiplier);
      endShape();
    }
    multiplier += rate;
  }
}

function connectTo(number) {
  let interval = TWO_PI / total;
  let angle = interval * number;
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;
  vertex(x, y);
}

function toggle() {
  isPaused = !isPaused;
}

function regenerate() {
  window.location.reload();
}

function downloadPoster() {
  save(canvas, "poster.png");
}
