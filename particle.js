var updateSpeed = 4;
var updateHalf = updateSpeed/2;

function Particle(radius, cycloidRadius, color, hypo, d, centx, centy, id, angle) {
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
  this.red = red(color);
  this.green = green(color);
  this.blue = blue(color);
  this.angle = angle;

  this.tail = [];
  this.hypo = hypo;
  this.d = d;

  this.header = createElement('p', 'Particle ' + id);
  this.colorPicker = createInput(this.color, 'color');
  this.radiusslider = createSlider(0, 200, radius);
  this.radiussliderH = createElement('p', 'R1: ' + radius);
  this.cycloidRadiusslider = createSlider(0, 200, cycloidRadius);
  this.cycloidRadiussliderH = createElement('p', 'R2: ' + cycloidRadius);
  this.hyposlider = createSlider(0, 1, hypo);
  this.hyposliderH = createElement('p', 'Epitrochoid/Hypotrochoid: ' + hypo);
  this.dslider = createSlider(0, 200, d);
  this.dsliderH = createElement('p', 'd: ' + d);

  //this.radiusslider.mousePressed(this.sliderUpdate);
  //this.cycloidRadiusslider.mousePressed(this.sliderUpdate());
  //this.hyposlider.mousePressed(this.sliderUpdate());
  //this.dslider.mousePressed(this.sliderUpdate());
  //this.radiusslider.input(sliderUpdate(this.radiusslider, this.radiussliderH, this.radius, 'R1: '));
  //this.cycloidRadiusslider.input(this.sliderUpdate);
  //this.hyposlider.input(this.sliderUpdate);
  //this.dslider.input(this.sliderUpdate);

  this.header.parent('slider-holder');
  this.colorPicker.parent('slider-holder');
  this.radiussliderH.parent('slider-holder');
  this.radiusslider.parent('slider-holder');
  this.cycloidRadiussliderH.parent('slider-holder');
  this.cycloidRadiusslider.parent('slider-holder');
  this.hyposliderH.parent('slider-holder');
  this.hyposlider.parent('slider-holder');
  this.dsliderH.parent('slider-holder');
  this.dslider.parent('slider-holder');

  this.colorPicker.addClass(id);
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

  this.update = function() {
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

    if(tail) {
      var v = [this.lastx, this.lasty, this.medx, this.medy, this.x, this.y];
      this.tail.push(v);
      if(this.tail.length > taillength) {
        this.tail.splice(0,1);
      }
    }
  }

  this.show = function() {
    this.color = this.colorPicker.value();
    this.red = red(this.color);
    this.green = green(this.color);
    this.blue = blue(this.color);

    if(tail) {
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
    }

    fill(this.color);
    stroke(this.color);
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
    this.removebutton.remove();
    this.radiusslider.remove();
    this.cycloidRadiusslider.remove();
    this.hyposlider.remove();
    this.dslider.remove();
  }

  this.updateSliderValues = function() {
    this.radiussliderH.html('R1: ' + this.radiusslider.value());
    this.cycloidRadiussliderH.html('R2: ' + this.cycloidRadiusslider.value());
    this.hyposliderH.html('Epitrochoid/Hypotrochoid: ' + this.hyposlider.value());
    this.dsliderH.html('d: ' + this.dslider.value());
  }

  this.updateSliders = function() {
    this.radius = this.radiusslider.value();
    this.cycloidRadius = this.cycloidRadiusslider.value();
    this.hypo = this.hyposlider.value();
    this.d = this.dslider.value();

    this.radiussliderH.html('R1: ' + this.radiusslider.value());
    this.cycloidRadiussliderH.html('R2: ' + this.cycloidRadiusslider.value());
    this.hyposliderH.html('Epitrochoid/Hypotrochoid: ' + this.hyposlider.value());
    this.dsliderH.html('d: ' + this.dslider.value());
  }
}

function removeThisParticle(b1,b2,b3,b4,b5) {
  b1.remove();
  b2.remove();
  b3.remove();
  b4.remove();
  b5.remove();
}

function sliderUpdate(slider, header, radius, text) {
  header.html(text + slider.value());
  radius = slider.value();
}
