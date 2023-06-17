let angle = 5;
let radius;
let edge;

let progress = 0;

let isPaused = false;
let isFinished = false;

function setup() {
  let canvasHeight = windowHeight * 0.75;
  canvas = createCanvas(canvasHeight * 0.66 + 75, canvasHeight + 75);
  angleMode(DEGREES);
  radius = (canvasHeight * 0.66) / 2;
  edge = radius / sqrt(2);

  radiusSlider = createSlider(30, radius, radius);
  radiusSlider.class("slider");

  radiusSlider.input(updateRadius);

  canvas.mousePressed(canvasClicked);
}

function draw() {
  let canvasHeight = windowHeight * 0.75;
  background(0);
  noFill();
  stroke(255);
  translate((canvasHeight * 0.66 + 75) / 2, (canvasHeight + 75) / 2);

  updateRadius();

  let num = floor((360 / angle) * progress);

  if (!isPaused) {
    for (let i = 0; i < num; i++) {
      rotate(angle);
      rect(0, 0, edge);
    }

    if (progress < 1) {
      progress += 0.0025;
    } else {
      isFinished = true;
    }
  } else {
    for (let i = 0; i < num; i++) {
      rotate(angle);
      rect(0, 0, edge);
    }
  }
}

function updateRadius() {
  radius = radiusSlider.value();
  edge = radius / sqrt(2);
}

function canvasClicked() {
  if (isFinished) {
    regenerate();
  } else {
    toggle();
  }
}

function regenerate() {
  if (isPaused) {
    toggle();
  }
  progress = 0;
  isFinished = false;
}

function toggle() {
  isPaused = !isPaused;
}

function downloadPoster() {
  save(canvas, "poster.png");
}
