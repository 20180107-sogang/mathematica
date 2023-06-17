// scroll reveal
function checkForVisibility() {
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function (reveal) {
    if (isElementInViewport(reveal)) {
      reveal.classList.add("revealed");
    } else {
      reveal.classList.remove("revealed");
    }
  });
}
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
if (window.addEventListener) {
  addEventListener("DOMContentLoaded", checkForVisibility, false);
  addEventListener("load", checkForVisibility, false);
  addEventListener("scroll", checkForVisibility, false);
}

// line
function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = "white";
  context.lineWidth = 2.5;
  context.stroke();
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const width = 2048;
  const height = 2048;

  canvas.width = width;
  canvas.height = height;

  let lineCount = 0;

  function drawNextLine() {
    if (lineCount >= 18) {
      return;
    }

    // leftright & updown
    if (lineCount % 2 === 0) {
      const x1 = 0;
      const y1 = Math.random() * height;
      const x2 = width;
      const y2 = Math.random() * height;

      drawLine(context, x1, y1, x2, y2);
    } else {
      const x1 = Math.random() * width;
      const y1 = 0;
      const x2 = Math.random() * width;
      const y2 = height;

      drawLine(context, x1, y1, x2, y2);
    }

    lineCount++;

    setTimeout(drawNextLine, 1000);
  }

  drawNextLine();
});
