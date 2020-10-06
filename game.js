// alert("Test");
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickPattern=[];

var level = 0;
var userLevel=0;
var start = false;

// Initiator
$(document).on("keydown",function(){
     if(!start)
     {
          start=true;
          nextSequence();
     }
});

// sound and Animation
function playSound(name)
{
     var audio = new Audio("/sounds/"+name+".mp3");
     audio.play();
}

function animatePress(currentColour)
{
     console.log(currentColour);
     $("#"+currentColour).addClass("pressed");
     setTimeout(function() {
          $("#"+currentColour).removeClass("pressed");},100);
}

// New sequence character added
function nextSequence()
{
     userClickPattern=[];
     userLevel=0;
     $("h1").html("Level "+level);
     // This gets a random color into the gamepattern
          var randomNumber = Math.floor(Math.random()*4);
          var randomChosenColour = buttonColours[randomNumber];
          gamePattern.push(randomChosenColour);
     // Animation and sound
          animatePress(randomChosenColour);
          playSound(randomChosenColour);
     level++;
}

function startOver()
{
     level=0;
     gamePattern=[];
     start=false;
}


$(".btn").on("click", function(event) {
     // Adding the button to the userChosenPattern
     var userChosenColour = (event.target.id);
     userClickPattern.push(userChosenColour);
     playSound(event.target.id);
     animatePress(event.target.id);

     if(!checkAnswer(userLevel))
     {
          playSound("wrong");
          $("body").addClass("game-over");
          setInterval(function() {
               $("body").removeClass("game-over");
          },200);
          $("h1").html("Game Over, Press Any Key to Restart");
          startOver();
          
     }
     userLevel++;
     if(userLevel===level)
     {
          setTimeout(nextSequence,1000);
     }
     
});


function checkAnswer(currentLevel)
{
     if(gamePattern[currentLevel]===userClickPattern[currentLevel])
     {
          return true;
     }
     else
          return false;
}