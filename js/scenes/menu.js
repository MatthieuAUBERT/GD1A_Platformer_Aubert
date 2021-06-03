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
        //TEXTE
        const textSource = "Here is some text that will show up word by word."
        const wordCount = textSource.split(' ').length;
        const text = this.add.text(100, 100, '', { fontSize: 20 });

        this.add.image(100 , this.game.renderer.height * 0.10, 'logo').setDepth(1).setScale(0.2);

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'playbutton').setDepth(1);

        let commandButton = this.add.image(this.game.renderer.width -100 , this.game.renderer.height * 0.10, 'options').setDepth(1).setScale(0.7);

        


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
            //TEXTE
            this.tweens.addCounter({
                from: 0,
                to: wordCount,
                ease: (v) => Phaser.Math.Easing.Stepped(v, wordCount),
                onUpdate: function(_, { value }) {
                  text.setText(textSource.split(' ').slice(0, value).join(' '));
                }
              })
            
        })

    }
}