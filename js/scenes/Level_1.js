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
      "../assets/spritesheets/0x72-industrial-player-32px-extruded.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
    this.load.image("doll", "../assets/_Objects/Doll.png");
    this.load.image("ghost", "../assets/_Objects/LittleGhost.png");
    this.load.image("luciole", "../assets/_Objects/Luciole.png");
    this.load.image("MobilePlat", "../assets/_Objects/PlatformMobile.png");

    this.load.image("Tiles", "../assets/_Tiled/Tileset.png");
    this.load.tilemapTiledJSON("Map", "../assets/_Tiled/Map.json");
  }

  create() {
    //Setting the state of the player
    this.isPlayerDead = false;


    //Setting the map
    const Map = this.make.tilemap({ key: "Map" });
    const Tiles = Map.addTilesetImage("Tileset", "Tiles");

    Map.createDynamicLayer("Background", Tiles).setScrollFactor(0).setDepth(-5);
    Map.createDynamicLayer("Clouds", Tiles).setScrollFactor(0.2).setDepth(-4);
    Map.createDynamicLayer("Trees", Tiles).setDepth(-3);
    Map.createDynamicLayer("Props", Tiles).setDepth(-2);
    Map.createDynamicLayer("Props2", Tiles).setDepth(-1);


    this.groundLayer = Map.createDynamicLayer("Ground", Tiles);
    

    // Using Spawn Point to get an easy way to spawn player
    const spawnPoint = Map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    // Collide the player with Tiled Layers
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);


    // Spawning the ennemies and define their IA

    this.ghost = this.physics.add.group();
    this.doll = this.physics.add.group();

    // Colliding them with player and others

    //Creating others elements and colling them if needed

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
    //Setting the camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);

    // Help text
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.player.update();

    if (
      this.player.sprite.y > this.groundLayer.height) 
    {
      // Flag that the player is dead
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
      cam.fade(250, 0, 0, 0);

      // Freeze the player
      this.player.freeze();

      // Add an effect on death
      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      });
    }
  }

  ScoreUp(player,luciole){
    luciole.disableBody(true,true);
    this.score += 100;
    this.scoreText.setText('Score : ' + this.score);
  }
}
