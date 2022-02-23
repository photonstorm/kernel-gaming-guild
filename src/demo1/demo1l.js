class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setPath('../assets');
        this.load.image('background', 'gradient8.png');
        this.load.image('face', 'face.png');
        this.load.image('coin', 'coin-small.png');
        this.load.image('grid', 'grid.png');
        this.load.image('baddie', 'baddie2.png');
    }

    create ()
    {
        this.add.image(400, 300, 'background');
        this.add.image(400, 420, 'grid');

        this.faces = this.add.container();

        this.createRandomFaces(10);

        this.boss = this.physics.add.sprite(400, 300, 'baddie');

        this.boss.setCollideWorldBounds(true, 1, 1);

        const velocityX = Phaser.Math.Between(300, 400);
        const velocityY = Phaser.Math.Between(-100, -200);

        this.boss.setVelocity(velocityX, velocityY);

        this.boss.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', (body, up, down, left, right) => {

            if (left)
            {
                this.boss.flipX = false;
            }
            else if (right)
            {
                this.boss.flipX = true;
            }

        });

        this.boss.setInteractive();

        this.boss.on('pointerdown', () => this.clickBaddie());

        this.createParticles();

        this.score = 0;
        this.scoreText = this.add.text(32, 32, 'Score: 0', { font: '32px Arial' });

        this.countdown = this.time.addEvent({ delay: 5000, callback: () => this.gameOver() });
        this.timerBar = this.add.rectangle(400, 552, 700, 32, 0x00ff00);
    }

    clickBaddie ()
    {
        this.score = Math.floor(this.score / 2);

        this.scoreText.setText('Score: ' + this.score);

        this.cameras.main.flash(250, 255, 0, 0);
        this.cameras.main.shake(500);
    }

    update ()
    {
        this.timerBar.scaleX = 1 - this.countdown.getProgress();
    }

    gameOver ()
    {
        //  Remove these:
        // this.faces.setVisible(false);
        // this.boss.setVisible(false);

        //  1
        this.tweens.add({
            targets: [ this.faces, this.boss, this.scoreText ],
            alpha: 0,
            duration: 1500
        });

        //  2
        const serverUrl = 'https://3if5ttlzhabf.usemoralis.com:2053/server';
        const appId = 'lTjCzjvr1AcnXUp8vcpAadOJFgpb5mY7JDnoX8aJ';
        const btc = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';

        Moralis.start({ serverUrl, appId });

        const options = { chain: 'eth', address: btc };

        // https://docs.moralis.io/moralis-server/web3-sdk/token#gettokenprice

        Moralis.Web3API.token.getTokenPrice(options).then(event => {

            // console.log(event);

            const btcPrice = event.usdPrice;

            const winnings = Math.trunc(this.score * btcPrice);

            const won = this.add.text(400, 0, `You Won\n$${winnings}!\n😜`, { font: '96px Arial', align: 'center' }).setOrigin(0.5);

            //  3
            this.tweens.add({
                targets: won,
                y: 300,
                ease: 'Bounce.out',
                duration: 1000
            });

            //  4
            this.time.addEvent({ delay: 500, loop: true, callback: () => {

                const x = Phaser.Math.Between(50, 750);
                const y = Phaser.Math.Between(50, 550);
                    
                this.particles.emitParticleAt(x, y);

            } });

            //  5 - To conclude, could make Elon much faster and add more Pauls
        });
    }

    createRandomFaces (qty)
    {
        for (let i = 0; i < qty; i++)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            const scale = Phaser.Math.FloatBetween(0.25, 0.5);

            const face = this.add.sprite(x, y, 'face');

            face.setScale(scale);

            this.faces.add(face);

            face.setInteractive();

            face.once('pointerdown', pointer => this.clickFace(pointer, face));
        }
    }

    clickFace (pointer, face)
    {
        this.particles.emitParticleAt(pointer.x, pointer.y);

        this.tweens.add({
            targets: face,
            scaleX: 0,
            scaleY: 0,
            duration: 500,
            ease: 'Power3'
        });

        this.score++;

        this.scoreText.setText('Score: ' + this.score);
    }

    createParticles ()
    {
        this.particles = this.add.particles('coin');

        this.particles.createEmitter({
            angle: { min: 240, max: 300 },
            speed: { min: 400, max: 600 },
            gravityY: 800,
            lifespan: 4000,
            on: false,
            quantity: 10,
            scale: { min: 0.2, max: 0.5 },
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' }
        });
    }
}

const config = {
    parent: 'container',
    scaleMode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 80
            }
        }
    },
}

new Phaser.Game(config);
