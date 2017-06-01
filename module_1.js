var modulewidth = 250;
var moduleheight = 170;

function Module() {
  this.x = 0;
  this.y = 0;
  this.modNum = 0;
  this.currentPlace_01 = this.x;
  this.currentPlace_02 = this.x;
  this.trackInModule = 0;
  this.action = " ";
  this.display = function() {
    noStroke();
    rectMode(CORNER);
    //shadow base
    fill(20,40,50);
    rect(this.x+4, this.y+4, modulewidth, moduleheight, 10, 10, 10, 10);
    //base
    fill(39,60,81);
    rect(this.x, this.y, modulewidth, moduleheight, 10, 10, 10, 10);
    //main area
    fill(50,82,115);
    // sliders
    rect(this.x+10, this.y+10, modulewidth-20, moduleheight-20, 10, 10, 10, 10);
    // display
    fill(39,60,81);
    rect(this.x+60, this.y+10, 180, 50, 0, 10, 0, 0);
    fill(10,16,22);
    rect(this.x+65, this.y+10, 175, 45, 0, 10, 10, 0);
    // column for numbers
    fill(39,60,81);
    rect(this.x+180, this.y+60, 70, 100);
    fill(15,25,35);
    rect(this.x+185, this.y+60, 55, 47, 0, 10, 10, 0); // sli_1
    fill(15,25,35);
    rect(this.x+185, this.y+113, 55, 47, 0, 10, 10, 0); // sli_2

    // metadata values
    this.metavol = 1+floor(map((split(metadata[this.modNum*5],":")[1]), 0, 100, 0, 112));
    this.metapan = 1+floor(map((split(metadata[1+this.modNum*5],":")[1]), -50, 50, 0, 112));

    //  adding metadata
    if (this.currentPlace_01 < this.x-10) {
      this.currentPlace_01 = this.x + 38 + this.metavol; //volume
    }
    if (this.currentPlace_02 < this.x-10) {
      this.currentPlace_02 = this.x + 38 + this.metapan; //pan
    }


    // slider_01
    fill(15,25,35); //shadow
    rect(this.x+34, this.y+80, 120, 10, 10, 10, 10, 10);
    fill(39,60,81); //mainColor
    rect(this.x+36, this.y+82, 118, 8, 10, 10, 10, 10);
    // slider button
    rectMode(CENTER);
    if (mouseIsPressed && mouseX >= this.x+38 && mouseX <= this.x+150 &&
    mouseY >= this.y+80 && mouseY <= this.y+90) {
      this.currentPlace_01 = mouseX;
      this.startpoint = 0;
      fill(15,25,35);
      rect(this.currentPlace_01+2, this.y+85, 15, 15, 10, 10, 10, 10);
      fill(79,105,132);
      rect(this.currentPlace_01, this.y+83, 15, 15, 10, 10, 10, 10);
    } else {
      fill(15,25,35);
      rect(this.currentPlace_01+2, this.y+85, 15, 15, 10, 10, 10, 10);
      fill(39,72,104);
      rect(this.currentPlace_01, this.y+83, 15, 15, 10, 10, 10, 10);
    }
    this.sli_1 = floor(map(this.currentPlace_01, this.x+38, this.x+150, 0, 100));
    textSize(25);
    textAlign(CENTER);
    if (floor(this.sli_1) == 0) {
      fill(39,60,81);
      text(floor(this.sli_1), this.x + 212, this.y + 92);
    } else {
      fill(150),
      text(floor(this.sli_1), this.x + 212, this.y + 92);
    }
    this.volfade = map(this.sli_1/100, 0, 1, 100, 255);

    rectMode(CORNER);
    // slider_02
    fill(15,25,35); //shadow
    rect(this.x+34, this.y+130, 120, 10, 10, 10, 10, 10);
    fill(39,60,81); //mainColor
    rect(this.x+36, this.y+132, 118, 8, 10, 10, 10, 10);
    // slider button
    rectMode(CENTER);
    if (mouseIsPressed && mouseX >= this.x+38 && mouseX <= this.x+150 &&
    mouseY >= this.y+130 && mouseY <= this.y+140) {
      this.currentPlace_02 = mouseX;
      fill(15,25,35);
      rect(this.currentPlace_02+2, this.y+135, 15, 15, 10, 10, 10, 10);
      fill(79,105,132);
      rect(this.currentPlace_02, this.y+133, 15, 15, 10, 10, 10, 10);
    } else {
      fill(15,25,35);
      rect(this.currentPlace_02+2, this.y+135, 15, 15, 10, 10, 10, 10);
      fill(39,72,104);
      rect(this.currentPlace_02, this.y+133, 15, 15, 10, 10, 10, 10);
    }
    this.sli_2 = map(this.currentPlace_02, this.x+38, this.x+150, -0.5, 0.5);
    textAlign(CENTER);
    textSize(25);
    if (floor(this.sli_2*100) == 0) {
      fill(39,60,81);
      text(floor(this.sli_2*100), this.x + 212, this.y + 145);
    } else {
      fill(150);
      text(floor(this.sli_2*100), this.x + 212, this.y + 145);
    }


    // track loader
    if (track[this.trackInModule].isLoaded() && !track[this.trackInModule].isPlaying()) {
      this.action = "ready"
      fill(100, 100, this.volfade);
      text(this.action, this.x+150, this.y+40);
    } else if (!track[this.trackInModule].isPlaying()){
      this.action = "loading"
      fill(100, 100, this.volfade);
      text(this.action, this.x+150, this.y+40);
    }
    // track isPlaying
    if (track[this.trackInModule].isPlaying()) {
      this.action = "playing"
      fill(100,  this.volfade, 100);
      text(this.action, this.x+150, this.y+40);
    }

    // set: volume and pan
    track[this.trackInModule].setVolume(this.sli_1/100); //vol
    track[this.trackInModule].pan(this.sli_2*2);
  };
}
