export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
        this.load.image('playbutton', './assets/Menu/play.png')
        this.load.image('menu', './assets/Menu/EcranTitre.png')
        this.load.image('options', './assets/Menu/options.png')	
	}

    create() { //creating the menu screen


        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(448 , 280, 'playbutton').setDepth(-1);

        let commandButton = this.add.image(448 , 390, 'options').setDepth(-1);

        


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