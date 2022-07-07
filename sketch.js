 //aqui se crean las variables//
 var piso, piso_texture; 
 var trex ,trex_running, trex_perdido;
 var nubes, nube_textura;
 var piso_invisible;
 var cactus, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
 var marcador = 0;
 var gameState = play;
 var play;
 var end;
 var restart_imagen, restart_texture;
 var gameover, gameover_texture;
 var checkpoint, checkpoint_sonido;
 var die, die_sonido;
 var jump, jump_sonido;
 var mensaje = "este es mi mensaje";
function preload(){

  //aquí cargo imagenes y sonidos//
 //trex_running = loadImage("trex1.png");//
 trex_running = loadAnimation (" trex1.png", "trex3.png", "trex4.png");
 trex_perdido = loadAnimation ("trex_collided.png");
 piso_texture = loadImage ("ground2.png");
 nube_textura = loadImage ("cloud.png");
 cactus1 = loadImage ("obstacle1.png");
 cactus2 = loadImage ("obstacle2.png");
 cactus3 = loadImage ("obstacle3.png");
 cactus4 = loadImage ("obstacle4.png");
 cactus5 = loadImage ("obstacle5.png");
 cactus6 = loadImage ("obstacle6.png");
 restart_texture = loadImage ("restart.png");
 gameover_texture = loadImage ("gameOver.png");
 checkpoint_sonido = loadSound ("checkpoint.mp3");
 die_sonido =loadSound ("die.mp3");
 jump = loadSound ("jump.mp3");
}

function setup(){
  createCanvas(1000,200)
 //aqui se crea y pone las coordenadas//
  piso = createSprite (200, 190 , 1200, 10);
  piso.addImage(piso_texture);
  //piso invisible//
  piso_invisible = createSprite (200, 194 , 400, 10);
  piso_invisible.visible = false;
  //crear sprite de Trex
  trex =  createSprite (100, 166, 20, 100);
  //trex.addImage(trex_running);//
  trex.scale = 0.5
  trex.addAnimation ("corriendo", trex_running);
  trex.addAnimation ("perdido", trex_perdido);
  var rand = Math.round(random(1,100))
  //console.log (rand);  

 cactus_grupo = new Group ();
 nubes_grupo = new Group ();



 //sprites//
 gameover = createSprite (300,100);
 restart_imagen = createSprite (300,140);
 //menu fin//
 restart_imagen.addImage(restart_texture);
 gameover.addImage(gameover_texture);
 //escala
 restart_imagen.scale =0.3;
 gameover.scale = 0.5;
 //trex debug//
//trex.debug = true
trex.setCollider ("circle", -10, 0, 40);
}

function draw(){
background("white")

console.log (mensaje);


 if (gameState === play){
    console.log ("play");

    if (keyDown ("space")  && trex.y >= 160 ) {
     trex.velocityY = -11.46;
     jump.play();
    }
   trex.velocityY = trex.velocityY + 0.44;

   piso.velocityX = -(3 + 3  * marcador/ 800);;

   if (cactus_grupo.isTouching (trex)){
    gameState = "end";
    die_sonido.play();
   }
    //sonido checkpont
    if (marcador > 0 && marcador % 800 === 0){
     checkpoint_sonido.play();
    }

   nubes();
   cactus_aleatorios();

   if(piso.x<0){
     piso.x=piso.width/2; }
   //visibilidad
   gameover.visible = false;
   restart_imagen.visible = false;

   //marcador
   marcador = marcador + Math.round (frameCount/60);
     // sonido impacto
    
  

}

 

  if (gameState === "end"){
    trex.velocityY = 0;
   console.log ("end");
    piso.velocityX = 0;
    background("red");
   cactus_grupo.setVelocityXEach(0);
   nubes_grupo.setVelocityXEach(0);
 //visibilidad
  gameover.visible = true;
  restart_imagen.visible = true;

  cactus_grupo.setLifetimeEach (-1);
  nubes_grupo.setLifetimeEach (-1);

  //trex
  trex.changeAnimation ("perdido", trex_perdido);
  trex.scale = 0.48;

   

  }

 // °°°°°° fuera de los game states °°°°°°°//
  trex.collide (piso_invisible);

 //marcador
 text("Marcador:" + marcador ,880,50);
 
 
//boton reinicio
if (mousePressedOver (restart_imagen)){
  resetear();
}

drawSprites();
}

function nubes (){
  
if(frameCount % 120 === 0){
  nube = createSprite (1005, 60 , 40, 10);
  nube.velocityX = -3;
  nube.addImage(nube_textura);
  nube.scale = 0.6;
  nube.y = Math.round (random(10,80))
  console.log("profundidad del trex"  +  trex.depth , "profundidad de las nubes" + nube.depth)
  nube.depth = trex.depth ;
  trex.depth = trex.depth +1;

  nube.lifetime = 300;

  nubes_grupo.add(nube);
}
}

function cactus_aleatorios (){
 if(frameCount % 70 === 0){
  var cactus = createSprite (600, 170, 10, 40);
  cactus.velocityX = -(3 + marcador/ 800);
  var rand = Math.round(random(1,6)) 
  switch (rand){
  case 1: cactus.addImage(cactus1); 
  break; 
  case 2: cactus.addImage(cactus2); 
  break; 
  case 3: cactus.addImage(cactus3); 
  break; 
  case 4: cactus.addImage(cactus4); 
  break; 
  case 5: cactus.addImage(cactus5); 
  break; 
  case 6: cactus.addImage(cactus6); 
  break; 
  default: break;


}

cactus.scale = 0.5;
cactus.lifetime = 300;

cactus_grupo.add(cactus);
}
}


function resetear (){
  gameState = play;
  gameover.visible = false;
  restart_imagen.visible = false;
  cactus_grupo.destroyEach();
  nubes_grupo.destroyEach();
  trex.changeAnimation ("corriendo");
  marcador = 0;
  
 
 
}

