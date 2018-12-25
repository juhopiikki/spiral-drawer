var radius = 200;
var cycloidRadius = 15;
var angle = 0;
var taillength = 50;
var particleR = 10;

function Particle(x, y) {
  this.x = x;
  this.y = y;

  this.tail = [];

  this.update = function() {
    angle += 2;
    var ang1 = radians(angle);

    // circle
    // this.x = radius * cos(ang1);
    // this.y = radius * sin(ang1);

    // cos around circle
    // this.x = (radius + 8 * cos(6 * ang1)) * cos(ang1);
    // this.y = (radius + 8 * cos(6 * ang1)) * sin(ang1);
    var d = 40;

    // Epitrochoid
    this.x = (radius + cycloidRadius) * cos(ang1) - d * cos (((radius + cycloidRadius) / cycloidRadius) * ang1);
    this.y = (radius + cycloidRadius) * sin(ang1) - d * sin (((radius + cycloidRadius) / cycloidRadius) * ang1);

    // Hypotrochoid
    // this.x = (radius - cycloidRadius) * cos(ang1) + d * cos (((radius - cycloidRadius) / cycloidRadius) * ang1);
    // this.y = (radius - cycloidRadius) * sin(ang1) - d * sin (((radius - cycloidRadius) / cycloidRadius) * ang1);

    var v = createVector(this.x, this.y);
    this.tail.push(v);
    if(this.tail.length > taillength) {
      this.tail.splice(0,1);
    }
  }

  this.show = function() {
    for(var i = 0; i < this.tail.length; i++) {
      var mult = (i / this.tail.length);

      fill(248*mult, 165*mult, 46*mult);
      stroke(248*mult, 165*mult, 46*mult);
      var pos = this.tail[i];
      ellipse(pos.x + centx, pos.y + centy, particleR, particleR);
    }

    fill('#FAA613');
    stroke('#FAA613');
    ellipse(this.x + centx, this.y + centy, particleR, particleR);
  }

}
