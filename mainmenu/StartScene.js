class StartScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create(){
    this.background = this.add.tileSprite(0,0,config.width,config.height, "mainMap");
    this.startButton = this.add.sprite(config.width /2, config.height/2, 'startButton');
    this.background.setOrigin(0,0);

    this.startButton.setInteractive();

    this.input.on('gameobjectdown',this.changeScene, this);
  }

  update(){
    this.background.tilePositionX += 0.25;
    this.background.tilePositionY += 0.25;
  }

  changeScene(){
    this.scene.start("playGame");
  }
}