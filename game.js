var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;



if (window.matchMedia("(max-width: 800px)").matches) {
        $("#btnMobile").click(function () {
            if (!started) {
                nextSequence();
                $("#level-title").text("Level " + level);
        
                started = true;
        $(".endlevel").css("visibility", "hidden");

            }
        });
    
} else {
    $(document).keypress(function () {
        if (!started) {
            nextSequence();
            $("#level-title").text("Level " + level);
    
            started = true;
        $(".endlevel").css("visibility", "hidden");

        }
    });
}




$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickPattern.push(userChosenColor);
    // console.log(userClickPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
    console.log(userClickPattern);
    console.log(gamePattern)

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickPattern[currentLevel]){
        console.log("success");

        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        $(".endlevel").css("visibility", "visible");
        $("h2").text("You lost at level: " + level) 
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 500);

      startOver();
    }

};





function nextSequence() {
    userClickPattern = [];

    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");


    }, 100)
}

function startOver() {
     gamePattern = [];
     level = 0;
     started = false;
}








