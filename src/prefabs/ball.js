
export default class Ball extends Phaser.Sprite {
  constructor ({game, x, y, atlas, asset}) {
    super(game, x, y, atlas, asset)
    this.game.add.sprite(this)
    this.anchor.set(0.5)
    this.checkWorldBounds = true

    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    this.body.collideWorldBounds = true
    this.body.bounce.set(1)

    this.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false)
    this.game.stage.addChild(this)
  }
}
