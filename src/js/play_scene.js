'use strict';

  var PlayScene = {
  create: function () {
    /*var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);*/
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.grupo = this.game.add.group();
    /*this.caja = this.game.add.sprite(
      this.game.world.width * Math.random(), this.game.world.heigh * Math.random(), 'box');
      this.caja.anchor.setTo(0.5, 0.5);
      this.caja.scale.set(0.2,0.2);*/
    this.createCaja();
    this.selected = this.grupo.getFirstExists();
    this.selected.loadTexture('selected_box');
    this.selection = true;
    
  },

  update: function(){
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
      this.createCaja();
      this.game.input.keyboard.reset(true); //resetea el teclado
    }else
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
      if(this.selection)
         this.selected.body.angularVelocity = 3;
      //sthis.selected.loadTexture('selected_box');
      //this.selected.scale.set(1,1);s
    }else
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      if(this.selection){
        this.selected.destroy();
        var sound = this.game.add.audio('pop');
        sound.play();
      }

      if(this.grupo.children.length >=1){
          this.selected = this.grupo.getRandom();
          this.selected.loadTexture('selected_box');
      }else this.selection = false;

      this.game.input.keyboard.reset(true); //resetea el teclado

    }
    //  I J K L MOVIMIENTO
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.I))
    {
      this.selected.body.applyImpulse([0,10], 0, 0 );
      this.game.input.keyboard.reset(true); //resetea el teclado
      var sound = this.game.add.audio('pop');
      sound.play();
      console.log("arriba");
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.K))
    {
      this.selected.body.applyImpulse([0,-10], 0, 0);
      this.game.input.keyboard.reset(true); //resetea el teclado
      var sound = this.game.add.audio('pop');
      sound.play();
    } 

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.J))
    {
      this.selected.body.applyImpulse([10,0], 0, 0);
      this.game.input.keyboard.reset(true); //resetea el teclado
      var sound = this.game.add.audio('pop');
      sound.play();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.L))
    {
      this.selected.body.applyImpulse([-10,0], 0, 0);
      this.game.input.keyboard.reset(true); //resetea el teclado
      var sound = this.game.add.audio('pop');
      sound.play();
    }
  },

   createCaja: function(){
    var caja = this.game.add.sprite(
      this.game.world.width * Math.random(), this.game.world.height * Math.random(), 'block');
    // caja.anchor.setTo(0.5, 0.5);
    //caja.scale.set(0.1,0.1);

    this.game.physics.p2.enable(caja, false);

    caja.body.clearShapes();
    caja.body.loadPolygon('physicsData', 'contra2');
    caja.body.velocity.x = 50 * Math.random();
    caja.body.velocity.y = 50 * Math.random();
    //this.game.physics.ninja.enableAABB(caja);
    this.grupo.add(caja);
    var sound = this.game.add.audio('pop');
    sound.play();
    if(!this.selection){
      this.selection = true;
      this.selected = caja;
      this.selected.loadTexture('selected_box');


    }
    //this.game.physics.p2.enable(caja, false);
    console.log("caja creada");
  },
};

module.exports = PlayScene;
