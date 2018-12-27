var centx = 250;
var centy = 250;

var dots = []
var particles = [];

var drawOn = 1;
var slider;

function setup() {
  createCanvas(500, 500);
  //background(0);

  // radius, cycloidRadius, color, hypo, d
  //particles.push(new Particle(215, 14, '#FFAE00', 0)); // #FAA613
  particles.push(new Tail_Particle(100, 90, '#91D815', 1, 20)); // #688E26
  particles.push(new Tail_Particle(150, 30, '#FF4300', 0, 15)); // #688E26
  particles.push(new Tail_Particle(50, 45, '#FF006E', 0, 10)); // #688E26
  particles.push(new Tail_Particle(200, 48, '#00BBFF', 1, 50)); // #688E26
  // #FF4300
  // #FF006E
  // #00BBFF

  //fill('#FAA613');
  //stroke('#FAA613');
}

function draw() {
  background(0);
  if(drawOn) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  }
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

function mouseClicked() {
  drawOn = !drawOn;
}
