const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine,world;

var alien,grass;
var alienimg,grassimg;
var ground,ground2;
var edges;
var score = 0;
var gameState = 0;
var mySound;
var PLAY = 0;
var END = 1;


function preload(){
alienimg = loadImage("alien.png");
grassimg = loadImage("grass.png");
}

function setup() {
  createCanvas(600,600);
  engine = Engine.create();
  world = engine.world;
  
  ground = createSprite(250,590,1000,20);
  ground.shapeColor = "blue";

  ground = createSprite(250,10,1000,20);
  ground.shapeColor = "blue";

  alien = createSprite(300,70);
  alien.addImage(alienimg);
  alien.scale = 0.3;

  grass = createSprite(200,380);
  grass.addImage(grassimg);
  grass.scale = 0.3;

  mySound = new Audio("UFO.mp3");
  
}

function draw() {
  background("black");

  if(gameState===0){
  edges = createEdgeSprites();
  alien.bounceOff(edges[0]);
  alien.bounceOff(edges[1]);

  mySound.play();

  grass.velocityY = -4;

  if(keyDown("RIGHT_ARROW")){
    alien.velocityX = 4;
  }
  if(keyDown("LEFT_ARROW")){
    alien.velocityX = -4;
  }

  stroke("black");
  textSize(22);
  fill("white");
  text("Score: "+score,25,50);
  text("Tip: Eat the Grass",400,550);
  text("Get 10 points to win",50,550);

  if(grass.isTouching(alien)){
    grass.x = random(30,560);
    grass.y = 400
    score = score+1
  }

  if(score===3&&score!==0){
    fill("white");
    textSize(30);
    text("Nice!",250,300);
  }
  if(score===6&&score!==0){
    fill("wite");
    textSize(30);
    text("Good!",250,300);
  }
  if(score===9&&score!=0){
    fill("white");
    textSize(30);
    text("Amazing!",250,300);
  }

}
   if(score===10){
     finish();
   }

  if(grass.y<0){
   finish();
  }
if(gameState===1){
  mySound.pause();
}

  drawSprites();
}
function finish(){
  background("red");
  textSize(30);
  fill("black");
  //text("YOU LOST!",225,300);
  text("Well Played!",225,300);
  alien.destroy();
  grass.destroy();
  gameState=1;
}