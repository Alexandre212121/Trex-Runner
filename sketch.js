//declarando as variáveis
var trex, trexRunning, trexCollided
var ground, groundImage
var cloudImage, cloudsGroup
var c1, c2, c3, c4, c5, c6, obstaclesGroup
var score = 1
const play = 0
const end = 1
var gameState = play
var gameOver, gameOverImg, restart, restartImg
var jump, die, checkpoint
var isDead = false
var highscore = 0

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
  createCanvas(windowWidth, windowHeight)

  //sprite trex
  trex = createSprite(50, height-40, 20, 50)
  //adcionando animação ao trex
  trex.addAnimation("running", trexRunning)
  trex.addAnimation("collided", trexCollided)
  trex.scale = 0.4
  //trex.debug = true
  trex.setCollider("rectangle", 0, 0, 50, 100, 40 )
    //sprite Solo
  ground = createSprite(width/2, height-30, width, 20)
  ground.depth = trex.depth - 1
  ground.addImage("ground", groundImage)
  invisibleGround = createSprite(width/2, height-20, width, 10)
  invisibleGround.visible = false

  cloudsGroup = new Group()
  obstaclesGroup = new Group()

  gameOver = createSprite(width/2, height/2 - 20, 50, 50)
  gameOver.visible = false
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.7

  restart = createSprite(width/2, height/2 + 50, 50, 50)
  restart.addImage(restartImg)
  restart.visible = false
  restart.scale = 0.5



}

//draw faz o movimento, a ação do jogo
function draw() {
  background(190)
  
  text("SCORE: " + score, width-100, 25)
  text("HI: " + highscore, width-150, 25)
  trex.velocityY += 0.7
  trex.collide(invisibleGround)

  //console.log(getFrameRate)


  if (gameState == play) {

    score = score + Math.round(getFrameRate() / 59.955)

    ground.velocityX = -(8 + 8*score/1000)

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    if ((keyDown("space") || touches.length > 0) && trex.y >= height-50) {
      trex.velocityY = -9
      jump.play()
      touches = []


    }

    generateClouds()

    generateObs()

    if(score % 100 == 0) {
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

  

  //console.log(frameCount)

  if (gameState == end) {
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    gameOver.visible = true
    restart.visible = true
    trex.changeAnimation("collided")
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    

    if(mousePressedOver(restart) || touches.lenght > 0) {
      reset()
      touches = []
    }

    if(score >= highscore) {
      highscore = score
    }
  }
  /////////////////////////////////////////////////////////////////////////// 


  //coordenadas do mouse na tela
  text("X: " + mouseX + " / Y: " + mouseY, mouseX, mouseY)
  drawSprites()

}

function generateClouds() {


  if (frameCount % 360 == 0) {
    var cloud = createSprite(width+50, height-170, 20, 20)
    cloud.velocityX = -(2 + 2*score/1000)
    cloud.addImage(cloudImage)
    cloud.scale = random(0.3, 0.6)
    cloud.y = random(height-250, height-300)
    cloud.depth = trex.depth - 1
    cloud.lifetime = width/cloud.velocityX
    cloudsGroup.add(cloud)

  }
}
function generateObs() {
  if (frameCount % 75 == 0) {
    var cactus = createSprite(width+50, height-50, 20, 20)
    cactus.velocityX = -(8 + 8*score/1000)
    obstaclesGroup.add(cactus)
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: cactus.addImage(c1)
        cactus.scale = 0.7
        break
      case 2: cactus.addImage(c2)
        cactus.scale = 0.6
        break
      case 3: cactus.addImage(c3)
        cactus.scale = 0.65
        break
      case 4: cactus.addImage(c4)
        cactus.scale = 0.5
        break
      case 5: cactus.addImage(c5)
        cactus.scale = 0.45
        break
      case 6: cactus.addImage(c6)
        cactus.scale = 0.4
        break
      default: break
    }
    //cactus.scale = 0.4
    cactus.lifetime = width/cactus.velocityX
  }
}

function reset() {
  gameState = play
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running")
  gameOver.visible = false
  restart.visible = false
  score = 1
 
  
}