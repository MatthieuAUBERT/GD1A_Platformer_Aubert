import Player from "../class/player.js";

//First Level including : Text Printing Word by Word / Simple Platformer / Invincibility Power / Key to unlock the next level / 2 different ennemies / Tiled Map
export default class Level_1 extends Phaser.Scene {
  constructor()
	{
		super('level1')
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
    this.load.image("Edna", "./assets/Menu/EdnaIllu.png");

    this.load.image("actionner", "./assets/Objects/UncleGhost.png");

    this.load.image("effets", "./assets/Objects/Effects.png");
    this.load.image("sun", "./assets/Objects/SunEffect.png");

    this.load.image("doll", "./assets/Objects/Doll.png");
    this.load.image("ghost", "./assets/Objects/LittleGhost.png");
    this.load.image("luciole", "./assets/Objects/Luciole.png");
    this.load.image("MobilePlat", "./assets/Objects/PlatformMobile.png");

    this.load.image("Tiles", "./assets/Tiled/Tileset.png");
    this.load.tilemapTiledJSON("Map", "./assets/Tiled/Map.json");

    this.cursors = this.input.keyboard.createCursorKeys()

    this.load.audio('Musique', './assets/Audio/Level_1.ogg');
  }

  create() {
    //Setting the state of the player
    this.isPlayerDead = false;
    this.immune = false;
    this.spawn = true;
    this.spawnO = true;
    this.respawning = false;
    this.allowexit = false;
    this.storytelling = true;
    this.nbClick = 0;
    this.nbClickF = 0;
    this.storyF = false;
    this.teststory = true;

    this.skip = this.input.keyboard.addKey('SPACE');


    //Setting the map

    this.add.image(448,224,"effets").setScrollFactor(0).setDepth(1)
    this.add.image(448,224,"sun").setScrollFactor(0.15).setDepth(1)
    
    const Map = this.make.tilemap({ key: "Map" });
    const Tiles = Map.addTilesetImage("Tileset", "Tiles");

    Map.createDynamicLayer("Background", Tiles).setScrollFactor(0).setDepth(-5);
    Map.createDynamicLayer("Clouds", Tiles).setScrollFactor(0.2).setDepth(-4);
    Map.createDynamicLayer("Trees", Tiles).setDepth(-3);
    Map.createDynamicLayer("Props", Tiles).setDepth(-2);
    Map.createDynamicLayer("Props2", Tiles).setDepth(-1);


    this.groundLayer = Map.createDynamicLayer("Ground", Tiles);
    

    // Using Spawn Point to get an easy way to spawn player and objects
    const spawnPoint = Map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    const Actionner1 = Map.findObject("Actionners", obj => obj.name === "Actionner 1")
    const Actionner2 = Map.findObject("Actionners", obj => obj.name === "Actionner 2")
    this.CheckPoint = Map.findObject("Objects", obj => obj.name === "Checkpoint")
    const Finish = Map.findObject("Objects", obj => obj.name === "Finish")

    this.actionnerI = this.physics.add.group({allowGravity: false,immovable: true})
    this.actionnerII = this.physics.add.group({allowGravity: false,immovable: true})

    this.actionnerI.create(Actionner1.x, Actionner1.y, 'actionner').setDepth(0).setVisible(false);
    this.actionnerII.create(Actionner2.x, Actionner2.y, 'actionner').setDepth(0).setVisible(false);

    this.physics.add.overlap(this.player.sprite, this.actionnerI, this.spawn1, null,this);
    this.physics.add.overlap(this.player.sprite, this.actionnerII, this.spawn2, null,this);


    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.end = this.physics.add.group({allowGravity: false,immovable: true})

    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'actionner').setDepth(0).setVisible(false);
    this.end.create(Finish.x, Finish.y, 'actionner').setDepth(0).setVisible(false);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawn, null,this);
    this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);


    // Collide the player with Tiled Layers
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);


    // Spawning the ennemies and define their behaviour

    this.ghostI = this.physics.add.group({allowGravity: false,immovable: true});
    this.ghostII = this.physics.add.group({allowGravity: false,immovable: true});
    this.ghostIII = this.physics.add.group({allowGravity: false,immovable: true});
    this.doll = this.physics.add.group({allowGravity: false,immovable: true});
    this.doll2 = this.physics.add.group({allowGravity: false,immovable: true});

    const ghost1 = Map.findObject("Objects", obj => obj.name === "Monstre 1");
    const ghost2 = Map.findObject("Objects", obj => obj.name === "Monstre 2");
    const ghost3 = Map.findObject("Objects", obj => obj.name === "Monstre 3");

    this.ghostI.create(ghost1.x + 80, ghost1.y - 10, 'ghost').setDepth(0);
    this.ghostII.create(ghost2.x + 80, ghost2.y - 10, 'ghost').setDepth(0);
    this.ghostIII.create(ghost3.x + 80, ghost3.y - 10, 'ghost').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.ghostI, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ghostII, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.ghostIII, this.hit, null,this);


    this.dollsp = Map.findObject("Objects", obj => obj.name === "Vague Monstre 1");
    this.dollsp2 = Map.findObject("Objects", obj => obj.name === "Vague Monstre 2");


    this.physics.add.overlap(this.player.sprite, this.doll, this.hit, null,this);
    this.physics.add.overlap(this.player.sprite, this.doll2, this.hit, null,this);


    //Creating others elements and colliding them if needed

    this.luciole = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    
    const LucioleSp = Map.findObject("Moneys", obj => obj.name === "Money 1");
    const LucioleSp2 = Map.findObject("Moneys", obj => obj.name === "Money 2");
    const LucioleSp3 = Map.findObject("Moneys", obj => obj.name === "Money 3");
    const LucioleSp4 = Map.findObject("Moneys", obj => obj.name === "Money 4");
    const LucioleSp5 = Map.findObject("Moneys", obj => obj.name === "Money 5");
    const LucioleSp6 = Map.findObject("Moneys", obj => obj.name === "Money 6");
    const LucioleSp7 = Map.findObject("Moneys", obj => obj.name === "Money 7");
    const LucioleSp8 = Map.findObject("Moneys", obj => obj.name === "Money 8");
    const LucioleSp9 = Map.findObject("Moneys", obj => obj.name === "Money 9");
    const LucioleSp10 = Map.findObject("Moneys", obj => obj.name === "Money 10");
    const LucioleSp11 = Map.findObject("Moneys", obj => obj.name === "Money 11");
    const LucioleSp12 = Map.findObject("Moneys", obj => obj.name === "Money 12");
    const LucioleSp13 = Map.findObject("Moneys", obj => obj.name === "Money 13");
    const LucioleSp14 = Map.findObject("Moneys", obj => obj.name === "Money 14");

    
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
    this.luciole.create(LucioleSp11.x, LucioleSp11.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp12.x, LucioleSp12.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp13.x, LucioleSp13.y, 'luciole').setDepth(0);
    this.luciole.create(LucioleSp14.x, LucioleSp14.y, 'luciole').setDepth(0);


    this.physics.add.overlap(this.player.sprite, this.luciole, this.ScoreUp, null,this);

    this.platform1 = this.physics.add.group({allowGravity: false,immovable: true});
    this.platform2 = this.physics.add.group({allowGravity: false,immovable: true});

    const Plat1 = Map.findObject("Objects", obj => obj.name === "Plateforme 1");
    const Plat2 = Map.findObject("Objects", obj => obj.name === "Plateforme 2");

    this.platform1.create(Plat1.x + 100 , Plat1.y, 'MobilePlat').setDepth(0);
    this.platform2.create(Plat2.x + 200, Plat2.y, 'MobilePlat').setDepth(0);

    this.physics.add.collider(this.player.sprite, this.platform1);
    this.physics.add.collider(this.player.sprite, this.platform2);

    this.magicgloves = this.physics.add.group({allowGravity: false,immovable: true});

    this.magicgloves.create(this.dollsp.x + 100, this.dollsp.y, 'MAGIC').setDepth(0);

    this.physics.add.overlap(this.player.sprite,this.magicgloves,this.allow,null,this)

    //Creating some tweens for simple ennemies

    var test = this;

		this.platform1.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-200,
				duration: 3000,
				yoyo: true,
				delay: 100,
				loop: -1
			});
		})
    
    this.platform2.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-500,
				duration: 6000,
				yoyo: true,
				delay: 100,
				loop: -1
			});
		})

    this.ghostI.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ghostII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    this.ghostIII.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-172,
				duration: 3000,
        flipX : true,
				yoyo: true,
				loop: -1
			});
		})

    //Setting the camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);

    //Setting the audio

    this.musique;

    this.musique = this.sound.add('Musique')

    // Text for player's score or storytelling
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

    this.textbox = this.add.image(448,224,'textbox').setDepth(2).setScrollFactor(0)
    this.edna = this.add.image(200,374,'Edna').setDepth(2).setScrollFactor(0)

    this.text;
    this.text = this.add.text(370,380,'', { fontSize: 16 }).setDepth(3).setScrollFactor(0);

    this.textH = this.add.text(525,420,'Press SPACE to continue', { fontSize: 12 }).setDepth(3).setScrollFactor(0);
    
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.player.update();
    
    //Setting the USP "Crouch to be invincible"
    this.immune = false
    if (this.cursors.down.isDown && this.player.sprite.body.blocked.down)
		{
			this.immune = true;
      this.player.sprite.setVelocity(0);
      this.player.sprite.anims.play("player-crouch", true)
		}

    //Some simple storytelling in-game

    if(this.storytelling){
      this.musique.play({volume : 0.1, loop: true});
      this.physics.pause()
      
      

      if(Phaser.Input.Keyboard.JustDown(this.skip)){

        if(this.nbClick == 0){
        
          this.text.setText('Where am I ?')

          this.nbClick += 1;
        }
        

        else if (this.nbClick == 1){

          this.text.setText('Is that ... a dream ?')


          this.nbClick += 1;
        }

        else if (this.nbClick == 2){

          this.text.setText('Is that because of the other day...when I made it')


          this.nbClick += 1;
        }

        else if (this.nbClick == 3){

          this.text.setText('...')


          this.nbClick += 1;
        }

        else if (this.nbClick == 4){

          this.text.setText('I must face it this time... I will not fear.')


          this.nbClick += 1;
        }

        else if (this.nbClick == 5){

          this.text.setText('(Use Arrows to move and Down to protect)')


          this.nbClick += 1;
        }

        else if (this.nbClick == 6){
          this.edna.setVisible(false);
          this.text.setVisible(false);
          this.text.setText('...')
          this.textH.setVisible(false);
          this.textbox.setVisible(false);

          this.physics.resume()          
          this.storytelling = false;

          }

      };
     
    }

    if(this.storyF){
    
      this.physics.pause()
      this.edna.setVisible(true);
      this.text.setVisible(true);
      this.textH.setVisible(true);
      this.textbox.setVisible(true);

      if(Phaser.Input.Keyboard.JustDown(this.skip)){

        if(this.nbClickF == 0){
        
          this.text.setText('It seems I forgot something...')

          this.nbClickF += 1;
        }
        

        else if (this.nbClickF == 1){

          this.text.setText('Is that the gloves I saw ?')


          this.nbClickF += 1;
        }

        else if (this.nbClickF == 2){
          this.edna.setVisible(false);
          this.text.setVisible(false);
          this.textH.setVisible(false);
          this.textbox.setVisible(false);

          this.physics.resume()          
          this.storyF = false;

          }

      };
     
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
      if(this.respawning){
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
          this.musique.stop(); 
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
    if (!this.immune){
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);


      // Add an effect on death
      if(this.respawning){
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
          this.musique.stop(); 
          this.player.destroy();
          this.scene.restart();
        
      });
      }
    }
  }
  //Trigger event 1 (Spawn a doll)
  spawn1(player){

    if (this.spawn){

      this.doll.create(this.dollsp.x, this.dollsp.y, 'doll').setDepth(0).setFlipX(true);

      this.doll.setVelocityX(350)

      this.spawn = false

    }


  }
  //Trigger event 2 (Spawn a doll)
  spawn2(player){

    if(this.spawnO){
    
    this.doll2.create(this.dollsp2.x, this.dollsp2.y, 'doll').setDepth(0);

    this.doll2.setVelocityX(-150)

    this.spawnO = false

    }

  }
  //Checkpoint
  respawn(player){

    this.respawning = true;

  }
  //End of the level
  finishing(player){

    if(this.allowexit){

      const cam = this.cameras.main;

      cam.fade(250, 0, 0, 0);

      // Freeze the player
      this.player.freeze();

      cam.once("camerafadeoutcomplete", () => {
        this.isPlayerDead = true;
        this.musique.stop();
        this.player.destroy();
        this.scene.start('level2');
      
    });
    }

    else{
      if (this.teststory){
        this.storyF = true;
        this.teststory = false;
      }
    }

  }
  // Item to finish the level
  allow(player,item){
    item.destroy();
    this.allowexit = true;
  }
}
