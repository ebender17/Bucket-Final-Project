class preloadmain extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("tiles", "projectfiles/MainMap/Assets/Tilesets/final_proj.png");
        this.load.tilemapTiledJSON("map", "projectfiles/MainMap/Assets/Tilemaps/main.json");
        this.load.spritesheet("ghost", "projectfiles/MainMap/Assets/Sprites/ghost.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-back", "projectfiles/MainMap/Assets/Sprites/walk-back-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-front", "projectfiles/MainMap/Assets/Sprites/walk-front-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-left", "projectfiles/MainMap/Assets/Sprites/walk-left-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player-walk-right", "projectfiles/MainMap/Assets/Sprites/walk-right-boy.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("player-front", "projectfiles/MainMap/Assets/Sprites/boy-front.png");
        this.load.image("player-back", "projectfiles/MainMap/Assets/Sprites/boy-back.png");
        this.load.image("player-right", "projectfiles/MainMap/Assets/Sprites/boy-right.png");
        this.load.image("player-left", "projectfiles/MainMap/Assets/Sprites/boy-left.png");
        this.load.image("entryway", "projectfiles/MainMap/Assets/Sprites/entry.png");

        this.load.image("path", "projectfiles/MainMap/Assets/Sprites/path.png");
        this.load.audio("music", "projectfiles/MainMap/Assets/gamesong.mp3");

        //Rockpaperscissors assets
        this.load.image("background", "projectfiles/rockpaperscissors/assets/background.jpg");
        this.load.image("rock", "projectfiles/rockpaperscissors/assets/rock.png");
        this.load.image("paper", "projectfiles/rockpaperscissors/assets/paper.png");
        this.load.image("scissors", "projectfiles/rockpaperscissors/assets/scissors.png");
        this.load.image("questionmark", "projectfiles/rockpaperscissors/assets/questionmark.png");
        this.load.image("winScreen", "projectfiles/rockpaperscissors/assets/winScreen.png");
        this.load.image("loseScreen", "projectfiles/rockpaperscissors/assets/loseScreen.png");


        //Hangman assets 
        this.load.bitmapFont("pixelFont", "projectfiles/hangman/assets/fonts/font.png", "projectfiles/hangman/assets/fonts/font.xml");

        this.load.image("hangman_background", "projectfiles/hangman/assets/background/parallax-demon-woods-bg.png");
        this.load.image("far_trees", "projectfiles/hangman/assets/background/parallax-demon-woods-far-trees.png");
        this.load.image("mid_trees", "projectfiles/hangman/assets/background/parallax-demon-woods-mid-trees.png");
        this.load.image("close_trees", "projectfiles/hangman/assets/background/parallax-demon-woods-close-trees.png");

        //End Screen assets
        this.load.image("bg1", "projectfiles/endscreen/assets/landscape_0000_1_trees.png");
        this.load.image("bg2", "projectfiles/endscreen/assets/landscape_0001_2_trees.png");
        this.load.image("bg3", "projectfiles/endscreen/assets/landscape_0002_3_trees.png");
        this.load.image("bg4", "projectfiles/endscreen/assets/landscape_0003_4_mountain.png");
        this.load.image("bg5", "projectfiles/endscreen/assets/landscape_0004_5_clouds.png");
        this.load.image("bg6", "projectfiles/endscreen/assets/landscape_0005_6_background.png");
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