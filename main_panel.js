// Main Button
function MainPanel() {
  this.x = 0;
  this.y = 0;
  this.mainbutton = function () {
    fill(20,40,50);
    rect(this.x+4, this.y+4, 200, 50, 10, 10, 10);
    fill(39,60,81);
    rect(this.x, this.y, 200, 50, 10, 10, 10);
    if (loadcomp == numMod) {
      fill(20,40,50);
      text("click to " + act, this.x+2, this.y+8);
      fill(150);
      text("click to " + act, this.x, this.y+6);
    } else {
      fill(20,40,50);
      text(loadcomp + " of " + numMod, this.x+2, this.y+8);
      fill(150);
      text(loadcomp + " of " + numMod, this.x, this.y+6);
    }
  };
}
