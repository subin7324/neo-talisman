let talismans = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 25; i++) {
    talismans.push(new Talisman());
  }
}

function draw() {
  background(0);
  for (let t of talismans) {
    t.update();
    t.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Talisman {
  constructor() {
    this.init();
    this.y = random(height); 
  }

  init() {
    this.x = random(width);
    this.y = random(-500, -100);
    this.w = random(30, 70);
    this.h = this.w * 2.2;
    this.speed = random(1.5, 4);
    this.angle = random(TWO_PI);
    this.rotSpeed = random(-0.04, 0.04);
    this.oscillation = random(TWO_PI);
    this.oscSpeed = random(0.02, 0.05);
  }

  update() {
    this.y += this.speed;
    this.x += sin(this.oscillation) * 1.2;
    this.oscillation += this.oscSpeed;
    this.angle += this.rotSpeed;

    if (this.y > height + 150) {
      this.init();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    fill(255, 230, 0);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.w, this.h, 2);
    
    stroke(180, 0, 0, 150);
    strokeWeight(1);
    noFill();
    rect(0, 0, this.w * 0.8, this.h * 0.9);
    line(-this.w/4, -this.h/2.5, this.w/4, this.h/2.5);
    line(this.w/4, -this.h/2.5, -this.w/4, this.h/2.5);
    pop();
  }
}