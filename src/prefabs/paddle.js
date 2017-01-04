
export default class Paddle extends Phaser.Sprite {
  constructor ({game, x, y, atlas, asset}) {
    super(game, x, y, atlas, asset)
    game.add.sprite(this)

    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true
    this.body.bounce.set(1)
    this.body.immovable = true
    this.anchor.setTo(0.5, 0.5)

    this.game.stage.addChild(this)
  }

  update () {
   // this.game.debug.body(this)

    this.x = this.game.input.x

    if (this.x < 24) {
      this.x = 24
    } else if (this.x > this.game.width - 24) {
      this.x = this.game.width - 24
    }
  }
}
