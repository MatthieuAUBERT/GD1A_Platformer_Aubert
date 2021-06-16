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

    this.load.image("actionner", "./assets/Objects/UncleGhost.png");

    this.load.image("luciole", "./assets/Objects/Luciole.png");

    this.load.image("Tuiles", "./assets/TiledLvl3/Tileset3.png");
    this.load.tilemapTiledJSON("Boss", "./assets/TiledLvl3/Map3.json");

    this.cursors = this.input.keyboard.createCursorKeys()

  }

  create() {
    //Setting the state of the player
    this.isPlayerDead = false;
    this.immune = false;
    this.respawning = false;
    this.storytelling = true;
    this.nbClick = 0;
    this.nbClickF = 0;
    this.storyF = false;
    this.teststory = true;

    this.skip = this.input.keyboard.addKey('SPACE');


    //Setting the map

    
    const Map = this.make.tilemap({ key: "Boss" });
    const Tiles = Map.addTilesetImage("Tileset3", "Tuiles");


    this.groundLayer = Map.createDynamicLayer("Ground", Tiles);
    

    // Using Spawn Point to get an easy way to spawn player
    const spawnPoint = Map.findObject("Objects", obj => obj.name === "Spawn");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    //Setting the camera
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);

    //Setting the audio

    //this.musique;

    //this.musique = this.sound.add('Musique')

    // Texte
    this.score = 0;
    this.scoreText;

    this.scoreText = this.add.text(16, 16, "Score : 0", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

    this.textbox = this.add.image(448,224,'textbox').setDepth(2).setScrollFactor(0)

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
      //this.musique.play({volume : 0.1, loop: true});
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
  //Checkpoint
  respawn(player){

    this.respawning = true;

  }
  //End of the level
  finishing(player){

      const cam = this.cameras.main;

      cam.fade(250, 0, 0, 0);

      // Freeze the player
      this.player.freeze();

      cam.once("camerafadeoutcomplete", () => {
        this.isPlayerDead = true;
        this.musique.stop();
        this.player.destroy();
        //Affichage des crédits
      
    });
  

  }
}
