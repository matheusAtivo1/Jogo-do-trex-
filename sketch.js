var PLAY=1;
var END=0;
var gameState = PLAY;
var restart,restartImg,gameOver,gameOverImg;
var ground,groundImg;
var trex ,trex_running,trex_collided;
var invisibleGround;
var cloud,cloudImg;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score;
var obstaclesGroup,cloudsGroup;
var jumpSound,checkPointSound,dieSound;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
groundImg = loadImage("ground2.png");
cloudImg = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
jumpSound = loadSound("jump.mp3");
checkPointSound = loadSound("checkpoint.mp3");
dieSound= loadSound("die.mp3");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //crie um sprite de trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.x =50;
  trex.addAnimation("collided",trex_collided);
  trex.scale =0.5;
ground = createSprite (width/2,height-10,width,20);
ground.addImage (groundImg);
invisibleGround = createSprite (width/2,height-10,width,10);
invisibleGround.visible = false;
restart = createSprite (width/2,height/2);
restart.addImage (restartImg);
restart.scale = 0.75;
gameOver = createSprite(width/2,height/2-50);
gameOver.addImage (gameOverImg);
gameOver.scale = 0.75;
score=0;
obstaclesGroup =new  Group();
cloudsGroup = new Group();
trex.debug = false;
trex.setCollider("rectangle",0,0,40,40);
}

function draw(){
  background("white");

if(gameState === PLAY){
  
  score =score +Math.round(getFrameRate()/60);
  gameOver.visible= false;
  restart.visible= false;
    ground.velocityX= -(7+5*score/100);
  if(ground.x<0){
  ground.x = ground.width /2.7;
  
  }
  if(score>0 && score%500===0){
checkPointSound.play();
  }
  if (touches.length>0 || keyDown("space")&&trex.y>=615){
    touches = [];
    trex.velocityY =-10;
    jumpSound.play();
      }
      
    trex.velocityY +=0.5;
    spawnClouds();
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)){

      gameState = END;
      dieSound.play();
      }
}else if(gameState === END){
ground.velocityX =0;
trex.velocityY =0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided",trex_collided);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
gameOver.visible= true;
restart.visible= true;
if(mousePressedOver(restart)){
reset();
}
}





//console.log(trex.y);
  

  





trex.collide(invisibleGround);









  drawSprites();
  text("score: "+score,1200,75);
  text("Matheus ",1200,50)
}
function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running",trex_running);
score = 0;



}
 
function spawnClouds(){
  if(frameCount % 70 ===0){
cloud = createSprite (width+20,height -300,40,10);
cloud.velocityX -=6;
cloud.addImage (cloudImg);
cloud.y = Math.round(random(100,220));
cloud.depth = trex.depth;
trex.depth = trex.depth+1;
cloud.lifetime = 300;
cloudsGroup.add(cloud);
}


}

function spawnObstacles(){
if(frameCount % 60 ===0){
obstacle = createSprite (width,height-20,10,40);
obstacle.scale =0.5;
obstacle.velocityX =-(7+score/100);
var rand=Math.round(random(1,6));
switch(rand){
case 1:obstacle.addImage(obstacle1);
break;
case 2:obstacle.addImage(obstacle2);
break;
case 3:obstacle.addImage(obstacle3);
break;
case 4:obstacle.addImage(obstacle4);
break;
case 5:obstacle.addImage(obstacle5);
break;
case 6:obstacle.addImage(obstacle6);
break;
default:break;
}
obstacle.lifetime= 300;
obstaclesGroup.add(obstacle);
}


}

















