import Player from "../class/player.js";
import Ennemi from "../class/Ennemi.js";
import MouseTileMarker from "../class/tile-maker.js";

export default class Level_2 extends Phaser.Scene {
  constructor()
	{
		super('level2')
	}

  preload() {
    this.load.spritesheet(
      "player",
      "./assets/Spritesheet/Edna_SpriteSheet.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.image("WP", "./assets/TiledLvl2/OriginLayer.png");
    this.load.image("UncleG", "./assets/TiledLvl2/UncleGhost.png");
    this.load.image("LUC", "./assets/TiledLvl2/Luciole.png");
    this.load.image("FX", "./assets/TiledLvl2/Effects.png");
    this.load.image("spike", "./assets/TiledLvl2/spike.png");
    this.load.image("tiles", "./assets/TiledLvl2/Tileset2.png");
    this.load.tilemapTiledJSON("map", "./assets/TiledLvl2/Level2.json");

    this.load.audio('Musique2', './assets/Audio/Level_2.ogg');
    this.load.audio('Musique Stress', './assets/Audio/Level_2_oncle.ogg');
    this.load.audio('Ambiance', './assets/Audio/Amb_level_2.ogg');

    this.load.image("Edna", "./assets/Menu/EdnaIllu.png");
    this.load.image("Oncle", "./assets/Menu/UncleIllu.png");
  }

  create() {
    this.spawnE = true;
    this.isPlayerDead = false;
    this.storytelling2 = true;
    this.nbClick2 = 0;
    this.nbClickF2 = 0;
    this.storyF2 = false;
    this.teststory2 = true;

    this.skip2 = this.input.keyboard.addKey('SPACE');

    this.add.image(448,224,"FX").setScrollFactor(0).setDepth(2)
    this.add.image(448,224,"WP").setScrollFactor(0).setDepth(-2)

    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("Tileset2", "tiles");

    map.createDynamicLayer("Layer 1", tiles).setDepth(-1);
    this.groundLayer = map.createDynamicLayer("Layer 2", tiles).setDepth(0);
    map.createDynamicLayer("Layer 3", tiles).setDepth(1);

    // Creating a instance for all objects in the map
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    this.CheckPoint = map.findObject("Objects", obj => obj.name === "Checkpoint")
    const Finish = map.findObject("Objects", obj => obj.name === "Finish")

    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.end = this.physics.add.group({allowGravity: false,immovable: true})

    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y-100, 'UncleG').setDepth(0).setVisible(false).setSize(32, 300);
    this.end.create(Finish.x, Finish.y-100, 'UncleG').setDepth(0).setVisible(false).setSize(32, 300);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawnAndMonster, null,this);
    this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);

    // Colliders
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    //Walls
    this.walls = this.physics.add.group({allowGravity: false,immovable: true})
    this.walls2 = this.physics.add.group({allowGravity: false,immovable: true})

    this.walls.create(1, 200, 'UncleG').setDepth(0).setVisible(false).setSize(1, 500);
    this.walls2.create(map.widthInPixels, map.heightInPixels-200, 'UncleG').setDepth(0).setVisible(false).setSize(1, 500);

    this.physics.world.addCollider(this.player.sprite, this.walls);
    this.physics.world.addCollider(this.player.sprite, this.walls2);

    //Ennemies
    this.actionner = map.findObject("Objects", obj => obj.name === "Spawn Monstre")

    this.ennemis = this.physics.add.group();
    this.physics.add.overlap(this.player.sprite, this.ennemis, this.hitEnnemy, null, this);

    //Creating others elements and colliding them if needed

    this.luciole = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    
    const LucioleSp = map.findObject("Objects", obj => obj.name === "Money 1");
    const LucioleSp2 = map.findObject("Objects", obj => obj.name === "Money 2");
    const LucioleSp3 = map.findObject("Objects", obj => obj.name === "Money 3");
    const LucioleSp4 = map.findObject("Objects", obj => obj.name === "Money 4");
    const LucioleSp5 = map.findObject("Objects", obj => obj.name === "Money 5");
    const LucioleSp6 = map.findObject("Objects", obj => obj.name === "Money 6");
    const LucioleSp7 = map.findObject("Objects", obj => obj.name === "Money 7");
    const LucioleSp8 = map.findObject("Objects", obj => obj.name === "Money 8");
    const LucioleSp9 = map.findObject("Objects", obj => obj.name === "Money 9");
    const LucioleSp10 = map.findObject("Objects", obj => obj.name === "Money 10");
    const LucioleSp11 = map.findObject("Objects", obj => obj.name === "Money 11");
    const LucioleSp12 = map.findObject("Objects", obj => obj.name === "Money 12");

    
    this.luciole.create(LucioleSp.x, LucioleSp.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp2.x, LucioleSp2.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp3.x, LucioleSp3.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp4.x, LucioleSp4.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp5.x, LucioleSp5.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp6.x, LucioleSp6.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp7.x, LucioleSp7.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp8.x, LucioleSp8.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp9.x, LucioleSp9.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp10.x, LucioleSp10.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp11.x, LucioleSp11.y, 'LUC').setDepth(0);
    this.luciole.create(LucioleSp12.x, LucioleSp12.y, 'LUC').setDepth(0);


    this.physics.add.overlap(this.player.sprite, this.luciole, this.ScoreUp, null,this);

    // Fix the spikes via StaticGroup
    this.spikeGroup = this.physics.add.staticGroup();
    this.groundLayer.forEachTile(tile => {
      if (tile.index === 7) {
        const spike = this.spikeGroup.create(tile.getCenterX(), tile.getCenterY(), "spike");

        spike.rotation = tile.rotation;
        if (spike.angle === 0) spike.body.setSize(32, 6).setOffset(0, 26);
        else if (spike.angle === -90) spike.body.setSize(6, 32).setOffset(26, 0);
        else if (spike.angle === 90) spike.body.setSize(6, 32).setOffset(0, 0);

        this.groundLayer.removeTileAt(tile.x, tile.y);
      }
    });

    //Camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Mouse's marker
    this.marker = new MouseTileMarker(this, map);

    //Music

    this.musique2;  
    this.stress;
    this.amb2;

    this.musique2 = this.sound.add('Musique2')
    this.stress = this.sound.add('Musique Stress')
    this.amb2 = this.sound.add('Ambiance')

    // Text for score and story
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0).setDepth(3);

      this.textbox2 = this.add.image(448,224,'textbox').setDepth(2).setScrollFactor(0)

      this.text2;
      this.text2 = this.add.text(370,380,'', { fontSize: 16 }).setDepth(3).setScrollFactor(0);
  
      this.textH2 = this.add.text(525,420,'Press SPACE to continue', { fontSize: 12 }).setDepth(3).setScrollFactor(0);

      this.edna = this.add.image(200,374,'Edna').setDepth(2).setScrollFactor(0)
      this.illuoncle = this.add.image(200,374,'Oncle').setDepth(2).setScrollFactor(0).setVisible(false)
      
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.marker.update();
    this.player.update();

    if(this.storytelling2){
      this.amb2.play({volume : 0.0625, loop: true});
      this.musique2.play({volume : 0.125, loop: true});
      this.player.sprite.body.moves = false;
      
      

      if(Phaser.Input.Keyboard.JustDown(this.skip2)){

        if(this.nbClick2 == 0){
        
          this.text2.setText('Well ! Those gloves seems magical !')

          this.nbClick2 += 1;
        }
        

        else if (this.nbClick2 == 1){

          this.text2.setText('I can use them to avoid any danger.')


          this.nbClick2 += 1;
        }

        else if (this.nbClick2 == 2){

          this.text2.setText('That place reminds me of something...')


          this.nbClick2 += 1;
        }

        else if (this.nbClick2 == 3){

          this.text2.setText("I won't not stay here any longer...")


          this.nbClick2 += 1;
        }

        else if (this.nbClick2 == 4){

          this.text2.setText("I hope it's not what I think it is.")


          this.nbClick2 += 1;
        }

        else if (this.nbClick2 == 5){

          this.text2.setText('(Use Arrows to move and Mouse to use magic)')


          this.nbClick2 += 1;
        }

        else if (this.nbClick2 == 6){
          this.edna.setVisible(false);
          this.text2.setVisible(false);
          this.text2.setText('...')
          this.textH2.setVisible(false);
          this.textbox2.setVisible(false);

          this.player.sprite.body.moves = true;          
          this.storytelling2 = false;

          }

      };
     
    }

    if(this.storyF2){
    
      
      
      this.player.sprite.body.moves = false;
      
      
      this.text2.setVisible(true);
      this.textH2.setVisible(true);
      this.textbox2.setVisible(true);

      if(Phaser.Input.Keyboard.JustDown(this.skip2)){

        if(this.nbClickF2 == 0){
          this.illuoncle.setVisible(true);
          const cam = this.cameras.main;
          cam.shake(100, 0.05);
        
          this.text2.setText("I'm glad you're here, my little.")

          this.nbClickF2 += 1;
        }
        

        else if (this.nbClickF2 == 1){

          this.illuoncle.setVisible(false);
          this.edna.setVisible(true);

          this.text2.setText("Uncle ?! Be gone ! I don't want to see you !")


          this.nbClickF2 += 1;
        }

        else if (this.nbClickF2 == 2){

          this.illuoncle.setVisible(true);
          this.edna.setVisible(false);
          const cam = this.cameras.main;
          cam.shake(100, 0.05);

          this.text2.setText("Why did you perform this rituel so ?")


          this.nbClickF2 += 1;
        }

        else if (this.nbClickF2 == 3){

          this.illuoncle.setVisible(false);
          this.edna.setVisible(true);

          this.text2.setText("Surely not for the beast you are !")


          this.nbClickF2 += 1;
        }

        else if (this.nbClickF2 == 4){

          this.illuoncle.setVisible(true);
          this.edna.setVisible(false);
          const cam = this.cameras.main;
          cam.shake(100, 0.05);

          this.text2.setText("SO AM I ! Prepare yourself !")


          this.nbClickF2 += 1;
        }

        else if (this.nbClickF2 == 5){
          this.illuoncle.setVisible(false);
          this.text2.setVisible(false);
          this.textH2.setVisible(false);
          this.textbox2.setVisible(false);

          this.player.sprite.body.moves = true;          
          this.storyF2 = false;

          if (this.spawnE){
            //Use of the Ennemi class which create a simple IA that follows the player
            this.ennemy = new Ennemi(this,this.actionner.x,this.actionner.y,'UncleG').setDepth(0);
            this.spawnE = false;
          }

          }

      };
     
    }

    // Add a colliding tile at the mouse position
    const pointer = this.input.activePointer;
    const worldPoint = pointer.positionToCamera(this.cameras.main);
    if (pointer.isDown) {
      const tile = this.groundLayer.putTileAtWorldXY(6, worldPoint.x, worldPoint.y);
      tile.setCollision(true);
    }

    for(var i = 0; i < this.ennemis.getChildren().length; i++){
      var ennemi = this.ennemis.getChildren()[i];

      ennemi.movement(this.player.sprite);
    
    }

    if (
      this.player.sprite.y > this.groundLayer.height ||
      this.physics.world.overlap(this.player.sprite, this.spikeGroup)
    ) {
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);


      // Add an effect on death
      if(this.respawning){
        this.score -= 200;
        this.scoreText.setText('Score : ' + this.score);
        this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
        this.ennemy.setPosition(this.actionner.x,this.actionner.y);
        this.isPlayerDead = false;
      }
      
      else{

        cam.fade(250, 0, 0, 0);

        // Freeze the player
        this.player.freeze();

        cam.once("camerafadeoutcomplete", () => {
          this.amb2.stop();
          this.musique2.stop()
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

  hitEnnemy(player,ennemy){
    this.isPlayerDead = true;

    const cam = this.cameras.main;
    cam.shake(100, 0.05);


    // Add an effect on death
    if(this.respawning){
      this.score -= 200;
      this.scoreText.setText('Score : ' + this.score);
      this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
      this.ennemy.setPosition(this.actionner.x,this.actionner.y);
      this.isPlayerDead = false;
    }
      
    else{

      cam.fade(250, 0, 0, 0);

      // Freeze the player
      this.player.freeze();

      cam.once("camerafadeoutcomplete", () => {
        this.amb2.stop();
        this.musique2.stop()
        this.player.destroy();
        this.scene.restart();
        
    });
    }
    
  }

  //Trigger evnet on checkpoint
  respawnAndMonster(player){

    this.respawning = true;
    
    if (this.teststory2){
      this.storyF2 = true;
      this.teststory2 = false;
      this.stress.play({volume : 0.125, loop: true});
      this.musique2.stop()
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
      this.player.destroy();
      this.stress.stop()
      this.musique2.stop()
      this.scene.start('level3');
      
    });

  }
}
