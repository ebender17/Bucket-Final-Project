class LoadingScene extends Phaser.Scene {
    constructor() {
        super("bootLoad");
    }

    preload() {
        this.load.image("startButton", "projectfiles/mainmenu/assets/startButton.png");
        this.load.image("mainMap", "projectfiles/mainmenu/assets/main.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("TitleScene");
    }
}