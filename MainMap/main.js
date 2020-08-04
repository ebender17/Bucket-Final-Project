class main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("final_proj", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setDepth(10);

        this.player = this.physics.add
            .sprite(592, 672, "player-front")
            .setSize(10, 16)
            .setOffset(0, 4);

        this.entry1 = this.physics.add.sprite(56, 728, "entryway");
        this.entry2 = this.physics.add.sprite(40, 152, "entryway");
        this.entry3 = this.physics.add.sprite(600, 120, "entryway");
        this.ghost = this.physics.add.sprite(608, 672, "ghost");
        this.ghost.play("ghost-anim");

        this.physics.add.collider(this.player, worldLayer);

        this.physics.add.overlap(this.player, this.entry1, this.loadHouse1, null, this);
        this.physics.add.overlap(this.player, this.entry2, this.loadHouse2, null, this);
        this.physics.add.overlap(this.player, this.entry3, this.loadHouse3, null, this);
        this.physics.add.overlap(this.player, this.ghost, this.winGame, null, this);

        const anims = this.anims;

        this.physics.world.setBoundsCollision();


        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    loadHouse1() {
        config.inventory.push("key1");
        console.log("key 1 added to the inventory");
    }

    loadHouse2() {
        if (config.inventory.some(item => item === "key1")) {
            config.inventory.push("key2");
            console.log("key 2 added to the inventory");
        } else {
            console.log("Missing Key 1");
        }
    }

    loadHouse3() {
        if (config.inventory.some(item => item === "key2")) {
            this.scene.start("hangman");
            // config.inventory.push("bucket");
            // console.log("bucket added to the inventory");
        } else {
            console.log("Missing Key 2");
        }
    }

    winGame() {
        if (config.inventory.some(item => item === "bucket")) {
            console.log("You Win!!!!!!")
        } else {
            console.log("Missing Bucket");
        }
    }

    movePlayerManager() {
        const speed = 75;
        const prevVelocity = this.player.body.velocity.clone();
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursorKeys.left.isDown) {
            this.player.body.setVelocityX(-50);
        } else if (this.cursorKeys.right.isDown) {
            this.player.body.setVelocityX(50);
        }

        // Vertical movement
        if (this.cursorKeys.up.isDown) {
            this.player.body.setVelocityY(-50);
        } else if (this.cursorKeys.down.isDown) {
            this.player.body.setVelocityY(50);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

        if (this.cursorKeys.left.isDown) {
            this.player.anims.play("player-left-walk", true);
        } else if (this.cursorKeys.right.isDown) {
            this.player.anims.play("player-right-walk", true);
        } else if (this.cursorKeys.up.isDown) {
            this.player.anims.play("player-back-walk", true);
        } else if (this.cursorKeys.down.isDown) {
            this.player.anims.play("player-front-walk", true);
        } else {
            this.player.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.player.setTexture("player-left");
            else if (prevVelocity.x > 0) this.player.setTexture("player-right");
            else if (prevVelocity.y < 0) this.player.setTexture("player-back");
            else if (prevVelocity.y > 0) this.player.setTexture("player-front");
        }
    }

    update(time, delta) {
        this.movePlayerManager();
    }
}