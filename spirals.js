var particles = [];

var drawOn = true;
var centx;
var centy;

var id = 5;
var tail = false;

function setup() {
  var pauseBtn = createButton("Pause");
  var clearBtn = createButton("Clear");
  var resetBtn = createButton("Reset");
  var addBtn = createButton("Add random");
  var removeBtn = createButton("Remove one");
  var tailButton = createButton("Continuous / With tails");

  pauseBtn.parent('slider-holder');
  clearBtn.parent('slider-holder');
  resetBtn.parent('slider-holder');
  addBtn.parent('slider-holder');
  removeBtn.parent('slider-holder');
  tailButton.parent('slider-holder');

  pauseBtn.mousePressed(pauseSkecth);
  clearBtn.mousePressed(clearSkecth);
  resetBtn.mousePressed(resetSkecth);
  addBtn.mousePressed(addParticle);
  removeBtn.mousePressed(removeParticle);
  tailButton.mousePressed(tailOrCont);

  centx = windowHeight/2;
  centy = windowHeight/2;

  var canvas = createCanvas(windowHeight, windowHeight);
  canvas.parent('sketch-holder');
  // Syntax: radius, cycloidRadius, color, hypo, d
  //particles.push(new Particle(215, 14, '#FFAE00', 0)); // #FAA613

  //particles.push(new Particle(100, 90, '#91D815', 1, 20, centx, centy, 0, 0)); // #688E26
  //particles.push(new Particle(150, 30, '#FF4300', 0, 15, centx, centy, 1, 0)); // #688E26
  //particles.push(new Particle(50, 45, '#FF006E', 0, 10, centx, centy, 2, 0)); // #688E26
  particles.push(new Particle(190, 140, '#A47BF8', 1, 18, centx, centy, 1, 0)); // #688E26
  particles.push(new Particle(200, 45, '#00BBFF', 1, 50, centx, centy, 2, 0)); // #688E26
  particles.push(new Particle(40, 90, '#91D815', 1, 45, centx, centy, 3, 0)); // #688E26
  particles.push(new Particle(58, 28, '#FF006E', 0, 20, centx, centy, 4, 0)); // #688E26
  // 198, 64, [169, 245, 184, 255], 1, 42
  // 47, 86, color, 1, 45
  // 50, 90, color, 1, 44
  // 194, 39, [164, 123, 248, 255], 0, 14 color(164, 123, 248, 255)
  // 115, 56, color, 0, 34
  // 117, 35, color, 0, 41
}

function draw() {
  if(drawOn) {
    if(tail) {
      background(0);
    }
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  }
}

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
  var hx = "#" + hex(r,2) + hex(g,2) + hex(b,2);
  if(particles.length < 10) {
    particles.push(new Particle(random(20,200), random(30,100), hx, random(0,1), random(5,50), centx, centy, id, 0));
    particles[particles.length - 1].updateSliders();
  }
  id++;
}

function removeParticle() {
  if(particles.length > 0) {
    remove_particle = particles.pop();
    par_id = remove_particle.id;
    elements = window.document.getElementsByClassName(par_id);
    elemt_len = elements.length;
    for(var i = 0; i < elemt_len; i++) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}

function tailOrCont() {
  tail = !tail;
}

function mouseMoved() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].updateSliderValues();
  }
}

function mouseReleased() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].updateSliders();
  }
}
