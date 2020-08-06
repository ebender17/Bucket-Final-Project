class endGame extends Phaser.Scene {
    constructor() {
        super("endGame");
    }

    create() {
        this.bg6 = this.add.tileSprite(0, 0, 0, 0, "bg6");
        this.bg5 = this.add.tileSprite(0, 0, config.width, config.height, "bg5");
        this.bg4 = this.add.tileSprite(0, 0, config.width, config.height, "bg4");
        this.bg3 = this.add.tileSprite(0, 0, config.width, config.height, "bg3");
        this.bg2 = this.add.tileSprite(0, 0, config.width, config.height, "bg2");
        this.bg1 = this.add.tileSprite(0, 0, config.width, config.height, "bg1");

        this.userScore = this.add.text(225, 75, "Your Time: " + (config.timer / 60).toFixed(3), { fontSize: 35 });
        this.emily = this.add.text();
        this.matthew = this.add.text();
        this.jimmy = this.add.text();
        this.mark = this.add.text();
        this.aaron = this.add.text();
    }

    update() {
        this.bg1.tilePositionX -= 0.75;
        this.bg2.tilePositionX -= 0.50;
        this.bg3.tilePositionX -= 0.30;
        this.bg4.tilePositionX -= 0.10;
        this.bg6.tilePositionX -= 0.03;
    }
}