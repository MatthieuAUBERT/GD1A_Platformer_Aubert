export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
		this.load.image('logo', './assets/Menu/Logo.png')
        this.load.image('playbutton', './assets/Menu/play.png')
        this.load.image('menu', './assets/Menu/MenuScreen.png')
        this.load.image('options', './assets/Menu/options.png')	
	}

    create() { //creating the menu screen

        //create images (z order)

        this.add.image(this.game.renderer.width / 2 , this.game.renderer.height / 4 + 20 , 'logo').setDepth(1);

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2 - 150 , this.game.renderer.height / 2 + 100 , 'playbutton').setDepth(1);

        let commandButton = this.add.image(this.game.renderer.width /2 + 150 , this.game.renderer.height /2 + 100, 'options').setDepth(1);

        


        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('level1');
        })

        commandButton.setInteractive();

        commandButton.on("pointerup", () => {
            
        })

    }
}