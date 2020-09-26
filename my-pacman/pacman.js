
var scoreOne = 0; 
var livesOne = 3;

var pacmanOne = document.getElementById('pacmanOne');
var ghost = document.getElementById('ghost'); 

var pacmanOnePos = {
    x: 1,
    y: 1
};


var ghostPos = {
    x:7,
    y:5
};

var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,2,1,1,1,1,1,1,1,2,3,1,2],
    [2,1,1,2,1,2,2,2,1,3,1,2,1,1,2],
    [2,1,1,2,3,2,2,2,1,1,1,1,1,1,2],
    [2,1,1,2,1,2,1,1,1,1,1,2,1,1,2],
    [2,1,1,2,1,2,1,1,1,1,1,2,3,1,2],
    [2,1,1,2,1,2,1,1,1,1,1,2,1,1,2],
    [2,3,1,2,1,2,1,1,1,1,1,2,3,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,2,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,3,1,1,2],
    [2,1,1,1,3,1,2,2,2,1,1,1,1,0,2],
    [2,1,1,1,1,1,2,1,2,2,2,1,1,1,2],
    [2,1,3,1,1,1,2,1,1,1,3,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// 0: empty
// 1: coin
// 2: brick
// 3: cherries

//Drawing/Display world

function displayWorld(){
    var output ='';

    for(var i = 0; i < world.length; i++){
        output += "\n<div class='row'>\n";
        for(var j = 0; j < world[i].length; j++){
            if(world[i][j] == 2){
                output +="<div class='brick'></div>";
            }
            else if(world[i][j] == 1){
                output +="<div class='coin'></div>";
            }
            else if(world[i][j] == 0){
                output +="<div class='empty'></div>";
            }
            else if(world[i][j] == 3){
                output +="<div class='cherry'></div>";
            }
        }
        output += "\n</div>";
    }
    // console.log(output);
    document.getElementById("world").innerHTML = output; 
}

//Display both P1 and P2
function displayPacMan(){
    pacmanOne.style.top = pacmanOnePos.y*20+"px";
    pacmanOne.style.left = pacmanOnePos.x*20+"px";
    
}
//Display ghost
function displayGhost(){
    ghost.style.top = ghostPos.y*20+"px";
    ghost.style.left = ghostPos.x*20+"px";
}
//Display score for P1 and P2
function displayScoreP1(){
    document.getElementById('playerOneScore').textContent = "Player 1 Score: " + scoreOne;
}

//Display lives for P1 and P2
function displayLivesP1(){
    document.getElementById('livesOne').textContent = "Player 1 Lives: " + livesOne;
}

//Score update for P1 and P2
function updateScoreP1(){
    if(world[pacmanOnePos.y][pacmanOnePos.x] == 1){
        world[pacmanOnePos.y][pacmanOnePos.x] = 0;
        scoreOne += 10; 
        displayWorld();
        displayScoreP1();
    }
    else if(world[pacmanOnePos.y][pacmanOnePos.x] == 3){
        world[pacmanOnePos.y][pacmanOnePos.x] = 0;
        scoreOne += 50; 
        displayWorld();
        displayScoreP1();
    }
}


document.onkeydown = function(e){
    //Mobility of P1
    if(e.keyCode == 37 && world[pacmanOnePos.y][pacmanOnePos.x -1] != 2 && pacmanOnePos.x > 0){
        pacmanOnePos.x -= 1; 
        pacmanOne.style.backgroundImage= "url('pacman_left.gif')";
    }
    else if(e.keyCode == 39 && world[pacmanOnePos.y][pacmanOnePos.x + 1] != 2 && pacmanOnePos.x > 0){
        pacmanOnePos.x += 1; 
        pacmanOne.style.backgroundImage= "url('pacman_right.gif')";
    }
    else if(e.keyCode == 38 && world[pacmanOnePos.y - 1][pacmanOnePos.x] != 2 && pacmanOnePos.y > 0){
        pacmanOnePos.y -= 1; 
        pacmanOne.style.backgroundImage= "url('pacman_up.gif')";
    }
    else if(e.keyCode == 40 && world[pacmanOnePos.y + 1][pacmanOnePos.x] != 2 && pacmanOnePos.y > 0){
        pacmanOnePos.y += 1;  
        pacmanOne.style.backgroundImage= "url('pacman_down.gif')";
    }

    
    livesLostOne();
    updateScoreP1();
    displayLivesP1();

    
    displayPacMan();
}

// Pacman losing - lives lost
function livesLostOne(){
    if (pacmanOnePos.y == ghostPos.y && pacmanOnePos.x == ghostPos.x){
        livesOne--;
        pacmanOnePos.x = 1
        pacmanOnePos.y = 1;
    }
    if(livesOne == 0){
        document.getElementById("world").innerHTML = "<div id='refresh'>You lost! Try Again!</div>";
        pacmanOne.style.display="none";
        ghost.style.display="none";
        setTimeout(function(){
            location.reload()
        }, 3000);
    }
}


// Ghost random movement
function ghostMovement(){
    var move = Math.floor(Math.random() * 4) + 1;
    if (move == 1 && world[ghostPos.y][ghostPos.x - 1] != 2 && ghostPos.y > 0){
        ghostPos.x--;
    }
    else if (move == 2 && world[ghostPos.y][ghostPos.x + 1] != 2 && ghostPos.y > 0){
        ghostPos.x++;
    }
    else if (move == 3 && world[ghostPos.y - 1][ghostPos.x] != 2 && ghostPos.y > 0){
        ghostPos.y--;
    }
    else if (move == 4 && world[ghostPos.y - 1][ghostPos.x] != 2 && ghostPos.y > 0){
        ghostPos.y--;
    }
}

setInterval(function(){
    ghostMovement();
    displayGhost();
}, 750);

//Running the game
function runGame(){
    displayWorld();
    displayPacMan();
    displayGhost();
    displayScoreP1();
    displayLivesP1();
    
}

runGame();