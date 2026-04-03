let talismans = [];
let coreRotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 60; i++) {
    talismans.push(new Talisman());
  }
}

function draw() {
  background(10, 10, 15);
  
  drawStaticBackground();
  drawCentralCore();

  for (let t of talismans) {
    t.update();
    t.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawStaticBackground() {
  stroke(30, 50, 40, 50);
  strokeWeight(0.5);
  for (let i = 0; i < width; i += 50) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += 50) {
    line(0, i, width, i);
  }
}

function drawCentralCore() {
  push();
  translate(width / 2, height / 2);
  rotate(coreRotation);
  coreRotation += 0.005;

  noFill();
  stroke(0, 255, 200, 150);
  strokeWeight(1);
  ellipse(0, 0, 300, 300);
  ellipse(0, 0, 320, 280);

  stroke(255, 50, 50, 100);
  beginShape();
  for (let a = 0; a < TWO_PI; a += PI / 3) {
    let r = 160 + sin(a * 3 + frameCount * 0.02) * 10;
    let x = cos(a) * r;
    let y = sin(a) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

class Talisman {
  constructor() {
    this.init();
    this.y = random(height);
  }

  init() {
    this.x = random(width);
    this.y = random(-800, -100);
    this.z = random(0.5, 2.0);
    this.w = random(40, 90) * this.z;
    this.h = this.w * 2.5;
    this.speed = random(1, 3) * this.z;
    this.angle = random(TWO_PI);
    this.rotSpeed = random(-0.02, 0.02) * this.z;
    this.oscillation = random(TWO_PI);
    this.oscSpeed = random(0.01, 0.03);
    this.paperColor = color(255, 240, 150, 230);
    this.patternColor = color(150, 0, 0, 200);
  }

  update() {
    this.y += this.speed;
    this.x += sin(this.oscillation) * 0.8 * this.z;
    this.oscillation += this.oscSpeed;
    this.angle += this.rotSpeed;

    if (this.y > height + 200) {
      this.init();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.z);

    fill(this.paperColor);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.w, this.h, 3);

    stroke(200, 180, 100, 100);
    strokeWeight(0.5);
    for (let i = -this.h / 2; i < this.h / 2; i += 5) {
      line(-this.w / 2, i, this.w / 2, i + random(-1, 1));
    }
