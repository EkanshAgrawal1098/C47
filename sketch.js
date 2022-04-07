var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTop1,obsTop2,obsTopImg
var obsBottom1,obsBottom2,obsBottom3
var gameOver,gameOverImg;
var restart,restartImg;
var backgroundImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  bgImg = loadImage("assets/bg.png");
  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");
  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");
  gameOverImg = loadImage("assets/GameOverColour.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.mp3");
  dieSound= loadSound("assets/die.mp3");
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
  //background image
  bg = createSprite(165,485,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  //creating top and bottom grounds
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
        
  //creating balloon     
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.2;

  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();
  barGroup = new Group();

  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.1;
  gameOver.visible = false;

  restart = createSprite(200,270);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  restart.visible = false;
}

function draw() {
  background("black");

  if(gameState === PLAY){
     //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;
     //Calling the Bar function
     Bar();
     //Calling The Top And Bottom Obstacle Function
     spawnObstaclesTop();
     spawnObstaclesBottom();
     //Condition For Ending The Game
     if(balloon.isTouching(topGround) || balloon.isTouching(bottomGround) || topObstaclesGroup.isTouching(balloon) || bottomObstaclesGroup.isTouching(balloon)){
       gameState = END;
       dieSound.play();
     }
  }
  if(gameState === END){
     gameOver.visible = true;
     restart.visible = true;
     balloon.velocityX = 0;
     balloon.velocityY = 0;
     topObstaclesGroup.setVelocityXEach(0);
     bottomObstaclesGroup.setVelocityXEach(0);
     barGroup.setVelocityXEach(0);
     topObstaclesGroup.setLifetimeEach(-1);
     bottomObstaclesGroup.setLifetimeEach(-1);
     balloon.y = 200;
     if(mousePressedOver(restart)){
       reset();
     }
  }
        drawSprites();
        Score();
        
}
function reset(){
   gameState = PLAY;
   gameOver.visible = false;
   restart.visible = false;
   score = 0;
   topObstaclesGroup.destroyEach();
   bottomObstaclesGroup.destroyEach();
}

function spawnObstaclesTop(){
  if(World.frameCount%60 === 0){
    obstacleTop = createSprite(400,50,40,50);
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;
    obstacleTop.y = Math.round(10,100);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacleTop.addImage(obsTop1);
       break;
      case 2: obstacleTop.addImage(obsTop2);
       break;
      default: break;
    }
    obstacleTop.lifetime = 100;
    balloon.depth = balloon.depth+1;
    topObstaclesGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom(){
  if(World.frameCount%60 === 0){
    obstacleBottom = createSprite(400,350,40,50);
    obstacleBottom.scale = 0.1;
    obstacleBottom.velocityX = -4;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacleBottom.addImage(obsBottom1);
        break;
      case 2: obstacleBottom.addImage(obsBottom2);
        break;
      case 3: obstacleBottom.addImage(obsBottom3);
        break;
      default: break;
    }
    obstacleBottom.lifetime = 100;
    balloon.depth = balloon.depth+1
    bottomObstaclesGroup.add(obstacleBottom);

  }
}

function Bar(){
  if(World.frameCount%60 === 0){
    var bar = createSprite(400,200,10,800);
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
    barGroup.add(bar);

  }
}

function Score(){
  if(balloon.isTouching(barGroup)){
    score = score+1;
  }

  textSize(30);
  fill("yellow");
  text("Score: "+score,250,50);

}