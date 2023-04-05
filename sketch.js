//declarando as variáveis
var trex, trexRunning, trexCollided
var ground, groundImage
var cloudImage, cloudsGroup
var c1, c2, c3, c4, c5, c6, obstaclesGroup
var score = 0
const play = 0
const end = 1
var gameState = play
var gameOver, gameOverImg, restart, restartImg
var jump, die, checkpoint
var isDead = false

//preload carrega as mídias do jogo
function preload() {
  //criando animação do trex correndo
  trexRunning = loadAnimation("./images/trex3.png", "./images/trex4.png")

  groundImage = loadImage("./images/ground2.png")
  cloudImage = loadImage("./images/cloud.png")
  c1 = loadImage("./images/obstacle1.png")
  c2 = loadImage("./images/obstacle2.png")
  c3 = loadImage("./images/obstacle3.png")
  c4 = loadImage("./images/obstacle4.png")
  c5 = loadImage("./images/obstacle5.png")
  c6 = loadImage("./images/obstacle6.png")
  trexCollided = loadAnimation("./images/trex_collided.png")
  gameOverImg = loadImage("./images/gameOver.png")
  restartImg = loadImage("./images/restart.png")

  jump = loadSound("./sounds/jump.mp3")
  die = loadSound("./sounds/die.mp3")
  checkpoint = loadSound("./sounds/checkPoint.mp3")
}


//setup faz a configuração
function setup() {
  createCanvas(600, 200)

  //sprite trex
  trex = createSprite(50, 160, 20, 50)
  //adcionando animação ao trex
  trex.addAnimation("running", trexRunning)
  trex.addAnimation("collided", trexCollided)
  trex.scale = 0.4
  //trex.debug = true
  trex.setCollider("rectangle", 0, 0, 50, 100, 40 )
    //sprite Solo
  ground = createSprite(300, 190, 600, 20)
  ground.depth = trex.depth - 1
  ground.addImage("ground", groundImage)
  invisibleGround = createSprite(200, 195, 400, 10)
  invisibleGround.visible = false

  cloudsGroup = new Group()
  obstaclesGroup = new Group()

  gameOver = createSprite(300, 80, 50, 50)
  gameOver.visible = false
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.7

  restart = createSprite(300, 120, 50, 50)
  restart.addImage(restartImg)
  restart.visible = false
  restart.scale = 0.5



}

//draw faz o movimento, a ação do jogo
function draw() {
  background(190)
  text("Score: " + score, 500, 25)
  trex.velocityY += 0.7
  trex.collide(invisibleGround)


  if (gameState == play) {

    score = Math.round(frameCount / 1.7)

    ground.velocityX = -(3 + 3*score/100)

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -9
      jump.play()


    }

    generateClouds()

    generateObs()

    if(frameCount % 170 == 0) {
      checkpoint.play()
    }
  }

 

  if (trex.isTouching(obstaclesGroup)) {
    gameState = end
    if(!isDead) {
      die.play()
      isDead = true
    }
  }

  

  console.log(frameCount)

  if (gameState == end) {
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    gameOver.visible = true
    restart.visible = true
    trex.changeAnimation("collided")
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
  }
  /////////////////////////////////////////////////////////////////////////// 


  //coordenadas do mouse na tela
  text("X: " + mouseX + " / Y: " + mouseY, mouseX, mouseY)
  drawSprites()

}

function generateClouds() {


  if (frameCount % 360 == 0) {
    var cloud = createSprite(650, 30, 20, 20)
    cloud.velocityX = -(3 + 3*score/100)
    cloud.addImage(cloudImage)
    cloud.scale = random(0.3, 0.6)
    cloud.y = random(20, 60)
    cloud.depth = trex.depth - 1
    cloud.lifetime = 700
    cloudsGroup.add(cloud)

  }
}
function generateObs() {
  if (frameCount % 75 == 0) {
    var cactus = createSprite(650, 170, 20, 20)
    cactus.velocityX = -(4 + 3*score/100)
    obstaclesGroup.add(cactus)
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: cactus.addImage(c1)
        cactus.scale = 0.65
        break
      case 2: cactus.addImage(c2)
        cactus.scale = 0.55
        break
      case 3: cactus.addImage(c3)
        cactus.scale = 0.60
        break
      case 4: cactus.addImage(c4)
        cactus.scale = 0.45
        break
      case 5: cactus.addImage(c5)
        cactus.scale = 0.4
        break
      case 6: cactus.addImage(c6)
        cactus.scale = 0.35
        break
      default: break
    }
    //cactus.scale = 0.4
    cactus.lifetime = 200
  }
}