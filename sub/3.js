let img;
let dropZone;

function setup() {
  let canvasHeight = windowHeight * 0.75;
  canvas = createCanvas(canvasHeight * 0.66 + 75, canvasHeight + 75);

  canvas.style("display", "none");

  dropZone = select("#dropzone");
  dropZone.dragOver(highlight);
  dropZone.dragLeave(unhighlight);
  dropZone.drop(gotFile, unhighlight);

  canvas.mousePressed(reload);
}

function highlight() {
  dropZone.style("background-color", "grey");
  let body = select("#body");
  body.style("background-color", "grey");
}
function unhighlight() {
  dropZone.style("background-color", "black");
  let body = select("#body");
  body.style("background-color", "black");
}

function gotFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data, imageLoaded);
  } else {
    console.log("unsupported file type");
  }
  dropZone.style("display", "none");
  show();
}

function imageLoaded() {
  let scaledWidth, scaledHeight;
  let canvasHeight = windowHeight * 0.75;

  let imgRatio = img.width / img.height;

  if (imgRatio > 1) {
    scaledWidth = width;
    scaledHeight = width / imgRatio;
  } else {
    scaledWidth = canvasHeight * imgRatio;
    scaledHeight = canvasHeight;
  }

  img.resize(scaledWidth, scaledHeight);
}

function draw() {
  background(0);

  if (img) {
    let posX = (width - img.width) / 2;
    let posY = height * 0.1 + (height * 0.8 - img.height) / 2;

    for (let col = 0; col < img.width; col += 7.5) {
      for (let row = 0; row < img.height; row += 7.5) {
        let pixel = img.get(col, row);
        stroke(color(pixel));
        strokeWeight(7.5);
        point(col + posX, row + posY);
      }
    }

    filter(GRAY);
  }
}

function show() {
  canvas.style("display", "block");
  let box = document.getElementById("box");
  box.style("display", "block");
  let print = document.getElementById("print");
  print.style("display", "block");
  let body = document.getElementById("body");
  body.style("border", "solid 1.25px white");
  body.style("box-shadow", "0 0 7.5px 0 white inset, 0 0 7.5px 0 white");
}

function reload() {
  window.location.reload();
}

function downloadPoster() {
  save(canvas, "poster.png");
}
