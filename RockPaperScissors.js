class rockpaperscissors extends Phaser.Scene {
    constructor() {
        super("rockpaperscissors");
    }

    preload() {
        this.load.image("background", "assets/background.jpg");
        this.load.image("rock", "assets/rock.png");
        this.load.image("paper", "assets/paper.png");
        this.load.image("scissors", "assets/scissors.png");
        this.load.image("questionmark", "assets/questionmark.png");
        this.load.image("winScreen", "assets/winScreen.png");
        this.load.image("loseScreen", "assets/loseScreen.png");
    }

    create() {
        //This is used to solve scoping issues with onclick events
        var scene = this;

        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);

        let game = new RockPaperScissors();

        //Load win/loss screens and set them invisible
        this.winScreen = this.add.image(400, 100, "winScreen");
        this.winScreen.setScale(0.5);
        this.winScreen.visible = false;

        this.loseScreen = this.add.image(400, 100, "loseScreen");
        this.loseScreen.setScale(0.5);
        this.loseScreen.visible = false;

        //Scoreboard
        this.playerScore = this.add.text(20, 20, "Player score: 0");
        this.cpuScore = this.add.text(20, 40, "CPU score: 0");
        this.roundCount = this.add.text(20, 60, "Round: 0");
        this.playerChoice = this.add.text(20, 100, "Player choice: ");
        this.cpuChoice = this.add.text(20, 120, "CPU Choice: ")

        //ROCK
        //Load and set position/size
        this.rock = this.add.image(200, 400, "rock").setInteractive();
        this.rock.setScale(0.3);

        //Onclick effects
        this.rock.on('pointerdown', function(pointer) {
            this.setTint(0x666666);
            scene.play(game, 'rock');
        });
        this.rock.on('pointerup', function(pointer) {
            this.clearTint();
        });

        //PAPER
        //Load and set position/size
        this.paper = this.add.image(400, 400, "paper").setInteractive();;
        this.paper.setScale(0.3);

        //Onclick effects
        this.paper.on('pointerdown', function(pointer) {
            this.setTint(0x666666);
            scene.play(game, 'paper');
        });
        this.paper.on('pointerup', function(pointer) {
            this.clearTint();
        });

        //SCISSORS
        //Load and set position/size
        this.scissors = this.add.image(600, 400, "scissors").setInteractive();;
        this.scissors.setScale(0.3);

        //Onclick effects
        this.scissors.on('pointerdown', function(pointer) {
            this.setTint(0x666666);
            scene.play(game, 'scissors')
        });
        this.scissors.on('pointerup', function(pointer) {
            this.clearTint();
        });

        this.questionmark = this.add.image(400, 100, "questionmark");
        this.questionmark.setScale(0.3);
    }

    play(game, playerChoice) {
        var result = game.play(playerChoice)
        var cpuChoice = game.cpuChoice;

        //Update sprites
        switch (cpuChoice) {
            case "rock":
                this.questionmark.destroy();
                this.questionmark = this.add.image(400, 100, "rock");
                this.questionmark.setScale(0.3);
                break;
            case "paper":
                this.questionmark.destroy();
                this.questionmark = this.add.image(400, 100, "paper");
                this.questionmark.setScale(0.3);
                break;
            case "scissors":
                this.questionmark.destroy();
                this.questionmark = this.add.image(400, 100, "scissors");
                this.questionmark.setScale(0.3);
                break;
        }

        //Update scoreboard
        if (result == "inProgress") {
            this.playerScore.destroy();
            this.playerScore = this.add.text(20, 20, "Player score: " + game.userScore);

            this.cpuScore.destroy();
            this.cpuScore = this.add.text(20, 40, "CPU score: " + game.cpuScore);

            this.roundCount.destroy();
            this.roundCount = this.add.text(20, 60, "Round: " + game.round);

            this.playerChoice.destroy();
            this.playerChoice = this.add.text(20, 100, "Player choice: " + playerChoice);

            this.cpuChoice.destroy();
            this.cpuChoice = this.add.text(20, 120, "CPU Choice: " + game.cpuChoice);

        }

        //Determine win/loss screen
        if (result == "playerWin") {
            //Update the scoreboard
            this.playerScore.destroy();
            this.playerScore = this.add.text(20, 20, "Player score: " + game.userScore);

            this.cpuScore.destroy();
            this.cpuScore = this.add.text(20, 40, "CPU score: " + game.cpuScore);

            this.roundCount.destroy();
            this.roundCount = this.add.text(20, 60, "Round: " + game.round);

            this.playerChoice.destroy();
            this.playerChoice = this.add.text(20, 100, "Player choice: " + playerChoice);

            this.cpuChoice.destroy();
            this.cpuChoice = this.add.text(20, 120, "CPU Choice: " + game.cpuChoice);

            //Show win screen
            this.questionmark.destroy();
            this.winScreen.visible = true;
            this.rock.removeInteractive();
            this.paper.removeInteractive();
            this.scissors.removeInteractive();
            config.lastScene = "rockpaperscissors";
            config.inventory.push("key2");
            console.log("key 2 added to the inventory");
            config.txt = "Key 2 has been added to your inventory!";
            this.time.delayedCall(3000, () => {
                this.scene.start("main")
            })
        } else if (result == "cpuWin") {
            //Update the scoreboard
            this.playerScore.destroy();
            this.playerScore = this.add.text(20, 20, "Player score: " + game.userScore);

            this.cpuScore.destroy();
            this.cpuScore = this.add.text(20, 40, "CPU score: " + game.cpuScore);

            this.roundCount.destroy();
            this.roundCount = this.add.text(20, 60, "Round: " + game.round);

            this.playerChoice.destroy();
            this.playerChoice = this.add.text(20, 100, "Player choice: " + playerChoice);

            this.cpuChoice.destroy();
            this.cpuChoice = this.add.text(20, 120, "CPU Choice: " + game.cpuChoice);

            //Show loss screen
            this.questionmark.destroy();
            this.loseScreen.visible = true;
            this.rock.removeInteractive();
            this.paper.removeInteractive();
            this.scissors.removeInteractive();
            config.lastScene = "rockpaperscissors";
            config.txt = "You failed, try again!";
            this.time.delayedCall(3000, () => {
                this.scene.start("main")
            });
        }

    }

    update() {
        config.timer += 0.01666666666;
    }
}