import Boss from "../class/Boss.js";
import Player from "../class/player.js";

//First Level including : Text Printing Word by Word / Simple Platformer / Invincibility Power / Key to unlock the next level / 2 different ennemies / Tiled Map
export default class Level_3 extends Phaser.Scene {
  constructor()
	{
		super('level3')
	}

  preload() {
      //Preloading Images, Textures and Maps
    this.load.spritesheet(
      "player",
      "./assets/Spritesheet/Edna_SpriteSheet.png",
      {
        frameWidth: 32,
        frameHeight: 32
        //margin: 1,
        //spacing: 2
      }
    );

    this.load.image("textbox", "./assets/Menu/StoryTelling.png");
    this.load.image("ecranfin", "./assets/Menu/credits.png");


    this.load.image("BossNormal", "./assets/Objects/Death.png");
    this.load.image("BossFond", "./assets/Objects/DeathFond.png");
    this.load.image("LFX", "./assets/Objects/EffetLumi.png");
    this.load.image("actionner", "./assets/Objects/UncleGhost.png");
    this.load.image("ending", "./assets/Objects/Finish.png");
    this.load.image("mur", "./assets/Objects/Wall.png");

    this.load.image("luciole", "./assets/Objects/Luciole.png");

    this.load.image("Tuiles", "./assets/TiledLvl3/Tileset3.png");
    this.load.tilemapTiledJSON("Boss", "./assets/TiledLvl3/Map3.json");

    this.load.audio('Musique3', './assets/Audio/Level_3.ogg');
    this.load.audio('Musique Boss', './assets/Audio/Level_3_Death.ogg');
    this.load.audio('Ambiance', './assets/Audio/Amb_Level_3.ogg');

    this.cursors = this.input.keyboard.createCursorKeys()

  }

  create() {
    //Setting the state of the player
    this.isPlayerDead = false;
    this.immune2 = false;
    this.phase1 = false;
    this.phase2 = false;
    this.storytelling3 = true;
    this.nbClick3 = 0;
    this.nbClickF3 = 0;
    this.storyF3 = false;
    this.teststory3 = true;
    this.phase2check = false;

    this.skip3 = this.input.keyboard.addKey('SPACE');


    //Setting the map

    
    const Map = this.make.tilemap({ key: "Boss" });
    const Tiles = Map.addTilesetImage("Tileset3", "Tuiles");


    this.groundLayer = Map.createDynamicLayer("Calque 2", Tiles);

    Map.createDynamicLayer("Calque 3", Tiles).setDepth(-2);
    Map.createDynamicLayer("Calque 1", Tiles).setDepth(-4);
    Map.createDynamicLayer("Calque 1bis", Tiles).setDepth(-3);
    

    // Using Spawn Point to get an easy way to spawn player
    const spawnPoint = Map.findObject("Trucs", obj => obj.name === "Spawn J");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    //Checkpoint and End

    this.CheckPoint = Map.findObject("Trucs", obj => obj.name === "Checkpoint")
    const Finish = Map.findObject("Trucs", obj => obj.name === "Arrivee")

    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.end = this.physics.add.group({allowGravity: false,immovable: true})

    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'actionner').setDepth(0).setVisible(false);
    this.end.create(Finish.x+20, Finish.y+2, 'ending').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawn, null,this);
    this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);

    //Creating others elements and colliding them if needed

    this.luciole = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    
    const LucioleSp = Map.findObject("Lucioles", obj => obj.name === "Luciole 1");
    const LucioleSp2 = Map.findObject("Lucioles", obj => obj.name === "Luciole 2");
    const LucioleSp3 = Map.findObject("Lucioles", obj => obj.name === "Luciole 3");
    const LucioleSp4 = Map.findObject("Lucioles", obj => obj.name === "Luciole 4");
    const LucioleSp5 = Map.findObject("Lucioles", obj => obj.name === "Luciole 5");
    const LucioleSp6 = Map.findObject("Lucioles", obj => obj.name === "Luciole 6");
    const LucioleSp7 = Map.findObject("Lucioles", obj => obj.name === "Luciole 7");
    const LucioleSp8 = Map.findObject("Lucioles", obj => obj.name === "Luciole 8");
    const LucioleSp9 = Map.findObject("Lucioles", obj => obj.name === "Luciole 9");
    const LucioleSp10 = Map.findObject("Lucioles", obj => obj.name === "Luciole 10");

    
    this.luciole.create(LucioleSp.x, LucioleSp.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp2.x, LucioleSp2.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp3.x, LucioleSp3.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp4.x, LucioleSp4.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp5.x, LucioleSp5.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp6.x, LucioleSp6.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp7.x, LucioleSp7.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp8.x, LucioleSp8.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp9.x, LucioleSp9.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp10.x, LucioleSp10.y, 'luciole').setDepth(0);


    this.physics.add.overlap(this.player.sprite, this.luciole, this.ScoreUp, null,this);

    this.mur = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    const MurSp = Map.findObject("Trucs", obj => obj.name === "Mur 1");
    const MurSp2 = Map.findObject("Trucs", obj => obj.name === "Mur 2");
    const MurSp3 = Map.findObject("Trucs", obj => obj.name === "Mur 3");

    this.mur.create(MurSp.x, MurSp.y, 'mur').setDepth(0).setVisible(false);
    this.mur.create(MurSp2.x, MurSp2.y, 'mur').setDepth(0).setVisible(false);
    this.mur.create(MurSp3.x, MurSp3.y, 'mur').setDepth(0).setVisible(false);

    


    //Affichage du boss

    this.bossfond = this.add.image(448,224,"BossFond").setScrollFactor(0.2).setDepth(-3);

    this.boss = this.physics.add.group({allowGravity: false});
    this.physics.add.overlap(this.player.sprite, this.boss, this.hit, null, this);

    //Setting the camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);

    //Music

    this.musique3;  
    this.musB;
    this.amb3;

    this.musique3 = this.sound.add('Musique3')
    this.musB = this.sound.add('Musique Boss')
    this.amb3 = this.sound.add('Ambiance')


    // Texte
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

    this.textbox3 = this.add.image(448,224,'textbox').setDepth(2).setScrollFactor(0)

    this.text3;
    this.text3 = this.add.text(370,380,'', { fontSize: 16 }).setDepth(3).setScrollFactor(0);

    this.textH3 = this.add.text(525,420,'Press SPACE to continue', { fontSize: 12 }).setDepth(3).setScrollFactor(0);

    this.timer = this.time.addEvent({ delay: 5000,repeat:-1 ,callback: function(){if(this.phase1){
        this.effet = this.add.image (448,224,'LFX').setDepth(-3).setVisible(true).setScrollFactor(0.2)

        this.time.addEvent({delay:1000,callback:function(){this.cameras.main.flash()

          if (!this.physics.world.overlap(this.player.sprite, this.mur)){
            this.hit(this.player,this.luciole)
          }

          this.effet.setVisible(false)}
          , callbackScope: this})
        
      
    }}, callbackScope: this});

    
    
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.player.update();
    
    //Setting the USP "Crouch to be invincible"
    this.immune2 = false

    if (this.cursors.down.isDown && this.player.sprite.body.blocked.down)
		{
			this.immune2 = true;
      this.player.sprite.setVelocity(0);
      this.player.sprite.anims.play("player-crouch", true)
		}

    //Some simple storytelling in-game

    if(this.storytelling3){
      
      
      this.player.sprite.body.moves = false;
      
      

      if(Phaser.Input.Keyboard.JustDown(this.skip3)){

        if(this.nbClick3 == 0){
        
          this.text3.setText('Where am I now ?')

          this.nbClick3 += 1;
        }
        

        else if (this.nbClick3 == 1){

          this.text3.setText('I have a strange feeling about this')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 2){

          this.text3.setText('...')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 3){

          this.text3.setText('Rape...Death...Accident...Your parents...')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 4){

          this.text3.setText('All... You... Know...')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 5){

          this.text3.setText('Is ... Despair')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 6){

          this.text3.setText('(Use Arrows to move and Down to protect)')


          this.nbClick3 += 1;
        }

        else if (this.nbClick3 == 7){
          this.text3.setVisible(false);
          this.text3.setText('...')
          this.textH3.setVisible(false);
          this.textbox3.setVisible(false);

          this.player.sprite.body.moves = true;        
          this.storytelling3 = false;
          this.phase1 = true;
          this.musique3.play({volume : 0.125, loop: true});
          this.amb3.play({volume : 0.0625, loop: true});
          

          }

      };

      

      

   
     
    }

    if(this.storyF3){
    
      this.physics.pause()
      
      this.text3.setVisible(true);
      this.textH3.setVisible(true);
      this.textbox3.setVisible(true);

      if(Phaser.Input.Keyboard.JustDown(this.skip3)){

        if(this.nbClickF3 == 0){
        
          this.text3.setText('For once ! Let me in peace !')

          this.nbClickF3 += 1;
        }
        

        else if (this.nbClickF3 == 1){

          this.text3.setText('Despair... Death... Faith...')


          this.nbClickF3 += 1;
        }

        else if (this.nbClickF3 == 2){

          this.text3.setText('Now... Fear... Me...')


          this.nbClickF3 += 1;
        }

        else if (this.nbClickF3 == 3){

          this.text3.setText('I almost managed to forget you !')


          this.nbClickF3 += 1;
        }

        else if (this.nbClickF3 == 4){

          this.text3.setText('But it seems I have to face you !')


          this.nbClickF3 += 1;
        }

        else if (this.nbClickF3 == 5){

          this.text3.setText('One last time !!!!')


          this.nbClickF3 += 1;
        }

        else if (this.nbClickF3 == 6){
          this.text3.setVisible(false);
          this.textH3.setVisible(false);
          this.textbox3.setVisible(false);

          this.physics.resume()          
          this.storyF3 = false;
          

          if (this.phase2){
            this.phase2 = false;
            this.phase2check = true;
            this.bossfond.setVisible(false)
            //2402,320
            this.bos = new Boss(this,2402,320,'BossNormal').setDepth(0);
            //définir son comportement
          }

          }

      };
     
    }

    for(var i = 0; i < this.boss.getChildren().length; i++){
      var bosse = this.boss.getChildren()[i];
      if(this.cursors.up.isDown){
        bosse.dash(this.player.sprite);
        this.time.addEvent({ delay: 1000,callback: function(){this.bos.setPosition(this.player.sprite.body.x + 300, 320);}, callbackScope: this})
      }
      
    }
    
    //What the game should do if game's over
    if (
      this.player.sprite.y > this.groundLayer.height) 
    {
      // Flag that the player is dead
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);


      // Add an effect on death
      if(this.phase2check){
        this.score -= 200;
        this.scoreText.setText('Score : ' + this.score);
        this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
        this.isPlayerDead = false;
      }
      
      else{

        cam.fade(250, 0, 0, 0);

        // Freeze the player
        this.player.freeze();

        cam.once("camerafadeoutcomplete", () => {
          this.amb3.stop();
          this.musique3.stop()
          this.player.destroy();
          this.scene.restart();
        
      });
      }
    }
  }
  //Setting an easy scoring text
  ScoreUp(player,luciole){
    luciole.disableBody(true,true);
    this.score += 100;
    this.scoreText.setText('Score : ' + this.score);
  }
  //What the game should do if player collides with an ennemy
  hit(player,ennemy){
    if (!this.immune2){
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);


      // Add an effect on death
      if(this.phase2check){
        this.score -= 200;
        this.scoreText.setText('Score : ' + this.score);
        this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
        this.isPlayerDead = false;
      }
      
      else{

        cam.fade(250, 0, 0, 0);

        // Freeze the player
        this.player.freeze();

        cam.once("camerafadeoutcomplete", () => {
          this.amb3.stop();
          this.musique3.stop() 
          this.player.destroy();
          this.scene.restart();
        
      });
      }
    }
  }
  //Checkpoint
  respawn(player){

    this.phase1 = false;

    if (this.teststory3){
      this.phase2 = true;
      this.storyF3 = true;
      this.musique3.stop()
      this.musB.play({volume : 0.125, loop: true});
      this.teststory3 = false;
    }

  }

  //End of the level
  finishing(player){

      const cam = this.cameras.main;

      cam.fade(250, 0, 0, 0);

      // Freeze the player
      this.player.freeze();

      cam.once("camerafadeoutcomplete", () => {
        this.isPlayerDead = true;
        this.musique3.stop()
        this.musB.stop()
        this.player.destroy();
        //Affichage des crédits
        cam.fadeIn(3000)
        this.add.image(448, 224, 'ecranfin').setScrollFactor(0).setDepth(5);
      
    });
  

  }
}
