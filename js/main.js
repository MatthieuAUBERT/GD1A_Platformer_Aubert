import Menu from "./scenes/menu.js";
import Level_1 from "./scenes/Level_1.js";
import Level_2 from "./scenes/Level_2.js";
import Level_3 from "./scenes/Level_3.js";


const config = {
  type: Phaser.AUTO,
  width: 896,
  height: 448,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: [Menu, Level_1, Level_2, Level_3],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);