var t; //time variable
var score = 0; //score keeping
var moves = 0; //number of moves
moveChanger();
var seconds = 0; //seconds for timer
var minutes = 0; //minutes for timer
var hours = 0; //hours for timer

var Enemy = function(x, y, speed) //enemy function
{
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'img2/enemy-bug.png'; //the enemy image
};

Enemy.prototype.update = function(dt)
{
  this.x = this.x + this.speed * dt; //updating the position of the enemy bug
  if (this.x >= 505) //if the enemy moves offscreen
  {
     this.x = 0; //comes back to beginning of screen
  }
  this.Collision(); //check if enemy collides with player
};

Enemy.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //to create the enemy bugs
};

Enemy.prototype.Collision = function() //collision function
{
    if (player.y == this.y && player.x <= this.x + 63 && player.x + 65 >= this.x) //taking into account the width of the player
    {
        gameOver(); //changing enemy bug speed
        if (score == 15) //used up too many moves
        {
          gameOverFinal(); //resetting the game, timer, moves and score
        }
        gameReset(); //resetting
    }
};

var Player = function(x, y, speed) //player function
{
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'img2/char-boy.png';
};

Player.prototype.update = function(){};

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //obtaining player image
};

Player.prototype.handleInput = function(key) //when user uses keys to move the player
{
  if (key == 'left')
  {
    if (moves == 0) //first move starts the timer
    {
      timer1();
    }
    this.x -= 101; //changing the position
    if (this.x < -50) //if the player moves offscreen
    {
      this.x = 505;
    }
    moves++; //incrementing moves
    moveChanger(); //displaying changed moves
  }
  else if (key == 'right')
  {
    if (moves == 0) //first move starts the timer
    {
      timer1();
    }
    this.x += 101; //changing the position
    if (this.x >= 550) //if player moves offscreen
    {
      this.x = 0;
    }
    moves++; //incrementing moves
    moveChanger(); //displaying changed moves
  }
  else if (key == 'up' && this.y > -35) //do not move up, if it is already at the upper limit
  {
    if (moves == 0) //first move starts timer
    {
      timer1();
    }
    if (this.y == 48)
    {
      wonGame();
    }
    moves++; //incrementing moves
    moveChanger();
    this.y -= 83; //changing position
  }
  else if (key == 'down' && this.y < 380) //if key is down
  {
    if (moves == 0) //first move
    {
      timer1();
    }
    this.y += 83; //change position
    moves++;
    moveChanger();
    }
  }

Player.prototype.reset = function() //resetting the players position to initial
{
    this.x = 203;
    this.y = 380;
};

var allEnemies = []; //empty enemies array
var player = new Player(203, 380, 50); // Place the player object in a variable called player
function moveChanger()
{
document.getElementById('moves1').innerHTML = moves + " moves";
}
var scoreDiv = document.createElement('div'); //the score div
gameReset(); // setup defaults
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);
// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e)
{
    var allowedKeys =
    {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function gameReset()
{
    player.reset();
    updateDisplay();
    allEnemies = [];
    allEnemies.push
    (
        new Enemy(0, 214, Math.random() * 100 + 100), //the enemy bugs
        new Enemy(0, 131, Math.random() * 100 + 100),
        new Enemy(0, 48, Math.random() * 100 + 100),
        new Enemy(0, 380 - (Math.floor(((Math.random()+1) * 3) - 1) * 83), Math.random() * 100 + 50),
        //after the first three bugs on the three rows, these two bugs are randomly placed on rows 1, 2 or 3
    );
}

function gameOver()
{
    player.reset();
    score = score + 1; //the number of collisions
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4)
    {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

/*
 * updates the on screen score display
 */
function updateDisplay() //updating score display after each collision
{
  scoreDiv.innerHTML = 'Score ' + score;
}

function wonGame() //after all cards match
{
    var modal = document.getElementById('final_Modal'); //modal is displayed
    document.getElementById("insert1").innerHTML = "Congratulations. You have finished the game in " + moves + " moves in " + minutes + " minutes and " + seconds + " seconds with " + score + " collisions. Do you want to play again?";
    var span = document.getElementsByClassName("close")[0]; //closing modal
    modal.style.display = "block";
    span.onclick = function() //close modal on clicking close button
    {
        modal.style.display = "none";
    }
    window.onclick = function(event) //close modal on clicking outside the window
    {
        if (event.target == modal)
        {
           modal.style.display = "none";
        }
    }
}

function refreshPage() //refresh page on clicking refresh button or playing again
{
   location.reload(); //reload page
}

function gameOverFinal()
{
    var modal = document.getElementById('final_Modal'); //modal is displayed
    document.getElementById("insert1").innerHTML = "Sorry, you used up all your moves. Do you want to play again?";
    var span = document.getElementsByClassName("close")[0]; //closing modal
    modal.style.display = "block";
    span.onclick = function() //close modal on clicking close button
    {
      modal.style.display = "none";
    }
    window.onclick = function(event) //close modal on clicking outside the window
    {
      if (event.target == modal)
      {
        modal.style.display = "none";
      }
    }
}

function timer1() //stopwatch function
{
     var h3 = document.getElementsByTagName('h3')[0]; //the timer
     function add()
     {
      seconds++; //adding seconds
      if (seconds >= 60) //more than 60 seconds should be converted to minute
       {
          seconds = 0;
          minutes++; //adding minutes
          if (minutes >= 60) //more that 60 minutes should be converted to hours
          {
              minutes = 0;
              hours++;
          }
      }
//incrementing time
      h3.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      timer();
     }
     function timer()
     {
        t = setTimeout(add, 1000); //1000 milliseconds
     }
     timer();
}
