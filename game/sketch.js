//list of variables
let player, walls, coin;
let block, floor, screen;
let playerImg, candleImg;
let coinImg, blockImg;
let coinGrab,winSound;
let ghostSound, soundLoop;
let counter = 50;
let candles = [];
let score = 0;
var num = 60;
var x = [];
var y = [];

//preload images
function preload() {
  playerImg = loadImage('assets/ghost.png');
  coinImg = loadImage('assets/soul.png')
  blockImg = loadImage('assets/block.png')
  img = loadImage('assets/candle.png')
  coinGrab = loadSound('assets/coinGrab.mp3')
  ghostSound = loadSound('assets/ghostSound.mp3')
  winSound = loadSound('assets/winSound.mp3')
}

//class for obstacles
class Obstacle{
  constructor(x, y, w, h) {
    //this.x = 200;
    //this.y = 150;
    this.sprite = new Sprite(x, y, w, h, "static")
  }
}

//function resets game
function resetPlayer() {
  player.y = 20;
  player.x = 20;
  player.w = 20;
  player.h = 20;
  score = 0;
}

//function adds score
function addScore() {
  score += 1;
}

function display() {
  screen = new Sprite();
  screen.color = "green";
}


//setup function
function setup() {
	createCanvas(700, 600);
    noStroke();
  
    ghostSound.loop();

  
    //mouse array
    for (var i = 0; i < num; i++) {
    x[i] = 0;
    y[i] = 0;
  }
  
      //sideways.obstacle list
    obstacle1 = new Obstacle(60, 110, 30, 200);  //1
    obstacle2 = new Obstacle(50, 400, 30, 270);  //2
    obstacle3 = new Obstacle(60, 575, 30, 45);   //3
    obstacle4 = new Obstacle(140, 212, 30, 350); //4
    obstacle5 = new Obstacle(145, 500, 30, 190); //5
    obstacle6 = new Obstacle(215, 40, 30, 60);   //6
    obstacle7 = new Obstacle(220, 230, 30, 300); //7
    obstacle8 = new Obstacle(225, 510, 30, 170)  //8
    obstacle9 = new Obstacle(300, 190, 30, 215); //9
  
    obstacle10 = new Obstacle(310, 470, 30, 215); //10
    obstacle11 = new Obstacle(380, 195, 30, 350); //11
    obstacle12 = new Obstacle(390, 515, 30, 160); //12
    obstacle13 = new Obstacle(460, 330, 30, 500); //13
    obstacle14 = new Obstacle(540, 230, 30, 450); //14
    obstacle15 = new Obstacle(530, 560, 30, 115); //15
    
    
    //sprite for player
    player = new Sprite(250, 100, 100, 'pentagon');
    player.y = 20;
    player.x = 20;
    player.w = 20;
    player.h = 20;
    player.addImage(playerImg);
    player.rotation = 35;
    player.rotationLock = true;
    

    //the border around the game
	let wall = new Sprite(300, 300, 600, 600);
    wall.collider = 'static';
	wall.shape = 'chain';
    
    //floor/game blockers
    push();
    world.gravity.y = 5;
    block = new Sprite(50, 250, 10, 10);
    block.addImage(blockImg);
    
    block1 = new Sprite(300, 40, 10, 10);
    block1.addImage(blockImg);
    block2 = new Sprite(310, 300, 10, 10);
    block2.addImage(blockImg);
    block3 = new Sprite(460, 50, 10, 10);
    block3.addImage(blockImg);
    block4 = new Sprite(530, 500, 10, 10);
    block4.addImage(blockImg);
  
    floor = new Sprite(50, 265, 30, 5, 'static');
    floor1 = new Sprite(300, 80, 30, 5, 'static');
    floor2 = new Sprite(310, 360, 30, 5, 'static');
    floor3 = new Sprite(460, 80, 30, 5, 'static');
    floor4 = new Sprite(530, 505, 30, 5, 'static');
    pop();
  
    //collectible.coins
    coin = new Sprite(20,random(0,500),random(10,20), 'static');
    coin.addImage(coinImg);
    coin1 = new Sprite(90,random(0,500),random(10,20),'static');
    coin1.addImage(coinImg);
    coin2 = new Sprite(180,random(0,500),random(10,20), 'static');
    coin2.addImage(coinImg);
    coin3 = new Sprite(270,random(0,500),random(10,20), 'static');
    coin3.addImage(coinImg);
    coin4 = new Sprite(350,random(0,500),random(10,20), 'static');
    coin4.addImage(coinImg);
    coin5 = new Sprite(570,570,[10,-72, 10, 144, 5], 'static');
    coin5.addImage(coinImg);
  
   //array/loop for candles
  for (var c = 0; c < 50; c++) {
    candles[c] = {
      x: random(0, width),
      y: random(0, height),
      display: function() {
        image(img,this.x, this.y, 24, 24);
      },
      move: function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
      }
    }
  }
  
}


//draw function
function draw() {
	background(90);
    
      if (score > 5) {
    winSound.play();
  }
  
  for (var c = 0; c < candles.length; c++) {
    candles[c].move();
    candles[c].display();
  }
  
  
  
  //array for mouse
  for (var i = num-1; i > 0; i--) {
    x[i] = x[i-1];
    y[i] = y[i-1];
  }
  x[0] = mouseX;
  y[0] = mouseY;
  for (var i = 0; i < num; i++) {
    fill(i * 237, 200, 90);
    ellipse(x[i], y[i],i/2, i/2);
  }
  
    //timer
    push();
    counter -= 1/60;
    fill(73,38,90);
    translate(650,20);
    textSize(20);
    text(round(counter),0, 0);
    if(counter <= 0) {
    counter = 0;
    resetPlayer();
    }
    pop();
  
    // score display
    push();
    fill(73,38,90);
    translate(80,20);
    textSize(20);
    text(score,0, 0);
    pop();
  
    push();
    fill(73,38,90);
    translate(20,20);
    textSize(20);
    text('score:', 0, 0);
    pop();
  
    push();
    fill(73,38,90);
    translate(180,20);
    textSize(20);
    text('Collect all 6 souls in the maze', 0, 0);
    pop();

    //player movement
    player.moveTowards(mouse, 0.05);
  
    //if statement for adding score
    if (player.overlaps(coin)) {
        addScore();
        coinGrab.play();
    }
    if (player.overlaps(coin1)) {
        addScore();
        coinGrab.play();
    }
    if (player.overlaps(coin2)) {
        addScore();
        coinGrab.play();
    }
    if (player.overlaps(coin3)) {
        addScore();
        coinGrab.play();
    }
    if (player.overlaps(coin4)) {
        addScore();
        coinGrab.play();
    }
    if (player.overlaps(coin5)) {
        addScore();
        coinGrab.play();
    }
    
    //if statement for game reset
     if (player.overlaps(block)) {
        player.x = 20;
        player.y = 240;
     } 
    if (player.overlaps(block1)) {
      player.x = 290;
      player.y = 180;
    }
    if (player.overlaps(block2)) {
      player.x = 305;
      player.y = 465;
    }
    if (player.overlaps(block3)) {
      player.x = 450;
      player.y = 320;
    }
   if (player.overlaps(block4)) {
     player.x = 520;
     player.y = 550;
  }
    
    //camera
    camera.on();
    camera.zoom = 3;
	camera.x = player.x;
	camera.y = player.y;
  
    //removes coins
    if (player.overlaps(coin))  coin.remove();
    if (player.overlaps(coin1)) coin1.remove();
    if (player.overlaps(coin2)) coin2.remove();
    if (player.overlaps(coin3)) coin3.remove();
    if (player.overlaps(coin4)) coin4.remove();
    if (player.overlaps(coin5)) coin5.remove();
  
    //start/finsih text
    text("START", 3, 45);
    text("FINISH", 552, 600)
  
    //block movement
    if (block.colliding(floor) > 10) {
		block.vel.y = -10;
        
        
	}
    if (block1.colliding(floor1) > 8) {
		block1.vel.y = -10;
	}
    if (block2.colliding(floor2) > 10) {
		block2.vel.y = -10;
	}
    if (block3.colliding(floor3) > 12) {
		block3.vel.y = -12;
	}
    if (block4.colliding(floor4) > 9) {
		block4.vel.y = -7;
	}
  
  //play again
  if (key == ' ') {
    resetPlayer();
  }
  if (key == ' ') {
    score = 0;
  }
}