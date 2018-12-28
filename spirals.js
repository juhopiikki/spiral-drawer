var particles = [];

var drawOn = true;
var centx;
var centy;

function setup() {
  var pauseBtn = createButton("Pause");
  var clearBtn = createButton("Clear");
  var resetBtn = createButton("Reset");
  var addBtn = createButton("Add new");
  var removeBtn = createButton("Remove one");

  pauseBtn.parent('slider-holder');
  clearBtn.parent('slider-holder');
  resetBtn.parent('slider-holder');
  addBtn.parent('slider-holder');
  removeBtn.parent('slider-holder');

  pauseBtn.mousePressed(pauseSkecth);
  clearBtn.mousePressed(clearSkecth);
  resetBtn.mousePressed(resetSkecth);
  addBtn.mousePressed(addParticle);
  removeBtn.mousePressed(removeParticle);

  centx = windowHeight/2;
  centy = windowHeight/2;

  var canvas = createCanvas(windowHeight, windowHeight);
  canvas.parent('sketch-holder');
  // Syntax: radius, cycloidRadius, color, hypo, d
  //particles.push(new Particle(215, 14, '#FFAE00', 0)); // #FAA613
  particles.push(new Particle(100, 90, '#91D815', 1, 20, centx, centy)); // #688E26
  particles.push(new Particle(150, 30, '#FF4300', 0, 15, centx, centy)); // #688E26
  particles.push(new Particle(50, 45, '#FF006E', 0, 10, centx, centy)); // #688E26
  particles.push(new Particle(200, 48, '#00BBFF', 1, 50, centx, centy)); // #688E26
  // 198, 64, [169, 245, 184, 255], 1, 42
  // 47, 86, color, 1, 45
  // 50, 90, color, 1, 44
  // 194, 39, [164, 123, 248, 255], 0, 14
  // 115, 56, color, 0, 34
  // 117, 35, color, 0, 41
}

function draw() {
  if(drawOn) {
    //background(0);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  }
}

/*function mouseClicked() {
  drawOn = !drawOn;
}*/

function pauseSkecth() {
  drawOn = !drawOn;
}

function clearSkecth() {
  background(0);
}

function resetSkecth() {
  /*var elements = window.document..getElementsByTagName('slider');
  for(var i; i < elements.length; i++) {
    element.parentNode.removeChild(element);
  }*/
  //particles = [];
  var drawOn = true;
  /*particles.push(new Particle(100, 90, '#91D815', 1, 20, centx, centy)); // #688E26
  particles.push(new Particle(150, 30, '#FF4300', 0, 15, centx, centy)); // #688E26
  particles.push(new Particle(50, 45, '#FF006E', 0, 10, centx, centy)); // #688E26
  particles.push(new Particle(200, 48, '#00BBFF', 1, 50, centx, centy)); // #688E26*/
  for (var i = 0; i < particles.length; i++) {
    particles[i].reset();
  }
  background(0);
}

function addParticle() {
  r = random(100, 255);
  g = random(100, 255);
  b = random(100, 255);
  particles.push(new Particle(random(20,200), random(30,100), color(r,g,b), random(0,1), random(5,50), centx, centy));
}

function removeParticle() {
  particles.pop();
}
