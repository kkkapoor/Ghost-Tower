var tower,tower_img;
var ghost,ghost_standing;
var door,door_img;
var doorGroup;
var climber_img,climberGroup;
var rand;
var invisibleBlock;
var invisibleGroup;
var gameState = "Play";
var spookySound;

function preload() {
  tower_img = loadImage("tower.png");
  ghost_standing = loadImage("ghost-standing.png");
  door_img = loadImage("door.png");
  climber_img = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("t",tower_img);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("g",ghost_standing);
  ghost.scale=0.3;
  
  
  spookySound.play();
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw() { 
  
  background("black");
 
  
  if(gameState === "Play"){
    if(tower.y>400){
    tower.y = 300
  }
  
     spawnDoors();
  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x-3;
  }
  
   if(keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  ghost.velocityY= ghost.velocityY + 0.8;
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if(invisibleGroup.isTouching(ghost)|| ghost.y>600){
      gameState = "End"
    }
     drawSprites();
  }
  if(gameState === "End"){
    ghost.destroy();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",200,200);
    spookySound.stop();
    
    
  }
  
 
}

function spawnDoors() {
  if(frameCount % 240 === 0){
    door = createSprite(200,-50,10,10);
    door.addImage("d",door_img);
    door.velocityY = 1;
    doorGroup.add(door);
    door.lifetime=800;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    
    rand = Math.round(random(50,400));
      door.x = rand;
    
    var climber = createSprite(200,10,10,10);
    climber.addImage("c",climber_img);
    climber.velocityY= 1;
    climberGroup.add(climber);
    climber.x=door.x;
    climber.lifetime=800;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleGroup.add(invisibleBlock);
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlock.x = door.x;
  }
}