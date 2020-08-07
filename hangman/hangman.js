class hangman extends Phaser.Scene {
    constructor() {
        super("hangman");
    }

    create() {
        //Retrieving word for game
        (async() => {
            try { 
                const response = await this.getRandomWord(); 
                this.word = response.word; 
                this.wordHolderText.innerHTML = this.getWordHolderText(); 
            } 
            catch { 
                console.log('Failed to retrieve word.'); 
            }
        })();

        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'hangman_background').setScale(2);
        this.farTrees = this.add.tileSprite(0, 0, config.width, config.height, 'far_trees').setScale(2);
        this.midTrees = this.add.tileSprite(0, 0, config.width, config.height, 'mid_trees').setScale(2);
        this.closeTrees = this.add.tileSprite(0, 0, config.width, config.height, 'close_trees').setScale(2);

        this.banner = this.add.bitmapText(20, 20, "pixelFont", "Hangman Game", 48);
        this.banner.tint = 0xffffff;

        this.guesses = [];
        this.wordStatus = null;
        this.mistakes = 0;
        this.didWin = false;
        this.isOver = false;

        this.hangmanWrapper = document.getElementById(`hangmanWrapper`);
        this.guessInput = document.getElementById(`guessInput`);
        this.guessButton = document.getElementById(`guessSubmitButton`);
        this.guessesText = document.getElementById(`guesses`);
        this.wordHolderText = document.getElementById(`wordHolder`);

        this.hangmanWrapper.classList.remove("d-none");

        this.drawGallows();
        this.buildLabels();
        this.guessInput.disabled = false;
        this.guessButton.disabled = false;
        this.guessesText.innerHTML = this.getGuessesText();

        this.guess.addEventListener('submit', function(e) {
            e.preventDefault();
            const letter = this.guessInput.value;

            this.playerGuess(letter);

            this.wordHolderText.innerHTML = this.getWordHolderText();
            this.guessesText.innerHTML = this.getGuessesText();
            this.guessInput.value = "";

            if (this.isOver) {
                this.guessInput.disabled = true;
                this.guessButton.disabled = true;

                //Win game 
                if (this.didWin === true) {
                    this.win_text = this.add.bitmapText(500, 200, "pixelFont", "You won!", 48);
                    this.win_text.tint = 0xffffff;

                    //Add bucket to inventory and go back to main map 
                    config.inventory.push("bucket");
                    console.log("bucket added to the inventory");
                    config.lastScene = "hangman";
                    this.time.delayedCall(3000, () => {
                        this.scene.start("main")
                    });

                    //Remove html input 
                    this.hangmanWrapper.classList.add("d-none");

                }
                //Loose game 
                else if (this.didWin === false) {
                    this.loose_text = this.add.bitmapText(500, 200, "pixelFont", "You lost.", 48);
                    this.loose_text.tint = 0xffffff;
                    config.lastScene = "hangman";

                    //Go back to main map
                    this.time.delayedCall(3000, () => {
                        this.scene.start("main")
                    });

                    //Remove html input 
                    this.hangmanWrapper.classList.add("d-none");
                }
            }
        }.bind(this));
    }

    getRandomWord() {
        return fetch('https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy')
            .then(response => response.json()); 
    }

    buildLabels() {
        this.guess = document.getElementById('guessForm');
        this.guess.style.position = "absolute";
        this.guess.style.left = '330px';
        this.guess.style.top = '545px';

        this.guessesText.style.position = "absolute";
        this.guessesText.style.fontSize = "10px";
        this.guessesText.style.columnWidth = '100px';
        this.guessesText.style.lineHeight = '16px';
        this.guessesText.style.left = '200px';
        this.guessesText.style.top = '490px';


        this.wordHolderText.style.fontSize = "10px";
        this.wordHolderText.style.position = "absolute";
        this.wordHolderText.style.left = '450px';
        this.wordHolderText.style.top = '490px';

    }

    drawGallows() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(30, 410, 175, 10); //Base 
        graphics.fillRect(125, 110, 10, 300); // Main beam
        graphics.fillRect(125, 110, 150, 10); // Hanging beam
        graphics.fillRect(275, 110, 10, 50); // Noose
    }

    drawHead() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(260, 160, 35, 35);
    }

    drawBody() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(268, 160, 20, 120);
    }

    drawLeftArm() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(263, 210, 5, 60);
    }

    drawRightArm() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(288, 210, 5, 60);

    }

    drawLeftLeg() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(268, 280, 5, 60);

    }

    drawRightLeg() {
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.fillRect(283, 280, 5, 60);

    }

    playerGuess(letter) {
        if (!letter) {
            throw new Error(`No letter provided.`);
        } else if (!/^[a-zA-Z]*$/g.test(letter)) {
            throw new Error(`Invalid guess`);
        } else if (letter.length > 1) {
            throw new Error(`Invalid guess`);
        } else {
            letter.toLowerCase();
        }

        this.guesses.forEach(element => {
            if (element === letter) {
                alert(`Already guessed this letter.`)
                throw new Error(`Already guessed this letter`);
            }
        });

        this.guesses.push(letter);

        if (this.word.includes(letter)) {
            this.getWordHolderText();
            this.getGuessesText();
            this.checkWin();
        } else {
            this.mistakes++;
            this.onWrongGuess();
        }

    }

    checkWin() {
        // using the word and the guesses array, figure out how many remaining unknowns.
        // if zero, set both didWin, and isOver to true
        if (this.wordStatus === this.word) {
            this.didWin = true;
            this.isOver = true;

        }

    }

    onWrongGuess() {
        switch (this.mistakes) {
            case 1:
                this.drawHead();
                break;
            case 2:
                this.drawBody();
                break;
            case 3:
                this.drawLeftArm();
                break;
            case 4:
                this.drawRightArm();
                break;
            case 5:
                this.drawLeftLeg();
                break;
            case 6:
                this.drawRightLeg();
                this.didWin = false;
                this.isOver = true;
                break;
        }
    }

    getWordHolderText() {
        this.wordStatus = this.word.split('').map(letter => (this.guesses.indexOf(letter) >= 0 ? letter : ` _ `)).join('');

        return this.wordStatus;
    }

    getGuessesText() {
        return `Guesses: ${this.guesses.join(', ')}`;
    }

    update() {
        config.timer += 0.01666666666;
    }

}