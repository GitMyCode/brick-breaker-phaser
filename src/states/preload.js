export default class Preload extends Phaser.State {

  preload () {
    this.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json')
    this.load.image('starfield', 'assets/misc/starfield.jpg')
        // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        // this.loaderBg.anchor.setTo(0.5);
        // this.loaderBar.anchor.setTo(0.5);

        // this.load.setPreloadSprite(this.loaderBar);

        // this.load.atlasJSONArray('smallfighter', 'assets/img/spritesheet/smallfighter.png', 'data/spritesheet/smallfighter.json');
        // this.load.atlasJSONArray('alien', 'assets/img/spritesheet/alien.png', 'data/spritesheet/alien.json');
        // this.load.atlasJSONArray('button', 'assets/img/spritesheet/button.png', 'data/spritesheet/button.json');
        // this.load.image('farback', 'assets/img/farback.jpg');
        // this.load.image('bullet', 'assets/img/bullet.png');
        // this.load.image('particle', 'assets/img/particle.gif');
        // this.load.image('healthbar', 'assets/img/healthbar.png');
        // this.load.image('hudBg', 'assets/img/hud-bg.png');

        // this.load.audio('playMusic', ['assets/audio/music/play.mp3']);
        // this.load.audio('menuMusic', ['assets/audio/music/menu.mp3']);

        // this.load.audio('menuOver', ['assets/audio/sound/menu-over.mp3']);
        // this.load.audio('menuOut', ['assets/audio/sound/menu-out.mp3']);
        // this.load.audio('menuDown', ['assets/audio/sound/menu-click.mp3']);

        // this.load.audio('bulletHit', ['assets/audio/sound/bullet-hit.mp3']);
        // this.load.audio('enemyShot', ['assets/audio/sound/enemy-shot.mp3']);
        // this.load.audio('enemyExplosion', ['assets/audio/sound/enemy-explosion.mp3']);
        // this.load.audio('playerShot', ['assets/audio/sound/player-shot.mp3']);
        // this.load.audio('playerExplosion', ['assets/audio/sound/player-explosion.mp3']);

        // this.load.audio('gameOver', ['assets/audio/sound/game-over.mp3']);
  }

  create () {
    this.state.start('Menu')
  }

}
