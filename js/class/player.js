//Player Class to export in any scene that include the player acting
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    //Animating our player
    const anims = scene.anims;
    anims.create({
      key: "player-idle",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "player-run",
      frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1
    });

    // Base of the player's physics
    this.sprite = scene.physics.add
      .sprite(x, y, "player", 0)
      .setDrag(1000, 0)
      .setMaxVelocity(300, 400)
      .setSize(18, 24)
      .setOffset(7, 9);

    // Using arrow keys and ZQSD keys
    const { LEFT, RIGHT, UP, DOWN, Z, Q, D, S } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      z: Z,
      q: Q,
      s: S,
      d: D
    });
  }

  //Having a function that freeze the player
  freeze() {
    this.sprite.body.moves = false;
  }

  //Updating our player
  update() {
    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.q.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Allow player to jump only if on ground
    if (onGround && (keys.up.isDown || keys.z.isDown)) {
      sprite.setVelocityY(-500);
    }

    // Update the animation
    if (onGround) {
      //Player Running if velocityX != 0 else Player Idle
      if (sprite.body.velocity.x !== 0) sprite.anims.play("player-run", true);
      else sprite.anims.play("player-idle", true);
    } else {
      //Stopping Animation to play a Texture for the jump
      sprite.anims.stop();
      sprite.setTexture("player", 10);
    }
  }

  //Creating a function to destroy player
  destroy() {
    this.sprite.destroy();
  }
}
