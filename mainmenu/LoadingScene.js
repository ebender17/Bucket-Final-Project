class LoadingScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  preload(){
    this.load.image("startButton", "assets/images/startButton.png");
    this.load.image("mainMap", "assets/images/main.png");
  }

  create(){
    this.add.text(20,20, "Loading game...");
    this.scene.start("TitleScene");
  }
}