var track = [];
var numMod = 6;

for (var i = 0; i < numMod; i++) {
  track[i] = document.createElement("audio");
  track[i].src = "data/Module0" + (i+1) + "/00_1.mp3";
  track[i].addEventListener('ended', function () {
    track[i].pause();
  }, false);
}

function play() {
  for (var i = 0; i < track.length; i++) {
    track[i].play();
    track[i].currentTime = track[0].currentTime;
  }
}

function pause() {
  for (var i = 0; i < track.length; i++) {
    // track[i].currentTime = 0;
    track[i].pause();
    track[i].currentTime = track[0].currentTime;
  }
}

function stop() {
  for (var i = 0; i < track.length; i++) {
    track[i].currentTime = 0;
    track[i].pause();
  }
}
