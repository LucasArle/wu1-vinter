/* Om du vill ändra snöfärgen */
const color = [200, 200, 255];
const changedColor = [200, 200, 255]
// const changedColor = [139, 207, 232]
// const changedColor = [255, 255, 191]
/* justera hur snabbt snön faller */
const speed = 200;

/* Ändra här nedanför på egen risk */


let mouseX = 0

let mouseY = 0

var mouseSX = 0
var mouseSY = 0

var preMouseX=0
var preMouseY=0
previousTimeStamp = 0


const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "bg");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const pi2 = 2 * Math.PI;

const bodyElement = document.querySelector("body");
bodyElement.appendChild(canvas);

let particles = [];

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.onscroll = () => {
  canvas.setAttribute("style", `top: ${window.scrollY}px`);
};

window.addEventListener("mousemove", (event) => {
  // console.log(event)
  mouseX = event.offsetX
  mouseY = event.offsetY

  mouseSX = mouseX - preMouseX
  mouseSY = mouseY - preMouseY
  preMouseX = mouseX
  preMouseY = mouseY

  // console.log(mouseSX,mouseSY)


})


const spawnParticles = (amount) => {
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(randomInt(0, canvas.width), 0, color));
  }
};

const step = (timeStamp) => {
  deltaTime = timeStamp-previousTimeStamp
  deltaTime = deltaTime / 1000
  // console.log(deltaTime)
  previousTimeStamp = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
    particle.update(mouseX,mouseY,changedColor,deltaTime,mouseSX,mouseSY);
  });

  particles = particles.filter((particle) => !particle.toDelete);

  if (true) {
    spawnParticles(100);
  }

  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);

/* Ladda in text från URL-parametrar */
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const message = params.get('message');
  return { title, message };
};

const { title, message } = getQueryParams();
console.log(`Title: ${title}, Message: ${message}`);

if (title || message) {
  const titleElement = document.querySelector("#title");
  if (titleElement) titleElement.textContent = title;
  const messageElement = document.querySelector("#message");
  if (messageElement) messageElement.textContent = message;
}
