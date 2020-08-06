var game;
var score;
class flappybird extends Phaser.Scene{
    constructor(){
        super('flappybird');
    }
    preload() {
        this.load.image('bird', 'flappybird/assets/bird.png');
        this.load.image('pipe', 'flappybird/assets/pipe.png');
        this.load.audio('jump', 'flappybird/assets/jump.wav');
 
    }
 
    create() {
        this.backgroundColor = '#71c5cf';
 
        //game.physics.startSystem(Phaser.Physics.ARCADE);
 
        this.bird = this.add.sprite(100, 245, 'bird');
        this.physics.world.enableBody(this.bird);
        this.bird.body.gravity.y = 1000;
 
        var spaceKey = this.input.keyboard.addKey('SPACE');
        spaceKey.on('down', function(){
            if (this.bird.alive == false){
                return;
            }
            this.bird.body.velocity.y = -350;
        }, this);
        //spaceKey.onDown.add(this.jump, this);
 
        this.pipes = this.physics.add.group();
 
        //this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
 
        this.addNewRowOfPipes();
 
        this.time.addEvent({
          delay: 1500,
          callback: this.addNewRowOfPipes,
          callbackScope: this,
          loop: true
        });
 
        this.score = 0;
        this.labelScore = this.add.text(20, 20, score, { font: "30px Arial", fill: "#ffffff" }); 
    }
 
    update() {
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
 
        this.physics.add.overlap(this.bird, this.pipes, this.hitPipe, null, this);
 
        if (this.bird.angle < 20)
            this.bird.angle += 1;
    }
 
    jump() {
        if (this.bird.alive == false){
            return;
        }
        this.bird.body.velocity.y = -350;
 
        this.scene.tweens.add({
            targets: this.bird,
            props: { angle: -20 },
            duration: 150,
            ease: "Power0"
          });
        //this.jumpSound.play();
 
    }
 
    restartGame() {
        this.scene.start('flappybird');
    }
 
    addOnePipe(x, y) {
        var pipe = this.add.sprite(x, y, 'pipe');
 
        this.pipes.add(pipe);
        //this.physics.world.enable(this.pipe);
 
        pipe.body.velocity.x = -200;
 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
 
    addNewRowOfPipes() {
        var hole = Math.floor(Math.random() * 5) + 1;
        this.score += 1;
        for (var i = 0; i < 10; i++){
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
        }
    }
 
    hitPipe() {
        if (this.bird.alive == false){
            return;
        }
        this.bird.alive = false;
        if(score < 1){
            this.start.scene("main");
        }else{
            this.restartGame();
        }
 
        //game.time.events.remove(this.timer);

        this.restartGame();
    }

}
