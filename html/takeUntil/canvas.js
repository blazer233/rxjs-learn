const canvas = document.querySelector(".my-canvas");
const ctx = canvas.getContext("2d");

let infiniteX = Infinity;
let infiniteY = Infinity;
let colorHue = 0;

function initialize() {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 70;
}

initialize();

export function paint({ clientX, clientY }) {
  ctx.strokeStyle = `hsl(${colorHue}, 100%, 60%)`;
  ctx.beginPath();
  if (
    Math.abs(infiniteX - clientX) < 100 &&
    Math.abs(infiniteY - clientY) < 100
  ) {
    ctx.moveTo(infiniteX, infiniteY);
  }
  ctx.lineTo(clientX, clientY);
  ctx.stroke();
  infiniteX = clientX;
  infiniteY = clientY;
  colorHue++;
}
