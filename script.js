const colorList = ["green","red","yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStart = false;

$(document).keypress(function() {
    if(!gameStart) {
        $("h1").text(`Level ${level}`);
        nextSequence();
        gameStart = true;
    }
});



$("button").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    console.log("user: ",userClickedPattern);
    
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press R key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }

    
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChoosenColor = colorList[randomNumber];
    gamePattern.push(randomChoosenColor);
    
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    console.log("game: ",gamePattern);
    
}

function animatePress(colorName) {
    $("#" + colorName).addClass("pressed");

    setTimeout(() => {
        $("#" + colorName).removeClass("pressed");
    },100);       
    
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

