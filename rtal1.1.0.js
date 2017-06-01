var modules = [];
var numMod = 6;
var raTr = [];
var track = [];
var loadcomp = 0;
var act = "play";

function preload() {
  ampera = loadFont('data/Ampera.ttf');
  metadata = loadStrings('data/metadata.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("ampera");
  for (var i = 0; i < numMod; i++) {
    modules[i] = new Module();
  }
  // modules
  for (var i = 0; i < numMod; i++) {
    raTr[i] = floor(random(0, 1))+1;
  }
  // Track load
  for (var i = 0; i < numMod; i++) {
    track[i] = loadSound("data/Module0" + (i+1) + "/00_" + raTr[i] + '.mp3', loaded);
  }
  mainpanel = new MainPanel();
}

function loaded() {
  // console.log("loaded");
  loadcomp++
}

function draw() {
  background(10,16,22);
  // console.log(but);

  if (numMod <= 3) {
    mainpanel.x = 500;
    mainpanel.y = windowHeight/2;
    mainpanel.mainbutton();
  } else if (numMod <= 6) {
    mainpanel.x = 500+modulewidth;
    mainpanel.y = windowHeight/2;
    mainpanel.mainbutton();
  }

  if (numMod <= 3) {
    for (var i = 0; i < numMod; i++) {
      modules[i].display();
      modules[i].x = 50;
      modules[i].y = 50+i*10+(i*moduleheight);
      modules[i].modNum = i;
      modules[i].trackInModule = i
    }
  } else {
    for (var i = 0; i < 3; i++) {
      modules[i].display();
      modules[i].x = 50;
      modules[i].y = 50+i*10+(i*moduleheight);
      modules[i].modNum = i;
      modules[i].trackInModule = i

    }
    for (var i = 3; i < numMod; i++) {
      modules[i].display();
      modules[i].x = 100+modulewidth;
      modules[i].y = 50+(i-3)*10+((i-3)*moduleheight);
      modules[i].modNum = i;
      modules[i].trackInModule = i
    }
  }
}

function mousePressed() {
  if (numMod <= 3 && mouseX >= 400 && mouseX <= 600 &&
  mouseY <= windowHeight/2+25 && mouseY >= windowHeight/2-25) {
    if (track[0].isPlaying()) {
      act = "play";
      for (var i = 0; i < track.length; i++) {
        track[i].stop();
      }
    } else {
      act = "stop"
      for (var i = 0; i < track.length; i++) {
        track[i].play();
      }
    }
  } else if (numMod <= 6 && mouseX >= 400+modulewidth && mouseX <= 600+modulewidth &&
  mouseY <= windowHeight/2+25 && mouseY >= windowHeight/2-25) {
    if (track[0].isPlaying()) {
      act = "play";
      for (var i = 0; i < track.length; i++) {
        track[i].stop();
      }
    } else {
      act = "stop"
      for (var i = 0; i < track.length; i++) {
        track[i].play();
      }
    }
  }
}
