//var radius = 215;
//var cycloidRadius = 14;
//var angle = 0;
var taillength = 50;
var particleR = 5;

function Particle(radius, cycloidRadius, color, hypo, d) {
  this.x = 0;
  this.y = 0;

  this.lastx = 0;
  this.lasty = 0;

  this.medx = 0;
  this.medy = 0;

  this.radius = radius;
  this.cycloidRadius = cycloidRadius;

  this.color = color;
  this.angle = 0;

  this.tail = [];
  this.hypo = hypo;
  this.d = d

  this.update = function() {
    this.angle += 4;
    var ang1 = radians(this.angle);

    if(this.hypo) {
      var values1 = this.hypotrochoid(radians(this.angle - 2), this.d, this.cycloidRadius, this.radius);
      var values2 = this.hypotrochoid(ang1, this.d, this.cycloidRadius, this.radius);
    } else {
      var values1 = this.epitrochoid(radians(this.angle - 2), this.d, this.cycloidRadius, this.radius);
      var values2 = this.epitrochoid(ang1, this.d, this.cycloidRadius, this.radius);
    }

    this.medx = values1[0];
    this.medy = values1[1];

    this.lastx = this.x;
    this.lasty = this.y;

    this.x = values2[0];
    this.y = values2[1];

    if(this.lastx == 0) {
      this.lastx = this.x;
      this.lasty = this.y;
    }

    // var v = createVector(this.x, this.y);
    // this.tail.push(v);
    // if(this.tail.length > taillength) {
    //  this.tail.splice(0,1);
    // }
  }

  this.show = function() {
    /*for(var i = 0; i < this.tail.length; i++) {
      var mult = (i / this.tail.length);

      fill(248*mult, 165*mult, 46*mult);
      stroke(248*mult, 165*mult, 46*mult);
      var pos = this.tail[i];
      ellipse(pos.x + centx, pos.y + centy, particleR, particleR);
    }*/

    fill(color); //'#FAA613');
    stroke(color); //'#FAA613');
    strokeWeight(1.5);
    // ellipse(this.lastx + centx, this.lasty + centy, particleR, particleR);
    // ellipse(this.medx + centx, this.medy + centy, particleR, particleR);
    // ellipse(this.x + centx, this.y + centy, particleR, particleR);
    // line(this.lastx + centx, this.lasty + centy, this.x + centx, this.y + centy);

    noFill();

    beginShape();
    // print("1");
    // print(this.lastx + centx, this.lasty + centy);
    //print(this.medx + centx, this.medy + centy);
    //print(this.x + centx, this.y + centy);
    curveVertex(this.lastx + centx, this.lasty + centy);
    curveVertex(this.lastx + centx, this.lasty + centy);
    curveVertex(this.medx + centx, this.medy + centy);
    curveVertex(this.x + centx, this.y + centy);
    curveVertex(this.x + centx, this.y + centy);
    //curveVertex(200, 200);
    //curveVertex(250, 300);
    //curveVertex(300, 200);

    endShape();
  }

  this.circle = function() {
    return [this.radius * cos(ang1),
    this.radius * sin(ang1)];
  }

  this.coscircle = function() {
    return [(this.radius + 8 * cos(6 * ang1)) * cos(ang1),
    (this.radius + 8 * cos(6 * ang1)) * sin(ang1)];
  }

  this.hypotrochoid = function(ang1, d, crd, rd) {
    return [(rd + crd) * cos(ang1) - d * cos (((rd + crd) / crd) * ang1),
    (rd + crd) * sin(ang1) - d * sin (((rd + crd) / crd) * ang1)];
  }

  this.epitrochoid = function(ang1, d, crd, rd) {
    return [(rd - crd) * cos(ang1) + d * cos (((rd - crd) / crd) * ang1),
    (rd - crd) * sin(ang1) - d * sin (((rd - crd) / crd) * ang1)];
  }

}
