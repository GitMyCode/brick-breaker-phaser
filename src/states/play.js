import Player from '../prefabs/player'
import Enemy from '../prefabs/enemy'
import HUD from '../prefabs/hud'
import Brick from '../prefabs/brick'
import Paddle from '../prefabs/paddle'
import Ball from '../prefabs/ball'

var ballOnPaddle = true

export default class Play extends Phaser.State {

  create () {
    this.lives = 3
    this.score = 0

    this.game.physics.arcade.checkCollision.down = false

    this.bricks = this.add.group()
    this.bricks.enableBody = true

    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 15; x++) {
        let brick = new Brick({
          game: this.game,
          x: 120 + (x * 36),
          y: 100 + (y * 52),
          atlas: 'breakout',
          asset: 'brick_' + (y + 1) + '_1.png'
        })

        this.bricks.add(brick)
        brick.body.bounce.set(1)
        brick.body.immovable = true
      }
    }

    this.paddle = new Paddle({
      game: this.game,
      x: this.game.world.centerX,
      y: 500,
      atlas: 'breakout',
      asset: 'paddle_big.png'
    })

    this.ball = new Ball({
      game: this.game,
      x: this.game.world.centerX,
      y: this.paddle.y - 15,
      atlas: 'breakout',
      asset: 'ball_1.png'
    })

    this.scoreText = this.game.add.text(32, 550, 'score: 0', { font: '20px Arial', fill: '#ffffff', align: 'left' })
    this.livesText = this.game.add.text(680, 550, 'lives: 3', { font: '20px Arial', fill: '#ffffff', align: 'left' })
    this.introText = this.game.add.text(this.game.world.centerX, 400, '- click to start -', { font: '40px Arial', fill: '#ffffff', align: 'center' })
    this.introText.anchor.setTo(0.5, 0.5)

    this.game.input.onDown.add(this.releaseBall, this)
    this.ball.events.onOutOfBounds.add(this.ballLost, this)
// this.farback = this.add.tileSprite(0, 0, 800, 2380, 'farback')

// this.game.time.slowMotion = 1

// this.enemies = this.add.group()
// this.enemies.enableBody = true

// this.player = new Player({
//   game: this.game,
//   x: this.game.world.centerX,
//   y: 0.92 * this.game.world.height,
//   health: 100,
//   asset: 'smallfighter',
//   frame: 1
// })
// this.game.stage.addChild(this.player)

// this.hud = new HUD({
//   game: this.game,
//   player: this.player
// })

// this.game.input.onDown.add(() => {
//   this.game.time.slowMotion = 1
// })

// this.game.input.onUp.add(() => {
//   this.game.time.slowMotion = 3
// })

// this.enemyTime = 0
// this.enemyInterval = 1.5
// this.enemyShootTime = 0
// this.enemyShootInterval = 1
// this.playerShootTime = 0
// this.playerShootInterval = 0.16

// this.game.time.events.loop(Phaser.Timer.SECOND * 10, () => {
//   if (this.enemyInterval > 0.2) {
//     this.enemyInterval -= 0.1
//   }
// })

// this.overlayBitmap = this.add.bitmapData(this.game.width, this.game.height)
// this.overlayBitmap.ctx.fillStyle = '#000'
// this.overlayBitmap.ctx.fillRect(0, 0, this.game.width, this.game.height)

// this.overlay = this.add.sprite(0, 0, this.overlayBitmap)
// this.overlay.visible = false
// this.overlay.alpha = 0.75

// this.music = this.game.add.audio('playMusic')
// this.bulletHitSound = this.add.sound('bulletHit')
// this.enemyExplosionSound = this.add.sound('enemyExplosion')
// this.playerExplosionSound = this.add.sound('playerExplosion')
// this.gameOverSound = this.add.sound('gameOver')

// this.music.loopFull()
  }

  update () {
    if (ballOnPaddle) {
      this.ball.x = this.paddle.x
    } else {
      this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this)
      this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this)
    }
  }

  ballLost () {
    this.lives--
    this.livesText.text = `lives ${this.lives}`

    if (this.lives === 0) {
      this.gameOver()
    } else {
      ballOnPaddle = true
      this.ball.reset(this.paddle.x, this.paddle.y - 16)
      this.ball.animations.stop()
    }
  }

  gameOver () {
    this.ball.body.velocity.setTo(0)
    this.introText.text = 'Game Over'
    this.introText.visible = true
  }

  releaseBall () {
    if (ballOnPaddle) {
      ballOnPaddle = false
      this.ball.body.velocity.y = -300
      this.ball.body.velocity.x = -75
      this.ball.animations.play('spin')
      this.introText.visible = false
    }
  }

  ballHitBrick (ball, brick) {
    brick.kill()
    this.score += 10
    this.scoreText.text = `score: ${this.score}`

    if (this.bricks.countLiving() === 0) {
      this.score += 1000

      ballOnPaddle = true
      this.ball.reset(this.paddle.x, this.paddle.y - 16)
      this.ball.animations.stop()

      this.bricks.callAll('revive')
    }
  }

  ballHitPaddle (ball, paddle) {
    let velocityMultiplier = 10
    let diff = ball.x - paddle.x

    if (diff !== 0) {
      ball.body.velocity.x = velocityMultiplier * diff
    } else {
     //  Ball is perfectly in the middle
     //  Add a little random X to stop it bouncing straight up!
      ball.body.velocity.x = 2 + Math.random() * 8
    }
  }
}
