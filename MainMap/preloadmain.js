class preloadmain extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("tiles", "mainmap/Assets/Tilesets/final_proj.png");
        this.load.tilemapTiledJSON("map", "mainmap/Assets/Tilemaps/main.json");
        this.load.spritesheet("ghost", "mainmap/assets/sprites/ghost.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-back", "mainmap/assets/sprites/walk-back-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-front", "mainmap/assets/sprites/walk-front-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-left", "mainmap/assets/sprites/walk-left-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-right", "mainmap/assets/sprites/walk-right-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("player-front", "mainmap/assets/sprites/boy-front.png");
        this.load.image("player-back", "mainmap/assets/sprites/boy-back.png");
        this.load.image("player-right", "mainmap/assets/sprites/boy-right.png");
        this.load.image("player-left", "mainmap/assets/sprites/boy-left.png");
        this.load.image("entryway", "mainmap/assets/sprites/entry.png");
        this.load.image("path", "mainmap/assets/sprites/path.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        const anims = this.anims;
        anims.create({
            key: "player-left-walk",
            frames: anims.generateFrameNumbers("player-walk-left"),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-right-walk",
            frames: anims.generateFrameNumbers("player-walk-right"),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-back-walk",
            frames: anims.generateFrameNumbers("player-walk-back"),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-front-walk",
            frames: anims.generateFrameNumbers("player-walk-front"),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "ghost-anim",
            frames: anims.generateFrameNumbers("ghost"),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start("main");
    }
}