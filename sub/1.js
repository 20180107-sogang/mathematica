let num = 200;
let radius;
let X = [];
let Y = [];
let step;

function setup() {
  let canvasHeight = windowHeight * 0.75;
  step = TWO_PI / num;
  radius = (canvasHeight * 0.66) / 2;
  canvas = createCanvas(canvasHeight * 0.66 + 75, canvasHeight + 75);
  background(0);
  for (let i = 0; i < num; i++) {
    X.push(cos(step * i) * radius);
    Y.push(sin(step * i) * radius);
  }
  noLoop();
  canvas.mouseClicked(regenerate);
}

function draw() {
  translate(width / 2, height / 2);

  for (let i = 0; i < num; i++) {}

  beginShape();
  for (let i = 0; i < num; i += 1) {
    strokeWeight(0.5);
    stroke(255);
    noFill();

    let rI1 = round(random(0, num));
    vertex(X[rI1], Y[rI1]);

    push();
    fill(255);
    pop();
  }
  endShape();
}

function regenerate() {
  background(0);
  X = [];
  Y = [];
  for (let i = 0; i < num; i++) {
    X.push(cos(step * i) * radius);
    Y.push(sin(step * i) * radius);
  }
  redraw();
}

function downloadPoster() {
  save(canvas, "poster.png");
}
