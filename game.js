var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Step 7.1: Detect when a keyboard key has been pressed to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Step 4.1: Detect when any of the buttons are clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); // Nagpapatugtog ng tunog kapag pinindot ang button[cite: 4]
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Step 8.1: Check the user's answer against the game sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong"); // Tunog kapag mali ang sagot[cite: 5]
    
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}

// Step 2 & 7: Generate next sequence and increase level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Tunog para sa lumalabas na sequence sa laro[cite: 3]
}

// Step 5: Play sound function para sa mga kulay at wrong sound[cite: 3, 4, 5]
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step 6: Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Step 10.1 & 10.3: Reset game variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
