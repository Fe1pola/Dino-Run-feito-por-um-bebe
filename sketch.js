//variáveis

var pre_map, map, ground;
var pre_sky, sky;
var pre_dino, dino, pre_running_dino, running_dino;

var score = 0;

var edges;

var pre_meteor, meteor, meteorGroup;
var pre_warning, warning;

var dieS;

var pre_died, died;

var gameState = "booting";

//pre carregar imagens
function preload(){
  pre_map = loadImage("Fundo Terreno 1 (teste 2).png");
  pre_sky = loadImage("Fundo Céu 2 (teste 2).png");
  pre_dino = loadImage("Dinin (teste).png");
  pre_running_dino = loadAnimation("Dinin (teste).png", "Dino Animation (1).png");
  pre_meteor = loadImage("meteourzaum.png");
  pre_warning = loadImage("warning sign animation 1.png");
  dieS = loadSound("crocodile spinning in 4K! (online-audio-converter.com).mp3");
  pre_died = loadImage("Lost.png");
}

//criar sprites
function setup(){
  createCanvas(400,300)
  
  map = createSprite(200,235, 20,20);
  map.addImage(pre_map);
  map.depth = 5;
  
  ground = createSprite(200,277,800,46);
  ground.visible = false;
  
  sky = createSprite(200,150,20,20);
  sky.addImage(pre_sky);
  sky.depth = 3;
  
  dino = createSprite(45,227,20,20);
  dino.addImage(pre_dino);
  dino.scale = 0.4;
  dino.depth = 6;
  
  running_dino = createSprite(45,227,20,20);
  running_dino.addAnimation("running", pre_running_dino);
  running_dino.scale = 0.4;
  running_dino.depth = 6;
  running_dino.visible = false;
  
  died = createSprite(200,70,20,20);
  died.addImage(pre_died);
  died.scale = 1.3;
  died.visible = false;
  
  edges = createEdgeSprites();
  
  meteorGroup = new Group();
}

function backgrounds(){
  if(gameState == "playing"){
  map.velocityX = -3;
    if(map.x <= 0){
       map.x = map.width/2;
  }
  
  sky.velocityX = -1;
    if(sky.x <= 0){
      sky.x = sky.width/2;
    } 
  }
}

//game loop
function draw(){
  //requestFocus();
  move();
  record();
  backgrounds();
  meteorSpawn();
  background("black");
  
  running_dino.velocityY++;
  dino.bounce(edges);
  running_dino.bounce(edges);
  running_dino.collide(ground);
  
  if(keyDown("w") && running_dino.y >= 226){
    running_dino.velocityY = -12;
  }
  
  if(gameState == "playing"){
    dino.visible = false;
    running_dino.visible = true;
  }
  
  //cool isão
  if(meteorGroup.isTouching(running_dino)){
    gameState = "stopped";
    map.velocityX = 0;
    sky.velocityX = 0;
    dino.x = running_dino.x;
    dino.y = running_dino.y;
    dino.visible = true;
    running_dino.visible = false;
    dino.rotationSpeed = 25;
    meteorGroup.destroyEach();
    died.visible = true;
    dieS.play();
     }
  
  //reinicar
  if(gameState == "stopped" && keyDown("r")){
    gameState = "playing";
    died.visible = false;
    running_dino.x = 45;
    running_dino.y = 227;
    dino.visible = false;
    score = 0;
  }
  
  
  drawSprites();
  
  textSize(20);
  fill(rgb(0,0,0));
  text("Score: " + score, 5,120);
}

function meteorSpawn(){
  if(gameState == "playing"){
  if(frameCount%30 == 0){
    meteor = createSprite(200, -150,20,20);
    meteor.addImage(pre_meteor);
    meteorGroup.add(meteor);
    meteor.rotationSpeed = 20;
    meteor.scale = random(0.6, 1);
    meteor.velocityY = 2;
    meteor.lifetime = 200;
    meteor.depth = 4;
    meteor_raffle = Math.round(random(1,9));
    switch(meteor_raffle){
      case 1: meteor.x = 35;
        break;
      case 2: meteor.x = 85;
        break;
      case 3: meteor.x = 125;
        break;
      case 4: meteor.x = 165;
        break;
      case 5: meteor.x = 215;
        break;
      case 6: meteor.x = 255;
        break;
      case 7: meteor.x = 315;
        break;
      case 8: meteor.x = 355;
        break;
      case 9: meteor.x = 385;
        break;
      }
    warning = createSprite(meteor.x,25,20,20);
    warning.addImage(pre_warning);
    warning.scale = 1.3;
    warning.lifetime = 55;
    }
  }
}

function record(){
  if(gameState == "playing"){
  if(gameState == "playing"){
    score++;
    }
  }
}

function move(){
  var spd = 5;
  
  if(gameState == "playing"){
  if(keyDown("d")){
    running_dino.x += spd;
  }else if(keyDown("a")){
    running_dino.x -= spd;
  }
}
  
  if(keyDown("enter")){
    gameState = "playing";
  }
}
