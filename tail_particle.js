var taillength = 100;
var particleR = 5;
var updateSpeed = 2;
var updateHalf = updateSpeed/2;

function Tail_Particle(radius, cycloidRadius, color, hypo, d, centx, centy) {
  this.x = 0;
  this.y = 0;

  this.lastx = 0;
  this.lasty = 0;

  this.medx = 0;
  this.medy = 0;

  this.radius = radius;
  this.cycloidRadius = cycloidRadius;

  this.color = color;
  this.red = red(color);
  this.green = green(color);
  this.blue = blue(color);

  this.angle = 0;

  this.tail = [];
  this.hypo = hypo;
  this.d = d;

  this.radiusslider = createSlider(0, 200, radius);
  this.cycloidRadiusslider = createSlider(0, 200, cycloidRadius);
  this.hyposlider = createSlider(0, 1, hypo);
  this.dslider = createSlider(0, 200, d);

  this.radiusslider.parent('slider-holder');
  this.cycloidRadiusslider.parent('slider-holder');
  this.hyposlider.parent('slider-holder');
  this.dslider.parent('slider-holder');

  this.update = function() {
    this.radius = this.radiusslider.value();
    this.cycloidRadius = this.cycloidRadiusslider.value();
    this.hypo = this.hyposlider.value();
    this.d = this.dslider.value();
    this.angle += updateSpeed;
    var ang1 = radians(this.angle);

    if(this.hypo) {
      var values1 = this.hypotrochoid(radians(this.angle - updateHalf), this.d, this.cycloidRadius, this.radius);
      var values2 = this.hypotrochoid(ang1, this.d, this.cycloidRadius, this.radius);
    } else {
      var values1 = this.epitrochoid(radians(this.angle - updateHalf), this.d, this.cycloidRadius, this.radius);
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

    var v = [this.lastx, this.lasty, this.medx, this.medy, this.x, this.y];
    this.tail.push(v);
    if(this.tail.length > taillength) {
      this.tail.splice(0,1);
    }
  }

  this.show = function() {

    // make first one transparent
    fill(this.red, this.green, this.blue, 0);
    stroke(this.red, this.green, this.blue, 0);
    beginShape();
    var pos = this.tail[0];
    curveVertex(pos[0] + centx, pos[1] + centy);
    curveVertex(pos[0] + centx, pos[1] + centy);
    curveVertex(pos[2] + centx, pos[3] + centy);
    curveVertex(pos[4] + centx, pos[5] + centy);
    curveVertex(pos[4] + centx, pos[5] + centy);
    endShape();

    for(var i = 1; i < this.tail.length; i++) {
      var mult = (i / taillength);
      //print('i: ', i, ', mult: ', mult);

      fill(this.red*mult, this.green*mult, this.blue*mult);
      stroke(this.red*mult, this.green*mult, this.blue*mult );

      beginShape();
      var pos = this.tail[i];
      curveVertex(pos[0] + centx, pos[1] + centy);
      curveVertex(pos[0] + centx, pos[1] + centy);
      curveVertex(pos[2] + centx, pos[3] + centy);
      curveVertex(pos[4] + centx, pos[5] + centy);
      curveVertex(pos[4] + centx, pos[5] + centy);
      endShape();
    }

    fill(this.color); //'#FAA613');
    stroke(this.color); //'#FAA613');
    strokeWeight(1.5);

    noFill();

    beginShape();
    curveVertex(this.lastx + centx, this.lasty + centy);
    curveVertex(this.lastx + centx, this.lasty + centy);
    curveVertex(this.medx + centx, this.medy + centy);
    curveVertex(this.x + centx, this.y + centy);
    curveVertex(this.x + centx, this.y + centy);

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

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}

function colorDim(aColor, dim) {
  var c = color(aColor);
  //return color('rgb(' +  [red(c) * 1, green(c) * 1, blue(c) * 1].join(',') + ')');
  return (red(aColor) * dim, green(aColor) * dim, blue(aColor) * dim);
}
