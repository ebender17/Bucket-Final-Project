var game;
var score = 0 - 1;
class flappybird extends Phaser.Scene {
    constructor() {
        super('flappybird');

    }
    preload() {
        this.load.image('bird', 'projectfiles/flappybird/assets/redbird.png');
        this.load.image('pipe', 'projectfiles/flappybird/assets/pipe.png');
        this.load.audio('jump', 'projectfiles/flappybird/assets/jump.wav');

    }

    create() {
        this.backgroundColor = '#71c5cf';

        this.bird = this.add.sprite(200, 245, 'bird');
        this.physics.world.enableBody(this.bird);
        this.bird.body.gravity.y = 1000;

        var startLabel = this.add.text(445, 245, "Press Space to Start\nGet 10 to Win!", {
            fontSize: '64px Arial',
            fill: '#ffffff'
        });
        startLabel.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: startLabel,
            alpha: 0,
            ease: 'Power1',
            duration: 2000,
        });

        var spaceKey = this.input.keyboard.addKey('SPACE');
        spaceKey.on('down', function() {
            if (this.bird.alive == false) {
                return;
            }
            this.bird.body.velocity.y = -350;

        }, this);

        this.pipes = this.physics.add.group();

        this.addNewRowOfPipes();
        this.time.addEvent({
            delay: 1500,
            callback: this.addNewRowOfPipes,
            callbackScope: this,
            loop: true
        });

        this.labelScore = this.add.text(20, 20, 'Score: 0', {
            font: "30px Arial",
            fill: "#ffffff"
        });

    }

    update() {
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();

        this.physics.add.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }


        this.time.delayedCall(2400, () => {
            this.labelScore.destroy();
            this.labelScore = this.add.text(20, 20, 'Score: ' + score, {
                font: "30px Arial",
                fill: "#ffffff"
            });
        });


        config.timer += 0.01666666666;

        if (score > 9) {
            config.lastScene = "flappybird";
            this.scene.start("main");
        }
    }

    restartGame() {
        score = 0;
        this.scene.start('flappybird');
    }

    addOnePipe(x, y) {
        var pipe = this.add.sprite(x, y, 'pipe');

        this.pipes.add(pipe);

        pipe.body.velocity.x = -200;

        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }

    addNewRowOfPipes() {
        var hole = Math.floor(Math.random() * 5) + 1;
        this.time.delayedCall(2600, () => {
            score += 1
        });
        for (var i = 0; i < 10; i++) {
            if (i != hole && i != hole + 1)
                this.addOnePipe(800, i * 60 + 10);
        }
    }

    hitPipe() {
        if (this.bird.alive == false) {
            return;
        }
        this.bird.alive = false;
        if (score > 9) {
            config.lastScene = "flappybird";
            this.scene.start("main");
        } else {
            this.restartGame();
            score = 0;
        }

    }

}