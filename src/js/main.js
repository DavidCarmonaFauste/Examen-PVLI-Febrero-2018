'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.physics('physicsData', 'sprites.json');

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

    //IMAGES
    this.game.load.image('block', 'images/box.jpg');
    this.game.load.image('selected_box', 'images/selected_box.png');
    //SOUNDS
    this.game.load.audio('pop', 'sounds/pop.wav');

  },

  create: function () {
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.I,
      Phaser.Keyboard.J,
      Phaser.Keyboard.K,
      Phaser.Keyboard.L,
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
