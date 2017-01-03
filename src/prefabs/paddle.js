
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
}
