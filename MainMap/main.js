class main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        this.setWeather();

        const tileset = map.addTilesetImage("final_proj", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        //aboveLayer.setDepth(10);

        this.entry1 = this.physics.add.sprite(56, 728, "entryway");
        this.entry2 = this.physics.add.sprite(40, 152, "entryway");
        this.entry3 = this.physics.add.sprite(600, 120, "entryway");
        this.path = this.physics.add.sprite(680, 184, "path");
        this.ghost = this.physics.add.sprite(608, 672, "ghost");
        this.ghost.play("ghost-anim");

        this.music = this.sound.add("music");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        //Loads player back into correct location based off where they last came from
        if (config.lastScene === "mainmenu") {
            this.player = this.physics.add
                .sprite(592, 672, "player-front")
                .setSize(10, 16)
                .setOffset(0, 4);
            this.time.delayedCall(2000, () => {
                alert("Could You please find a bucket of water for me? Be sure to watch out, the weather is: " + config.weather + "!");
            });
            this.music.play(musicConfig);
        } else if (config.lastScene === "flappybird") {
            this.player = this.physics.add
                .sprite(56, 748, "player-front")
                .setSize(10, 16)
                .setOffset(0, 4);
            this.time.delayedCall(2000, () => {
                alert("Key 1 has been added to your inventory!");
            });
            //this.showMessageBox("Key 1 has been added to your inventory!");
        } else if (config.lastScene === "rockpaperscissors") {
            this.player = this.physics.add
                .sprite(40, 172, "player-front")
                .setSize(10, 16)
                .setOffset(0, 4);
            this.time.delayedCall(2000, () => {
                alert(config.txt);
            });
            //this.showMessageBox("Key 2 has been added to your inventory!");
        } else if (config.lastScene === "hangman") {
            this.player = this.physics.add
                .sprite(600, 140, "player-front")
                .setSize(10, 16)
                .setOffset(0, 4);
            this.time.delayedCall(2000, () => {
                alert(config.txt);
            });
            //this.showMessageBox("An empty bucket has been added to your inventory!");
        }

        this.physics.add.collider(this.player, worldLayer);

        this.physics.add.overlap(this.player, this.entry1, this.loadHouse1, null, this);
        this.physics.add.overlap(this.player, this.entry2, this.loadHouse2, null, this);
        this.physics.add.overlap(this.player, this.entry3, this.loadHouse3, null, this);
        this.physics.add.overlap(this.player, this.path, this.getWater, null, this);
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
        this.scene.start("flappybird");
    }

    loadHouse2() {
        if (config.inventory.some(item => item === "key1")) {
            this.scene.start("rockpaperscissors");
        } else {
            if (!config.misskey1sent) {
                alert("Missing Key 1!");
                console.log("Missing Key 1");
                config.misskey1sent = true;
            }
        }
    }

    loadHouse3() {
        if (config.inventory.some(item => item === "key2")) {
            this.scene.start("hangman");
        } else {
            if (!config.misskey2sent) {
                alert("Missing Key 2!");
                console.log("Missing Key 2");
                config.misskey2sent = true;
            }
        }
    }

    getWater() {
        if (config.inventory.some(item => item === "bucket")) {
            if (!config.wateraddedsent) {
                config.inventory.push("water");
                alert("Water added to Bucket!");
                console.log("Water added to bucket");
                config.wateraddedsent = true;
            }
        } else {
            if (!config.missbucketsent) {
                alert("Missing Bucket!");
                console.log("Missing Bucket");
                config.missbucketsent = true;
            }
        }
    }

    winGame() {
        if (config.inventory.some(item => item === "water")) {
            console.log("You Win!!!!!!")
            console.log("Time: " + config.timer / 60);
            this.scene.start("endGame");
        } else if (config.inventory.some(item => item === "bucket")) {
            if (!config.missbucketghostsent) {
                alert("You are Missing Water!");
                console.log("Missing Water");
                config.missbucketghostsent = true;
            }
        } else {
            if (!config.misswatersent) {
                alert("You are missing the Bucket!");
                console.log("Missing Bucket");
                config.misswatersent = true;
            }
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

    fetchWeather() {
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=39.1031&lon=84.5120&exclude=minutely,hourly,daily&appid=a9915cce5540225f7997bb5ed0988782')
            .then(response => response.json());
    }

    async setWeather() {
        try {
            const response = await this.fetchWeather();
            config.weather = response.current.weather[0].main;
        } catch {
            //For testing
            console.log("oof");
        }
    }

    update(time, delta) {
        this.movePlayerManager();
        config.timer += 0.01666666666;
    }
}