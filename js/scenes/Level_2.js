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
  }

  create() {
    this.spawnE = true;
    this.isPlayerDead = false;

    this.add.image(448,224,"FX").setScrollFactor(0).setDepth(2)
    this.add.image(448,224,"WP").setScrollFactor(0).setDepth(-2)

    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("Tileset2", "tiles");

    map.createDynamicLayer("Layer 1", tiles).setDepth(-1);
    this.groundLayer = map.createDynamicLayer("Layer 2", tiles).setDepth(0);
    map.createDynamicLayer("Layer 3", tiles).setDepth(1);

    // Instantiate all objects points
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    this.CheckPoint = map.findObject("Objects", obj => obj.name === "Checkpoint")
    const Finish = map.findObject("Objects", obj => obj.name === "Finish")

    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.end = this.physics.add.group({allowGravity: false,immovable: true})

    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'UncleG').setDepth(0).setVisible(false);
    this.end.create(Finish.x, Finish.y, 'UncleG').setDepth(0).setVisible(false);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawnAndMonster, null,this);
    this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);

    // Colliders
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    //Ennemis
    this.actionner = map.findObject("Objects", obj => obj.name === "Spawn Monstre")

    this.ennemis = this.physics.add.group();
    this.physics.add.overlap(this.player.sprite, this.ennemis, this.hitEnnemy, null, this);
    //new Ennemi(this,this.actionner.x,this.actionner.y,'UncleG').setDepth(0);

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

    // Fix the spikes
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

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.marker = new MouseTileMarker(this, map);

    // Texte
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0).setDepth(3);
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.marker.update();
    this.player.update();

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
        this.player.destroy();
        this.scene.restart();
        
    });
    }
    
  }

  respawnAndMonster(player){

    this.respawning = true;
    
    if (this.spawnE){
      this.ennemy = new Ennemi(this,this.actionner.x,this.actionner.y,'UncleG').setDepth(0);
      this.spawnE = false;
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
      this.scene.start('level3');
      
    });

  }
}
