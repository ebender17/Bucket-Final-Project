class LoadingScene extends Phaser.Scene {
    constructor() {
        super("bootLoad");
    }

    preload() {
        this.load.image("startButton", "mainmenu/assets/startButton.png");
        this.load.image("mainMap", "mainmenu/assets/main.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("TitleScene");
    }
}