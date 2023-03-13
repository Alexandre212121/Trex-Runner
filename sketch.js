//declarando as variáveis
var trex, trexRunning
var ground

//preload carrega as mídias do jogo
function preload(){
  //criando animação do trex correndo
  trexRunning = loadAnimation("./images/trex3.png","./images/trex4.png")
}


//setup faz a configuração
function setup(){
  createCanvas(600,200);

  //sprite trex
  trex = createSprite(50,160,20,50)
  //adcionando animação ao trex
  trex.addAnimation("running",trexRunning)
  trex.scale = 0.5
  //sprite Solo
  ground = createSprite(300,190,600,20)
  
  //criando bordas
 
  
}

//draw faz o movimento, a ação do jogo
function draw(){
  background("lightgray");

  //pulo do trex

  if(keyDown("space")) {
  trex.velocityY = -7

}

trex.velocityY += 0.5
trex.collide(ground)






 
  //coordenadas do mouse na tela
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  drawSprites();
}
