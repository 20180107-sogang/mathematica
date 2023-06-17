let lines = [];
let rotateLines = false;
let lineNum = 1000;
let lineLength = 40;
let lineThickness = 0.25;

function setup() {
  let canvasHeight = windowHeight * 0.75;
  canvas = createCanvas(canvasHeight * 0.66 + 75, canvasHeight + 75);
  generateLines();
}

function generateLines() {
  const gridHeight = windowHeight * 0.75;
  const gridWidth = gridHeight * 0.66;
  const startX = 37.5;
  const startY = 37.5;

  for (let i = 0; i < lineNum; i++) {
    let x = startX + random(0, gridWidth);
    let y = startY + random(0, gridHeight);
    let angle = 0;
    lines.push({ x, y, angle, lineLength, lineThickness });
  }
}

function draw() {
  background(0);
  stroke(255);

  for (let i = 0; i < lines.length; i++) {
    let lineObj = lines[i];

    push();
    translate(lineObj.x, lineObj.y);
    rotate(lineObj.angle);
    translate(-lineObj.lineLength / 2, 0);

    let maxThickness = 1.75;
    let minThickness = 0.25;

    for (let t = 0; t < lineObj.lineLength; t++) {
      let changeThickness = map(
        t,
        0,
        lineObj.lineLength - 1,
        maxThickness,
        minThickness
      );
      strokeWeight(changeThickness);
      line(t, 0, t + 1, 0);
    }

    pop();

    if (rotateLines) {
      let targetAngle = atan2(mouseY - lineObj.y, mouseX - lineObj.x);
      lineObj.angle = lerpAngle(lineObj.angle, targetAngle, 0.025);
    }
  }
}

function lerpAngle(startAngle, endAngle, amount) {
  let shortestAngle =
    ((((endAngle - startAngle) % (PI * 2)) + PI * 3) % (PI * 2)) - PI;
  return startAngle + shortestAngle * amount;
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    rotateLines = !rotateLines;
  }
}

function regenerate() {
  window.location.reload();
}

function downloadPoster() {
  save(canvas, "poster.png");
}
