'use strict';

  var PlayScene = {
  create: function () {
    this.numBalls = 0;
    this.firts = true
    this.balls = [];
    this.numcols = 10;
    this.time = 0;
    //this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.game.add.sprite(
      500, 500, 'player');
    this.player.scale.setTo(0.15, 0.15); 
    this.player.anchor.setTo(0.5, 0.5);

  this.game.physics.arcade.enable(this.player);
  this.player.body.collideWorldBounds = true;

  this.createBall(1);

  this.timer = this.game.time.create(false);
  this.timer.loop(15000, this.updateCounter, this);
  this.timer.start();
  },

  updateCounter:function() {
    this.time++;
},
gameOver: function(){
  this.game.world.removeAll();
  while(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){}
  this.create();
},

  update: function () {
    this.game.debug.text('Quedan '  + this.timer.duration.toFixed(0)/1000, 32, 32) + ' segundos ';
    if(this.timer.duration.toFixed(0) <= 1)
      this.gameOver();
    //this.game.debug.text('Quedan ' + this.numcols + 'colisiones y '+ this.timer.duration.toFixed(0) / 1000, 32, 32 + ' segundos');

    //for(var i = 1; i <= this.numBalls; i++){
      for(var i = 0; i < this.numBalls; i++){
        if(this.firts)    //no he sabido arreglar el problema de que al principio me da 1 colisión
        this.firts = false;
        else
          if(this.checkOverlap(this.player, this.balls[i])){
          console.log('c');
          this.numcols--;
          this.destruye(i);
          }
      }
      //this.game.physics.arcade.overlap(this.player, this.balls[1], this.destruye(1), null, this);
      /*this.game.debug.bodyInfo(this.balls[0], 32, 32);
      this.game.debug.body(this.balls[0]);
      this.game.debug.bodyInfo(this.player, 32, 150);
      this.game.debug.body(this.player);*/

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
    	this.player.body.velocity.x = -100;
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
    	this.player.body.velocity.x = 100;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
    	this.player.body.velocity.y = -100;
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
    	this.player.body.velocity.y = 100;
    }
  },

  checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

},
destruye: function(i){
  var sound = this.game.add.audio('pop');
  sound.play();
  this.balls[i].destroy();
  this.numBalls--;
  if(this.numBalls>=0)
    //this.divide();
  console.log(this.numBalls);

  //console.log('hace cosas');
},

divide:function(){
  this.createBall(1);
  this.createBall(-1);
},

createBall: function(aux){

  this.balls[this.numBalls] = this.game.add.sprite(
    Math.random() * 700, Math.random() *500, 'ball');
  this.balls[this.numBalls].scale.setTo(0.05, 0.05);
  
  this.game.physics.arcade.enable(this.balls[this.numBalls]);
  this.balls[this.numBalls].body.velocity.set(-100 * aux, -100 * aux);
  this.balls[this.numBalls].body.bounce.set(1);
  this.balls[this.numBalls].body.collideWorldBounds = true;
  this.numBalls++;

},
};

module.exports = PlayScene;
