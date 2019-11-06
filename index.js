var colors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
var gameColor;
var userColor;
var gameOver = false;

$("body").keypress(function() {
  if (started === false) {
    nextSeq(++level);
    started = true;
    gameOver = false;
  }
})

$(".btn").on("click", function() {
  if (!gameOver) {
    userColor = $(this).attr("id")
    userPattern.push(userColor);
    playAudio(userColor);
    animateColor(userColor);
    console.log("****");
    console.log("Game: " + gamePattern);
    console.log("User " + userPattern);
    console.log("****");


    for (var i = 0; i < userPattern.length; i++) {
      if (gamePattern[i] != userPattern[i]) {
        console.log("Game Over");
        gameOverFunc();
        playAudio("wrong");
      }
    }
    if (gamePattern.length === userPattern.length && (gamePattern[gamePattern.length - 1] == userPattern[userPattern.length - 1])) {
      setTimeout(function() {
        nextSeq(++level)
      }, 800)

    }
  } else {
    playAudio("wrong");
    gameOverAnimation();
  }
});

function nextSeq(level) {
  var random = randomNo();
  gameColor = colors[random];
  gamePattern.push(gameColor);
  playAudio(gameColor);
  animateColor(gameColor);
  $("#level-title").text("Level " + level);
  userPattern = [];
}

function randomNo() {
  return Math.floor(Math.random() * 4);
}

function playAudio(name) {
  var audio = new Audio("D:/webDev2/7.jQuery-Simon challenge/sounds/" + name + ".mp3")
  audio.play();
}

function animateColor(gameColor) {
  $("." + gameColor).addClass("pressed");
  setInterval(function() {
    $("." + gameColor).removeClass("pressed");
  }, 150)
}

function gameOverFunc() {
  $("#level-title").text("Game Over, Press Any Key To Restart");
  gameOverAnimation();
  gamePattern = [];
  started = false;
  gameOver = true;
  level = 0;
}

function gameOverAnimation(){
  $("body").addClass("game-over");
  setInterval(function() {
    $("body").removeClass("game-over");
  }, 200);
}
