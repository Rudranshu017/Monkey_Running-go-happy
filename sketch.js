var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var bananaGroup, ObstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(20,300,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200,320,400,20);
 
  bananaGroup = new Group();
  ObstacleGroup = new Group();
 
}


function draw() {
  background("white");
 
  if(gameState === PLAY) {
    
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    ground.velocityX = 0;
  
   spawnBanana();
  spawnObstacle();
  
    
    stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime: "+survivalTime, 100, 50);
  if(keyDown("space") && monkey.y >= 270) {
      monkey.velocityY = -12; 
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
     monkey.collide(ground);
  }
  
   if(ObstacleGroup.isTouching(monkey)) {
     gameState = END;
   }
 
 if(gameState === END) {
   ground.velocityX = 0;
   monkey.velocityY = 0;
   ObstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
   survivalTime = survivalTime + 0;
   
   ObstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
 }
drawSprites();
  
}

function spawnBanana() {
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(150,100,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    bananaGroup.add(banana);
  }
}
function spawnObstacle() {
 
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(200,300,40,10);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
    
    //add each cloud to the group
    ObstacleGroup.add(obstacle);
  }
}
 


