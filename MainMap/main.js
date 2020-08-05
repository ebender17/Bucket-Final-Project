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
        aboveLayer.setDepth(10);

        this.entry1 = this.physics.add.sprite(56, 728, "entryway");
        this.entry2 = this.physics.add.sprite(40, 152, "entryway");
        this.entry3 = this.physics.add.sprite(600, 120, "entryway");
        this.path = this.physics.add.sprite(680, 184, "path");
        this.ghost = this.physics.add.sprite(608, 672, "ghost");
        this.ghost.play("ghost-anim");

        this.player = this.physics.add
            .sprite(592, 672, "player-front")
            .setSize(10, 16)
            .setOffset(0, 4);

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
    }

    loadHouse2() {
        if (config.inventory.some(item => item === "key1")) {
            config.inventory.push("key2");
            console.log("key 2 added to the inventory");
            this.scene.start("rockpaperscissors");
        } else {
            console.log("Missing Key 1");
            //Added this in here just to test if the scene worked with the rest of the game, remove when needed
            this.scene.start("rockpaperscissors");
        }
    }

    loadHouse3() {
        if (config.inventory.some(item => item === "key2")) {
            this.scene.start("hangman");
        } else {
            console.log("Missing Key 2");
        }
    }

    getWater() {
        if (config.inventory.some(item => item === "bucket")) {
            config.inventory.push("water");
            console.log("Water added to bucket");
        } else {
            console.log("Missing Bucket");
        }
    }

    winGame() {
        if (config.inventory.some(item => item === "water")) {
            console.log("You Win!!!!!!")
        } else if (config.inventory.some(item => item === "bucket")) {
            console.log("Missing Water");
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

    fetchWeather() {
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=39.1031&lon=84.5120&exclude=minutely,hourly,daily&appid=a9915cce5540225f7997bb5ed0988782')
        .then(response => response.json());
    }
    
    async setWeather(){
        try{
            const response = await this.fetchWeather();
            console.log(response.current.weather[0].main);
        }
        catch{
            console.log("oof");
        }
    }

    update(time, delta) {
        this.movePlayerManager();
    }
}