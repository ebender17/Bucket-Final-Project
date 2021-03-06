var config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 600, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: [LoadingScene, StartScene, preloadmain, main, hangman, flappybird, rockpaperscissors, endGame],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 } // Top down game, so no gravity
        }
    },
    inventory: [],
    timer: 0,
    lastScene: "mainmenu",
    weather: "",
    txt: "",
    missbucketghostsent: false,
    misswatersent: false,
    misskey1sent: false,
    misskey2sent: false,
    missbucketsent: false,
    wateraddedsent: false
};

var game = new Phaser.Game(config);