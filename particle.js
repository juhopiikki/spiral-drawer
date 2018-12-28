var updateSpeed = 4;
var updateHalf = updateSpeed/2;

function Particle(radius, cycloidRadius, color, hypo, d, centx, centy, id) {
  this.id = id;

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
  this.d = d;

  //this.removebutton = createButton('Remove');
  this.header = createElement('p', 'Particle ' + id);
  this.radiussliderH = createElement('p', 'R1');
  this.radiusslider = createSlider(0, 200, radius);
  this.cycloidRadiussliderH = createElement('p', 'R2');
  this.cycloidRadiusslider = createSlider(0, 200, cycloidRadius);
  this.hyposliderH = createElement('p', 'Epitrochoid/Hypotrochoid');
  this.hyposlider = createSlider(0, 1, hypo);
  this.dsliderH = createElement('p', 'd');
  this.dslider = createSlider(0, 200, d);

  //this.removebutton.parent('slider-holder');
  this.header.parent('slider-holder');
  this.radiussliderH.parent('slider-holder');
  this.radiusslider.parent('slider-holder');
  this.cycloidRadiussliderH.parent('slider-holder');
  this.cycloidRadiusslider.parent('slider-holder');
  this.hyposliderH.parent('slider-holder');
  this.hyposlider.parent('slider-holder');
  this.dsliderH.parent('slider-holder');
  this.dslider.parent('slider-holder');

  this.header.addClass(id);
  this.header.addClass('particle_header');
  this.radiussliderH.addClass('slider_H');
  this.cycloidRadiussliderH.addClass('slider_H');
  this.hyposliderH.addClass('slider_H');
  this.dsliderH.addClass('slider_H');
  this.radiusslider.addClass(id);
  this.cycloidRadiusslider.addClass(id);
  this.hyposlider.addClass(id);
  this.dslider.addClass(id);
  this.radiussliderH.addClass(id);
  this.cycloidRadiussliderH.addClass(id);
  this.hyposliderH.addClass(id);
  this.dsliderH.addClass(id);

  //this.removebutton.mousePressed(removeThisParticle(this.removebutton, this.radiusslider, this.cycloidRadiusslider, this.hyposlider, this.dslider));
  //this.removebutton.mousePressed(this.removeThisParticle);

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

  }

  this.show = function() {

    fill(color); //'#FAA613');
    stroke(color); //'#FAA613');
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

  this.reset = function() {
    this.color = color;
    this.angle = 0;
    this.x = 0;
    this.y = 0;

    this.lastx = 0;
    this.lasty = 0;

    this.medx = 0;
    this.medy = 0;
  }

  this.removeThisParticle = function() {
    this.removebutton.remove(); //.parentNode.removeChild(this.removebutton);
    this.radiusslider.remove(); //.parentNode.removeChild(this.radiusslider);
    this.cycloidRadiusslider.remove(); //.parentNode.removeChild(this.cycloidRadiusslider);
    this.hyposlider.remove(); //.parentNode.removeChild(this.hyposlider);
    this.dslider.remove(); //.parentNode.removeChild(this.dslider);
  }

}

function removeThisParticle(b1,b2,b3,b4,b5) {
  b1.remove();
  b2.remove();
  b3.remove();
  b4.remove();
  b5.remove();
}
