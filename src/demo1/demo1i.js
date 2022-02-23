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
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        this.faces = this.add.container();

        this.createRandomFaces(10);

        this.createParticles();

        //  1
        // this.score = 0;
        // this.scoreText = this.add.text(32, 32, 'Score: 0');

        //  2 = within clickFace

        //  3
        this.score = 0;
        this.scoreText = this.add.text(32, 32, 'Score: 0', { font: '32px Arial' });
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

        //  2
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
    width: 800,
    height: 600,
    scene: Example
}

new Phaser.Game(config);
