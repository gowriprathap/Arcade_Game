var t;
var score = 0;
var moves = 0;
moveChanger();
//scoreDiv.innerHTML = 'Score ' + score;
//updateDisplay();
//var numberOfCollisions = 0;
var moves = 0;
var seconds = 0; //seconds for timer
var minutes = 0; //minutes for timer
var hours = 0;
var Enemy = function(x, y, speed)
{
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'img2/enemy-bug.png';
};
Enemy.prototype.update = function(dt){
  this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    this.Collision();
};
Enemy.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.Collision = function() {
    if (player.y == this.y && player.x <= this.x + 63 && player.x + 65 >= this.x) //taking into account the width of the player
    {
        console.log('collision');
        gameOver();
        //moves++;
        if (score == 3){
          gameOverFinal();
        }
        gameReset();
    }
};
var Player = function(x, y, speed)
{
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'img2/char-boy.png';
};

Player.prototype.update = function(){};
Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key){
  if (key == 'left')
  {
    if (moves == 0)
    {
      timer1();
    }
    this.x -= 101;
    if (this.x < -50)
    {
      this.x = 505;
    }
    moves++;
    moveChanger();
    //console.log(moves);
  }
else if (key == 'right')
  {
    if (moves == 0)
    {
      timer1();
    }
    this.x += 101;
    if (this.x >= 550)
    {
      this.x = 0;
    }
    moves++;
    moveChanger();
  }
  else if (key == 'up' && this.y > -35){
    if (moves == 0)
    {
      timer1();
    }
    //console.log(380 - (Math.floor(((Math.random()+1) * 3) - 1) * 83));
    if (this.y == 48)
    {
      console.log("You won");
      wonGame();
    }
    moves++;
    moveChanger();
    this.y -= 83;
    }
    else if (key == 'down' && this.y < 380)
    {
      if (moves == 0)
      {
        timer1();
      }
      this.y += 83;
      moves++;
      moveChanger();
    }
}
Player.prototype.reset = function() {
    this.x = 203;
    this.y = 380;
};

var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(203, 380, 50); //203, 380, 50
//var enemy = new Enemy(100, 100, 50);
function moveChanger(){
document.getElementById('moves1').innerHTML = moves + " moves";
}
var scoreDiv = document.createElement('div');
gameReset(); // setup defaults
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
var score = 0;
function gameReset() {
    player.reset();
    //score = 0;
    updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, 214, Math.random() * 100 + 100),
        new Enemy(0, 131, Math.random() * 100 + 100),
        new Enemy(0, 48, Math.random() * 100 + 100),
        new Enemy(0, 380 - (Math.floor(((Math.random()+1) * 3) - 1) * 83), Math.random() * 100 + 50),
        new Enemy(0, 380 - (Math.floor(((Math.random()+1) * 3) - 1) * 83), Math.random() * 100 + 50),

    );
}


function gameOver() {
    player.reset();
    score = score + 1;
    console.log(score);
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

/*
 * updates the on screen score display
 */
function updateDisplay() {
  console.log(score);
    scoreDiv.innerHTML = 'Score ' + score;
}

        function wonGame() //after all cards match
        {
          //clearTimeout(t);
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
        function gameOverFinal(){
          console.log('hello')
          //clearTimeout(t);
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
                minutes++;
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
              t = setTimeout(add, 1000);
            }
        timer();
        }
