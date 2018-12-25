var centx = 320;
var centy = 320;

var dots = []
var particle;

function setup() {
  createCanvas(640, 640);
  background(0);
  particle = new Particle(0, 100);
  fill('#FAA613');
  stroke('#FAA613');
}

function draw() {
  background(0);
  particle.update();
  particle.show();
  // stroke('#FAA613');

  // stroke(mouseX, mouseY, mouseX+mouseY);
  /* if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  } */

  //ellipse(mouseX, mouseY, (mouseX+mouseY)/5, (mouseX+mouseY)/5);
  //dots.push(ellipse(x + centx, y + centy, 5, 5));
  //for ()

}
