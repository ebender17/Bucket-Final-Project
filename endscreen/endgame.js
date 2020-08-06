class endGame extends Phaser.Scene {
    constructor() {
        super("endGame");
    }

    create() {
        this.bg6 = this.add.tileSprite(400, 300, 0, 0, "bg6");
        this.bg5 = this.add.tileSprite(400, 300, 0, 0, "bg5");
        this.bg4 = this.add.tileSprite(400, 300, 0, 0, "bg4");
        this.bg3 = this.add.tileSprite(400, 300, 0, 0, "bg3");
        this.bg2 = this.add.tileSprite(400, 300, 0, 0, "bg2");
        this.bg1 = this.add.tileSprite(400, 300, 0, 0, "bg1");

        this.userScore = this.add.text(225, 75, "Your Time: " + (config.timer / 60).toFixed(3), { fontSize: 35, fontStyle: 'bold', color: 0xCD5C5C });
        this.emily = this.add.text(225, 150, "Emily - Hangman", { fontSize: 20, fontStyle: 'bold', color: 0xCD5C5C });
        this.matthew = this.add.text(225, 225, "Matthew - Start Screen", { fontSize: 20, fontStyle: 'bold', color: 0xCD5C5C });
        this.jimmy = this.add.text(225, 300, "Jimmy - Flappy Bird", { fontSize: 20, fontStyle: 'bold', color: 0xCD5C5C });
        this.mark = this.add.text(225, 375, "Mark - Rock, Paper, Scissors", { fontSize: 20, fontStyle: 'bold', color: 0xCD5C5C });
        this.aaron = this.add.text(225, 450, "Aaron - Main Map", { fontSize: 20, fontStyle: 'bold', color: 0xCD5C5C });
    }

    update() {
        this.bg1.tilePositionX -= 0.75;
        this.bg2.tilePositionX -= 0.50;
        this.bg3.tilePositionX -= 0.30;
        this.bg4.tilePositionX -= 0.10;
        this.bg6.tilePositionX -= 0.03;
    }
}