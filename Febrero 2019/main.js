'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');

    //images
    this.game.load.image('player', 'images/cross.jpg');
    this.game.load.image('ball', 'images/ball.png');

    //sounds
    this.game.load.audio('pop', 'sounds/pop.wav');

  },

  create: function () {
    //Hace que el navegador ignore algunos inputs (flechas y espacio) para evitar mover la ventana jugando
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.SPACEBAR
    ]);

    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
